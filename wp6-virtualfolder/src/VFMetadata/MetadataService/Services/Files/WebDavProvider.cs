using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using MetadataService.Services.Settings;
using ServiceStack.ServiceHost;
using HttpMethod = System.Net.Http.HttpMethod;

namespace MetadataService.Services.Files
{
    public class WebDavProviderCreator : IProviderCreator
    {
        public AFileProvider CreateProvider(ProviderItem item, ISettingsStorage storage, IDbConnection connection)
        {
            return new WebDavProvider(item, storage, connection);
        }
    }

    public class WebDavProvider : AFileProvider
    {
        private static readonly HashSet<string> Initializedproviders = new HashSet<string>();
        private static readonly object Initlock = new object();
        private readonly string _providerurl = ""; //"https://b2drop.eudat.eu/remote.php/webdav"
        private const string Vfscriptsdirvariable = "VF_SCRIPTS_DIR";
        private static readonly string Scriptsdir = Environment.GetEnvironmentVariable(Vfscriptsdirvariable) != null
            ? Environment.GetEnvironmentVariable(Vfscriptsdirvariable)
            : "/opt/virtualfolder/scripts/";
        private static readonly string Mountscript = Scriptsdir+"mountb2drop.sh";


        /** default constructor */
        public WebDavProvider(ProviderItem item, ISettingsStorage storage, IDbConnection connection) :
            this(item, storage, connection, item.accessurl)
        {
        }

        /** constructor for subclasses, where accessurl is known */
        public WebDavProvider(ProviderItem item, ISettingsStorage storage, IDbConnection connection, string accessurl)
            : base(item, storage, connection)
        {
            _providerurl = accessurl;
            //var task = Initialize(item);
            var response = CheckProvider(accessurl, item);
            if (response.StatusCode==HttpStatusCode.OK) Initialize(item);
            else
                throw new ApplicationException(
                    "Cannot register WebDAV provider, check credentials. Status code of provider:" +
                    response.StatusCode+" "+response.Content);
            //task.Start();
        }
        
        
//destructor deinitializes, frees resources
        ~WebDavProvider()
        {
            DeInitialize();
        }
        private HttpResponseMessage CheckProvider(string accessurl, ProviderItem request)
        {
            var client = new HttpClient(); //JsonServiceClient(accessurl);
            /*client.Headers["Authorization"] = "Basic " + Convert.ToBase64String(
                                                  Encoding.UTF8.GetBytes(request.username+":"+request.securetoken)
                                              );
            */
            //client.Head(new Headers{"Authorization", 
            //client.BaseAddress = accessurl;
            var req = new HttpRequestMessage() {
                RequestUri = new Uri(accessurl),
                Method = HttpMethod.Get,
            };
            req.Headers.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(
                Encoding.UTF8.GetBytes(request.username + ":" + request.securetoken)));
                                      
            var response = client.SendAsync(req);
            response.Wait();
            return response.Result;

        }

        public override object GetFileOrList(string path,IHttpRequest req)
        {
            var _path = path ?? "";
            if (_path.Contains(".."))
                _path = ""; //prevents directory listing outside
            var dirnotempty = (Directory.Exists(FILESYSTEMFOLDER) &&
                               (Directory.GetFiles(FILESYSTEMFOLDER).Length > 0));
            Ug.HandleRequest(req);
            if (!dirnotempty)
            {
                //try to refresh umount mount
                Initialize(null);
            }

            return ListOfFiles(FILESYSTEMFOLDER, username,alias, _path);
        }

        public override bool DeleteSettings()
        {
            DeInitialize();
            return base.DeleteSettings();
        }

        //if request == null -> refresh, otherwise add
        private void Initialize(ProviderItem request)
        {
            lock (Initlock)
            {
                if (Initializedproviders.Contains(FILESYSTEMFOLDER))
                {
                    Console.WriteLine("provider at " + FILESYSTEMFOLDER + "already initialized for " + username);
                    var di = new DirectoryInfo(FILESYSTEMFOLDER);
                    var fis = di.GetFileSystemInfos();
                    var dirnotempty = Directory.Exists(FILESYSTEMFOLDER) && (fis.Length > 0);
                    if (dirnotempty) return;
                    else Console.WriteLine("but seems empty, try to reinitialize");
                }
                //else
                Initializedproviders.Add(FILESYSTEMFOLDER);
                try
                {
                    var dirnotempty = (Directory.Exists(FILESYSTEMFOLDER) &&
                                       (Directory.GetFiles(FILESYSTEMFOLDER).Length > 0));
                    if (dirnotempty)
                    {
                        Console.WriteLine("Directory " + FILESYSTEMFOLDER + " not empty, assuming already mounted.");
                        return;
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Directory empty " + ex.Message+" , trying to mount.");
                }
                int exitcode;
                
                if (request == null)
                {
                    string output = Utils.ExecuteShell("/bin/bash", new[]
                    {
                        //"-H -u vagrant", 
                        //TODO make path of mountb2drop script configurable
                        Mountscript,
                        "refresh",
                        _providerurl,
                        FILESYSTEMFOLDER,
                        username,
                        ".",
                        WEBDAVURL
                    }, out exitcode);
                    Console.WriteLine(output);
                }
                else
                {
                    request.output = Utils.ExecuteShell("/bin/bash", new[]
                    {
                        //"-H -u vagrant", 
                        //TODO make path of mountb2drop script configurable
                        Mountscript,
                        "add",
                        _providerurl,
                        FILESYSTEMFOLDER,
                        request.username,
                        request.securetoken,
                        WEBDAVURL
                    }, out exitcode);
                    Console.WriteLine(request.output);
                }

            }
        }

        private void DeInitialize()
        {
            lock (Initlock)
            {
                if (!Initializedproviders.Contains(FILESYSTEMFOLDER))
                {
                    Console.WriteLine("provider " + FILESYSTEMFOLDER + " already deinitialized for " + username);
                    return;
                }
                //else
                Initializedproviders.Remove(FILESYSTEMFOLDER);
                int exitcode;
                var output = Utils.ExecuteShell("/bin/bash", new[]
                {
                    Mountscript,
                    "remove",
                    _providerurl,
                    FILESYSTEMFOLDER,
                    username,
                    WEBDAVURL
                }, out exitcode);
                Console.WriteLine(output);
            }
        }
    }
}