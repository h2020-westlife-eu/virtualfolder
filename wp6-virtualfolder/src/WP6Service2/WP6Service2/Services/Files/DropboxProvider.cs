using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Dropbox.Api;
using ServiceStack.Common;
using ServiceStack.Common.Web;
using ServiceStack.Text;

namespace WP6Service2
{

    public class DropboxProviderCreator : IProviderCreator
    {
        public AFileProvider CreateProvider(ProviderItem item)
        {
            return new DropboxProvider(item);//.securetoken,item.alias);
        }
    }

    public class DropboxProvider : AFileProvider
    {

        public DropboxProvider(){}

        public DropboxProvider(ProviderItem item)
        {
            CONTEXT = item.alias;
            accesstoken = item.securetoken;
            DROPBOXFOLDER = "/home/vagrant/work/"+CONTEXT;
            DROPBOXURIROOT = "/metadataservice/files/"+CONTEXT;
            WEBDAVURIROOT = "/webdav/"+CONTEXT;
        }

        public override object GetFileList(string Path)
        {
            string path = (Path != null) ? Path : "";
            if (path.Contains(".."))
                path = ""; //prevents directory listing outside
            //MAIN splitter for strategies of listing files
            return ListOfFiles(path);
        }


        public string GetContext()
        {
            return CONTEXT;
        }

        private String CONTEXT = "dropbox";
        private DropboxClient dbx;
        private Boolean initialized = false;
        private String accesstoken = "";
        private String DROPBOXFOLDER;// = "/home/vagrant/work/"+CONTEXT;
        private String DROPBOXURIROOT;// = "/metadataservice/files/"+CONTEXT;
        private String WEBDAVURIROOT;// = "/webdav/"+CONTEXT;

        public async void Initialize(){
            //TODO change access token to user specific
            try
            {
                if (accesstoken.Length==0) return;
                //setting proxy if it is defined in environment
                var environmentVariable = System.Environment.GetEnvironmentVariable("http_proxy");
                if (!string.IsNullOrEmpty(environmentVariable))
                {
                    Console.WriteLine("Setting proxy for dropboxclient:" +
                                      System.Environment.GetEnvironmentVariable("http_proxy"));
                    WebProxy proxy = new WebProxy(System.Environment.GetEnvironmentVariable("http_proxy"), false);
                    var drconfig = new DropboxClientConfig()
                    {
                        HttpClient = null
                    };
                    HttpClientHandler httpClientHandler = new HttpClientHandler()
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

        public object ListOfFiles(String path)
        {

            //Console.WriteLine("ListOfFiles( "+path+" )");
            var mytask = ListOfFilesAsync(path);
            mytask.Wait();
            return mytask.Result;
        }

        public async Task<object> ListOfFilesAsync(String path)
        {
            if (!initialized) Initialize();
            if (!initialized) throw new ApplicationException("Dropbox not initiailized.");
            //Console.WriteLine("ListOfFilesAsync("+path+")");
            var dropboxpath = path.Length > 0 ? "/" + path : String.Empty; //leading slash otherwise empty
            //Console.WriteLine("ListOfFilesAsync("+dropboxpath+")");
            try
            {
                //root folder - list
                if (dropboxpath.IsEmpty()) return await ListFolder(path, dropboxpath);
                //gets metadata -- if it is file or folder
                var metadata = await dbx.Files.GetMetadataAsync(dropboxpath);
                if (metadata.IsFolder) return await ListFolder(path, dropboxpath);
                else return await DownloadFile(dropboxpath);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message+" "+e.StackTrace);
                throw e;
            }
        }

        /// <summary>
        /// Copies the contents of input to output. Doesn't close either stream.
        /// </summary>
        public void CopyStream(Stream input, Stream output)
        {
            byte[] buffer = new byte[8 * 1024];
            int len;
            while ( (len = input.Read(buffer, 0, buffer.Length)) > 0)
            {
                output.Write(buffer, 0, len);
            }
        }

        private async Task<object> DownloadFile(string dropboxpath)
        {


            var filename = DROPBOXFOLDER + "/" + dropboxpath;
            Directory.CreateDirectory(Path.GetDirectoryName(filename));
            using (var response = await dbx.Files.DownloadAsync(dropboxpath))
            {
                var stream = await response.GetContentAsStreamAsync();
                using (Stream file = File.Create(filename))
                {
                    CopyStream(stream, file);
                }

            }
            return HttpResult.Redirect(WEBDAVURIROOT+"/"+dropboxpath);
        }

        private async Task<object> ListFolder(string path, string dropboxpath)
        {
//if (metadata.IsFolder)
            //gets folder information
            var list = await dbx.Files.ListFolderAsync(dropboxpath);
            bool hasmoreresults = false;
            List<SBFile> listOfFiles = new List<SBFile>();
            do
            {
                //Console.WriteLine("ListOfFilesAsync(), result.Count: " + list.Entries.Count);

                //mapping FileSystemInfos into list structure returned to client
                foreach (var fi in list.Entries.Where(i => i.IsFolder))
                {
                    //Console.WriteLine("adding path:[" + path + "] name:[" + fi.Name + "]");
                    listOfFiles.Add(new SBFile()
                    {
                        path = path,
                        name = fi.Name,
                        attributes = FileAttributes.Directory, //.ToString(),
                        size = 0,
                        date = DateTime.Now,
                        filetype = FileType.Directory & FileType.Read & FileType.Write,
                        //TODO introduce GET on file - which will download the file and redirects to webdav uri
                        webdavuri = DROPBOXURIROOT+(path.StartsWith("/")?path:("/"+path)) + "/" + fi.Name
                    });
                }

                foreach (var fi in list.Entries.Where(i => i.IsFile))
                {
                    //Console.WriteLine("adding path:[" + path + "] name:[" + fi.Name + "]");
                    listOfFiles.Add(new SBFile()
                    {
                        path = path,
                        name = fi.Name,
                        attributes = FileAttributes.Normal, //.ToString(),
                        size = fi.AsFile.Size,
                        date = fi.AsFile.ServerModified,
                        filetype = FileType.Read & FileType.Write,
                        //TODO introduce GET on file - which will download the file and redirects to webdav uri
                        webdavuri = LocalOrRemote(DROPBOXURIROOT+(path.StartsWith("/")?path:("/"+path)) + "/" + fi.Name)
                    });
                }

                if (list.HasMore)
                {
                    hasmoreresults = false; //true
                    //list = await dbx.Files.ListFolderContinueAsync(ListFolderContinueArg);
                }
                else
                    hasmoreresults = false;
            } while (hasmoreresults);

            //Console.WriteLine("ListOfFilesAsync done");
            return listOfFiles; //returns all
        }

//returns WEBDAV URL if it exists locally
        private string LocalOrRemote(string s)
        {
            //Console.WriteLine("localorremote() local:["+DROPBOXFOLDER + "/" + s+"] uri:["+WEBDAVURIROOT + "/" + s+"] remoteuri:["+"]");
            if ((File.Exists(DROPBOXFOLDER + "/" + s)))
                return WEBDAVURIROOT + "/" + s;
            else
                return s;
        }
    }

}
