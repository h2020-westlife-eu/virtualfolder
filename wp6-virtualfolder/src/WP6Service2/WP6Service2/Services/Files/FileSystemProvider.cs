using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;

namespace WP6Service2.Services.Files
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
//        private string webdavfolder;// = "/home/vagrant/work/";

        public FileSystemProvider(ProviderItem item) :base(item)
        {
            //webdavfolder = "/home/" + item.username + "/virtualfolder/"+ item.alias;
            localpath = item.securetoken;
            if (!localpath.EndsWith("/")) localpath += '/';
            MakeLinkToWebDav(localpath,FILESYSTEMFOLDER);
        }

        private static void MakeLinkToWebDav(string localpath,string link)
        {
            Console.WriteLine("FileSystem initializing...");
            string output = ExecuteShell("/bin/ln",new string[]{"-s",localpath, link});
            Console.WriteLine(output);
        }

        private static string ExecuteShell(string shellcommand, string[] args)
        {
            ProcessStartInfo psi = new ProcessStartInfo();
            psi.FileName = shellcommand;
            psi.UseShellExecute = false;
            psi.RedirectStandardOutput = true;
            psi.RedirectStandardError = true;
            foreach (var arg in args)
            {
                psi.Arguments += arg + " ";
            }
            Process p = Process.Start(psi);
            string output = p.StandardOutput.ReadToEnd();
            output += p.StandardError.ReadToEnd();
            p.WaitForExit();
            return output;
        }

        public override bool DeleteSettings()
        {
            try
            {
                string output=ExecuteShell("/bin/rm",new string[]{FILESYSTEMFOLDER});
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
            return ListOfFiles(localpath, webdavroot  + alias + "/",path);
            //return listOfFiles; //returns all
        }

        public static List<SBFile> ListOfFiles(string pathprefix,string webdavprefix,string path)
        {
            var di = new DirectoryInfo(pathprefix+path);
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
                    webdavuri = webdavprefix + mypath + fi.Name
                });
            }
            ;
            return listOfFiles;
        }
    }
}