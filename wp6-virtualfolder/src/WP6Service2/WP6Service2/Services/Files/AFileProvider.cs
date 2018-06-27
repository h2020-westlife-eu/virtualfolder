using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using MetadataService.Services.Settings;

namespace MetadataService.Services.Files
{
    public abstract class AFileProvider
    {
        public const string Webdavroot = "/webdav/";
        public const string PublicWebdavroot = "/public_webdav/";
        private const string Vfstoragevariable = "VF_STORAGE_DIR";

        private readonly string _rootdir = Environment.GetEnvironmentVariable(Vfstoragevariable) != null
            ? Environment.GetEnvironmentVariable(Vfstoragevariable)
            : "/srv/virtualfolder/";

        protected string alias;
        private readonly IDbConnection Db;
        protected string FILESYSTEMFOLDER;
        protected string PUBLICWEBDAVURL;
        private readonly ISettingsStorage SettingsStorage;
        protected string username;

        protected string WEBDAVURL;

        protected AFileProvider(ProviderItem provider, ISettingsStorage settingsStorage, IDbConnection connection)
        {
            SettingsStorage = settingsStorage;
            alias = provider.alias;
            username = provider.loggeduser;
            Db = connection;

            FILESYSTEMFOLDER = Path.Combine(_rootdir, provider.loggeduser, provider.alias);
            //handle west-life log on - @west-life.eu and other log-on 
            if (username.EndsWith("@west-life.eu"))
            WEBDAVURL = Webdavroot + provider.alias + "/"; // e.g. /webdav/b2drop will be mapped based on authentication to user's dirs by apache conf
            else
            WEBDAVURL = Webdavroot + username+"/"+provider.alias + "/"; // e.g. /webdav/b2drop will be mapped based on authentication to user's dirs by apache conf
            PUBLICWEBDAVURL = PublicWebdavroot+SettingsStorageInDB.getencryptedpath(provider.loggeduser + "/" + provider.alias); // contains encrypted path of user
        }

        public abstract object GetFileOrList(string Path); //List<SBFile>
        
        /** Default store to file in json */
        public virtual void StoreSettings(ProviderItem request)
        {
            SettingsStorage.StoreSettings(request, Db);
        }

        public virtual bool DeleteSettings()
        {
            return SettingsStorage.DeleteSettings(username, alias, Db);
        }
        
        //implements listoffiles in local directory
        public List<SBFile> ListOfFiles(string pathprefix, string loggeduser,string alias,
            string path)
        {
            var myfi = new FileInfo(Path.Combine(pathprefix, path));
            if ((myfi.Attributes & FileAttributes.Directory) != 0)
            {
                var di = new DirectoryInfo(Path.Combine(pathprefix, path));
                var fis = di.GetFileSystemInfos();
                var listOfFiles = new List<SBFile>();
                var publicwebdavprefix = path=="" ? PUBLICWEBDAVURL : 
                    (PublicWebdavroot +
                     SettingsStorageInDB.getencryptedpath(
                         loggeduser + "/" + alias + "/" + path));
                //add information about this directory itself
                //TODO may add dataset metadata about containing files (CERIF, PROV-O)
                var mypath = path == "" ? path : path + "/";
                listOfFiles.Add(new SBFile
                {
                    path = path,
                    name = ".",
                    attributes = di.Attributes, //.ToString(),
                    size = 0,
                    date = di.LastWriteTime,
                    filetype = (FileType.Directory) | FileType.Read |
                               ((di.Attributes & FileAttributes.ReadOnly) > 0 ? FileType.None : FileType.Write) |
                               FileType.Available,
                    webdavuri = WEBDAVURL + mypath,
                    publicwebdavuri = publicwebdavprefix+"/" 
                });
                //mapping FileSystemInfos into list structure returned to client
                foreach (var fi in fis)
                {
                    var isdirectory = !(fi is FileInfo);
                    var mysize = isdirectory ? 0 : (ulong) ((FileInfo) fi).Length;
                    
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
                        webdavuri = WEBDAVURL + mypath + fi.Name,
                        publicwebdavuri = publicwebdavprefix + "/"+ fi.Name
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
                        webdavuri = WEBDAVURL+path,                        
                        publicwebdavuri = path=="" ? PUBLICWEBDAVURL +"/"+path: 
                            (PublicWebdavroot +
                             SettingsStorageInDB.getencryptedpath(
                                 loggeduser + "/" + alias + "/" + path) +"/"+path)
                    }
                };

                return listOfFiles;
            }
        }
        
    }
}