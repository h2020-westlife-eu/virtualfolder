using System;
using System.ComponentModel;
using System.Text;
using MetadataService.Services.Settings;

namespace webdavpath2hash
{
    internal class Program
    {
        public static void Main(string[] args)
        {
            String path;
            while (true)
            {
                path = Console.ReadLine();
                Console.WriteLine(SettingsStorageInDB.getencryptedpath(path));
            }
        }        
    }
}