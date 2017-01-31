using System.Data;
using WP6Service2.Services.Settings;

namespace WP6Service2.Services.Files
{
    public interface IProviderCreator
    {
        AFileProvider CreateProvider(ProviderItem item,ISettingsStorage storage,IDbConnection connection);
    }
}