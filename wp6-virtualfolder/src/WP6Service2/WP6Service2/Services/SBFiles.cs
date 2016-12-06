using System;
using System.Collections.Generic;
using System.IO;
using ServiceStack;
using ServiceStack.ServiceInterface;

namespace WP6Service2
{

	[Flags] public enum FileType {
		None= 0,
		Directory = 1,
		Read = 2,
		Write = 4
	}


	/*** DTO of file infos
	 */
	public class SBFile
	{
		public String name { get; set;}
		public FileAttributes attributes { get; set; }
		public ulong size { get; set; }
		public DateTime date { get; set; }
		public String path { get; set; }
		public FileType filetype {get;set;}
		public String webdavuri { get; set; }
	}



    public partial class SBFileService : Service
	{
		/** returns list of files and directories under specified path of the configured root
		 * directory. 
		 */
		/*public object Get(SBFile request)
		{
			//sets default subpath
		    return FileSystem.ListOfFiles("");
		}*/

	}
	


}


