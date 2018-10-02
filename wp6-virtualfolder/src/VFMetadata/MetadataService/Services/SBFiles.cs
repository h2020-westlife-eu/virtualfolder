using System;
using System.IO;

namespace MetadataService.Services
{
    [Flags]
    public enum FileType
    {
        None = 0,
        Directory = 1 << 0,
        Read = 1 << 1,
        Write = 1 << 2,
        Available = 1 << 3
    }


    /*** DTO of file infos
     */    
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

}