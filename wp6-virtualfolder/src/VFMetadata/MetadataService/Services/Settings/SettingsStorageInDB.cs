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

        private static readonly string iv = DateTime.Now.ToString("yyyy MMMM"); //after restart and new month, new iv is generated
                                                                                //all previous generated codes will become invalid
        private static readonly string pkey2;
        static SettingsStorageInDB()
        {
            
            pkey2 = pkey;
            while (pkey2.Length < 32) pkey2 += pkey;
            pkey2 = pkey2.Substring(0, 32);
            if (iv.Length < 16) iv += pkey2;
            iv = iv.Substring(0, 16);
            //Console.Error.WriteLine("debug pkey:"+pkey2+" iv:"+iv);
        }


        public void StoreSettings(ProviderItem request, IDbConnection Db)
        {
            Db.Open();
            //encrypt copy
            var crequest = new ProviderItem()
            {
                accessurl = request.accessurl, alias = request.alias, Id = request.Id, loggeduser = request.loggeduser,
                loggeduserhash = request.loggeduserhash, output = request.output, securetoken = request.securetoken,
                type = request.type, username = request.username
            };
            encrypt(ref crequest);
            Db.Insert(crequest);
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
            if (dectoken == null) throw new WarningException("sectoken of "+item.alias+ " not decrypted.");
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

        public static string getencryptedpath(string path)
        {
            //Console.Error.WriteLine("debug pkey:"+pkey2+" iv:"+iv);
            return AESThenHMAC.Encrypt(path, Encoding.Default.GetBytes(pkey2), Encoding.Default.GetBytes(iv)).Replace('/','_');
        }
        
        public static string getdecryptedpath(string encpath)
        {
            //Console.Error.WriteLine("debug pkey:"+pkey2+" iv:"+iv);
            return AESThenHMAC.Decrypt(encpath.Replace('_', '/'), Encoding.Default.GetBytes(pkey2),Encoding.Default.GetBytes(iv));            
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