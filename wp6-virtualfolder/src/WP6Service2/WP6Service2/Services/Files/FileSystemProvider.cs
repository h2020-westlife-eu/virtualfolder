using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using Dropbox.Api.TeamLog;
using MetadataService.Services.Settings;
using ServiceStack.ServiceHost;

namespace MetadataService.Services.Files
{
    public class FileSystemProviderCreator : IProviderCreator
    {
        public AFileProvider CreateProvider(ProviderItem item, ISettingsStorage storage, IDbConnection connection)
        {
            return new FileSystemProvider(item, storage, connection); //.securetoken,item.alias);
        }
    }

    public class FileSystemProvider : AFileProvider
    {
        private readonly string localpath;
//        private string webdavfolder;// = "/home/vagrant/work/";
        //public string publicwebdavhash = "webdav";

        public FileSystemProvider(ProviderItem item, ISettingsStorage storage, IDbConnection connection
            ) : base(item, storage, connection)
        {
            //webdavfolder = "/home/" + item.username + "/virtualfolder/"+ item.alias;
            localpath = item.securetoken;
            if (!localpath.EndsWith("/")) localpath += '/';
            MakeLinkToFolder(localpath, FILESYSTEMFOLDER);
        }

        private void MakeLinkToFolder(string localpath, string link)
        {
            if (Directory.Exists(link)) return; //link already exists
            Console.WriteLine("FileSystem initializing...");
            //create subsequent directory if not exist
            Utils.CreateSystemSubFolder(FILESYSTEMFOLDER);
            var output = Utils.ExecuteShell("/bin/ln", new[] {"-s", localpath, link});
            Console.WriteLine(output);
        }

        public override bool DeleteSettings()
        {
            try
            {
                var output = Utils.ExecuteShell("/bin/rm", new[] {FILESYSTEMFOLDER});
                Console.WriteLine(output);
                return base.DeleteSettings();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message + e.StackTrace);
                throw e;
            }
        }

        public override object GetFileOrList(string Path,IHttpRequest req)
        {
            var path = Path ?? "";
            if (path.Contains(".."))
                path = ""; //prevents directory listing outside
            //MAIN splitter for strategies of listing files
            //return DropBoxFS.ListOfFiles(path);
            //Console.WriteLine("ListOfFiles( "+path+" )");
            Ug.HandleRequest(req);
            return ListOfFiles(localpath, username,alias , path);
            //return listOfFiles; //returns all
        }


        private static string publicwebdav(string path)
        {
            return "/public_webdav/" + SettingsStorageInDB.getencryptedpath(path);
        }
    }
}