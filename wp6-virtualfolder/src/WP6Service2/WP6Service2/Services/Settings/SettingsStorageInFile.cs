using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using MetadataService.Services.Files;
using ServiceStack.Text;

namespace MetadataService.Services.Settings
{
    public class SettingsStorageInFile :ISettingsStorage
    {
        private static string _secretslocation;// = "/home/vagrant/.westlife/";
        private const string Secretsprefix = "provider.";


        private static readonly SettingsStorageInFile _instance = new SettingsStorageInFile();
        /** Singleton, retrieve instance by this method */
        public static SettingsStorageInFile GetInstance()
        {
            return _instance;
        }

        private SettingsStorageInFile()
        {
            var location = System.Environment.GetEnvironmentVariable("VF_STORAGE_CONF_DIR");
            if (location != null) _secretslocation = location + ".westlife/";
            else _secretslocation = "/home/vagrant/" + ".westlife/";

        }

        /** Default restore from file */
        private static ProviderItem RestoreFromFile(string filename)
        {
            using (var outputFile = new StreamReader(_secretslocation+filename))
            {
                var item = outputFile.ReadToEnd().FromJson<ProviderItem>();
                return item;
            }
        }

        //TODO move to global or per user restoration.
        /** Restore all from files */
        public List<ProviderItem> GetAllConfigs(string userid)
        {
            var di = new DirectoryInfo(_secretslocation);
            var fis = di.GetFileSystemInfos();
            return (from fi in fis where fi.Name.StartsWith(Secretsprefix + userid + ".") select RestoreFromFile(fi.Name)).ToList();
        }

        public void StoreSettings(ProviderItem request)
        {
            using (var outputFile = new StreamWriter(_secretslocation+Secretsprefix+request.username+"."+request.alias))
            {
                outputFile.WriteLine(request.ToJson());
            }
        }

        public bool DeleteSettings(string username, string alias)
        {
            File.Delete(_secretslocation + Secretsprefix + username +"."+ alias);
            return true;
        }

        public void StoreSettings(ProviderItem request, IDbConnection Db)
        {
            StoreSettings(request);
        }

        public bool DeleteSettings(string username, string alias, IDbConnection Db)
        {
            return DeleteSettings(username, alias);
        }

        public List<ProviderItem> GetAllConfigs(string userid, IDbConnection Db)
        {
            return GetAllConfigs(userid);
        }
    }
}