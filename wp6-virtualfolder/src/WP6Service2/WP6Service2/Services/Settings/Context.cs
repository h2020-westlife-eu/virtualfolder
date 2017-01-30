namespace WP6Service2.Services.Settings
{
    public static class Context
    {
        public static ISettingsStorage settingsStorageImpl = SettingsStorageInFile.GetInstance();

    }
}