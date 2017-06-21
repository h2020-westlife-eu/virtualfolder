using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using MetadataService.Services.Settings;

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
        private static readonly HashSet<string> initializedproviders = new HashSet<string>();
        private static readonly object initlock = new object();
        private readonly string _providerurl = ""; //"https://b2drop.eudat.eu/remote.php/webdav"


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
            Initialize(item);
            //task.Start();
        }

        public override object GetFileOrList(string Path)
        {
            var path = Path != null ? Path : "";
            if (path.Contains(".."))
                path = ""; //prevents directory listing outside
            //MAIN splitter for strategies of listing files
            //return DropBoxFS.ListOfFiles(path);

            return FileSystemProvider.ListOfFiles(FILESYSTEMFOLDER, WEBDAVURL, PUBLICWEBDAVURL, path);
        }

        public override bool DeleteSettings()
        {
            DeInitialize();
            return base.DeleteSettings();
        }


        //TODO sudo as 'vagrant' here or sudo whole 'metadataservice'?
        private void Initialize(ProviderItem request)
        {
            lock (initlock)
            {
                if (initializedproviders.Contains(FILESYSTEMFOLDER))
                {
                    Console.WriteLine("provider at " + FILESYSTEMFOLDER + "already initialized for " + username);
                    return;
                }
                //else
                initializedproviders.Add(FILESYSTEMFOLDER);
                int exitcode;
                request.output = Utils.ExecuteShell("/bin/bash", new[]
                {
                    //"-H -u vagrant",
                    "/home/vagrant/scripts/mountb2drop.sh",
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

        private void DeInitialize()
        {
            lock (initlock)
            {
                if (!initializedproviders.Contains(FILESYSTEMFOLDER))
                {
                    Console.WriteLine("provider " + FILESYSTEMFOLDER + " already deinitialized for " + username);
                    return;
                }
                //else
                initializedproviders.Remove(FILESYSTEMFOLDER);
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