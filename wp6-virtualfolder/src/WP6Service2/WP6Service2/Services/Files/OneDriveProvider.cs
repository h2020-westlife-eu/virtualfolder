using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Threading;
using System.Threading.Tasks;
using MetadataService.Services.Settings;
using Microsoft.OneDrive.Sdk;
using ServiceStack.Common;
using ServiceStack.Common.Web;
using ServiceStack.Text;
using File = System.IO.File;

namespace MetadataService.Services.Files
{
    public class OneDriveProviderCreator : IProviderCreator
    {
        public AFileProvider CreateProvider(ProviderItem item, ISettingsStorage storage, IDbConnection connection,
            string authproxy)
        {
            return new OneDriveProvider(item, storage, connection, authproxy); //.securetoken,item.alias);
        }
    }

    public class OneDriveProvider : AFileProvider
    {
        private readonly string accesstoken = "";

        private OneDriveClient dbx;
        private readonly string DROPBOXURIROOT; // = "/metadataservice/files/"+alias;
        private bool initialized;

        public OneDriveProvider(ProviderItem item, ISettingsStorage storage, IDbConnection connection, string authproxy)
            : base(item, storage, connection, authproxy)
        {
            //alias = item.alias;
            accesstoken = item.securetoken;

            DROPBOXURIROOT = "/metadataservice/files/" + alias;
        }

        public override object GetFileOrList(string Path)
        {
            var path = Path ?? "";
            if (path.Contains(".."))
                path = ""; //prevents directory listing outside
            //MAIN splitter for strategies of listing files
            return ListOfFiles(path);
        }

        public async Task Initialize()
        {
            throw new NotImplementedException();
            /*
            //TODO change access token to user specific
            try
            {
                if (string.IsNullOrEmpty(accesstoken)) return;
                //setting proxy if it is defined in environment
                var environmentVariable = Environment.GetEnvironmentVariable("http_proxy");
                //ServicePointManager.ServerCertificateValidationCallback = MyRemoteCertificateValidationCallback;
                if (!string.IsNullOrEmpty(environmentVariable))
                {
                    Console.WriteLine("Setting proxy for dropboxclient:" +
                                      Environment.GetEnvironmentVariable("http_proxy"));
                    var proxy = new WebProxy(Environment.GetEnvironmentVariable("http_proxy"), false);
                    //TODO proxy
                    //drconfig.HttpClient = new HttpClient(httpClientHandler);
                    //dbx = new DropboxClient(accesstoken, drconfig);
                }
                else
                {
                    Console.WriteLine("onedrive client with direct access");
                    var msaAuthProvider 
                    await msaAuthProvider.AuthenticateUserAsync();
                    var oneDriveClient = new OneDriveClient("https://api.onedrive.com/v1.0", msaAuthProvider);
                    dbx = new OneDriveClient(accesstoken);
                }

                //setting dropboxclient
                Console.WriteLine("OneDrive Init() dbx created:" + dbx.Dump());

                //just get information of connected user - not needed;
                var full = await dbx.Users.GetCurrentAccountAsync();
                Console.WriteLine("{0} - {1}", full.Name.DisplayName, full.Email);
                Console.WriteLine("Dropbox initialized");
                initialized = true;
            }
            catch (Exception e)
            {
                Console.WriteLine("Error:" + e.Message + " " + e.StackTrace);
                //throw e;
            }*/
        }

        public object ListOfFiles(string path)
        {
            //Console.WriteLine("ListOfFiles( "+path+" )");
            var mytask = ListOfFilesAsync(path);
            mytask.Wait();
            return mytask.Result;
        }

        private async Task<object> ListOfFilesAsync(string path)
        {
            if (!initialized)
            {
                await Initialize();
                if (!initialized) throw new ApplicationException("Dropbox not initiailized.");
            }
            //Console.WriteLine("ListOfFilesAsync("+path+")");
            var dropboxpath = path.Length > 0 ? "/" + path : string.Empty; //leading slash otherwise empty
            //Console.WriteLine("ListOfFilesAsync("+dropboxpath+")");
            try
            {
                //root folder - list
                if (dropboxpath.IsEmpty()) return await ListFolder(path, dropboxpath);
                //gets metadata -- if it is file or folder
               // var metadata = await dbx.Files.GetMetadataAsync(dropboxpath);
                //if (metadata.IsFolder) return await ListFolder(path, dropboxpath);
                return await DownloadFile(dropboxpath);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message + " " + e.StackTrace);
                throw e;
            }
        }

        public static bool IsFileReady(string sFilename)
        {
            // If the file can be opened for exclusive access it means that the file
            // is no longer locked by another process.
            try
            {
                using (var inputStream = File.Open(sFilename, FileMode.Open, FileAccess.Read, FileShare.None))
                {
                    if (inputStream.Length > 0)
                        return true;
                    return false;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        private async Task<object> DownloadFile(string dropboxpath)
        {
            throw new NotImplementedException();
            /*
            var filename = FILESYSTEMFOLDER + dropboxpath;
            //checks if it exists - downloaded by other process
            if (File.Exists(filename)) return HttpResult.Redirect(WEBDAVURL.TrimEnd('/') + dropboxpath);
            Directory.CreateDirectory(Path.GetDirectoryName(filename));
            using (var response = await dbx.Files.DownloadAsync(dropboxpath))
            {
                var stream = await response.GetContentAsStreamAsync();
                try
                {
                    using (Stream file = new FileStream(filename, FileMode.CreateNew, FileAccess.ReadWrite,
                        FileShare.None))
                    {
                        Utils.CopyStream(stream, file);
                    }
                }
                catch (IOException e)
                {
                    //waits until the file is downloaded by other process, usefull for big files
                    while (!IsFileReady(filename)) Thread.Sleep(200);
                    if (File.Exists(filename)) return HttpResult.Redirect(WEBDAVURL.TrimEnd('/') + dropboxpath);
                    throw e;
                }
            }
            return HttpResult.Redirect(WEBDAVURL.TrimEnd('/') + dropboxpath);
            */
        }

        //get list of files within a folder
        private async Task<object> ListFolder(string path, string dropboxpath)
        {
            throw new NotImplementedException();
            /*
//if (metadata.IsFolder)
            //gets folder information
            var list = await dbx.Files.ListFolderAsync(dropboxpath);
            var hasmoreresults = false;
            var listOfFiles = new List<SBFile>();
            do
            {
                //Console.WriteLine("ListOfFilesAsync(), result.Count: " + list.Entries.Count);
                //wrap path with slashes '/path/' if needed
                var mypath = path.StartsWith("/") ? path : "/" + path;
                if (!mypath.EndsWith("/")) mypath += "/";
                //mapping FileSystemInfos into list structure returned to client
                foreach (var fi in list.Entries.Where(i => i.IsFolder))
                    //Console.WriteLine("adding path:[" + path + "] name:[" + fi.Name + "]");
                    listOfFiles.Add(new SBFile
                    {
                        path = path,
                        name = fi.Name,
                        attributes = FileAttributes.Directory, //.ToString(),
                        size = 0,
                        date = DateTime.Now,
                        filetype = FileType.Directory | FileType.Read | FileType.Write |
                                   (IsLocalDir(DROPBOXURIROOT + mypath + fi.Name) ? FileType.Available : FileType.None),
                        //TODO introduce GET on file - which will download the file and redirects to webdav uri
                        webdavuri = DROPBOXURIROOT + mypath + fi.Name
                        //publicwebdavuri = PUBLICDROPBOXURIROOT+mypath+fi.Name,
                    });

                foreach (var fi in list.Entries.Where(i => i.IsFile))
                    //Console.WriteLine("adding path:[" + path + "] name:[" + fi.Name + "]");
                    listOfFiles.Add(new SBFile
                    {
                        path = path,
                        name = fi.Name,
                        attributes = FileAttributes.Normal, //.ToString(),
                        size = fi.AsFile.Size,
                        date = fi.AsFile.ServerModified,
                        filetype = FileType.Read | FileType.Write | 
                                   (IsLocal(DROPBOXURIROOT + mypath + fi.Name) ? FileType.Available : FileType.None),
                        //TODO introduce GET on file - which will download the file and redirects to webdav uri
                        webdavuri = LocalOrRemote(DROPBOXURIROOT + mypath + fi.Name),
                        publicwebdavuri = PUBLICWEBDAVURL + mypath + fi.Name
                    });

                if (list.HasMore)
                    hasmoreresults = false; //true
                else
                    hasmoreresults = false;
            } while (hasmoreresults);

            //Console.WriteLine("ListOfFilesAsync done");
            return listOfFiles; //returns all
            */
        }

//returns WEBDAV URL if it exists locally
        private string LocalOrRemote(string filepath)
        {
            //Console.WriteLine("localorremote() local:["+DROPBOXFOLDER + "/" + s+"] uri:["+WEBDAVURIROOT + "/" + s+"] remoteuri:["+"]");
            if (IsLocal(filepath))
                return filepath.Replace(DROPBOXURIROOT + "/", WEBDAVURL);
            return filepath;
        }

        private bool IsLocal(string filepath)
        {
            return File.Exists(filepath.Replace(DROPBOXURIROOT, FILESYSTEMFOLDER));
        }

        private bool IsLocalDir(string filepath)
        {
            return Directory.Exists(filepath.Replace(DROPBOXURIROOT, FILESYSTEMFOLDER));
        }
    }    
}