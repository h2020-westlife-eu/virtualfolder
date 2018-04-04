﻿using System;
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


/*
 * The path is <oneprovider hostname>/<space>/<remote path>
 * The directory <oneprovider hostname> is the mount point created in the WebDAV area
 */

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
        
        private Dictionary<string, string> spaceTable;

        public OnedataProvider(ProviderItem item, ISettingsStorage storage, IDbConnection connection, string authproxy)
            : base(item, storage, connection, authproxy)
        {
            accessToken = item.securetoken;
            oneproviderURL = item.accessurl;
            
            spaceAPIURL = oneproviderURL + "/api/v3/oneprovider/spaces";
            fileAPIURL = oneproviderURL + "/api/v3/oneprovider/files";
            attrAPIURL = oneproviderURL + "/api/v3/oneprovider/attributes";
            
            spaceTable = getSpaces();
        }

        public override object GetFileOrList(string path)
        {
            var result = new List<SBFile>();

            var pathTokens = path.Split(new char[] {'/'});
            if (pathTokens.Length == 0 || ! spaceTable.ContainsKey(pathTokens[0]))
            {
                throw new Exception("Missing or wrong space: " + pathTokens[0]);
            }

            var pathAttrs = (JObject) processRequest(attrAPIURL + "/" + path);
            var pathType = (string) pathAttrs["type"];
            if (pathType == "dir")
            {

                foreach (JObject fItem in (JArray) processRequest(fileAPIURL + "/" + path))
                {
                }

            } else {
            }

            return result;
        }

        private Dictionary<string, string> getSpaces()
        {
            var result = new Dictionary<string, string>();

            foreach (JObject obj in (JArray) processRequest(spaceAPIURL))
            {
                var spaceId = (string) obj["spaceId"];
                var spaceName = (string) obj["name"];
                var spaceInfo = (JObject) processRequest(spaceAPIURL + "/" + spaceId);
                var provList = (JArray) spaceInfo["providers"];
                if (provList.Count() > 0)
                {
                    result.Add(spaceName, spaceId);
                }
            }

            return result;
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
    }
}