using System.Collections.Generic;
using WP6Service2.Services.Files;

namespace WP6Service2.Services.Settings
{
    public interface ISettingsStorage
    {
        void StoreSettings(ProviderItem request);
        bool DeleteSettings(string username, string alias);
        List<ProviderItem> GetAllConfigs(string userid);
    }
}