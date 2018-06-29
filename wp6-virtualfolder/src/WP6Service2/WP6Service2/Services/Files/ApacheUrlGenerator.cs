using MetadataService.Services.Settings;

namespace MetadataService.Services.Files
{
    public class ApacheUrlGenerator:UrlGenerator
    {
 
        public override string GetRootWebDavUrl()
        {
            // e.g. /webdav/b2drop will be mapped based on authentication to user's dirs by apache conf
            return Webdavroot + provider.alias + "/";

        }

        public override string GetRootPublicWebDavUrl()
        {
            return PublicWebdavroot +
                SettingsStorageInDB.getencryptedpath(
                    provider.loggeduser + "/" + provider.alias); // contains encrypted path of user          
        }

        public override string GetPublicWebDavUrl(string path)
        {
            return (PublicWebdavroot +
             SettingsStorageInDB.getencryptedpath(
                 provider.loggeduser + "/" + provider.alias + "/" + path));

        }

        public ApacheUrlGenerator(ProviderItem p) : base(p)
        {
        }
    }   
}