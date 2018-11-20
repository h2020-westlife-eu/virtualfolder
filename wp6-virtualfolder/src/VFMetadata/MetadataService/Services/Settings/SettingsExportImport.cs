using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using MetadataService.Services.Files;
using ServiceStack.DataAnnotations;
using ServiceStack.OrmLite;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;
using ServiceStack.ServiceInterface.Cors;
using ServiceStack.Text;

namespace MetadataService.Services.Settings
{
    
    /* database schema */
    public class SettingsKeys //temporary keys
    {
        [PrimaryKey]
        public string Owner { get; set; }
        public string PublicKey { get; set; }
        public string PrivateKey { get; set; }
    }
    
    [Route("/settings", "HEAD,OPTIONS")]    
    public class SettingsExportImport : IReturn<SettingsExportImport>
    {
        public string PublicKey{ get; set; }
        public string EncryptedSettings{ get; set; }
        public string SelectedAliases{ get; set; }
        public string ConflictedAliases{ get; set; }
        public string NewNameAliases{ get; set; }
    }

    [Route("/settings", "POST")]
    public class GeneratePublicKey : IReturn<string> //string with PublicKey
    {
    }

    [Route("/settings", "GET")]
    public class ExportSettings : IReturn<string>//string with base64 encoded encrypted settings using publickey
    {
        public string PublicKey{ get; set; }
        public string SelectedAliases{ get; set; }
    }

    [Route("/settings", "PUT")]
    public class ImportSettings : IReturn<List<ProviderItem>>
    {
        public string PublicKey{ get; set; }
        public string EncryptedSettings{ get; set; }
        public string ConflictedAliases{ get; set; }
        public string NewNameAliases{ get; set; }        
    }

    [EnableCors(allowCredentials:true)]
    [VreCookieRequestFilter]
    public class SettingsService : GenericProviderMethods
    {
        private const int DwKeySize = 2048;

        /** export settings, returns base64 encrypted json of selected aliases */
        public string Get(ExportSettings request)
        {
            var userid = (string) Request.Items["userid"];
            //var userauthproxy = (string) Request.Items["authproxy"];
            var encryptedSettings = exportSettings(request.PublicKey,userid,request.SelectedAliases);            
            return encryptedSettings;
        }

        /** put encrypted settings into local database == import */
        public List<ProviderItem> Put(ImportSettings request)
        {
            var userid = (string) Request.Items["userid"];            
            importSettings(userid,request.PublicKey, request.EncryptedSettings, request.ConflictedAliases,
                request.NewNameAliases);
            return getUserProviderItems();
        }
        
        
        /** post, no values are expected, generates key pair, public key is returned - it can be used to encrypt settings by another instance */
        public string Post(GeneratePublicKey request)
        {
            var userid = (string) Request.Items["userid"];
            return generatePrivatePublicKey(userid);
        }

        //generate priv-pub key, rewrite already existing one
        private string generatePrivatePublicKey(string userid)
        {
            
            RSACryptoServiceProvider rsa = new RSACryptoServiceProvider(DwKeySize);
            SettingsKeys sk = new SettingsKeys() { Owner = userid,PublicKey=rsa.ToXmlString(false),PrivateKey = rsa.ToXmlString(true)};
            Db.Save<SettingsKeys>(sk);
            return sk.PublicKey;
        }
        
        

        /** Encrypts selected aliases using pkey provided for the user identified by userid.
         * The aliases must be delimited by ';'.
         * Return value contains base64 encoded and encrypted symetric key delimited by comma from second base64 encoded and encrypted JSON
         * of selected settings
         */
        private string exportSettings(string pkey,string userid, string aliases)
        {
            // Convert the text to an array of bytes   
            UTF8Encoding byteConverter = new UTF8Encoding();
            
            try
            {
                if (userid.Length == 0) throw new UnauthorizedAccessException();
                //all providers
                var storage =SettingsStorageInDB.GetInstance();
                
                var providers = storage.GetAllConfigs(userid, Db);
                //list of aliases requested
                var listaliases = aliases.Split(';').ToList();
                //filter providers
                var myproviders= providers.Where(x => listaliases.Contains(x.alias)).ToList();
                //encode into json
                var text = myproviders.ToJson();            
                byte[] dataToEncrypt = byteConverter.GetBytes(text);
                byte[] encryptedKey;
                byte[] encryptedData;   
                //encrypt json
                using (RSACryptoServiceProvider rsa = new RSACryptoServiceProvider())  
                {  
                    // Set the rsa public private key   
                    rsa.FromXmlString(pkey);
                    
                    // Generate random symetric key
                    var password = RandomPrefix.RandomString((DwKeySize / 8) - 42);
  
                    // Encrypt the symetrickey and data and store it in the encyptedData Array   
                    encryptedKey = rsa.Encrypt(byteConverter.GetBytes(password), false);
                    encryptedData =
                        AESThenHMAC.SimpleEncryptWithPassword(dataToEncrypt, password); //dataToEncrypt, false);
                }
                //base64 encrypted data
                
                return System.Convert.ToBase64String(encryptedKey)+","+System.Convert.ToBase64String(encryptedData);
            }
            catch (KeyNotFoundException)
            {
                throw new UnauthorizedAccessException();
            }
        }
        
        /**
         * imports Settings in encrypted encsetting string.
         * encsetting must be base64 encoded, it is decoded and decrypted using private key. Public key is useddecrypt settings using private key, checks if publickey == stored PublicKey
         */
        private void importSettings(string userid,string publickey, string encsettings,string conflict,string rename)
        {
            UTF8Encoding byteConverter = new UTF8Encoding();            
            //check if publickey equals the corresponding pub-priv key pair in memory.
            var sk = Db.First<SettingsKeys>(x => x.Owner == userid);
            if (! publickey.Equals(sk.PublicKey)) throw new ApplicationException("public key doesn't correspond to stored private key"); 
            //base64 decode
            var keysetting = encsettings.Split(',');
            var encryptedkey = System.Convert.FromBase64String(keysetting[0]);
            var encryptedsettings = System.Convert.FromBase64String(keysetting[1]);
            //decrypt
            string decryptedKey;
            byte[] decryptedData;  
            using (RSACryptoServiceProvider rsa = new RSACryptoServiceProvider())  
            {  
                // Set the private key of the algorithm   
                rsa.FromXmlString(sk.PrivateKey);
                decryptedKey =  byteConverter.GetString(rsa.Decrypt(encryptedkey, false));
                decryptedData = AESThenHMAC.SimpleDecryptWithPassword(encryptedsettings,decryptedKey); //dataToEncrypt, false);   
            }             
            var jsonsettings = byteConverter.GetString(decryptedData);
            //no it is json, convert it to List
            var myproviders = jsonsettings.FromJson<List<ProviderItem>>();
            //rename conflicted aliases to new names
            var conflictedaliases = conflict.Split(';');
            var renamealiases = rename.Split(';');            
            for (int i=0;i<conflictedaliases.Length;i++)
            {
                var item = myproviders.Find(x => x.alias == conflictedaliases[i]);
                item.alias = renamealiases[i];
                
            }
            //now we have in myproviders renamed aliases, put them one by one
            var service = UserProvider.GetInstance(userid, storage, Db);
            foreach (var item in myproviders)
            {
                //change loggeduser from remote system to current user
                item.loggeduser = userid;
                item.output = "";
                service.Add(item,storage,Db);
            }
        }
            
    }
    
     
}