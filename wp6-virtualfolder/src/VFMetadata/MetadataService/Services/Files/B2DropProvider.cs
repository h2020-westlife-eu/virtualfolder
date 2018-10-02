using System.Data;
using MetadataService.Services.Settings;

namespace MetadataService.Services.Files
{
    public class B2DropProviderCreator : IProviderCreator
    {
        public AFileProvider CreateProvider(ProviderItem item, ISettingsStorage storage, IDbConnection connection
            )
        {
            return new B2DropProvider(item, storage, connection);
        }
    }

    public class B2DropProvider : WebDavProvider
    {
        public B2DropProvider(ProviderItem item, ISettingsStorage storage, IDbConnection connection
            ) : base(item,
            storage, connection, "https://b2drop.eudat.eu/remote.php/webdav")
        {
        }
    }
}