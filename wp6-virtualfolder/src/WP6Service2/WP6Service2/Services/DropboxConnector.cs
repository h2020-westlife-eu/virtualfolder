using System;
using System.IO;
using System.Diagnostics;
using ServiceStack;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;

namespace WP6Service2
{
	[Route("/dropboxconnector")]
	public class DropboxConnector
	{
		public bool connected { get; set;}
		public String securetoken {get;set;}
		public String output { get; set; }
	}
	public class DropboxConnectorService : Service
	{
		/* Gets the status of the connection true or false
		 */
		public object Get(DropboxConnector request) 
		{
			return new DropboxConnector (){ connected = GetDropboxStatus() };
		}

		String B2DROPDIR= "/home/vagrant/work/dropbox";
	    public static string DROPBOXSECRET = "/home/vagrant/.westlife/dropboxsecrets";

	    /* takes username and securetoken to launch script for mounting b2drop
         * returns whether it's connectect or not
         */
		public object Post(DropboxConnector request)
		{
			using (StreamWriter outputFile = new StreamWriter(DROPBOXSECRET)) {
				outputFile.WriteLine(request.securetoken);
			    DropBoxFS.accesstoken = request.securetoken;
			    request.connected = true;
			}
			return request;
		}

	    public static string ReadSecureToken()
	    {
	        String accesstoken="";
	        try
	        {
	            using (StreamReader inputFile = new StreamReader(DROPBOXSECRET))
	            {
	                accesstoken = inputFile.ReadLine();
	            }
	        }
	        catch (Exception e)
	        {//file doesn exist or something else
	            Console.WriteLine("INFO:"+e.Message);
	        }
	        return accesstoken;
	    }

	    public object Delete(DropboxConnector request)
	    {
	        request.connected = false;
	        File.Delete(DROPBOXSECRET);
	        return request;
	    }

		private bool GetDropboxStatus()
		{
		    return File.Exists(DROPBOXSECRET);
		}
	}
}

