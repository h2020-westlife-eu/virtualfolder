using System;
using System.Data;
using System.Linq;
using System.Reflection;
using MetadataService.Services.Files;
using MetadataService.Services.Settings;
using Microsoft.OneDrive.Sdk;
using ServiceStack;
using Mono.Unix;
using Mono.Unix.Native;
//using ServiceStack.Data;
//using ServiceStack.Web;

using ServiceStack.OrmLite;
using ServiceStack.OrmLite.Sqlite;
using ServiceStack.WebHost.Endpoints;

namespace MetadataService
{
	public class Program
	{
	    //Define the Web Services AppHost
	    public class AppHost : AppHostHttpListenerBase {
	        public AppHost()
	            : base("HttpListener Self-Host", typeof(SBService).Assembly) {}

	        public override void Configure(Funq.Container container) {
	            container.Register<IDbConnectionFactory>(c => new OrmLiteConnectionFactory(
	                "db.sqlite", SqliteDialect.Provider)); //added db.sqlite as a file name of DB - fixes sqlite errors on in memory db not populated

	            //sets URL context to /metadataservice
	            SetConfig(new EndpointHostConfig {
	                ServiceStackHandlerFactoryPath = "metadataservice",
	                WebHostUrl = "/metadataservice"
	            });
	            // initialize some basic data in db
	            using (var db = container.Resolve<IDbConnectionFactory> ().Open ()) {
	                //drops table
	                //db.DropTable<DBSettings> ();
	                db.CreateTableIfNotExists<DBSettings>();
	                try
	                {
	                    var dbsettingslist = db.Select<DBSettings>();
	                    var dbsettings = dbsettingslist.First();
	                    var version = new Version(dbsettings.VirtualFolderVersion);
                        Console.WriteLine("Database version:" + dbsettings.VirtualFolderVersion);
	                }
	                catch (InvalidOperationException e)
	                {
	                    //not version stored - version <= 17.02 or new database
	                    Console.WriteLine("Database not versioned. Applying patch.");
                        var dbsettings = new DBSettings(){VirtualFolderVersion = Assembly.GetExecutingAssembly().GetName().Version.ToString()};
	                    db.Insert<DBSettings>(dbsettings);

	                    //create table
	                    db.CreateTableIfNotExists<PDBArtifact>();

                        //db.DropTable<SBService> ();
	                    String [][] services = {new string[]
	                            {"b2drop", "/bin/sudo","/home/vagrant/scripts/mountb2drop.sh"},
	                        new string[]{"ccp4suite","/bin/sudo", "/home/vagrant/bootstrap/bootstrapcvmfsccp4.sh yes"},
	                        new string[]{"scipion", "/bin/sh","/home/vagrant/scripts/startScipionWeb.sh"},
	                        new string[]{"virtuoso", "/bin/sh","/home/vagrant/scripts/startVirtuoso.sh"}
	                    };

	                    //create table
	                    db.CreateTableIfNotExists<SBService>();

	                    foreach (var service in services) {
	                        var p = new SBService { Name = service [0], Shell=service[1],TriggerScript = service [2] };
	                        db.Insert (p);
	                    }

	                    db.CreateTableIfNotExists<ProviderItem>();
	                    //encrypt secure keys in DB
	                    var items = db.Select<ProviderItem>();
	                    foreach (var item in items)
	                    {
	                        var b = item;
	                        SettingsStorageInDB.encrypt(ref b);
	                        db.Update<ProviderItem>(b);
	                    }
	                }

	            }
	        }
	    }

		//Run it!
		public static void Main(string[] args)
		{
		    var listeningOn = "http://*:8001/metadataservice/";
		    StartHost(listeningOn, args);

		    WaitForUnixSignal();

		    StopHost();
		}

	    private static void WaitForUnixSignal()
	    {
//	new UnixSignal(Signum.SIGINT),
	        UnixSignal[] signals = new UnixSignal[]
	        {
	            new UnixSignal(Signum.SIGTERM),
	            new UnixSignal(Signum.SIGUSR1)
	        };

	        // Wait for a unix signal
	        for (bool exit = false; !exit;)
	        {
	            int id = UnixSignal.WaitAny(signals);

	            if (id >= 0 && id < signals.Length)
	            {
	                if (signals[id].IsSet) exit = true;
	                Console.WriteLine("Received unix signal:" + id);
	            }
	        }
	    }

	    private static AppHost _appHost;

	    public static void StartHost(string listeningOn, string[] args)
	    {

	        //set account token
	        //if (args.Length > 0) WP6Service2.DropBoxFS.accesstoken = args[0];
	        _appHost = new AppHost();
	        _appHost.Init();

	        _appHost.Start(listeningOn);

	        Console.WriteLine("MetadataService " + Assembly.GetExecutingAssembly().GetName().Version.ToString()+" ServiceStack 3 Created at {0}, listening on {1}",
	            DateTime.Now, listeningOn);

	        //Unix specific
	    }

	    public static void StopHost()
	    {
	        _appHost.Dispose();
	    }
	}
}
