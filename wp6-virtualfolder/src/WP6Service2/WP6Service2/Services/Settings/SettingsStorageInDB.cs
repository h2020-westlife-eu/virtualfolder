using System.Collections.Generic;
using System.Data;
using WP6Service2.Services.Files;

namespace WP6Service2.Services.Settings
{
    public class SettingsStorageInDB : ISettingsStorage
    {

        private static readonly SettingsStorageInDB _instance = new SettingsStorageInDB();

        private IDbConnection Db;
        /** Singleton, retrieve instance by this method */
        public static SettingsStorageInDB GetInstance()
        {
            return _instance;
        }


        public void StoreSettings(ProviderItem request)
        {
            throw new System.NotImplementedException();
        }

        public bool DeleteSettings(string username, string alias)
        {
            throw new System.NotImplementedException();
        }

        public List<ProviderItem> GetAllConfigs(string userid)
        {
            throw new System.NotImplementedException();
        }

        public void SetDB(IDbConnection db)
        {
            Db = db;
        }
    }
}