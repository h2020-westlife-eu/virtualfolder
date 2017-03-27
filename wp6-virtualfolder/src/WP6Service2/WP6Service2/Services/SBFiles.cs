using System;
using System.IO;
using System.Linq;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;
using ServiceStack.Text;

namespace MetadataService.Services
{

	[Flags] public enum FileType {
		None= 0,
		Directory = 1,
		Read = 2,
		Write = 4
	}



    /*** DTO of file infos
     */
    [Route("/sbfiles")]
    public class SBFile
	{
		public String name { get; set;}
		public FileAttributes attributes { get; set; }
		public ulong size { get; set; }
		public DateTime date { get; set; }
		public String path { get; set; }
		public FileType filetype {get;set;}
		public String webdavuri { get; set; }
	    public String publicwebdavuri { get; set; }
	}

    public interface IProviderContext
    {
        /** returns context URL under which the service is listening
        */
        String GetContext();
    }


}


