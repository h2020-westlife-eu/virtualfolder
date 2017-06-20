using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.Serialization;
using MetadataService.Services.Settings;
using ServiceStack.DataAnnotations;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;

namespace MetadataService.Services.Files
{
    using ProviderList = List<ProviderItem>;

    /*    [Route("/files/{Provider}/{Path*}")]
    /files -- returns all available providers
    /files/dropbox -- returns files in root dir of dropbox
    /files/dropbox/Documents -- ...
    /files/dropbox/ -- sets dropbox configuration
    /files/dropbox/connection
  */
    [Route("/files","GET,PUT")]
    [Route("/files/{alias}", "DELETE")]
    public class ProviderItem : IReturn<ProviderList>
    {
        [AutoIncrement]
        public int Id { get; set; }
        public string alias { get; set; } //(optional - will be generated) alias used to distinguish between multiple providers per user /files/{alias}/{path}
        public string type{ get; set; } //(mandatory) type of provider to distinguish available implementation
        public string securetoken { get;set;} //(mandatory), accesstoken or password used to transfer tokens to store
        public string username { get; set; } //(mandatory for some types e.g. webdav,b2drop)
        public string output { get; set; } //output property debug output from scripts
        public string loggeduser { get; set; } //internal field, filled by service
        [IgnoreDataMember] [Ignore]
        public string loggeduserhash { get; set; } //internal field, filled by service
        public string accessurl { get; set; } //(mandatory for type webdav), not used by other providers
    }

    [Route("/files/{Providerpath}/{Path*}", "GET,HEAD")]
    public class ProviderFileList //: IReturn<List<SBFile>>
    {
        public string Providerpath { get; set; }
        public string Path { get; set; }
    }

    [Route("/providers", "GET")]
    public class Providers : IReturn<List<string>>
    {
        public string name { get; set; }
        public string username { get; set; }
    }

    public class DjangoUserInfo
    {
        public string username { get; set; }
        public string email { get; set; }
    }

    public class DjangoAuthproxyInfo
    {
        public string signed_url { get; set; }
    }

    [VreCookieRequestFilter]
    public class ProviderService : Service
    {
        private ISettingsStorage storage;


        //configures the storage
        public ProviderService()
        {
            storage = SettingsStorageInDB.GetInstance();
            //storage = SettingsStorageInFile.GetInstance();

        }

        //private static Dictionary<string,IProviderCreator> AvailableProviders; //provider name and factory method
     //   private Dictionary<string, UserProvider> UserProviders = new Dictionary<string, UserProvider>();

        /*gets providers associated to the user, initialize object when needed */
        private List<ProviderItem> getUserProviderItems()
        {
           return getUserProviders().getProviderItems();
        }

        /** determining which configured provider belongs to the user logged within this request */
        private UserProvider getUserProviders()
        {
            try
            {
                var userid = (string) base.Request.Items["userid"];
                var userauthproxy = (string) base.Request.Items["authproxy"];
                if (userid.Length == 0) throw new UnauthorizedAccessException();
                return UserProvider.GetInstance(userid, userauthproxy, storage, Db);
            }
            catch (KeyNotFoundException e)
            {
                throw new UnauthorizedAccessException();
            }
        }

        /** returns list of configured file providers */
        public ProviderList Get(ProviderItem request)
        {
            return getUserProviderItems();

        }

        /** returns list of available providers, which can be configured by the user */
        public List<string> Get(Providers request)
        {
            return ProviderFactory.AvailableProviders.Keys.ToList();
        }

        //registers new alias and provider which serve it
        public ProviderList Put(ProviderItem request)
        {
            getUserProviders().Add(request,storage,Db);
            return getUserProviderItems();
        }


        //deregister the alias and provider which serve it
        public ProviderList Delete(ProviderItem request)
        {
            return getUserProviders().Delete(request);
        }


        public object Get(ProviderFileList request)
        {
            //delegate to provider
            return getUserProviders().GetFileList(request);
        }

        public void Head(ProviderFileList request)
        {
            //delegate to provider
            try
            {
                getUserProviders().GetFileList(request);
                base.Response.StatusCode = 200;
            }
            catch (Exception e)
            {
                Console.WriteLine("Error: HEAD to resource:{0}\nmessage:{1}\nstacktrace:{2}",request.Providerpath+"/"+request.Path,e.Message,e.StackTrace);
                base.Response.StatusDescription = e.Message;
                base.Response.StatusCode = 404;
            }
            
        }

    }
}
