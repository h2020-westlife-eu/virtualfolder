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
using Dropbox.Api;
using MetadataService.Services.Settings;
using ServiceStack.Common;
using ServiceStack.Common.Web;
using ServiceStack.ServiceHost;
using ServiceStack.Text;

namespace MetadataService.Services.Files
{
    public class DropboxProviderCreator : IProviderCreator
    {
        public AFileProvider CreateProvider(ProviderItem item, ISettingsStorage storage, IDbConnection connection)
        {
            return new DropboxProvider(item, storage, connection); //.securetoken,item.alias);
        }
    }

    public class DropboxProvider : AFileProvider
    {
        private readonly string accesstoken = "";

        private DropboxClient dbx;
        private readonly string DROPBOXURIROOT; // = "/metadataservice/files/"+alias;
        private bool initialized;

        public DropboxProvider(ProviderItem item, ISettingsStorage storage, IDbConnection connection)
            : base(item, storage, connection)
        {
            //alias = item.alias;
            accesstoken = item.securetoken;
            //TODO reference virtualfolder/api from Program.cs or as environment variable
            DROPBOXURIROOT = "/virtualfolder/api/"+"files/" + alias;
        }

        public override object GetFileOrList(string Path,IHttpRequest req)
        {
            var path = Path ?? "";
            if (path.Contains(".."))
                path = ""; //prevents directory listing outside
            //MAIN splitter for strategies of listing files
            //Some Url Generator may need to handle current http request.
            Ug.HandleRequest(req);
            
            return ListOfFiles(path);
        }

        public bool MyRemoteCertificateValidationCallback(object sender, X509Certificate certificate, X509Chain chain,
            SslPolicyErrors sslPolicyErrors)
        {
            var isOk = true;
            // If there are errors in the certificate chain, look at each error to determine the cause.
            if (sslPolicyErrors != SslPolicyErrors.None)
                foreach (X509ChainStatus t in chain.ChainStatus)
                    if (t.Status != X509ChainStatusFlags.RevocationStatusUnknown)
                    {
                        chain.ChainPolicy.RevocationFlag = X509RevocationFlag.EntireChain;
                        chain.ChainPolicy.RevocationMode = X509RevocationMode.Online;
                        chain.ChainPolicy.UrlRetrievalTimeout = new TimeSpan(0, 1, 0);
                        chain.ChainPolicy.VerificationFlags = X509VerificationFlags.AllFlags;
                        var chainIsValid = chain.Build((X509Certificate2) certificate);
                        if (!chainIsValid) isOk = false;
                    }
            return isOk;
        }

        private async Task Initialize()
        {
            //TODO change access token to user specific
            try
            {
                if (string.IsNullOrEmpty(accesstoken)) return;
                //setting proxy if it is defined in environment
                var environmentVariable = Environment.GetEnvironmentVariable("http_proxy");
                ServicePointManager.ServerCertificateValidationCallback = MyRemoteCertificateValidationCallback;
                if (!string.IsNullOrEmpty(environmentVariable))
                {
                    Console.WriteLine("Setting proxy for dropboxclient:" +
                                      Environment.GetEnvironmentVariable("http_proxy"));
                    var proxy = new WebProxy(Environment.GetEnvironmentVariable("http_proxy"), false);
                    var drconfig = new DropboxClientConfig
                    {
                        HttpClient = null
                    };
                    var httpClientHandler = new HttpClientHandler
                    {
                        Proxy = proxy
                    };
                    drconfig.HttpClient = new HttpClient(httpClientHandler);
                    dbx = new DropboxClient(accesstoken, drconfig);
                }
                else
                {
                    Console.WriteLine("dropbox client with direct access");
                    dbx = new DropboxClient(accesstoken);
                }

                //setting dropboxclient
                Console.WriteLine("Dropbox Init() dbx created:" + dbx.Dump());

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
            }
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
                var metadata = await dbx.Files.GetMetadataAsync(dropboxpath);
                if (metadata.IsFolder) return await ListFolder(path, dropboxpath);
                return await DownloadFile(dropboxpath);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message + " " + e.StackTrace);
                throw;
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
                catch (IOException)
                {
                    //waits until the file is downloaded by other process, usefull for big files
                    while (!IsFileReady(filename)) Thread.Sleep(200);
                    if (File.Exists(filename)) return HttpResult.Redirect(WEBDAVURL.TrimEnd('/') + dropboxpath);
                    //if not rethrow
                    throw;
                }
            }
            return HttpResult.Redirect(WEBDAVURL.TrimEnd('/') + dropboxpath);
        }

        //get list of files within a folder
        private async Task<object> ListFolder(string path, string dropboxpath)
        {
//if (metadata.IsFolder)
            //gets folder information
            var list = await dbx.Files.ListFolderAsync(dropboxpath);
            //var hasmoreresults = false;
            var listOfFiles = new List<SBFile>();
            do
            {
                //Console.WriteLine("ListOfFilesAsync(), result.Count: " + list.Entries.Count);
                //wrap path with slashes '/path/' if needed
                var mypath = path.StartsWith("/") ? path : "/" + path;
                if (!mypath.EndsWith("/")) mypath += "/";
                //add info about directory itself
                listOfFiles.Add(new SBFile
                {
                    path = path,
                    name = ".",
                    attributes = FileAttributes.Directory, //.ToString(),
                    size = 0,
                    date = DateTime.Now,
                    filetype = FileType.Directory | FileType.Read | FileType.Write |
                               (IsLocalDir(DROPBOXURIROOT + mypath ) ? FileType.Available : FileType.None),
                    //TODO introduce GET on file - which will download the file and redirects to webdav uri
                    webdavuri = DROPBOXURIROOT + mypath,
                    //generate public webdavuri for current directory
                    publicwebdavuri = Ug.GetRootPublicWebDavUrl() + mypath
                });
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
                        webdavuri = DROPBOXURIROOT + mypath+ fi.Name, 
                        publicwebdavuri = Ug.GetRootPublicWebDavUrl() + mypath + fi.Name
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
                        publicwebdavuri = LocalOrRemotePublic(DROPBOXURIROOT + mypath + fi.Name)
                    });
                
            } while (list.HasMore);

            //Console.WriteLine("ListOfFilesAsync done");
            return listOfFiles; //returns all
        }

//returns WEBDAV URL if it exists locally
        private string LocalOrRemote(string filepath)
        {
            //Console.WriteLine("localorremote() local:["+DROPBOXFOLDER + "/" + s+"] uri:["+WEBDAVURIROOT + "/" + s+"] remoteuri:["+"]");
            if (IsLocal(filepath))
                return filepath.Replace(DROPBOXURIROOT + "/", WEBDAVURL);
            return filepath;
        }
        private string LocalOrRemotePublic(string filepath)
        {
            //Console.WriteLine("localorremote() local:["+DROPBOXFOLDER + "/" + s+"] uri:["+WEBDAVURIROOT + "/" + s+"] remoteuri:["+"]");
            if (IsLocal(filepath))
                return filepath.Replace(DROPBOXURIROOT, Ug.GetRootPublicWebDavUrl());
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