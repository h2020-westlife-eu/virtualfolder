using System;
using System.Collections.Generic;
using System.IO;

namespace WP6Service2
{

    public class FileSystemProviderCreator : IProviderCreator
    {
        public AFileProvider CreateProvider(ProviderItem item)
        {
            return new FileSystemProvider(item);//.securetoken,item.alias);
        }
    }

    public class FileSystemProvider :AFileProvider
    {
        private string localpath;
        private string alias;
        public FileSystemProvider(ProviderItem item)
        {
            localpath = item.securetoken;
            alias = item.alias;
        }

        public override object GetFileList(string Path)
        {
            string path = (Path != null) ? Path : "";
            if (path.Contains(".."))
                path = ""; //prevents directory listing outside
            //MAIN splitter for strategies of listing files
            //return DropBoxFS.ListOfFiles(path);
            //Console.WriteLine("ListOfFiles( "+path+" )");
            var di = new DirectoryInfo (localpath+path);
            var fis = di.GetFileSystemInfos();
            List<SBFile> listOfFiles = new List<SBFile> ();
            //mapping FileSystemInfos into list structure returned to client
            foreach (var fi in fis) {
                Boolean isdirectory = ! (fi.GetType ().Equals (typeof(FileInfo)));
                ulong mysize = isdirectory ? 0 : (ulong)((FileInfo)fi).Length;
                listOfFiles.Add(new SBFile(){
                    path=path,
                    name=fi.Name,
                    attributes=fi.Attributes,//.ToString(),
                    size=mysize,
                    date=fi.LastWriteTime,
                    filetype = (isdirectory?FileType.Directory:FileType.None) & FileType.Read & ((fi.Attributes & FileAttributes.ReadOnly)>0?FileType.None:FileType.Write),
                    webdavuri = webdavroot+"/"+alias+"/"+path+"/"+fi.Name
                });
            };
            return listOfFiles; //returns all


        }
    }
}