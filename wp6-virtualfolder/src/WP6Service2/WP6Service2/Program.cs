using System;
using System.Data;
using System.Reflection;
using ServiceStack;
using Mono.Unix;
using Mono.Unix.Native;
using ServiceStack.Data;
using ServiceStack.Web;

using ServiceStack.OrmLite;
using ServiceStack.OrmLite.Sqlite;

namespace WP6Service2
{
	class Program
	{

		//Define the Web Services AppHost
		public class AppHost : AppSelfHostBase {
			public AppHost()
				: base("HttpListener Self-Host", Assembly.GetExecutingAssembly()){}

			public override string ResolveAbsoluteUrl(string virtualPath, IRequest req)
			{
				virtualPath = virtualPath.SanitizedVirtualPath();
				return req.GetAbsoluteUrl(virtualPath);
			}

			public override void Configure(Funq.Container container) {
				//make metadata urls relative behind reverse proxy
				var hc = new HostConfig ();
				hc.WebHostUrl = "/metadataservice";
				SetConfig (hc);

				container.Register<IDbConnectionFactory>(c => new OrmLiteConnectionFactory(
					":memory:", SqliteDialect.Provider));

				using (var db = container.Resolve<IDbConnectionFactory> ().Open ()) {
					//drops table
					db.DropTable<PDBArtifact> ();
					//create table
					if (db.CreateTableIfNotExists<PDBArtifact> ()) {
						var p = new PDBArtifact { Id = 1, Description = "The cryo-EM structure of Zika Virus", PDBId = "5ire", UriOfArtifact="http://www.ebi.ac.uk/pdbe/entry/pdb/5ire" };
						db.Insert (p);
						p = new PDBArtifact { Id = 2, Description = "Dendrotoxin", PDBId = "1dtu", UriOfArtifact="http://www.ebi.ac.uk/pdbe/entry/pdb/1dtu" };
						db.Insert (p);
						//Add seed data
					}
					db.DropTable<SBService> ();
					String [][] services = {new string[]
						{"b2drop", "/home/vagrant/scripts/mountb2drop.sh"},
						new string[]{"ccp4suite", "/home/vagrant/bootstrap/bootstrapcvmfsccp4.sh yes"},
						new string[]{"scipion", "/home/vagrant/bootstrap/startscipionWeb.sh"},
						new string[]{"virtuoso", "/home/vagrant/scripts/startVirtuoso.sh"}
					};

					//create table
					if (db.CreateTableIfNotExists<SBService> ()) {
						foreach (var service in services) {
							var p = new SBService { Name = service [0], TriggerScript = service [1] };
							db.Insert (p);
						}
						
						//Add seed data
					}
				}
			}
		}

		//Run it!
		static void Main(string[] args)
		{
			var listeningOn = "http://*:8001/metadataservice/";
		    //set account token
		    if (args.Length>0) WP6Service2.DropBoxFS.accesstoken = args[0];
			//var appHost = 
			new AppHost()
				.Init()
				.Start(listeningOn);

			Console.WriteLine("MetadataService2 Created at {0}, listening on {1}",
				DateTime.Now, listeningOn);

			//Unix specific
			UnixSignal [] signals = new UnixSignal[] {
				new UnixSignal(Signum.SIGINT),
				new UnixSignal(Signum.SIGTERM),
			};

			// Wait for a unix signal
			for (bool exit = false; !exit; )
			{
				int id = UnixSignal.WaitAny(signals);

				if (id >= 0 && id < signals.Length)
				{
					if (signals[id].IsSet) exit = true;
				}
			}
		}
}
}
