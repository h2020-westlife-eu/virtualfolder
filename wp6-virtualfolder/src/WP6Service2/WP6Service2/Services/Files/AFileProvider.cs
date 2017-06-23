using System;
using System.Data;
using System.IO;
using MetadataService.Services.Settings;

namespace MetadataService.Services.Files
{
    public abstract class AFileProvider
    {
        public const string Webdavroot = "/webdav/";
        private const string Vfstoragevariable = "VF_STORAGE_DIR";

        private readonly string _rootdir = Environment.GetEnvironmentVariable(Vfstoragevariable) != null
            ? Environment.GetEnvironmentVariable(Vfstoragevariable)
            : "/home/vagrant/work/";

        protected string alias;
        private readonly IDbConnection Db;
        protected string FILESYSTEMFOLDER;
        protected string PUBLICWEBDAVURL;
        private readonly ISettingsStorage SettingsStorage;
        protected string username;

        protected string WEBDAVURL;
        //= "/home/vagrant/work/";
        //if (Environment.GetEnvironmentVariable("VF_STORAGE_DIR") != null)
        //rootdir = Environment.GetEnvironmentVariable("VF_STORAGE_DIR");

        public AFileProvider(ProviderItem provider, ISettingsStorage settingsStorage, IDbConnection connection,
            string authproxy)
        {
            SettingsStorage = settingsStorage;
            alias = provider.alias;
            username = provider.loggeduser;
            Db = connection;

            FILESYSTEMFOLDER = Path.Combine(_rootdir, provider.loggeduser, provider.alias);
            WEBDAVURL = Webdavroot + provider.loggeduser + "/" + provider.alias + "/";
            PUBLICWEBDAVURL = authproxy + provider.alias;
        }

        /** default settings storage is in file */
        //public AFileProvider(ProviderItem provider) : this(provider, SettingsStorageInFile.GetInstance(),null) {}

        public abstract object GetFileOrList(string Path); //List<SBFile>

        //TODO move filesystem setting storage as strategy behaviour pattern to new class
        /** Default store to file in json */
        public virtual void StoreSettings(ProviderItem request)
        {
            SettingsStorage.StoreSettings(request, Db);
        }

        public virtual bool DeleteSettings()
        {
            return SettingsStorage.DeleteSettings(username, alias, Db);
        }
    }
}