using ServiceStack.ServiceHost;

namespace MetadataService.Services.Files
{
    /* Gives common abstract methods for generating url using various strategies */
    
    public abstract class UrlGenerator
    {
        protected ProviderItem provider;
        public const string Webdavroot = "/webdav/";
        public const string PublicWebdavroot = "/public_webdav/";

        public UrlGenerator(ProviderItem p)
        {
            provider = p;
            
        }
        public abstract string GetRootWebDavUrl();
        public abstract string GetRootPublicWebDavUrl();
        public abstract string GetPublicWebDavUrl(string path);

        public virtual void HandleRequest(IHttpRequest req)
        { }
    }
}