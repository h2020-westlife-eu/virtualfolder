using System.Collections.Generic;
using System.Data;
using MetadataService.Services.Files;

namespace MetadataService.Services.Settings
{
    public interface ISettingsStorage
    {
        void StoreSettings(ProviderItem request,IDbConnection Db);
        bool DeleteSettings(string username, string alias,IDbConnection Db);
        List<ProviderItem> GetAllConfigs(string userid,IDbConnection Db);
    }
}