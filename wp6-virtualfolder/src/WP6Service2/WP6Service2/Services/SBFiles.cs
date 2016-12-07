using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Dropbox.Api.Sharing;
using ServiceStack;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;
using ServiceStack.Text;

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
	}

    public interface IFileProvider
    {
        /** returns context URL under which the service is listening
        */
        String GetContext();
    }

    public partial class SBFileService : Service
    {
        protected const String WEBDAVROOT ="/webdav";

		public object Get(SBFile request)
		{
		    Console.WriteLine("SBFile().Get()");
		    //gets all implementation of IFileProvider
		    var type = typeof(IFileProvider);
		    var types = AppDomain.CurrentDomain.GetAssemblies()
		        .SelectMany(s => s.GetTypes())
		        .Where(p => type.IsAssignableFrom(p) && p.IsClass && !p.IsAbstract);
		    //var listOfContext = new List<SBFile>();
		    //gets files on root directory of working space
		    var listOfContext = FileSystemFS.ListOfFiles("");
		    //adds services which are not listed
		    //construct list of providers by calling mandatory method of the
		    foreach (var providerimplementation in types)
		    {
		        Console.WriteLine("implementation name:" +providerimplementation.FullName);

		        var context = ((IFileProvider) providerimplementation.CreateInstance()).GetContext();
		        if (!string.IsNullOrEmpty(context))
		        {
		            //add the context if it is notyet cached in file system
		            if (listOfContext.FindAll(x => x.name==context).Count==0)
		            listOfContext.Add(new SBFile()
		            {
		                name = context,
		                attributes = FileAttributes.Directory,
		                path = context,
		                filetype = FileType.Directory,
		                webdavuri = WEBDAVROOT + "/" + context
		            });
		        }
		    }
		    return listOfContext;
		}
	}
	


}


