using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using MetadataService.Services.Files;
using ServiceStack.ServiceClient.Web;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;
using ServiceStack.ServiceInterface.Cors;
using ServiceStack.Text;
using ServiceStack.WebHost.Endpoints;

/* workaround for issue #77 ???*/
namespace WP6Service2.Services.Dataset
{
    
    [Route("/provstoredataset", "POST")]
    public class ProvStoreProxyDTO
    {
        public string Name { get; set; }
        public string Document { get; set; }
        public string ProvStoreUserName { get; set; }
        public string ProvStoreApiKey { get; set; }
    }

    public class ProvStoreRecord : IReturn<string> //returns body of proxied
    {
        public string rec_id { get; set; }
        //public Boolean public - name public not allowed - it is keyword
        public string content { get; set; }
        //public string url { get; set; } not used 
       
    }
    
    [EnableCors(allowCredentials:true)] //options for CORS    
    [VreCookieRequestFilter] //filters authenticated users, sets userid item in request
    public class ProvStoreProxyService : Service
    {
        static string ProvStoreURL="https://openprovenance.org/store/api/v0/documents/";
        //POST /store/api/v0/documents/
        public string Post(ProvStoreProxyDTO dto)
        {
            //return PostByHttpClient(dto); //fails on Error: SecureChannelFailure (The authentication or decryption has failed.)
            return PostByCurl(dto);
        }
        
        private const string Vfscriptsdirvariable = "VF_SCRIPTS_DIR";
        private static readonly string Scriptsdir = Environment.GetEnvironmentVariable(Vfscriptsdirvariable) != null
            ? Environment.GetEnvironmentVariable(Vfscriptsdirvariable)
            : "/opt/virtualfolder/scripts/";
        private static readonly string postscript = Scriptsdir+"postProvstoredata.sh";

        public static string Base64Encode(string plainText) {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }
        
        private static string PostByCurl(ProvStoreProxyDTO dto)
        {
            var provStoreRecord = new ProvStoreRecord() {rec_id = dto.Name, content = dto.Document};
            int exitcode;
            var response = Utils.ExecuteShell(postscript, new[]
            {                    
                Base64Encode(provStoreRecord.ToJson()),
                dto.ProvStoreUserName,
                dto.ProvStoreApiKey
                /*
                "-d",
                "$'"+provStoreRecord.ToJson()+"'",
                "-H",
                "\"Content-Type: text/provenance-notation\"",
                "-H",
                "\"Authorization: ApiKey "+ dto.ProvStoreUserName + ":" + dto.ProvStoreApiKey+"\"",
                "-X",
                "POST",
                ProvStoreURL,
                "--trace -"*/
            },out exitcode,false);
            Console.WriteLine("ProvstoreByCurl() response:"+response);
            return response;
        }

        private static string PostByHttpClient(ProvStoreProxyDTO dto)
        {
            try
            {
                //var client = new JsonServiceClient();
                var client = new HttpClient(new LoggingHandler(new HttpClientHandler()));
                //SecureChannelFailure (The authentication or decryption has failed.)
                // https://ubuntuforums.org/showthread.php?t=1841740
                System.Net.ServicePointManager.ServerCertificateValidationCallback += (s, ce, ca, p) => true;

                //ServicePointManager.ServerCertificateValidationCallback = MyRemoteCertificateValidationCallback;                
                var provStoreRecord = new ProvStoreRecord() {rec_id = dto.Name, content = dto.Document};

                client.DefaultRequestHeaders.Add("Authorization",
                    "ApiKey " + dto.ProvStoreUserName + ":" + dto.ProvStoreApiKey);
                //req.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                //client.DefaultRequestHeaders.Add("Content-Type", "text/provenance-notation");

                var body = provStoreRecord.ToJson();
                var content = new StringContent(body, Encoding.UTF8, "text/provenance-notation");

                var response = client.PostAsync(ProvStoreURL, content).Result;
                var responseString = response.Content.ReadAsStringAsync().Result;
                return responseString;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                //Console.WriteLine(e.Message);
                //Console.WriteLine(e.StackTrace);
                throw e;
            }
        }
    }
    public class LoggingHandler : DelegatingHandler
    {
        public LoggingHandler(HttpMessageHandler innerHandler)
            : base(innerHandler)
        {
        }

        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            Console.WriteLine("Request:");
            Console.WriteLine(request.ToString());
            if (request.Content != null)
            {
                Console.WriteLine(await request.Content.ReadAsStringAsync());
            }
            Console.WriteLine();

            HttpResponseMessage response = await base.SendAsync(request, cancellationToken);

            Console.WriteLine("Response:");
            Console.WriteLine(response.ToString());
            if (response.Content != null)
            {
                Console.WriteLine(await response.Content.ReadAsStringAsync());
            }
            Console.WriteLine();

            return response;
        }
    }
}