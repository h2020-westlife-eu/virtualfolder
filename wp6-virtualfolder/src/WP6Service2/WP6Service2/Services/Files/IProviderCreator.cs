using System.Data;
using MetadataService.Services.Settings;

namespace MetadataService.Services.Files
{
    public interface IProviderCreator
    {
        AFileProvider CreateProvider(ProviderItem item,ISettingsStorage storage,IDbConnection connection);
    }
}