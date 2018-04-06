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
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;


namespace MetadataService.Services.Files
{
    public class OnedataProviderCreator : IProviderCreator
    {
        public AFileProvider CreateProvider(ProviderItem item, ISettingsStorage storage, IDbConnection connection,
            string authproxy)
        {
            return new OnedataProvider(item, storage, connection, authproxy);
        }
    }

    public class OnedataProvider : AFileProvider
    {
        /* JSON parameters from attribute API */
        private readonly string OD_ATTR_MTIME = "mtime";
        private readonly string OD_ATTR_NAME = "name";
        private readonly string OD_ATTR_SIZE = "size";
        private readonly string OD_ATTR_TYPE = "type";

        /* JSON parameters from file API */
        private readonly string OD_FILE_PATH = "path";

        /* JSON parameters from space API */
        private readonly string OD_SPACE_ID = "spaceId";
        private readonly string OD_SPACE_NAME = "name";
        private readonly string OD_SPACE_PROV = "providers";

        private readonly int sockTimeout = 60000;

        private readonly string accessToken;
        private readonly string spaceAPIURL;
        private readonly string fileAPIURL;
        private readonly string attrAPIURL;
        
        public OnedataProvider(ProviderItem item, ISettingsStorage storage, IDbConnection connection, string authproxy)
            : base(item, storage, connection, authproxy)
        {
            accessToken = item.securetoken;
            
            spaceAPIURL = "https://" + item.accessurl + "/api/v3/oneprovider/spaces";
            fileAPIURL = "https://" + item.accessurl + "/api/v3/oneprovider/files";
            attrAPIURL = "https://" + item.accessurl + "/api/v3/oneprovider/attributes";            

            ServicePointManager.ServerCertificateValidationCallback = validateRemoteCertificate;
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls;
        }

        public override object GetFileOrList(string path)
        {
            // The path is <space>/<remote path> or <empty> for the root dir

            var result = new List<SBFile>();
            
            var normPath = path.Trim().Trim(new char[] {'/'});
            
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

                foreach(var fItem in dirItems)
                {
                    var filePath = normPath + "/" + fItem;
                    var fileAttrs = (JObject) processRequest(attrAPIURL + "/" + filePath);
                    result.Add(buildSBFile(filePath, fileAttrs));
                }
            }
            else
            {
                result.Add(buildSBFile(normPath, pathAttrs));
            }

            return result;
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
            using (var httpResponse = (HttpWebResponse) httpRequest.GetResponse())
            {
                if (httpResponse.StatusCode != HttpStatusCode.OK)
                    throw new OnedataClientException(httpResponse.StatusCode, url);

                var streamReader = new StreamReader(httpResponse.GetResponseStream());
                using (var jsonReader = new JsonTextReader(streamReader))
                {
                    return JToken.ReadFrom(jsonReader);
                }
            }
        }

        private SBFile buildSBFile(string filePath, JObject jAttrs)
        {
            /*
             * TODO fix attributes and type
             */
            bool isDir = (string) jAttrs[OD_ATTR_TYPE] == "dir";
            FileType fType = isDir ? FileType.Directory : FileType.None;
            fType |= FileType.Read | FileType.Available;

            FileAttributes fAttrs = isDir ? FileAttributes.Directory : FileAttributes.Normal;
            
            return new SBFile
            {
                path = Path.GetDirectoryName(filePath),
                name = (string) jAttrs[OD_ATTR_NAME],
                attributes = fAttrs,
                size = (ulong) jAttrs[OD_ATTR_SIZE],
                date = new DateTime((long) jAttrs[OD_ATTR_MTIME] * 10),
                filetype = fType,
                webdavuri = WEBDAVURL + filePath,
                publicwebdavuri = PUBLICWEBDAVURL + "/" + filePath
            };
        }

        private bool validateRemoteCertificate(object sender, X509Certificate cert, X509Chain chain,
            SslPolicyErrors policyErrors)
        {
            /*
             * TODO missing implementation
             */
            return true;
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
