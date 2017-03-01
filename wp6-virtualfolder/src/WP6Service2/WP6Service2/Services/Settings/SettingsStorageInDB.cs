using System;
using System.Collections.Generic;
using System.Data;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using MetadataService.Services.Files;
using ServiceStack.OrmLite;

namespace MetadataService.Services.Settings
{
    public class DBSettings
    {
        public string VirtualFolderVersion { get; set; }
    }

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
            encrypt(ref request);
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
            var selected = Db.Select<ProviderItem>(x => x.loggeduser == userid);
            decrypt(ref selected, userid);
            //var selected = all.FindAll();
            return selected;

        }

        private static string pkey = Environment.GetEnvironmentVariable("VF_STORAGE_PKEY") != null
            ? Environment.GetEnvironmentVariable("VF_STORAGE_PKEY")
            : "sMhM8zRVjY0v";

        private static void decrypt( ref List<ProviderItem> enclist, string userid)
        {
            foreach (var item in enclist)
            {
                try
                {
                    var dectoken  = AESThenHMAC.SimpleDecryptWithPassword(item.securetoken, pkey,
                        Encoding.UTF8.GetBytes(item.loggeduser).Length);
                    item.securetoken = dectoken;
                }
                catch (Exception e)
                {
                    Console.WriteLine("Exception during decryption for item:"+item.alias+" error:"+e.Message+e.StackTrace);
                }
            }
        }

        public static void encrypt(ref ProviderItem item)
        {
            item.securetoken = AESThenHMAC.SimpleEncryptWithPassword(item.securetoken, pkey, Encoding.UTF8.GetBytes(item.loggeduser));
        }
    }
}