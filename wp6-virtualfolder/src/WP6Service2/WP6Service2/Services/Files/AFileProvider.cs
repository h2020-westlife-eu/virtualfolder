using System;
using System.Runtime.Remoting.Channels;
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


        public AFileProvider(ProviderItem provider, ISettingsStorage settingsStorage)
        {
            SettingsStorage = settingsStorage;
            alias = provider.alias;
            username = provider.loggeduser;
            var rootdir = "/home/vagrant/work/";
            if (Environment.GetEnvironmentVariable("VF_STORAGE_DIR") != null)
                rootdir = Environment.GetEnvironmentVariable("VF_STORAGE_DIR");
            FILESYSTEMFOLDER = rootdir+provider.loggeduser+"/"+provider.alias+"/";
            WEBDAVFOLDER = "/webdav/"+provider.loggeduser+"/"+provider.alias+"/";
        }

        /** default settings storage is in file */
        public AFileProvider(ProviderItem provider) : this(provider, SettingsStorageInFile.GetInstance()) {}

        public abstract object GetFileOrList(string Path); //List<SBFile>

        //TODO move filesystem setting storage as strategy behaviour pattern to new class
        /** Default store to file in json */
        public virtual void StoreSettings(ProviderItem request)
        {
            SettingsStorage.StoreSettings(request);
        }

        public virtual bool DeleteSettings()
        {
            return SettingsStorage.DeleteSettings(username, alias);
        }



    }
}