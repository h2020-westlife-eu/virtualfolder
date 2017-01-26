using System;
using System.Collections.Generic;
using ServiceStack.ServiceClient.Web;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;

namespace WP6Service2
{
    public class VreCookieRequestFilterAttribute : RequestFilterAttribute
    {

        public override void Execute(IHttpRequest req, IHttpResponse res, object requestDto)
        {
            //get sessionid from cookie
            var mysession = req.Cookies["sessionid"];

            //get user info related to session id fromVRE
            var loggeduser = GetAssociatedUser(mysession.Value);

            //Console.WriteLine("Provider Service list"+loggeduser);
            //TODO get the providers associated to user
            req.Items.Add("loggeduser",loggeduser);
            //throw new NotImplementedException();
        }

        private Dictionary<string, string> sessionuser = new Dictionary<string, string>();

        private string GetAssociatedUser(String sessionid)
        {
            if (sessionuser.ContainsKey(sessionid)) return sessionuser[sessionid];
            var client = new JsonServiceClient("http://localhost:8004/api/");
            try
            {
                var response = client.Get<DjangoUserInfo>("vfsession/" + sessionid);
                sessionuser[sessionid] = response.username;
                return response.username;
            }
            catch (Exception e)
            {
                Console.WriteLine("error during getting user info of sessionid "+e.Message+e.StackTrace);
                return "";
            }

        }

    }
}