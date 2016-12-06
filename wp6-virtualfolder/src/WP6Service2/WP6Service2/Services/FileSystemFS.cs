using System;
using System.Collections.Generic;
using System.IO;
using ServiceStack;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;

namespace WP6Service2
{
    [Route("/sbfiles")]
    [Route("/sbfiles/{path*}")]
    //[Route("/sbfiles/b2drop/{path*}")]
    public class FileSystemSBFile : SBFile
    {
    }

    public partial class SBFileService : Service
    {
        /** returns list of files and directories under specified path of the configured root
         * directory.
         */
       public object Get(FileSystemSBFile request)
        {
            Console.WriteLine("Get( " + request.path + " )");
            String path = (request.path != null) ? request.path : "";
            if ((request.path != null) && request.path.Contains(".."))
                path = ""; //prevents directory listing outside
            //MAIN splitter for strategies of listing files
            return FileSystemFS.ListOfFiles(path);
        }
    }

    public static class FileSystemFS
    {
        public static String root = "/home/vagrant/work/";
        public static String webdavroot = "/webdav/";

        public static object ListOfFiles(String path) {
            Console.WriteLine("ListOfFiles( "+path+" )");
            var di = new DirectoryInfo (root+path);
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
                    webdavuri = webdavroot+path+"/"+fi.Name
                });
            };
            return listOfFiles; //returns all
        }
    }

}