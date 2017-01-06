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
/** deprecated */
	public class DropboxConnectorService : Service
	{
		/* Gets the status of the connection true or false
		 */
		public object Get(DropboxConnector request) 
		{
			return new DropboxConnector (){ connected = GetDropboxStatus() };
		}

		String B2DROPDIR= "/home/vagrant/work/dropbox";

	    /* takes username and securetoken to launch script for mounting b2drop
         * returns whether it's connectect or not
         */
		public object Post(DropboxConnector request)
		{
			using (StreamWriter outputFile = new StreamWriter(DropBoxFile.DROPBOXSECRET)) {
				outputFile.WriteLine(request.securetoken);
			    DropBoxFS.accesstoken = request.securetoken;
			    DropBoxFS.Initialize();
			    request.connected = true;
			}
			return request;
		}

	    public object Delete(DropboxConnector request)
	    {
	        request.connected = false;
	        File.Delete(DropBoxFile.DROPBOXSECRET);
	        return request;
	    }

		private bool GetDropboxStatus()
		{
		    return File.Exists(DropBoxFile.DROPBOXSECRET);
		}
	}

    public static class DropBoxFile
    {
        public static string DROPBOXSECRET = "/home/vagrant/.westlife/dropboxsecrets";
        public static string ReadSecureToken()
        {
            //Console.WriteLine("INFO:reading secure token");
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
            //Console.WriteLine("INFO: accesstoken "+accesstoken);
            return accesstoken;
        }

    }
}

