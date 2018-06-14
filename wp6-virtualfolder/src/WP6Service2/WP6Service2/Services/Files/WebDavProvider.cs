using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using MetadataService.Services.Settings;
using HttpMethod = System.Net.Http.HttpMethod;

namespace MetadataService.Services.Files
{
    public class WebDavProviderCreator : IProviderCreator
    {
        public AFileProvider CreateProvider(ProviderItem item, ISettingsStorage storage, IDbConnection connection,
            string authproxy)
        {
            return new WebDavProvider(item, storage, connection, authproxy);
        }
    }

    public class WebDavProvider : AFileProvider
    {
        private static readonly HashSet<string> Initializedproviders = new HashSet<string>();
        private static readonly object Initlock = new object();
        private readonly string _providerurl = ""; //"https://b2drop.eudat.eu/remote.php/webdav"
        private readonly string _mountscript = "/home/vagrant/scripts/mountb2drop.sh";


        /** default constructor */
        public WebDavProvider(ProviderItem item, ISettingsStorage storage, IDbConnection connection, string authproxy) :
            this(item, storage, connection, item.accessurl, authproxy)
        {
        }

        /** constructor for subclasses, where accessurl is known */
        public WebDavProvider(ProviderItem item, ISettingsStorage storage, IDbConnection connection, string accessurl,
            string authproxy) : base(item, storage, connection, authproxy)
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

        public override object GetFileOrList(string path)
        {
            var _path = path ?? "";
            if (_path.Contains(".."))
                _path = ""; //prevents directory listing outside
            var dirnotempty = (Directory.Exists(FILESYSTEMFOLDER) &&
                               (Directory.GetFiles(FILESYSTEMFOLDER).Length > 0));
            if (!dirnotempty)
            {
                //try to refresh umount mount
                Initialize(null);
            }

            return FileSystemProvider.ListOfFiles(FILESYSTEMFOLDER, WEBDAVURL, PUBLICWEBDAVURL, _path);
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
                    var dirnotempty = (Directory.Exists(FILESYSTEMFOLDER) &&
                                       (Directory.GetFiles(FILESYSTEMFOLDER).Length > 0));
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
                        _mountscript,
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
                        _mountscript,
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
                    "/home/vagrant/scripts/mountb2drop.sh",
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