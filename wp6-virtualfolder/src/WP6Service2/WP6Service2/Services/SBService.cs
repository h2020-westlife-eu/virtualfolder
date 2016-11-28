using System;
using ServiceStack;
using ServiceStack.OrmLite;
using ServiceStack.DataAnnotations;
using System.IO;
using System.Diagnostics;

namespace WP6Service2
{
	/** Abstract API for setting services in West-life instance
	*/
	[Route("/sbservice")]
	[Route("/sbservice/{Name}")]
	public class SBService
	{
		[AutoIncrement]
		public long Id { get; set; }		
		public bool enabled { get; set;}
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
			if (request.Name != default(String))
				return Db.Single<SBService>(x => x.Name == request.Name);; //returns single resource

			return Db.Select<SBService>(); //returns all
		}

		/** triggers action
		 */
		public object Post(SBService request)
		{
			if (string.IsNullOrEmpty(request.Name))
				throw new ArgumentNullException("Name");
			
			var service = Db.Single<SBService>(x => x.Name == request.Name); //returns single resource

			ProcessStartInfo psi = new ProcessStartInfo();
			psi.FileName = "/usr/bin/sudo";
			psi.UseShellExecute = false;
			psi.RedirectStandardOutput = true;
			psi.RedirectStandardError = true;

			psi.Arguments = service.TriggerScript;
			Process p = Process.Start(psi);
			request.TriggerOutput=p.StandardOutput.ReadToEnd();
			request.TriggerOutput += p.StandardError.ReadToEnd ();
			p.WaitForExit();
			//Console.WriteLine(strOutput);
			request.enabled = p.ExitCode == 0;
			return request;

		}

		/** Stores new service in DB, secure token is written in to filesystem and forgotten in DB
		 */

		public object Put(SBService request)
		{			
			//store secure token in tmp files
			using (StreamWriter outputFile = new StreamWriter("/tmp/.westlife/"+request.Name+".secrets")) {
				outputFile.WriteLine(request.Username+" "+request.Securetoken);
			}
			using (StreamWriter outputFile = new StreamWriter("/tmp/.westlife/"+request.Name+".secrets2")) {
				outputFile.Write(request.Username+":"+request.Securetoken);
			}
			request.Securetoken = "/tmp/.westlife/"+request.Name+".secrets"; //do not store secure token in DB
			var id = Db.Insert(request);
			var pathToResource =  base.Request.AbsoluteUri.CombineWith(request.Name);
			return HttpResult.Status201Created (Db.SingleById<SBService> (id), pathToResource);
		}

		public void Delete(SBService request)
		{
			Db.DeleteById<SBService> (request.Name);
		}

	}


}
	