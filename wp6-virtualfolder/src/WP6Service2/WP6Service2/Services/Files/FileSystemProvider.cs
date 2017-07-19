using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using MetadataService.Services.Settings;

namespace MetadataService.Services.Files
{
    public class FileSystemProviderCreator : IProviderCreator
    {
        public AFileProvider CreateProvider(ProviderItem item, ISettingsStorage storage, IDbConnection connection,
            string authproxy)
        {
            return new FileSystemProvider(item, storage, connection, authproxy); //.securetoken,item.alias);
        }
    }

    public class FileSystemProvider : AFileProvider
    {
        private readonly string localpath;
//        private string webdavfolder;// = "/home/vagrant/work/";
        //public string publicwebdavhash = "webdav";

        public FileSystemProvider(ProviderItem item, ISettingsStorage storage, IDbConnection connection,
            string authproxy) : base(item, storage, connection, authproxy)
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

        public override object GetFileOrList(string Path)
        {
            var path = Path ?? "";
            if (path.Contains(".."))
                path = ""; //prevents directory listing outside
            //MAIN splitter for strategies of listing files
            //return DropBoxFS.ListOfFiles(path);
            //Console.WriteLine("ListOfFiles( "+path+" )");
            return ListOfFiles(localpath, Webdavroot + username + "/" + alias + "/", PUBLICWEBDAVURL + "/", path);
            //return listOfFiles; //returns all
        }

        public static List<SBFile> ListOfFiles(string pathprefix, string webdavprefix, string publicwebdavprefix,
            string path)
        {
            var myfi = new FileInfo(Path.Combine(pathprefix, path));
            if ((myfi.Attributes & FileAttributes.Directory) != 0)
            {
                var di = new DirectoryInfo(Path.Combine(pathprefix, path));
                var fis = di.GetFileSystemInfos();
                var listOfFiles = new List<SBFile>();
                //mapping FileSystemInfos into list structure returned to client
                foreach (var fi in fis)
                {
                    var isdirectory = !(fi.GetType() == typeof(FileInfo));
                    var mysize = isdirectory ? 0 : (ulong) ((FileInfo) fi).Length;
                    var mypath = path == "" ? path : path + "/";
                    var myfiletype = (isdirectory ? FileType.Directory : FileType.None) | FileType.Read |
                                     ((fi.Attributes & FileAttributes.ReadOnly) > 0 ? FileType.None : FileType.Write) |
                                     FileType.Available;
                    listOfFiles.Add(new SBFile
                    {
                        path = path,
                        name = fi.Name,
                        attributes = fi.Attributes, //.ToString(),
                        size = mysize,
                        date = fi.LastWriteTime,
                        filetype = myfiletype,
                        webdavuri = webdavprefix + mypath + fi.Name,
                        publicwebdavuri = publicwebdavprefix + mypath + fi.Name
                    });
                }
                ;
                return listOfFiles;
            }
            else //it is file
            {
                var listOfFiles = new List<SBFile>
                {
                    new SBFile
                    {
                        path = path,
                        name = myfi.Name,
                        attributes = myfi.Attributes, //.ToString(),
                        size = (ulong) myfi.Length,
                        date = myfi.LastWriteTime,
                        filetype = FileType.None | FileType.Read |
                                   ((myfi.Attributes & FileAttributes.ReadOnly) > 0 ? FileType.None : FileType.Write) |
                                   FileType.Available,
                        webdavuri = path,
                        publicwebdavuri = publicwebdavprefix + "/" + path
                    }
                };

                return listOfFiles;
            }
        }
    }
}