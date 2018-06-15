using System;
using System.ComponentModel;
using System.Text;
using MetadataService.Services.Settings;

namespace webdavhash2path
{
    internal class Program
    {
        public static void Main(string[] args)
        {
            String encpath;
            while (true)
            {
                encpath = Console.ReadLine();
                Console.WriteLine(getdecryptedpath(encpath));
            }
        }

        private static readonly string nonsecurepkey = "sMhM8zRVjY0v";

        private static readonly string pkey = Environment.GetEnvironmentVariable("VF_STORAGE_PKEY") != null
            ? Environment.GetEnvironmentVariable("VF_STORAGE_PKEY")
            : nonsecurepkey;
        
        public static string getdecryptedpath(string encpath)
        {
            var dectoken = AESThenHMAC.SimpleDecryptWithPassword(encpath, pkey,
                Encoding.UTF8.GetBytes(pkey).Length);
            if (dectoken == null) throw new WarningException("not decrypted");

            return dectoken;
        }
        
        
    }
}