using System;
using System.Collections.Generic;
using ServiceStack.ServiceClient.Web;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;

namespace WP6Service2.Services.Files
{
    public class VreCookieRequestFilterAttribute : RequestFilterAttribute
    {
        private Dictionary<string, string> sessionuser = new Dictionary<string, string>();
        private const string _API_URL_VARIABLE_NAME = "VF_VRE_API_URL";
        private const string _httpLocalhostApi = "http://localhost:8004/api/";
        private const string _sessionserviceurl = "vfsession/";

        private readonly string _vreapiurl = Environment.GetEnvironmentVariable(_API_URL_VARIABLE_NAME)!=null?
            Environment.GetEnvironmentVariable(_API_URL_VARIABLE_NAME):
            _httpLocalhostApi;



        public override void Execute(IHttpRequest req, IHttpResponse res, object requestDto)
        {
            //get sessionid from cookie
            var mysession = req.Cookies["sessionid"];

            //get user info related to session id fromVRE
            var loggeduser = GetAssociatedUser(mysession.Value);

            //Console.WriteLine("Provider Service list"+loggeduser);
            //TODO get the providers associated to user
            req.Items.Add("userid",loggeduser);
            if (requestDto.GetType() == typeof(ProviderItem))
                ((ProviderItem) requestDto).loggeduser = loggeduser;
            //throw new NotImplementedException();
        }

        private string GetAssociatedUser(String sessionid)
        {
            if (sessionuser.ContainsKey(sessionid)) return sessionuser[sessionid];
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
    }
}