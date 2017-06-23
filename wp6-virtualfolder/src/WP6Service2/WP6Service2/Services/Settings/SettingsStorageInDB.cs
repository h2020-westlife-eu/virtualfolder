using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using MetadataService.Services.Files;
using ServiceStack.OrmLite;

namespace MetadataService.Services.Settings
{
    public class DBSettings
    {
        public string VirtualFolderVersion { get; set; }
        public string KeyHash { get; set; }
    }

    public class SettingsStorageInDB : ISettingsStorage
    {
        private static readonly SettingsStorageInDB _instance = new SettingsStorageInDB();

        private static readonly string nonsecurepkey = "sMhM8zRVjY0v";

        private static readonly string pkey = Environment.GetEnvironmentVariable("VF_STORAGE_PKEY") != null
            ? Environment.GetEnvironmentVariable("VF_STORAGE_PKEY")
            : nonsecurepkey;


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
            decrypt(ref selected);
            //var selected = all.FindAll();
            return selected;
        }


        /** Singleton, retrieve instance by this method */
        public static SettingsStorageInDB GetInstance()
        {
            return _instance;
        }

        //TODO test
        public static void decrypt(ref List<ProviderItem> enclist, string key)
        {
            var newlist = new List<ProviderItem>();
            foreach (var item in enclist)
                try
                {
                    var providerItem = item;
                    decrypt(ref providerItem, key);
                    newlist.Add(providerItem);
                }
                catch (Exception e)
                {
                    Console.WriteLine("Exception during decryption for item:" + item.alias + " error:" + e.Message +
                                      e.StackTrace);
                }
            enclist = newlist;
        }

        public static void decrypt(ref List<ProviderItem> enclist)
        {
            decrypt(ref enclist, pkey);
        }

        public static void decrypt(ref ProviderItem item)
        {
            decrypt(ref item, pkey);
            //var dectoken = AESThenHMAC.SimpleDecryptWithPassword(item.securetoken, pkey,
//                Encoding.UTF8.GetBytes(item.loggeduser).Length);
            //          item.securetoken = dectoken;
        }

        public static void decrypt(ref ProviderItem item, string key)
        {
            var dectoken = AESThenHMAC.SimpleDecryptWithPassword(item.securetoken, key,
                Encoding.UTF8.GetBytes(item.loggeduser).Length);
            if (dectoken == null) throw new WarningException("not decrypted");
            item.securetoken = dectoken;
        }


        public static void encrypt(ref ProviderItem item)
        {
            encrypt(ref item, pkey);
            //item.securetoken = AESThenHMAC.SimpleEncryptWithPassword(item.securetoken, pkey, Encoding.UTF8.GetBytes(item.loggeduser));
        }

        public static void encrypt(ref ProviderItem item, string key)
        {
            item.securetoken =
                AESThenHMAC.SimpleEncryptWithPassword(item.securetoken, key, Encoding.UTF8.GetBytes(item.loggeduser));
        }

        public static void swapkeys(IDbConnection Db, string key1, string key2)
        {
            var items = Db.Select<ProviderItem>();
            var newitems = new List<ProviderItem>();
            foreach (var item in items)
            {
                var providerItem = item;
                decrypt(ref providerItem, key1);
                encrypt(ref providerItem, key2);
                newitems.Add(providerItem);
            }
            Db.UpdateAll(items);
        }

        public static void swapfromdefaultkey(IDbConnection Db)
        {
            swapkeys(Db, nonsecurepkey, pkey);
        }

        public static bool compareHash(string keyHash)
        {
            return SimpleHash.VerifyHash(pkey, keyHash);
        }

        public static bool compareDefaultHash(string keyHash)
        {
            return SimpleHash.VerifyHash(nonsecurepkey, keyHash); //compare default
        }

        public static string getHash()
        {
            return SimpleHash.ComputeHash(pkey);
        }

        public static void storeSetting(IDbConnection db)
        {
            var dbsettings = new DBSettings
            {
                VirtualFolderVersion = Assembly.GetExecutingAssembly().GetName().Version.ToString(),
                KeyHash = getHash()
            };
            //db.Where<DBSettings>(p => true);//var currentsetting=db.Select<DBSettings>();
            if (db.Select<DBSettings>().Count > 0)
            {
                db.DeleteAll<DBSettings>();
                db.Insert(dbsettings);
            }
            else
            {
                db.Insert(dbsettings);
            }
        }

        public static DBSettings getDBSettings(IDbConnection db)
        {
            var dbsettingslist = db.Select<DBSettings>();
            return dbsettingslist.First();
        }
    }
}