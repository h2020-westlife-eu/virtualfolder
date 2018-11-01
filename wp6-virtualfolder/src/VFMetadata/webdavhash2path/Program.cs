using System;
using System.IO;
using System.Text;
using System.Net.Http;
using MetadataService.Services.Settings;

namespace webdavhash2path
{
    internal class Program    
    {
        private static string VF_CPVAR = "VF_CONTEXTPATH";
        private static string VF_PVAR = "VF_PORT";
        public static string contextpath = Environment.GetEnvironmentVariable(VF_CPVAR) != null
            ? Environment.GetEnvironmentVariable(VF_CPVAR)
            : "/virtualfolder/api/";
        public static string port = Environment.GetEnvironmentVariable(VF_PVAR) != null
            ? Environment.GetEnvironmentVariable(VF_PVAR)
            : "8001";
        
        /* console application, on input it accepts encoded path, output is decoded path or NULL in case of error
         * can be used as Apache prg:... filter
         */
        
        public static void Main(string[] args)
        {
            String encpath,path;
            Stream st;
            
            while (true)
            {
                encpath = Console.ReadLine();
                st = Console.OpenStandardOutput();
                try
                {
                    path = SettingsStorageInDB.getdecryptedpath(encpath) + System.Environment.NewLine;
                    st.Write(Encoding.ASCII.GetBytes(path),0,path.Length);
                    //ping service - if not mounted/initialized it will initialize it
                    pingrestapi(path);
                }
                catch (Exception e)
                {                    
                    st.Write(Encoding.ASCII.GetBytes("NULL\n"),0,5);                    
                    Console.Error.WriteLine("error catched:"+e.Message);
                }
            }
        }

        /* Will send HTTP HEAD request to api/files/resourcepath in order to prepare the file for further download
         * this will trigger actions on metadataservice level, if the storage is not mounted, it will be mounted etc.
         */
        private static void pingrestapi(string path)
        {
            HttpClient httpClient = new HttpClient();
            string [] pathelements = path.Split(new char[]{'/'}, 2,StringSplitOptions.None);

            HttpRequestMessage request = 
                new HttpRequestMessage(HttpMethod.Head, 
                    new Uri("http://localhost:"+port+contextpath+"files/"+pathelements[1]));
            request.Headers.Add("X-USERNAME", pathelements[0]);
            httpClient.SendAsync(request);
            //don't wait for response
        }
    }
}