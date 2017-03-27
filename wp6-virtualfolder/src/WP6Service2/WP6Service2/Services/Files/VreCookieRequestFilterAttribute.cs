using System;
using System.Collections.Generic;
using ServiceStack.ServiceClient.Web;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;
using System.Net.Security;
using System.Net;
using System.Security.Cryptography.X509Certificates;

namespace MetadataService.Services.Files
{
    public class VreCookieRequestFilterAttribute : RequestFilterAttribute
    {
        static VreCookieRequestFilterAttribute()
        {
            ServicePointManager.ServerCertificateValidationCallback +=
                new RemoteCertificateValidationCallback(ValidateRemoteCertificate);
        }

        private Dictionary<string, string> sessionuser = new Dictionary<string, string>();
        private Dictionary<string, string> sessionauthproxy = new Dictionary<string, string>();
        private const string _API_URL_VARIABLE_NAME = "VF_VRE_API_URL";
        private const string _httpLocalhostApi = "http://localhost:8004/api/";
        private const string _sessionserviceurl = "vfsession/";
        private const string _authproxyserviceurl = "authproxy/";

        private readonly string _vreapiurl = Environment.GetEnvironmentVariable(_API_URL_VARIABLE_NAME)!=null?
            Environment.GetEnvironmentVariable(_API_URL_VARIABLE_NAME):
            _httpLocalhostApi;




        public override void Execute(IHttpRequest req, IHttpResponse res, object requestDto)
        {
            //get sessionid from cookie
            var mysession = req.Cookies["sessionid"];

            //get user info related to session id fromVRE
            if (mysession == null) return; //no cookie set - return
            var loggeduser = GetAssociatedUser(mysession.Value);
            var authproxy = GetAuthProxy(mysession.Value);

            //Console.WriteLine("Provider Service list"+loggeduser);
            //TODO get the providers associated to user
            req.Items.Add("userid",loggeduser);
            if (requestDto.GetType() == typeof(ProviderItem))
            {
                ((ProviderItem) requestDto).loggeduser = loggeduser;
            }
            req.Items.Add("authproxy",authproxy);
            //throw new NotImplementedException();
        }

        private string GetAssociatedUser(String sessionid)
        {
            if (sessionuser.ContainsKey(sessionid)) return sessionuser[sessionid];
            //fix check server certificate - certificates probably not installed for MONO environment
            var client = new JsonServiceClient(_vreapiurl);
            try
            {
                var response = client.Get<DjangoUserInfo>(_sessionserviceurl + sessionid);
                sessionuser[sessionid] = response.username;
                Console.WriteLine("sessionid "+sessionid+" belongs to "+response.username);
                return response.username;
            }
            catch (Exception e)
            {
                Console.WriteLine("error during getting user info of sessionid "+sessionid+" "+ e.Message+e.StackTrace);
                return "";
            }
        }

        private string GetAuthProxy(String sessionid)
        {
            if (sessionauthproxy.ContainsKey(sessionid)) return sessionauthproxy[sessionid];
            //fix check server certificate - certificates probably not installed for MONO environment
            var client = new JsonServiceClient(_vreapiurl);
            try
            {
                client.CookieContainer.Add(new Cookie("sessionid",sessionid));
                var response = client.Get<DjangoAuthproxyInfo>(_authproxyserviceurl);
                sessionauthproxy[sessionid] = response.authproxy;
                Console.WriteLine("authproxy "+response.authproxy);
                return response.authproxy;
            }
            catch (Exception e)
            {
                Console.WriteLine("error during getting authproxy info of sessionid "+sessionid+" "+ e.Message+e.StackTrace);
                return "";
            }
        }


        private static bool ValidateRemoteCertificate(object sender, X509Certificate cert, X509Chain chain, SslPolicyErrors policyErrors)
        {
            //check subject for portal.west-life.eu 
            return false || cert.Subject.ToLower().Contains("portal.west-life.eu");
        }
    }
}