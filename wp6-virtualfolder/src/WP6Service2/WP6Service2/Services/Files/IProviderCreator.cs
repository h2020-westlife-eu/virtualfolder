namespace WP6Service2
{
    public interface IProviderCreator
    {
        AFileProvider CreateProvider(ProviderItem item);
    }
}