using System;
using System.Collections.Generic;
using System.Data;
using System.Net;
using System.Net.Security;
using System.IO;
using System.Text;
using MetadataService.Services.Settings;

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
        enum RestType : uint { GET_TYPE, POST_TYPE, PUT_TYPE, DEL_TYPE };
        
        private readonly string accessToken;
        private readonly string oneproviderHost;

        public OnedataProvider(ProviderItem item, ISettingsStorage storage, IDbConnection connection, string authproxy)
            : base(item, storage, connection, authproxy)
        {
            accessToken = item.securetoken;
            oneproviderHost = item.accessurl;
        }

        public override object GetFileOrList(string Path)
        {
            var result = new List<SBFile>();
            return result;
        }
        
        private void sendRequest(RestType type, string url, string content)
        {
            HttpWebRequest httpRequest = (HttpWebRequest) WebRequest.Create(url);
            httpRequest.PreAuthenticate = false;
            httpRequest.SendChunked = true;

            switch (type)
            {
                case RestType.GET_TYPE:
                httpRequest.Method = "GET";
                
                break;

                case RestType.POST_TYPE:
                case RestType.PUT_TYPE:
                httpRequest.Method = type == RestType.POST_TYPE ? "POST" : "PUT";
                httpRequest.ContentLength = content.Length;
                
                Stream requestStream = httpRequest.GetRequestStream();
                requestStream.Write(Encoding.UTF8.GetBytes((string) content),0, content.Length);
                requestStream.Close();

                break;
                
                case RestType.DEL_TYPE:
                httpRequest.Method = "DELETE";
                break;

            }

            HttpWebResponse httpResponse =
                (HttpWebResponse) httpRequest.GetResponse();
        }
    }
}
