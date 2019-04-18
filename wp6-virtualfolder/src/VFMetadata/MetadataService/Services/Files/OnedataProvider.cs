using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
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

        /* CONFIGURATION VARIABLES */
        private readonly string WEBDAV_USER_VAR = "VF_WEBDAV_USER";
        private readonly string ONECLIENT_CMD_VAR = "VF_OCLIENT_CMD";
        private readonly string ONECLIENT_TO_VAR = "VF_OCLIENT_TIMEOUT";
        private readonly string ONECLIENT_CACERT_VAR = "VF_OCLIENT_CACERT";
        private readonly string ONECLIENT_INSECURE_VAR = "VF_OCLIENT_INSECURE";

        private readonly string accessToken;
        private readonly string accessURL;
        private readonly string spaceAPIURL;
        private readonly string fileAPIURL;
        private readonly string attrAPIURL;
        private readonly string webdavUser;
        private readonly string authUser;
        private readonly string oneclientCmd;
        private readonly string curlArgs;
        private readonly string[] mountArgs;
        
        public OnedataProvider(ProviderItem provider, ISettingsStorage storage, IDbConnection connection)
            : base(provider, storage, connection)
        {
            WEBDAVURL = UrlGenerator.Webdavroot + provider.loggeduser + "/" + provider.alias + "/";
            accessToken = provider.securetoken;
            accessURL = provider.accessurl;

            var tmps = Environment.GetEnvironmentVariable(WEBDAV_USER_VAR);
            webdavUser = string.IsNullOrWhiteSpace(tmps) ? "apache" : tmps;
            authUser = provider.loggeduser;

            tmps = Environment.GetEnvironmentVariable(ONECLIENT_CMD_VAR);
            oneclientCmd = string.IsNullOrWhiteSpace(tmps) ? "/usr/bin/oneclient" : tmps;

            tmps = Environment.GetEnvironmentVariable(ONECLIENT_TO_VAR);
            var timeoutstr = string.IsNullOrWhiteSpace(tmps) ? "60" : tmps;
            string caCertFile = Environment.GetEnvironmentVariable(ONECLIENT_CACERT_VAR);
            tmps = Environment.GetEnvironmentVariable(ONECLIENT_INSECURE_VAR);
            var isInsecure = !string.IsNullOrWhiteSpace(tmps) && tmps.ToLower().Equals("true");


            StringBuilder argBuilder = new StringBuilder();
            argBuilder.Append("--tlsv1.2 ");
            if (isInsecure)
            {
                argBuilder.Append("--insecure ");
            }
            else if (!string.IsNullOrWhiteSpace(caCertFile))
            {
                argBuilder.Append("--cacert ").Append(caCertFile).Append(" ");
            }
            argBuilder.Append("-H \"X-Auth-Token: {0}\" ");
            argBuilder.Append("--connect-timeout ").Append(timeoutstr).Append(" ");
            argBuilder.Append("{1}");
            curlArgs = argBuilder.ToString();

            spaceAPIURL = string.Format("https://{0}/api/v3/oneprovider/spaces", provider.accessurl);
            fileAPIURL = string.Format("https://{0}/api/v3/oneprovider/files", provider.accessurl);
            attrAPIURL = string.Format("https://{0}/api/v3/oneprovider/attributes", provider.accessurl);

            ArrayList mountList = new ArrayList();
            if (authUser != webdavUser)
            {
                mountList.Add("-u");
                mountList.Add(webdavUser);
                mountList.Add(oneclientCmd);
            }
            if (isInsecure)
            {
                mountList.Add("--insecure");
            }
            mountList.Add("-H");
            mountList.Add(this.accessURL);
            mountList.Add("-t");
            mountList.Add(this.accessToken);
            mountList.Add(FILESYSTEMFOLDER);
            mountArgs = mountList.ToArray(typeof(string)) as string[];

            MountArea();
            Console.WriteLine("Initiated Onedata Provider with user " + provider.loggeduser);
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

        public override bool DeleteSettings()
        {
            Cleanup();
            return base.DeleteSettings();
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

                    if (authUser != webdavUser)
                        output = Utils.ExecuteShell("/usr/bin/sudo", mountArgs, out exitcode);
                    else
                        output = Utils.ExecuteShell(oneclientCmd, mountArgs, out exitcode);

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
                    if (authUser != webdavUser)
                        output = Utils.ExecuteShell("/usr/bin/sudo",
                            new[]{ "-u", webdavUser, oneclientCmd, "-u", FILESYSTEMFOLDER },
                            out exitcode);
                    else
                        output = Utils.ExecuteShell(oneclientCmd, 
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
            try
            {
                var psi = new ProcessStartInfo
                {
                    FileName = "curl",
                    Arguments = string.Format(curlArgs, accessToken, url),
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = false,
                };

Console.WriteLine("Command line: " + string.Format(curlArgs, "****", url));
                using (var curlProc = Process.Start(psi))
                {
                    curlProc.WaitForExit();
                    
                    if (curlProc.ExitCode > 0)
                    {
                        Console.WriteLine(curlProc.StandardError.ReadToEnd());
                        throw new Exception("curl error code " + curlProc.ExitCode);
                    }

                    using (var jsonReader = new JsonTextReader(curlProc.StandardOutput))
                    {
                        return JToken.ReadFrom(jsonReader);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Cannot process request: "  + ex.Message + " " +ex.StackTrace);
                Console.WriteLine("Command line: " + string.Format(curlArgs, "****", url));
                throw ex;
            }
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
    
}
