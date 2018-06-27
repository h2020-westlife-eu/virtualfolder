using System;
using System.ComponentModel;
using System.IO;
using System.Text;
using MetadataService.Services.Settings;

namespace webdavhash2path
{
    internal class Program
    {
        public static void Main(string[] args)
        {
            while (true)
            {
                var encpath = Console.ReadLine();
                var st = Console.OpenStandardOutput();
                try
                {
                    var path = SettingsStorageInDB.getdecryptedpath(encpath) + System.Environment.NewLine;
                    st.Write(Encoding.ASCII.GetBytes(path),0,path.Length);
                    //Console.Error.Write("debug in:"+encpath+" out:"+path);
                }
                catch (Exception e)
                {                    
                    st.Write(Encoding.ASCII.GetBytes("NULL\n"),0,5);                    
                    Console.Error.WriteLine("error catched:"+e.Message);
                }
            }
        }        
    }
}