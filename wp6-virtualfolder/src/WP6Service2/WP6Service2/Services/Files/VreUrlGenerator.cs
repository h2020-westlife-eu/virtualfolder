using System;
using System.Net;
using Dropbox.Api.TeamLog;
using MetadataService.Services.Settings;
using ServiceStack.ServiceClient.Web;
using ServiceStack.ServiceHost;

namespace MetadataService.Services.Files
{
    public class VreUrlGenerator : UrlGenerator
    {
        private const string _API_URL_VARIABLE_NAME = "VF_VRE_API_URL";
        private const string _httpLocalhostApi = "http://localhost/api/";
        private readonly string _vreapiurl = Environment.GetEnvironmentVariable(_API_URL_VARIABLE_NAME) != null
            ? Environment.GetEnvironmentVariable(_API_URL_VARIABLE_NAME)
            : _httpLocalhostApi;
        private const string _authproxyserviceurl = "authproxy/get_signed_url/";        

        public override string GetRootWebDavUrl()
        {
            // e.g. /firstanme.surname@myaccount/webdav/b2drop will be mapped based
            // to user's dirs by apache conf and vre checks authorization
            return Webdavroot + provider.loggeduser + "/" + provider.alias + "/";            
        }

        public override string GetRootPublicWebDavUrl()
        {
            return Webdavroot + authproxy;
//                SettingsStorageInDB.getencryptedpath(
//                    provider.loggeduser + "/" + provider.alias); // contains encrypted path of user            
        }


        public override string GetPublicWebDavUrl(string path)
        {
            return Webdavroot + authproxy+ path;
        }

        private string authproxy;
        public VreUrlGenerator(ProviderItem p) : base(p)
        {
                                 
        }

        private string GetAuthProxy(string _sessionid, string _domain)
        {
            var client = new JsonServiceClient(_vreapiurl);
            try
            {
                client.CookieContainer = new CookieContainer();
                client.CookieContainer.Add(new Cookie("sessionid", _sessionid) {Domain = _domain});
                var response = client.Get<DjangoAuthproxyInfo>(_authproxyserviceurl);
                return response.signed_url;
            }
            catch (Exception e) //
            {
                Console.WriteLine("error during getting authproxy info of sessionid " + _sessionid + " domain " +
                                  _domain + " \n" + e.Message + e.StackTrace);
                return "NULL";
            }                
        }

        public override void HandleRequest(IHttpRequest req)
        {
            try
            {
                if (authproxy == "") authproxy = GetAuthProxy(req.Cookies["sessionid"].Value, req.GetUrlHostName());
            }
            catch (Exception e)
            {
                Console.WriteLine("error during handling request "+e.Message + e.StackTrace);
                authproxy = "NULL";
            }
        }
    }
}