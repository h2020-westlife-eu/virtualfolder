using System;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;
using MetadataService.Services.Settings;

namespace MetadataService.Services.Files
{

    public class B2DropProviderCreator : IProviderCreator
    {

        public AFileProvider CreateProvider(ProviderItem item, ISettingsStorage storage, IDbConnection connection,string authproxy)
        {
            return new B2DropProvider(item,storage,connection,authproxy);
        }
    }

    public class B2DropProvider : WebDavProvider
    {

        public B2DropProvider(ProviderItem item, ISettingsStorage storage, IDbConnection connection,string authproxy) : base(item,
            storage, connection, "https://b2drop.eudat.eu/remote.php/webdav", authproxy)
        {
        }

    }
}
