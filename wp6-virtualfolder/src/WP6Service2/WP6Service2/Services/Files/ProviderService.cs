using System;
using System.Collections.Generic;
using System.Linq;
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
        public String alias { get; set; } //alias in url /files/{alias}/{path}
        public String type{ get; set; } //type of provider to distinguish available implementation
        public String securetoken {get;set;} //used to transfer tokens to store
        public String username { get; set; } //e.g. used by b2drop, not used by o2auth services
        public String output { get; set; } //debug output from scripts
    }

    [Route("/files/{Providerpath}/{Path*}", "GET")]
    public class ProviderFileList //: IReturn<List<SBFile>>
    {
        public String Providerpath { get; set; }
        public String Path { get; set; }
    }

    [Route("/providers", "GET")]
    public class Providers
    {
        public String name { get; set; }
    }

    public class ProviderService : Service
    {
        private static ProviderList _providers;
        private static Dictionary<string, AFileProvider> linkedimpl;
        private static Dictionary<string,IProviderCreator> AvailableProviders;

        /** register available provider to service - used by implementing classes
*/
        static ProviderService()
        {
            if (_providers == null)
            {
                _providers = new ProviderList();
                linkedimpl = new Dictionary<string, AFileProvider>();
                AvailableProviders = ProviderFactory.AvailableProviders;
                var providerfiles = AFileProvider.GetAllConfigFiles();
                IProviderCreator impl;
                foreach (var pf in providerfiles)
                {
                    try
                    {
                        if (AvailableProviders.TryGetValue(pf.type, out impl))
                        {
                            _providers.Add(pf);
                            linkedimpl.Add(pf.alias, impl.CreateProvider(pf));
                        }
                        else Console.WriteLine("the provider type has not registered creator:" + pf.type);
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e.Message+e.StackTrace);
                    }
                }
            }
            //TODO trigger ConfigStored() ???
        }
        /* Gets the status of the connection true or false
         *
         */

        public ProviderList Get(ProviderItem request)
        {
            var tmp = _providers;
            return _providers;
        }

        public object Get(Providers request)
        {
            return ProviderFactory.AvailableProviders.Keys;
        }
        //registers new alias and provider which serve it
        public ProviderList Put(ProviderItem request)
        {
            IProviderCreator impl=null;
            if (ProviderFactory.AvailableProviders.TryGetValue(request.type, out impl))
            {
                if (string.IsNullOrEmpty(request.alias)) request.alias = firstempty(request.type.ToLower());
                _providers.Add(request);
                var aprovider = impl.CreateProvider(request);
                linkedimpl.Add(request.alias,aprovider );
                aprovider.StoreToFile(request);
            } else throw new ApplicationException("the provider type has not registered creator:"+request.type);
            return _providers;
        }

        //returns first available alias e.g. dropbox or dropbox_2, dropbox_3
        private string firstempty(string prefix)
        {
            if (!linkedimpl.Keys.Contains(prefix)) return prefix;
            else return firstempty1(prefix,1);
        }

        private string firstempty1(string prefix, int index)
        {

            while(index++<1024)
            {
                var mykey = prefix + "_" + index;
                if (!linkedimpl.Keys.Contains(mykey)) return mykey;

            }
            throw  new ApplicationException("Too many registered providers:"+prefix+" index:");
        }

        //deregister the alias and provider which serve it
        public ProviderList Delete(ProviderItem request)
        {
            AFileProvider provider = null;
            if (linkedimpl.TryGetValue(request.alias, out provider))
            {
                provider.Destroy();
                _providers.RemoveAt(_providers.FindIndex(p => p.alias == request.alias));
                //destroy provider
                linkedimpl.Remove(request.alias);
                return _providers;
            } else
                throw new ApplicationException("cannot delete alias '"+request.alias+"', not found.");
        }


        public object Get(ProviderFileList request)
        {
            //delegate to provider
            AFileProvider provider = null;
            if (linkedimpl.TryGetValue(request.Providerpath, out provider))
                return provider.GetFileList(request.Path);
            else
            {
              throw new ApplicationException("provider implementation not found for path:"+request.Providerpath);
            }
        }

    }
}
