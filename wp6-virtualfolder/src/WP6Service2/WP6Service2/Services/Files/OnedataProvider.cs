using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using MetadataService.Services.Settings;
using ServiceStack.ServiceHost;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;


namespace MetadataService.Services.Files
{
    public class OnedataProviderCreator : IProviderCreator
    {
        public AFileProvider CreateProvider(ProviderItem item, ISettingsStorage storage, IDbConnection connection)
        {
            return new OnedataProvider(item, storage, connection);
        }
    }

    public class OnedataProvider : AFileProvider
    {
        private static readonly object initLock = new object();

        /* JSON parameters from attribute API */
        private readonly string OD_ATTR_MTIME = "mtime";
        private readonly string OD_ATTR_NAME = "name";
        private readonly string OD_ATTR_SIZE = "size";
        private readonly string OD_ATTR_TYPE = "type";
        private readonly string OD_ATTR_MODE = "mode";

        /* JSON parameters from file API */
        private readonly string OD_FILE_PATH = "path";

        /* JSON parameters from space API */
        private readonly string OD_SPACE_ID = "spaceId";
        private readonly string OD_SPACE_NAME = "name";
        private readonly string OD_SPACE_PROV = "providers";

        private readonly string WEBDAV_USER = "apache";   //TODO get from configuration
        private readonly string ONECLIENT_CMD = "/usr/bin/oneclient";

        private readonly int sockTimeout = 60000;

        private readonly string accessToken;
        private readonly string accessURL;
        private readonly string spaceAPIURL;
        private readonly string fileAPIURL;
        private readonly string attrAPIURL;
        
        public OnedataProvider(ProviderItem item, ISettingsStorage storage, IDbConnection connection)
            : base(AdjProvInfo(item), storage, connection)
        {
            accessToken = item.securetoken;
            accessURL = item.accessurl;
            
            spaceAPIURL = string.Format("https://{0}/api/v3/oneprovider/spaces", item.accessurl);
            fileAPIURL = string.Format("https://{0}/api/v3/oneprovider/files", item.accessurl);
            attrAPIURL = string.Format("https://{0}/api/v3/oneprovider/attributes", item.accessurl);            

            ServicePointManager.ServerCertificateValidationCallback = validateRemoteCertificate;
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls;

            MountArea();
            Console.WriteLine("Initiated Onedata Provider with user " + Environment.UserName);
        }

        public override object GetFileOrList(string path, IHttpRequest req)
        {
            Ug.HandleRequest(req);

            var result = new List<SBFile>();
            
            var normPath = path == null ? "" : path.Trim().Trim(new char[] {'/'});

            var publicWebdavPrefix = normPath == "" ? Ug.GetRootPublicWebDavUrl() : Ug.GetPublicWebDavUrl(path);
            
            var pathAttrs = (JObject) processRequest(attrAPIURL + "/" + normPath);

            if ((string) pathAttrs[OD_ATTR_TYPE] == "dir")
            {
                var dirItems = new List<string>(); 

                if (normPath.Length == 0)
                {
                    foreach (JObject obj in (JArray) processRequest(spaceAPIURL))
                    {
                        var spaceURL = spaceAPIURL + "/" + (string) obj[OD_SPACE_ID];
                        var spaceInfo = (JObject) processRequest(spaceURL);
                        if (((JArray) spaceInfo[OD_SPACE_PROV]).Count() > 0)
                        {
                            dirItems.Add((string) obj[OD_SPACE_NAME]);
                        }
                    }
                }
                else
                {
                    var fileURL = fileAPIURL + "/" + normPath;
                    foreach (JObject fItem in (JArray) processRequest(fileURL))
                    {
                        dirItems.Add(Path.GetFileName((string) fItem[OD_FILE_PATH]));
                    }
                }

                dirItems.Sort();

                // Added reference to the this directory
                result.Add(new SBFile {
                    path = normPath,
                    name = ".",
                    attributes = calcFileAttrs(pathAttrs),
                    size = 0,
                    date = calcDate(pathAttrs),
                    filetype = calcFileType(pathAttrs),
                    webdavuri = WEBDAVURL + normPath + "/",
                    publicwebdavuri = publicWebdavPrefix + "/"
                });

                foreach(var fItem in dirItems)
                {
                    var filePath = normPath == "" ? fItem : normPath + "/" + fItem;
                    var fileAttrs = (JObject) processRequest(attrAPIURL + "/" + filePath);

                    result.Add(new SBFile {
                        path = normPath,
                        name = (string) fileAttrs[OD_ATTR_NAME],
                        attributes = calcFileAttrs(fileAttrs),
                        size = (ulong) fileAttrs[OD_ATTR_SIZE],
                        date = calcDate(pathAttrs),
                        filetype = calcFileType(fileAttrs),
                        webdavuri = WEBDAVURL + normPath + "/" + fItem,
                        publicwebdavuri = publicWebdavPrefix + "/" + fItem
                    });
                }
            }
            else
            {
                var fileName = (string) pathAttrs[OD_ATTR_NAME];

                result.Add(new SBFile {
                    path = Path.GetDirectoryName(path),
                    name = fileName,
                    attributes = calcFileAttrs(pathAttrs),
                    size = (ulong) pathAttrs[OD_ATTR_SIZE],
                    date = calcDate(pathAttrs),
                    filetype = calcFileType(pathAttrs),
                    webdavuri = WEBDAVURL + normPath,
                    publicwebdavuri = publicWebdavPrefix + "/" + fileName
                });
            }

            MountArea();

            return result;
        }

        public override void StoreSettings(ProviderItem pItem)
        {
            base.StoreSettings(AdjProvInfo(pItem));
        }

        public override bool DeleteSettings()
        {
            Cleanup();
            return base.DeleteSettings();
        }
        
        private static ProviderItem AdjProvInfo(ProviderItem pItem)
        {
            if (pItem.alias.Trim() == "")
            {
                int idx = pItem.accessurl.IndexOf(':');
                pItem.alias = idx > 0 ? pItem.accessurl.Substring(0, idx) : pItem.accessurl;
            }
            return pItem;
        }

        private void MountArea()
        {
            lock (initLock)
            {
                if (!checkOneclient())
                {
                    int exitcode;
                    string output;
                    if (!Directory.Exists(FILESYSTEMFOLDER))
                    {
                        output = Utils.ExecuteShell("/bin/mkdir", 
                            new[] {"-p", FILESYSTEMFOLDER}, out exitcode);
                        if (exitcode>0) Console.WriteLine(output);
                        output = Utils.ExecuteShell("/bin/chmod",
                            new[] {"777", FILESYSTEMFOLDER}, out exitcode);
                        if (exitcode>0) Console.WriteLine(output);
                    }

                    if (Environment.UserName != WEBDAV_USER)
                        output = Utils.ExecuteShell("/usr/bin/sudo",
                            new[]{ "-u", WEBDAV_USER, ONECLIENT_CMD, "--insecure",
                                "-H", this.accessURL, "-t", this.accessToken, FILESYSTEMFOLDER },
                            out exitcode);
                    else
                        output = Utils.ExecuteShell(ONECLIENT_CMD,
                            new[]{ "--insecure", "-H", this.accessURL, "-t", this.accessToken,
                                 FILESYSTEMFOLDER },
                             out exitcode);

                    if (exitcode>0) Console.WriteLine(output);
                }
            }
        }
        
        private bool checkOneclient()
        {
            
            using(var mtabReader = new StreamReader("/etc/mtab"))
            {
                string line;
                while((line = mtabReader.ReadLine()) != null)
                {
                    if (line.Contains(FILESYSTEMFOLDER)) return true;
                }
            }
            return false;
        }

        private void Cleanup()
        {
            lock (initLock)
            {
                if (checkOneclient())
                {
                    int exitcode;
                    string output;
                    if (Environment.UserName != WEBDAV_USER)
                        output = Utils.ExecuteShell("/usr/bin/sudo",
                            new[]{ "-u", WEBDAV_USER, ONECLIENT_CMD, "-u", FILESYSTEMFOLDER },
                            out exitcode);
                    else
                        output = Utils.ExecuteShell(ONECLIENT_CMD, 
                            new[]{ "-u", FILESYSTEMFOLDER },
                            out exitcode);

                    if (exitcode>0) Console.WriteLine(output);
                    
                    output = Utils.ExecuteShell("/bin/rm", 
                        new[] {"-rf", FILESYSTEMFOLDER}, out exitcode);
                    if (exitcode>0) Console.WriteLine(output);
                }
            }
        }

        private JToken processRequest(string url)
        {
            HttpWebRequest httpRequest = WebRequest.CreateHttp(url);
            httpRequest.PreAuthenticate = false;
            httpRequest.SendChunked = false;
            httpRequest.KeepAlive = false;
            httpRequest.Timeout = sockTimeout;
            httpRequest.Headers.Add("X-Auth-Token", accessToken);
            httpRequest.Method = "GET";
            try
            {
                using (var httpResponse = (HttpWebResponse) httpRequest.GetResponse())
                {
                    if (httpResponse.StatusCode != HttpStatusCode.OK)
                    {
                        throw new OnedataClientException(httpResponse.StatusCode, url);
                    }

                    var streamReader = new StreamReader(httpResponse.GetResponseStream());
                    using (var jsonReader = new JsonTextReader(streamReader))
                    {
                        return JToken.ReadFrom(jsonReader);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Cannot process request: "  + ex.Message + " " +ex.StackTrace);
                throw ex;
            }
        }

        private bool validateRemoteCertificate(object sender, X509Certificate cert, X509Chain chain,
            SslPolicyErrors policyErrors)
        {
            /*
             * TODO missing implementation
             */
            return true;
        }
        
        private FileType calcFileType(JObject infos)
        {
            var type = (string) infos[OD_ATTR_TYPE];
            var mode = (int) infos[OD_ATTR_MODE];
            
            var result = FileType.Read | FileType.Available;
            if (type == "dir") result |= FileType.Directory;
            if ((((mode % 1000) / 100) & 2) > 0) result |= FileType.Write;
            
            return result;
        }
        
        private FileAttributes calcFileAttrs(JObject infos)
        {
            var type = (string) infos[OD_ATTR_TYPE];
            return type == "dir" ? FileAttributes.Directory : FileAttributes.Normal;
        }
        
        private DateTime calcDate(JObject infos)
        {
            double offset = (double) infos[OD_ATTR_MTIME];
            DateTime origin = new DateTime(1970, 1, 1, 0, 0, 0, 0);
            return origin.AddSeconds(offset);
        }

    }
    
    public class OnedataClientException : Exception
    {
        private readonly HttpStatusCode statusCode;
        private readonly string resource;

        public OnedataClientException(HttpStatusCode code, string res) : base()
        {
            statusCode = code;
            resource = res;
        }

        public override string ToString()
        {
            return string.Format("{0}: {1}", resource, statusCode);
        }

        public override int GetHashCode()
        {
            return string.Format("{0}-{1}", resource, statusCode).GetHashCode();
        }

        public override bool Equals(object obj)
        {
            if (obj == null) return false;

            if (obj.GetType() == typeof(HttpStatusCode))
                return statusCode == (HttpStatusCode) obj;

            if (obj.GetType() == typeof(OnedataClientException))
                return statusCode == ((OnedataClientException) obj).statusCode;

            return false;
        }
    }
}
