using System;
using System.Collections.Generic;
using System.Linq;

namespace MetadataService.Services.Files
{
    public static class ProviderFactory
    {
        public const string ALLOW_FILESYSTEM_VAR = "VF_ALLOW_FILESYSTEM";
        public const string ALLOW_ONEDATA_VAR = "VF_ALLOW_ONEDATA";
        public static Dictionary<string, IProviderCreator> AvailableProviders;

        static ProviderFactory()
        {
            //get all implementation of IProviderCreator
            var type = typeof(IProviderCreator);
            var types = AppDomain.CurrentDomain.GetAssemblies()
                .SelectMany(s => s.GetTypes())
                .Where(p => type.IsAssignableFrom(p));
            //initialize provider creators - factory method
            AvailableProviders = new Dictionary<string, IProviderCreator>(types.Count());
            //register each instance of provider creator - factory method
            foreach (var creatortype in types)
                if (creatortype.IsClass)
                    if ((creatortype != typeof(FileSystemProviderCreator) ||
                        Environment.GetEnvironmentVariable(ALLOW_FILESYSTEM_VAR) == "true") && 
                        (creatortype != typeof(OnedataProviderCreator) ||
                         Environment.GetEnvironmentVariable(ALLOW_ONEDATA_VAR) == "true"))
                    {
                        var typename = creatortype.Name.Substring(0, creatortype.Name.IndexOf("Provider"));
                        var obj = (IProviderCreator) Activator.CreateInstance(creatortype);
                        AvailableProviders.Add(typename, obj);
                        //Console.WriteLine("Create provider: {0} ",creatortype.Name);
                    }
        }                


        public static void RegisterAvailableProvider(string type, IProviderCreator impl)
        {
            AvailableProviders.Add(type, impl);
        }
    }
}