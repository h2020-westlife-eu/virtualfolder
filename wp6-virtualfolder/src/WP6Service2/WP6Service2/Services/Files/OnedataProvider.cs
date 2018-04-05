using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Security;
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
        private readonly string accessToken;
        private readonly string oneproviderURL;
        private readonly string spaceAPIURL;
        private readonly string fileAPIURL;
        private readonly string attrAPIURL;
        
        public OnedataProvider(ProviderItem item, ISettingsStorage storage, IDbConnection connection, string authproxy)
            : base(item, storage, connection, authproxy)
        {
            accessToken = item.securetoken;
            oneproviderURL = item.accessurl;
            
            spaceAPIURL = oneproviderURL + "/api/v3/oneprovider/spaces";
            fileAPIURL = oneproviderURL + "/api/v3/oneprovider/files";
            attrAPIURL = oneproviderURL + "/api/v3/oneprovider/attributes";            
        }

        public override object GetFileOrList(string path)
        {
            // The path is <space>/<remote path> or <empty> for the root dir

            var result = new List<SBFile>();
            
            var normPath = path.Trim().Trim(new char[] {'/'});
            
            var pathAttrs = getFileDetails(normPath);

            if ((string) pathAttrs["type"] == "dir")
            {
                var dirItems = new List<string>(); 

                if (normPath.Length == 0)
                {
                    foreach (JObject obj in getAllSpaces())
                    {
                        var spaceInfo = getSpaceDetails((string) obj["spaceId"]);
                        var provList = (JArray) spaceInfo["providers"];
                        if (provList.Count() > 0)
                        {
                            dirItems.Add((string) obj["name"]);
                        }
                    }
                }
                else
                {
                    foreach (JObject fItem in getFileList(normPath))
                    {
                        dirItems.Add((string) fItem["name"]);
                    }
                }

                dirItems.Sort();

                foreach(var fItem in dirItems)
                {
                    var filePath = normPath + "/" + fItem;
                    var fileAttrs = getFileDetails(filePath);
                    result.Add(buildSBFile(filePath, fileAttrs));
                }
            }
            else
            {
                result.Add(buildSBFile(normPath, pathAttrs));
            }

            return result;
        }

        private JArray getAllSpaces()
        {
            return (JArray) processRequest(spaceAPIURL);
        }

        private JObject getSpaceDetails(string spaceId)
        {
            return (JObject) processRequest(spaceAPIURL + "/" + spaceId);
        }

        private JArray getFileList(string path)
        {
            return (JArray) processRequest(fileAPIURL + "/" + path);
        }

        private JObject getFileDetails(string path)
        {
            return (JObject) processRequest(attrAPIURL + "/" + path);
        }

        private JToken processRequest(string url)
        {
            HttpWebRequest httpRequest = (HttpWebRequest) WebRequest.Create(url);
            httpRequest.PreAuthenticate = false;
            httpRequest.SendChunked = true;
            httpRequest.Headers.Add("X-Auth-Token", accessToken);
            httpRequest.Method = "GET";
            var httpResponse = (HttpWebResponse) httpRequest.GetResponse();

            switch (httpResponse.StatusCode)
            {
                case HttpStatusCode.BadRequest:
                //TODO throw the suitable exception
                break;

                case HttpStatusCode.Forbidden:
                break;

                case HttpStatusCode.NotFound:
                break;

                case HttpStatusCode.InternalServerError:
                break;

                default:
                if (httpResponse.StatusCode != HttpStatusCode.OK)
                    throw new Exception("Unsupported code:" + httpResponse.StatusCode);
                break;
            }

            var streamReader = new StreamReader(httpResponse.GetResponseStream());
            using (var jsonReader = new JsonTextReader(streamReader))
            {
                return JToken.ReadFrom(jsonReader);
            }
        }

        private SBFile buildSBFile(string filePath, JObject jAttrs)
        {
            /*
             * TODO fix attributes and type
             */
            bool isDir = (string) jAttrs["type"] == "dir";
            FileType fType = isDir ? FileType.Directory : FileType.None;
            fType |= FileType.Read | FileType.Available;

            FileAttributes fAttrs = isDir ? FileAttributes.Directory : FileAttributes.Normal;
            
            return new SBFile
            {
                path = Path.GetDirectoryName(filePath),
                name = (string) jAttrs["name"],
                attributes = fAttrs,
                size = (ulong) jAttrs["size"],
                date = new DateTime((long) jAttrs["mtime"] * 10),
                filetype = fType,
                webdavuri = WEBDAVURL + filePath,
                publicwebdavuri = PUBLICWEBDAVURL + "/" + filePath
            };
        }

    }
}
