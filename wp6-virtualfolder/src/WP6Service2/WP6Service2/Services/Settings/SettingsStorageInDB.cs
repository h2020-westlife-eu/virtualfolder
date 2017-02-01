using System.Collections.Generic;
using System.Data;
using ServiceStack.OrmLite;
using WP6Service2.Services.Files;

namespace WP6Service2.Services.Settings
{
    public class SettingsStorageInDB : ISettingsStorage
    {

        private static readonly SettingsStorageInDB _instance = new SettingsStorageInDB();


        /** Singleton, retrieve instance by this method */
        public static SettingsStorageInDB GetInstance()
        {
            return _instance;
        }


        public void StoreSettings(ProviderItem request, IDbConnection Db)
        {
            Db.Open();
            Db.Insert(request);

        }

        public bool DeleteSettings(string username, string alias, IDbConnection Db)
        {
            Db.Open();
            var i = Db.Delete<ProviderItem>(x => x.loggeduser == username && x.alias == alias);
            return i != 0;
        }

        public List<ProviderItem> GetAllConfigs(string userid, IDbConnection Db)
        {
//            return Db.Select<ProviderItem>(x => x.username == userid);
            var all = Db.Select<ProviderItem>();
            var selected = all.FindAll(x => x.loggeduser == userid);
            return selected;

        }
    }
}