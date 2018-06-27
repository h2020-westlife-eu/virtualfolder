using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using ServiceStack.ServiceClient.Web;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;

namespace MetadataService.Services.Files
{
    /** This filter adds these items into request.Items, so they could be used by subsequent service
    *    'userid': contains unique id of user (e.g. username or email address)
    *    'authproxy': contains hash which can be used to generate unique URL available without authentication to access files
    *    These items are obtained from subsequent VRE process via API  
    */
    public class VreCookieRequestFilterAttribute : RequestFilterAttribute
    {
        private const string _API_URL_VARIABLE_NAME = "VF_VRE_API_URL";
        private const string _httpLocalhostApi = "http://localhost/api/";
        private const string _sessionserviceurl = "vfsession/";
//        private const string _authproxyserviceurl = "authproxy/get_signed_url/";

        private static readonly Dictionary<string, string> sessionuser = new Dictionary<string, string>();
//        private static readonly Dictionary<string, string> sessionauthproxy = new Dictionary<string, string>();
        private static readonly object initlock = new object();
        

        private readonly string _vreapiurl = Environment.GetEnvironmentVariable(_API_URL_VARIABLE_NAME) != null
            ? Environment.GetEnvironmentVariable(_API_URL_VARIABLE_NAME)
            : _httpLocalhostApi;

        static VreCookieRequestFilterAttribute()
        {
           
            ServicePointManager.ServerCertificateValidationCallback +=
                ValidateRemoteCertificate;
        }


        public override void Execute(IHttpRequest req, IHttpResponse res, object requestDto)
        {
            lock (initlock)
            {
                //get sessionid from cookie
                Cookie mysession;
                //Cookie myaaisession;
                try
                {
                    mysession = req.Cookies["sessionid"];
                }
                catch (KeyNotFoundException
                ) //no cookie set - either needs to log in or in single user deployment - it is vagrant user
                {
                    mysession = new Cookie {Value = "west-life_vf_insecure_session_id"};
                }

                try
                {
                    var mellonuser = req.Headers.Get("X-USERNAME");
                    if (!string.IsNullOrEmpty(mellonuser))
                    {
                        req.Items.Add("userid", mellonuser);
                        req.Items.Add("name", req.Headers.Get("X-NAME"));
                        req.Items.Add("email", req.Headers.Get("X-EMAIL"));
                        req.Items.Add("groups", req.Headers.Get("X-GROUPS"));
                        //req.Items.Add("authproxy", "/webdav/" + mellonuser);
                        if (requestDto.GetType() == typeof(ProviderItem))
                            ((ProviderItem) requestDto).loggeduser = mellonuser;
                        return;
                    }
                } catch (KeyNotFoundException) {//ignore this
                }

                if (mysession == null) return; //no cookie set - return

                //get user info related to session id fromVRE
                var loggeduser = GetAssociatedUser(mysession.Value);
                //var authproxy = GetAuthProxy(mysession.Value, req.GetUrlHostName());

                //Console.WriteLine("Provider Service list"+loggeduser);
                //TODO get the providers associated to user
                req.Items.Add("userid", loggeduser);
                req.Items.Add("name", loggeduser);
                if (requestDto.GetType() == typeof(ProviderItem))
                    ((ProviderItem) requestDto).loggeduser = loggeduser;
                //req.Items.Add("authproxy", authproxy);
            }
        }

        private string GetAssociatedUser(string sessionid)
        {
            if (sessionuser.ContainsKey(sessionid)) return sessionuser[sessionid];
            
            //fix check server certificate - certificates probably not installed for MONO environment
            var client = new JsonServiceClient(_vreapiurl);
            try
            {
                var response = client.Get<DjangoUserInfo>(_sessionserviceurl + sessionid);
                sessionuser[sessionid] = response.username;
                Console.WriteLine("sessionid " + sessionid + " belongs to " + response.username);
                return response.username;
            }
            catch (Exception e)
            {
                Console.WriteLine("error during getting user info of sessionid " + sessionid + " " + e.Message +
                                  e.StackTrace);
                return "";
            }
        }
/*
        private string GetAuthProxy(string sessionid, string domain)
        {
            if (sessionauthproxy.ContainsKey(sessionid))
                return sessionauthproxy[sessionid];
            //fix check server certificate - certificates probably not installed for MONO environment
            var client = new JsonServiceClient(_vreapiurl);
            try
            {
                client.CookieContainer = new CookieContainer();
                client.CookieContainer.Add(new Cookie("sessionid", sessionid) {Domain = domain});
                var response = client.Get<DjangoAuthproxyInfo>(_authproxyserviceurl);
                sessionauthproxy[sessionid] = response.signed_url;
                Console.WriteLine("authproxy " + response.signed_url);
                return response.signed_url;
            }
            catch (Exception e) //
            {
                //on local deployment - authproxy url can be same as sessionuser
                if (sessionuser.ContainsKey(sessionid))
                {
                    Console.WriteLine("Setting temporary authproxy for sessionid " + sessionid);
                    sessionauthproxy[sessionid] = sessionuser[sessionid];
                    return sessionauthproxy[sessionid];
                }
                else
                {
                    Console.WriteLine("error during getting authproxy info of sessionid " + sessionid + " domain " +
                                      domain + " \n" + e.Message + e.StackTrace);
                    return "";
                }
            }
        }
*/

        private static bool ValidateRemoteCertificate(object sender, X509Certificate cert, X509Chain chain,
            SslPolicyErrors policyErrors)
        {
            //check subject for portal.west-life.eu on portal deployment it raises SslPolicyError
            if (cert.Subject.Contains("portal.west-life.eu"))
                //Console.WriteLine(policyErrors);
                return true;
            else
                return policyErrors == SslPolicyErrors.None; 
            
        }
    }
}