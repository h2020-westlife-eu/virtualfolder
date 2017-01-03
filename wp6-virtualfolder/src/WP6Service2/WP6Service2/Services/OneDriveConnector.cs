using System;
using System.IO;
using System.Diagnostics;
using ServiceStack;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;

namespace WP6Service2
{
    [Route("/onedriveconnector")]
    public class OneDriveConnector : DropboxConnector
    {
    }
    public class OneDriveConnectorService : Service//: DropboxConnectorService
    {
        /* Gets the status of the connection true or false
         */
        public object Get(OneDriveConnector request)
        {
            return new OneDriveConnector(){ connected = GetDropboxStatus() };
        }

        String B2DROPDIR= "/home/vagrant/work/onedrive";
        public static string DROPBOXSECRET = "/home/vagrant/.westlife/onedrivesecrets";

        /* takes username and securetoken to launch script for mounting b2drop
         * returns whether it's connectect or not
         */

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

        public object Delete(OneDriveConnector request)
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
