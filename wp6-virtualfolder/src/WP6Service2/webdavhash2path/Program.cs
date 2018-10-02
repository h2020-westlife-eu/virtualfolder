using System;
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
        public static void Main(string[] args)
        {
            while (true)
            {
                var encpath = Console.ReadLine();
                var st = Console.OpenStandardOutput();
                try
                {
                    var path = SettingsStorageInDB.getdecryptedpath(encpath) + System.Environment.NewLine;
                    st.Write(Encoding.ASCII.GetBytes(path),0,path.Length);
                    //ping service - if not mounted/initialized it will initialize it
                    pingrestapi(path);
                    //Console.Error.Write("debug in:"+encpath+" out:"+path);
                }
                catch (Exception e)
                {                    
                    st.Write(Encoding.ASCII.GetBytes("NULL\n"),0,5);                    
                    Console.Error.WriteLine("error catched:"+e.Message);
                }
            }
        }

        private static void pingrestapi(string path)
        {
            HttpClient httpClient = new HttpClient();
            string [] pathelements = path.Split(new char[]{'/'}, 2,StringSplitOptions.None);
            //Console.Error.WriteLine("debug:"+path);
            //Console.Error.WriteLine("debug:"+pathelements[0]);
            //Console.Error.WriteLine("debug:"+pathelements[1]);
            //pathelements[0] = eppn
            //pathelements[1] = internal path

            HttpRequestMessage request = 
                new HttpRequestMessage(HttpMethod.Head, 
                    new Uri("http://localhost:"+port+contextpath+"files/"+pathelements[1]));
            request.Headers.Add("X-USERNAME", pathelements[0]);

            httpClient.SendAsync(request);
            //don't wait for response
        }
    }
}