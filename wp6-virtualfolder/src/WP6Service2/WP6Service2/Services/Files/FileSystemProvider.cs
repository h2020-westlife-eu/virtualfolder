using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.IO;
using MetadataService.Services.Settings;

namespace MetadataService.Services.Files
{

    public class FileSystemProviderCreator : IProviderCreator
    {
        public AFileProvider CreateProvider(ProviderItem item, ISettingsStorage storage, IDbConnection connection,string authproxy)
        {
            return new FileSystemProvider(item,storage,connection,authproxy);//.securetoken,item.alias);
        }
    }

    public class FileSystemProvider :AFileProvider
    {
        private string localpath;
//        private string webdavfolder;// = "/home/vagrant/work/";
        //public string publicwebdavhash = "webdav";

        public FileSystemProvider(ProviderItem item, ISettingsStorage storage, IDbConnection connection,string authproxy) :base(item,storage,connection,authproxy)
        {
            //webdavfolder = "/home/" + item.username + "/virtualfolder/"+ item.alias;
            localpath = item.securetoken;
            if (!localpath.EndsWith("/")) localpath += '/';
            MakeLinkToFolder(localpath,FILESYSTEMFOLDER);
        }

        private void MakeLinkToFolder(string localpath,string link)
        {
            if (File.Exists(link)) return; //link already exists
            Console.WriteLine("FileSystem initializing...");
            //create subsequent directory if not exist
            Utils.CreateSystemSubFolder(FILESYSTEMFOLDER);
            string output = Utils.ExecuteShell("/bin/ln",new string[]{"-s",localpath, link});
            Console.WriteLine(output);
        }

        public override bool DeleteSettings()
        {
            try
            {
                string output= Utils.ExecuteShell("/bin/rm",new string[]{FILESYSTEMFOLDER});
                Console.WriteLine(output);
                return base.DeleteSettings();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message+e.StackTrace);
                throw e;
            }
        }

        public override object GetFileOrList(string Path)
        {
            string path = (Path != null) ? Path : "";
            if (path.Contains(".."))
                path = ""; //prevents directory listing outside
            //MAIN splitter for strategies of listing files
            //return DropBoxFS.ListOfFiles(path);
            //Console.WriteLine("ListOfFiles( "+path+" )");
            return ListOfFiles(localpath, Webdavroot  +username+"/"+ alias + "/",PUBLICWEBDAVURL + "/",path);
            //return listOfFiles; //returns all
        }

        public static List<SBFile> ListOfFiles(string pathprefix,string webdavprefix,string publicwebdavprefix,string path)
        {
            var di = new DirectoryInfo(Path.Combine(pathprefix,path));
            var fis = di.GetFileSystemInfos();
            List<SBFile> listOfFiles = new List<SBFile>();
            //mapping FileSystemInfos into list structure returned to client
            foreach (var fi in fis)
            {
                Boolean isdirectory = !(fi.GetType().Equals(typeof(FileInfo)));
                ulong mysize = isdirectory ? 0 : (ulong) ((FileInfo) fi).Length;
                var mypath = path == "" ? path : (path + "/");
                listOfFiles.Add(new SBFile()
                {
                    path = path,
                    name = fi.Name,
                    attributes = fi.Attributes, //.ToString(),
                    size = mysize,
                    date = fi.LastWriteTime,
                    filetype = (isdirectory ? FileType.Directory : FileType.None) & FileType.Read &
                               ((fi.Attributes & FileAttributes.ReadOnly) > 0 ? FileType.None : FileType.Write),
                    webdavuri = webdavprefix + mypath + fi.Name,
                    publicwebdavuri = publicwebdavprefix + mypath+ fi.Name

                });
            }
            ;
            return listOfFiles;
        }
    }
}