using System;
using System.IO;
using ServiceStack.ServiceHost;

namespace MetadataService.Services
{
    [Flags]
    public enum FileType
    {
        None = 0,
        Directory = 2 ^ 0,
        Read = 2 ^ 1,
        Write = 2 ^ 2
    }


    /*** DTO of file infos
     */
    [Route("/sbfiles")]
    public class SBFile
    {
        public string name { get; set; }
        public FileAttributes attributes { get; set; }
        public ulong size { get; set; }
        public DateTime date { get; set; }
        public string path { get; set; }
        public FileType filetype { get; set; }
        public string webdavuri { get; set; }
        public string publicwebdavuri { get; set; }
    }

    public interface IProviderContext
    {
        /** returns context URL under which the service is listening
        */
        string GetContext();
    }
}