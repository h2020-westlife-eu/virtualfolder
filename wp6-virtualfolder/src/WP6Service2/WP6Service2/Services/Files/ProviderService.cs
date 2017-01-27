using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using ServiceStack.Common;
using ServiceStack.Common.Web;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;

namespace WP6Service2
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
        public string alias { get; set; } //alias in url /files/{alias}/{path}
        public string type{ get; set; } //type of provider to distinguish available implementation
        public string securetoken {get;set;} //used to transfer tokens to store
        public string username { get; set; } //e.g. used by b2drop, not used by o2auth services
        public string output { get; set; } //debug output from scripts
        public string loggeduser { get; set; } //to fill with information which use is logged
    }

    [Route("/files/{Providerpath}/{Path*}", "GET")]
    public class ProviderFileList //: IReturn<List<SBFile>>
    {
        public string Providerpath { get; set; }
        public string Path { get; set; }
    }

    [Route("/providers", "GET")]
    public class Providers
    {
        public string name { get; set; }
        public string username { get; set; }
    }

    public class DjangoUserInfo
    {
        public string username { get; set; }
        public string email { get; set; }
    }

    [VreCookieRequestFilter]
    public class ProviderService : Service
    {

        //private static Dictionary<string,IProviderCreator> AvailableProviders; //provider name and factory method
        private Dictionary<string, UserProvider> UserProviders = new Dictionary<string, UserProvider>();

        /*gets providers associated to the user, initialize object when needed */
        private UserProvider getUserProviders()
        {
            var userid = (string) base.Request.Items["userid"];
            if (userid.Length == 0) throw new UnauthorizedAccessException();
            if (!UserProviders.ContainsKey(userid))
                UserProviders[userid] = new UserProvider(userid);
            return UserProviders[userid];
        }
        /* adds user provider */
        private void addUserProviders(ProviderItem provideritem,AFileProvider aprovider)
        {
            var prov = getUserProviders();
            prov._providers.Add(provideritem);
            prov.linkedimpl.Add(provideritem.alias,aprovider);
        }



        /** returns list of configured file providers */
        public ProviderList Get(ProviderItem request)
        {
            var tmp = getUserProviders();
            return tmp._providers;
        }

        /** returns list of available providers, which can be configured by the user */
        public object Get(Providers request)
        {
            return ProviderFactory.AvailableProviders.Keys;
        }

        //registers new alias and provider which serve it

        public ProviderList Put(ProviderItem request)
        {
            var userid = (string) base.Request.Items["userid"];
            IProviderCreator impl=null;
            if (ProviderFactory.AvailableProviders.TryGetValue(request.type, out impl))
            {
                if (string.IsNullOrEmpty(request.alias)) request.alias = firstempty(request.type.ToLower());
                var aprovider = impl.CreateProvider(request);
                addUserProviders(request,aprovider);
                aprovider.StoreToFile(request);
            } else throw new ApplicationException("the provider type has not registered creator:"+request.type);
            return getUserProviders()._providers;
        }

        //returns first available alias e.g. dropbox or dropbox_2, dropbox_3
        private string firstempty(string prefix)
        {
            if (!getUserProviders().linkedimpl.Keys.Contains(prefix)) return prefix;
            else return firstempty1(prefix,1);
        }

        private string firstempty1(string prefix, int index)
        {

            while(index++<1024)
            {
                var mykey = prefix + "_" + index;
                if (!getUserProviders().linkedimpl.Keys.Contains(mykey)) return mykey;

            }
            throw  new ApplicationException("Too many registered providers:"+prefix+" index:");
        }

        //deregister the alias and provider which serve it
        public ProviderList Delete(ProviderItem request)
        {
            AFileProvider provider = null;
            if (getUserProviders().linkedimpl.TryGetValue(request.alias, out provider))
            {
                provider.Destroy();
                getUserProviders()._providers.RemoveAt(getUserProviders()._providers.FindIndex(p => p.alias == request.alias));
                //destroy provider
                getUserProviders().linkedimpl.Remove(request.alias);
                return getUserProviders()._providers;
            } else
                throw new ApplicationException("cannot delete alias '"+request.alias+"', not found.");
        }


        public object Get(ProviderFileList request)
        {
            //delegate to provider
            AFileProvider provider = null;
            if (getUserProviders().linkedimpl.TryGetValue(request.Providerpath, out provider))
                return provider.GetFileOrList(request.Path);
            else
            {
              throw new ApplicationException("provider implementation not found for path:"+request.Providerpath);
            }
        }

    }
}
