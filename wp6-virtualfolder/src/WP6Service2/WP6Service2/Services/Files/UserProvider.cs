using System;
using System.Collections.Generic;
using System.Linq;
using WP6Service2.Services.Settings;

namespace WP6Service2.Services.Files
{
    public class UserProvider
    {
        private string userid;
        private readonly List<ProviderItem> _providers; //list of configured providers
        private Dictionary<string, AFileProvider> linkedimpl; //provider name and linked implementation

        public UserProvider(string _userid, ISettingsStorage settingsStorage)
        {
            userid = _userid;
            if (_providers == null)
            {
                _providers = new List<ProviderItem>();
                linkedimpl = new Dictionary<string, AFileProvider>();
                //retrieve config from db or persistent storage
                var providers = settingsStorage.GetAllConfigs(userid);

                IProviderCreator impl;
                foreach (var pf in providers)
                {
                    try
                    {
                        if (ProviderFactory.AvailableProviders.TryGetValue(pf.type, out impl))
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
        }

        //returns first available alias e.g. dropbox or dropbox_2, dropbox_3
        private string firstempty(string prefix)
        {
            return !linkedimpl.Keys.Contains(prefix) ? prefix : firstempty1(prefix,1);
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


        public void Add(ProviderItem provideritem)//, AFileProvider aprovider)
        {
            IProviderCreator impl=null;
            if (ProviderFactory.AvailableProviders.TryGetValue(provideritem.type, out impl))
            {
                if (string.IsNullOrEmpty(provideritem.alias)) provideritem.alias = firstempty(provideritem.type.ToLower());
                var aprovider = impl.CreateProvider(provideritem);

                _providers.Add(provideritem);
                linkedimpl.Add(provideritem.alias,aprovider);
                aprovider.StoreSettings(provideritem);
            } else throw new ApplicationException("the provider type has not registered creator:"+provideritem.type);

        }

        //deregister the alias and provider which serve it
        public List<ProviderItem> Delete(ProviderItem request)
        {
            AFileProvider provider = null;
            if (linkedimpl.TryGetValue(request.alias, out provider))
            {
                provider.DeleteSettings();
                _providers.RemoveAt(_providers.FindIndex(p => p.alias == request.alias));
                //destroy provider
                linkedimpl.Remove(request.alias);
                return _providers;
            } else
                throw new ApplicationException("cannot delete alias '"+request.alias+"', not found.");
        }

        public List<ProviderItem> getProviderItems()
        {
            return _providers;
        }

        public Dictionary<string, AFileProvider>.KeyCollection getAliases()
        {
            return linkedimpl.Keys;
        }

        public object GetFileList(ProviderFileList request)
        {
            AFileProvider provider = null;
            if (linkedimpl.TryGetValue(request.Providerpath, out provider))
                return provider.GetFileOrList(request.Path);
            else
            {
                throw new ApplicationException("provider implementation not found for path:"+request.Providerpath);
            }
        }
    }
}