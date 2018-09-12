using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using MetadataService.Services.Settings;
using ServiceStack.ServiceHost;

namespace MetadataService.Services.Files
{
    public class UserProvider
    {
        private static readonly Dictionary<string, UserProvider> _instances = new Dictionary<string, UserProvider>();
        private static readonly Dictionary<string, DateTime> _instancedates = new Dictionary<string, DateTime>();

        private static readonly object userlock = new object();
        private readonly List<ProviderItem> _providers; //list of configured providers
        private readonly Dictionary<string, AFileProvider> linkedimpl; //provider name and linked implementation
        //private readonly string userauthproxy;

        private UserProvider(string _userid, ISettingsStorage storage, IDbConnection db)
        {
            //userauthproxy = _userauthproxy;
            lock (userlock) //seems two threads enters this section
            {
                if (_providers == null)
                {
                    _providers = new List<ProviderItem>();
                    linkedimpl = new Dictionary<string, AFileProvider>();
                    //retrieve config from db or persistent storage
                    var providers = storage.GetAllConfigs(_userid, db);

                    foreach (var pf in providers)
                        try
                        {
                            IProviderCreator impl;
                            if (ProviderFactory.AvailableProviders.TryGetValue(pf.type, out impl))
                            {
                                _providers.Add(pf);
                                linkedimpl.Add(pf.alias, impl.CreateProvider(pf, storage, db));
                            }
                            else
                            {
                                Console.WriteLine("the provider type has not registered creator:" + pf.type);
                            }
                        }
                        catch (Exception e)
                        {
                            Console.WriteLine(e.Message + e.StackTrace);
                        }
                }
            }
        }

        /** creates instance for user, if there are existing storages, it is mounted/registered within system,
         * tries to release instances of user's, who doesn't access service for some time
         * if there are 30 and more concurent users - instances are released after 1 day,
         * if there are 15 users -instances are release after 2 days ...
         * The policy might be triggered in future.
         */
        
        public static UserProvider GetInstance(string _userid, ISettingsStorage storage,
            IDbConnection db)
        {
            if (!_instances.ContainsKey(_userid))
            {

                //create new instance
                _instances[_userid] = new UserProvider(_userid, storage, db);    
              //
                //consider to release instances
                if (_instances.Count > 1)
                {
                    //release instances older than month
                    //TimeSpan t = new DateTime()-;
                    var currenttime = new DateTime();
                    //based on instances count   
                    //remove instances older than (30/instancescount)+1 = (16,11,9,7,6,5,4,3,2,1..) days 
                    var oldinstances = _instancedates.Where(x => (currenttime - x.Value).TotalDays>( 30 /_instances.Count)+1);//x =>
                    foreach (var oldinstance in oldinstances)
                    {
                        //_instances[oldinstance.Key];
                        _instances.Remove(oldinstance.Key);
                    }                                        
                }
            }
            _instancedates[_userid]= new DateTime();
            return _instances[_userid];
        }

        /** generates automatic unique alias based on prefix, checks whether it already exists and adds numbered suffix up to 1024 _####
        */
        //returns first available alias e.g. dropbox or dropbox_2, dropbox_3
        private string firstempty(string prefix)
        {
            return !linkedimpl.Keys.Contains(prefix) ? prefix : firstempty1(prefix, 1);
        }

        private string firstempty1(string prefix, int index)
        {
            while (index++ < 1024)
            {
                var mykey = prefix + "_" + index;
                if (!linkedimpl.Keys.Contains(mykey)) return mykey;
            }
            throw new ApplicationException("Too many registered providers:" + prefix + " index:");
        }


        public void Add(ProviderItem provideritem, ISettingsStorage storage,
            IDbConnection connection) //, AFileProvider aprovider)
        {
            IProviderCreator impl = null;
            if (ProviderFactory.AvailableProviders.TryGetValue(provideritem.type, out impl))
            {
                //if the same provider exists, delete first
                if (_providers.Exists(x => x.alias == provideritem.alias)) Delete(provideritem);
                //set default alias
                if (string.IsNullOrEmpty(provideritem.alias))
                    provideritem.alias = firstempty(provideritem.type.ToLower());
                //create provider
                var aprovider = impl.CreateProvider(provideritem, storage, connection);                
                
                _providers.Add(provideritem);
                linkedimpl.Add(provideritem.alias, aprovider);
                aprovider.StoreSettings(provideritem);
            }
            else
            {
                Console.WriteLine("The provider type has not registered creator:" + provideritem.type);
                throw new ApplicationException("the provider type has not registered creator:" + provideritem.type);
            }
        }

        //deregister the alias and provider which serve it
        public List<ProviderItem> Delete(ProviderItem request)
        {
            AFileProvider provider = null;
            if (linkedimpl.TryGetValue(request.alias, out provider))
            {
                provider.DeleteSettings();
                //attempt to fix issue #66
                _providers.Remove(_providers.Find(p => p.alias == request.alias));                
                //destroy provider
                linkedimpl.Remove(request.alias);
                return _providers;
            }
            Console.WriteLine("Cannot delete alias '" + request.alias + "', not found.");
            throw new ApplicationException("cannot delete alias '" + request.alias + "', not found.");
        }

        public List<ProviderItem> getProviderItems()
        {
            //returns list only with non-sensitive information
            return _providers.Select(x => new ProviderItem
                {alias = x.alias, Id = x.Id, output = x.output, type = x.type, username = x.username}).ToList();
        }

        public List<ProviderItem> getFullProviderItems()
        {
            return _providers;
        }
        
        public Dictionary<string, AFileProvider>.KeyCollection getAliases()
        {
            return linkedimpl.Keys;
        }

        public object GetFileList(GetFiles request,IHttpRequest req)
        {
            AFileProvider provider = null;
            if (linkedimpl.TryGetValue(request.Providerpath, out provider))
                return provider.GetFileOrList(request.Path,req);
            Console.WriteLine("provider implementation not found for path:" + request.Providerpath);
            throw new ApplicationException("provider implementation not found for path:" + request.Providerpath);
        }
    }
}