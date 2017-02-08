using System;
using ServiceStack;
using ServiceStack.OrmLite;
using ServiceStack.DataAnnotations;
using System.IO;
using System.Diagnostics;
using MetadataService.Services.Files;
using ServiceStack.Common;
using ServiceStack.Common.Utils;
using ServiceStack.Common.Web;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;

namespace MetadataService
{
	/** Abstract API for setting services in West-life instance
	*/
	[Route("/sbservice")]
	[Route("/sbservice/{Name}")]
	public class SBService :IReturn<object>
	{
		[AutoIncrement]
		public long Id { get; set; }		
		public bool enabled { get; set;}
	    public String Shell { get; set; }
		public String Name { get; set; }
		public String Username { get; set; }
		public String Securetoken { get; set; } 
		public String Description { get; set;}
		public String TriggerScript { get; set;}
		public String TriggerOutput { get; set; }
	}

	public class SBRepositoryService : Service
	{
		/** gets information
		 */

		public object Get(SBService request) 
		{
			if (!string.IsNullOrEmpty(request.Name))
				return Db.First<SBService>(x => x.Name == request.Name);; //returns single resource
			return Db.Select<SBService>(); //returns all
		}

		/** triggers action
		 */
		public object Post(SBService request)
		{
			if (string.IsNullOrEmpty(request.Name))
				throw new ArgumentNullException("Name");
			
			var service = Db.First<SBService>(x => x.Name == request.Name);; //returns single resource
		    int exitcode;
		    service.TriggerOutput = Utils.ExecuteShell(service.Shell, new string[]{service.TriggerScript}, out exitcode);
			service.enabled = exitcode == 0;
		    //service.TriggerOutput = request.TriggerOutput;
		    Db.Update<SBService>(service);
			return service;
		}

	    // PUT and DELETE removed - security risk

	}


}
	