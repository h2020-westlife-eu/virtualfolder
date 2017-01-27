using System;
using System.Collections.Generic;

namespace WP6Service2
{
    public class UserProvider
    {
        public string userid;
        public List<ProviderItem> _providers; //list of configured providers
        public Dictionary<string, AFileProvider> linkedimpl; //provider name and linked implementation

        public UserProvider(string _userid)
        {
            userid = _userid;
            if (_providers == null)
            {
                _providers = new List<ProviderItem>();
                linkedimpl = new Dictionary<string, AFileProvider>();
                var providerfiles = AFileProvider.GetAllConfigFiles(userid);
                IProviderCreator impl;
                foreach (var pf in providerfiles)
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
    }
}