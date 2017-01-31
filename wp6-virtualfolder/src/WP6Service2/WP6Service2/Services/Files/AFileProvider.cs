using System;
using System.Data;
using System.IO;
using System.Runtime.Remoting.Channels;
using ServiceStack.Common;
using WP6Service2.Services.Settings;

namespace WP6Service2.Services.Files
{

    public abstract class AFileProvider
    {

        public static String webdavroot = "/webdav/";

        protected string alias;
        protected string username;
        protected string FILESYSTEMFOLDER;
        protected string WEBDAVFOLDER;
        private ISettingsStorage SettingsStorage;
        private IDbConnection Db;


        public AFileProvider(ProviderItem provider, ISettingsStorage settingsStorage, IDbConnection connection)
        {
            SettingsStorage = settingsStorage;
            alias = provider.alias;
            username = provider.loggeduser;
            this.Db = connection;
            var rootdir = "/home/vagrant/work/";
            if (Environment.GetEnvironmentVariable("VF_STORAGE_DIR") != null)
                rootdir = Environment.GetEnvironmentVariable("VF_STORAGE_DIR");
            FILESYSTEMFOLDER = Path.Combine(rootdir,provider.loggeduser,provider.alias);
            WEBDAVFOLDER = "/webdav/"+provider.loggeduser+"/"+provider.alias+"/";
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