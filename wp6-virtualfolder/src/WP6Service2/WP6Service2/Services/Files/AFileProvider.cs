using System;
using System.Data;
using System.IO;
using System.Runtime.Remoting.Channels;
using MetadataService.Services.Settings;
using ServiceStack.Common;

namespace MetadataService.Services.Files
{

    public abstract class AFileProvider
    {

        public const string Webdavroot = "/webdav/";

        protected string alias;
        protected string username;
        protected string FILESYSTEMFOLDER;
        protected string WEBDAVURL;
        protected string PUBLICWEBDAVURL;
        private ISettingsStorage SettingsStorage;
        private IDbConnection Db;
        private const string Vfstoragevariable = "VF_STORAGE_DIR";

        private readonly string _rootdir = Environment.GetEnvironmentVariable(Vfstoragevariable) != null
            ? Environment.GetEnvironmentVariable(Vfstoragevariable)
            : "/home/vagrant/work/";
        //= "/home/vagrant/work/";
            //if (Environment.GetEnvironmentVariable("VF_STORAGE_DIR") != null)
        //rootdir = Environment.GetEnvironmentVariable("VF_STORAGE_DIR");

        public AFileProvider(ProviderItem provider, ISettingsStorage settingsStorage, IDbConnection connection, string authproxy)
        {
            SettingsStorage = settingsStorage;
            alias = provider.alias;
            username = provider.loggeduser;
            this.Db = connection;

            FILESYSTEMFOLDER = Path.Combine(_rootdir,provider.loggeduser,provider.alias);
            WEBDAVURL = Webdavroot+provider.loggeduser+"/"+provider.alias+"/";
            PUBLICWEBDAVURL = authproxy+provider.alias;
        }

        /** default settings storage is in file */
        //public AFileProvider(ProviderItem provider) : this(provider, SettingsStorageInFile.GetInstance(),null) {}

        public abstract object GetFileOrList(string Path); //List<SBFile>

        //TODO move filesystem setting storage as strategy behaviour pattern to new class
        /** Default store to file in json */
        public virtual void StoreSettings(ProviderItem request)
        {
            SettingsStorage.StoreSettings(request,Db);
        }

        public virtual bool DeleteSettings()
        {
            return SettingsStorage.DeleteSettings(username, alias,Db);
        }



    }
}