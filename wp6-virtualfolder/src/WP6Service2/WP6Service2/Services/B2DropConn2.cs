using System;
using System.IO;
using System.Diagnostics;
using System.Net;
using ServiceStack;
using DecaTec.WebDav;

namespace WP6Service2
{
	[Route("/b2dropconnector")]
	public class B2DropConnector2
	{
		public bool connected { get; set;}
		public String address { get; set; }
		public String username { get; set;}		
		public String securetoken {get;set;}
		public String output { get; set; }
	}
	public class B2DropConnector2Service : Service
	{
		public object Get(B2DropConnector2 request) 
		{

			return new B2DropConnector2 (){ connected = GetB2DropStatus() };
		}

		private bool connected = false;

		public object Post(B2DropConnector2 request)
		{
			try {
			// Specify the user credentials and use it to create a WebDavSession instance.
			var credentials = new NetworkCredential(request.username, request.securetoken);
			var webDavSession = new WebDavSession("https://b2drop.eudat.eu/remote.php/webdav", credentials);
			if (Environment.GetEnvironmentVariable ("http_proxy")!=null) {
				WebProxy proxy = new WebProxy ();
				proxy.Address = new Uri (Environment.GetEnvironmentVariable ("http_proxy"));
				webDavSession.WebProxy = proxy;
			}
			var items = webDavSession.ListAsync(@"/").Result;

			foreach (var item in items)
			{
				Console.WriteLine(item.Name);
			}

			request.connected = connected;
			} catch (Exception e) {
				request.connected = false;
				request.output = e.Message; 
			}
			return request;
		}

		private bool GetB2DropStatus(){

			return connected;
		}
	}
/*	public class B2DropConnector2Service : Service
	{
		public object Get(B2DropConnector2 request) 
		{

			return new B2DropConnector2 (){ connected = GetB2DropStatus() };
		}
		private Client client;

		private bool connected = false;

		public object Post(B2DropConnector2 request)
		{
			client = new WebDAVClient.Client(new NetworkCredential { UserName = request.username , Password = request.securetoken});
			client.Server = "https://b2drop.eudat.eu/remote.php/webdav";
			client.BasePath = "/";
			var result = client.List().Result;

			request.connected = connected;
			return request;
		}

		private bool GetB2DropStatus(){

			return connected;
		}
	}
	*/
	/*public class B2DropConnector2Service : Service
	{
		public object Get(B2DropConnector2 request) 
		{
			
			return new B2DropConnector2 (){ connected = GetB2DropStatus() };
		}
		private WebDavClient webDavClient;

		private bool connected = false;

		public object Post(B2DropConnector2 request)
		{
			if (request.address==null)
				request.address = "http://b2drop.eudat.eu/remote.php/webdav";
			
			var clientParams = new WebDavClientParams
			{				
				BaseAddress = new Uri(request.address),
				Credentials = new NetworkCredential(request.username,request.securetoken)
			};
			webDavClient = new WebDavClient (clientParams);
			var result = webDavClient.Propfind ("/");
			if (!result.IsFaulted) {
				connected = true;
				request.output = "";
				var resources = result.Result.Resources;
				foreach(var res in resources){

					request.output += res.DisplayName+" ";
				}
			} else {
				connected = false;
			}
				// handle an error
			//Console.WriteLine(strOutput);
			request.connected = connected;
			return request;
		}

		private bool GetB2DropStatus(){
			
			return connected;
		}
	}*/

}

