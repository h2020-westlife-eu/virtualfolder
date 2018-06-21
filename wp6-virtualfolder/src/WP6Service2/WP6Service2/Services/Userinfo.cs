
using System;
using MetadataService.Services.Files;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;
using ServiceStack.ServiceInterface.Cors;

namespace WP6Service2
{
	[Route("/userinfo")]
	public class Userinfo {
	}

	public class UserinfoResponse {
		public string username { get; set; }
		public string name { get; set; }
	}

    [EnableCors(allowCredentials:true)]
    [VreCookieRequestFilter]
    public class UserinfoService : Service
	{
		public object Any(Userinfo request)
		{
			try
			{
				return new UserinfoResponse {username = (string) Request.Items["userid"], name = (string) Request.Items["name"]};
			}
			catch (Exception e)
			{
				Console.WriteLine(e.Message+" "+e.StackTrace);
				throw e;
			}
		}
	}

}

