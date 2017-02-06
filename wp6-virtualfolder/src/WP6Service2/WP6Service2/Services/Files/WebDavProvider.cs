using System;
using System.Data;
using System.Threading.Tasks;
using WP6Service2.Services.Settings;

namespace WP6Service2.Services.Files
{

    public class WebDavProviderCreator : IProviderCreator
    {

        public AFileProvider CreateProvider(ProviderItem item, ISettingsStorage storage, IDbConnection connection)
        {
            return new WebDavProvider(item,storage,connection);
        }
    }
    public class WebDavProvider : AFileProvider
    {
        private readonly string _providerurl = "";//"https://b2drop.eudat.eu/remote.php/webdav"

        /** default constructor */
        public WebDavProvider(ProviderItem item, ISettingsStorage storage, IDbConnection connection):this( item, storage, connection,item.accessurl)
        { }

        /** constructor for subclasses, where accessurl is known */
        public WebDavProvider(ProviderItem item, ISettingsStorage storage, IDbConnection connection,string accessurl): base(item, storage, connection)
        {
            _providerurl = accessurl;
            var task = Initialize(item);
            //task.Start();
        }

        public override object GetFileOrList(string Path)
        {
            string path = (Path != null) ? Path : "";
            if (path.Contains(".."))
                path = ""; //prevents directory listing outside
            //MAIN splitter for strategies of listing files
            //return DropBoxFS.ListOfFiles(path);

            return FileSystemProvider.ListOfFiles(FILESYSTEMFOLDER,WEBDAVURL,path);
        }

        public override bool DeleteSettings()
        {
            var task = DeInitialize();
            return base.DeleteSettings();
        }


        //TODO sudo as 'vagrant' here or sudo whole 'metadataservice'?
        private async Task Initialize(ProviderItem request)
        {
            int exitcode;
            request.output = Utils.ExecuteShell("/bin/sudo", new string[]
            {
                "-H -u vagrant",
                "/home/vagrant/scripts/mountb2drop.sh",
                "add",
                _providerurl,
                FILESYSTEMFOLDER,
                request.username,
                request.securetoken,
                WEBDAVURL
            },out exitcode);
            Console.WriteLine(request.output);
            //request.securetoken = ""; //just remove secure token, as it is not needed anymore

            //request.connected = GetB2DropStatus();
            //return request;
        }

        private async Task DeInitialize()
        {
            int exitcode;
            var output = Utils.ExecuteShell("/bin/bash", new string[]
            {
                "/home/vagrant/scripts/mountb2drop.sh",
                "remove",
                _providerurl,
                FILESYSTEMFOLDER,
                username,
                WEBDAVURL
            },out exitcode);
            Console.WriteLine(output);
            //request.securetoken = ""; //just remove secure token, as it is not needed anymore

            //request.connected = GetB2DropStatus();
            //return request;
        }
    }
}