using System;
using System.ComponentModel;
using System.Data;
using System.Reflection;
using MetadataService.Services;
using MetadataService.Services.Files;
using MetadataService.Services.Settings;
using Mono.Unix;
using Mono.Unix.Native;
using ServiceStack.OrmLite;
using ServiceStack.WebHost.Endpoints;
using WP6Service2.Services.Dataset;
using WP6Service2.Services.PerUserProcess;
using Container = Funq.Container;

namespace MetadataService
{
    public class Program
    {
        private static AppHost _appHost;

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
            UnixSignal[] signals =
            {
                new UnixSignal(Signum.SIGTERM),
                new UnixSignal(Signum.SIGUSR1),
                new UnixSignal(Signum.SIGABRT),
                new UnixSignal(Signum.SIGHUP),
                new UnixSignal(Signum.SIGINT)
            };

            // Wait for a unix signal
            for (var exit = false; !exit;)
            {
                var id = UnixSignal.WaitAny(signals);

                if (id >= 0 && id < signals.Length)
                {
                    if (signals[id].IsSet) exit = true;
                    Console.WriteLine("Received unix signal:" + id);
                }
            }
        }

        public static void StartHost(string listeningOn, string[] args)
        {
            //set account token
            //if (args.Length > 0) WP6Service2.DropBoxFS.accesstoken = args[0];
            _appHost = new AppHost();
            _appHost.Init();

            _appHost.Start(listeningOn);

            Console.WriteLine(
                "MetadataService " + Assembly.GetExecutingAssembly().GetName().Version +
                " ServiceStack 3 Created at {0}, listening on {1}",
                DateTime.Now, listeningOn);

            //Unix specific
        }

        public static void StopHost()
        {
            Console.WriteLine("MetadataService Shutdown");
            _appHost.Dispose();
        }

        //Define the Web Services AppHost
        public class AppHost : AppHostHttpListenerBase
        {
            private readonly string _SQLITE_FILENAME_VAR = "VF_DATABASE_FILE";

            public AppHost()
                : base("HttpListener Self-Host", typeof(UserJob).Assembly)
            {
            }

            public override void Configure(Container container)
            {
                //sqlite
                var connectionString = "Data Source=" +
                                       (Environment.GetEnvironmentVariable(_SQLITE_FILENAME_VAR) != null
                                           ? Environment.GetEnvironmentVariable(_SQLITE_FILENAME_VAR)
                                           : "db.sqlite") + ";Version=3;New=True;Compress=True;foreign keys=True";

                Console.WriteLine("configure connectionstring:" + connectionString);

                container.Register<IDbConnectionFactory>(c => new OrmLiteConnectionFactory(
                    connectionString,
                    SqliteDialect
                        .Provider)); //added db.sqlite as a file name of DB - fixes sqlite errors on in memory db not populated

                /*
                var connectionString = "Server=myServerAddress;Database=myDataBase;Uid=myUsername;Pwd=myPassword;" 
                    "Data Source=" +
                                       (Environment.GetEnvironmentVariable(_SQLITE_FILENAME_VAR) != null
                                           ? Environment.GetEnvironmentVariable(_SQLITE_FILENAME_VAR)
                                           : "db.sqlite") + ";Version=3;New=True;Compress=True;foreign keys=True";

                Console.WriteLine("configure connectionstring:" + connectionString);

                container.Register<IDbConnectionFactory>(c => new OrmLiteConnectionFactory(
                    connectionString,
                    MySqlDialect.Provider)); //added mysql
                    */
                //sets URL context to /metadataservice
                SetConfig(new EndpointHostConfig
                {
                    ServiceStackHandlerFactoryPath = "metadataservice",
                    WebHostUrl = "/metadataservice"
                });
                // initialize some basic data in db
                using (var db = container.Resolve<IDbConnectionFactory>().Open())
                {
                    //drops table
                    //db.DropTable<DBSettings> ();
                    Console.WriteLine("db.connectionstring:" + db.ConnectionString);
                    db.CreateTableIfNotExists<DBSettings>();
                    try
                    {
                        var dbsettings = SettingsStorageInDB.getDBSettings(db);
                        var version = new Version(dbsettings.VirtualFolderVersion);
                        Console.WriteLine("Database version:" + dbsettings.VirtualFolderVersion);
                        if (version.Build < 6340) FixTablesV1705(db);
                        try
                        {
                            if (SettingsStorageInDB.compareHash(dbsettings.KeyHash))
                            {
                                //hash are same, OK
                            }
                            else
                            {
                                if (SettingsStorageInDB.compareDefaultHash(dbsettings.KeyHash))
                                {
                                    Console.WriteLine(
                                        "Warning: database is encrypted with default key. Currently using new key. Replacing.");
                                    SettingsStorageInDB.storeSetting(db);
                                    SettingsStorageInDB.swapfromdefaultkey(db);
                                }
                                else
                                {
                                    Console.WriteLine(
                                        "Warning: database is encrypted with different key. Encrypted items will not be accessible.");
                                    //SettingsStorageInDB.storeSetting(db);
                                }
                                //throw new SecurityException("database is encrypted with different key");
                            }
                        }
                        catch (FormatException e)
                        {
                            //hash not stored
                            Console.WriteLine("Warning: Missing hash. Cannot validate encryption.{0}",e.Message);
                        }
                    }
                    catch (InvalidOperationException e)
                    {
                        //not version stored - version <= 17.02 or new database
                        Console.WriteLine("{0}\nDatabase not versioned. Applying patch. Encrypting selected items.",e.Message);
                        SettingsStorageInDB.storeSetting(db);
                        CreateTablesV1702(db);
                    }
                    //create tables

                    CreateTablesV1705(db);
                    CreateTablesV1707(db);
                }
            }

            //multiple encryption occurs - revers
            private void FixTablesV1705(IDbConnection db)
            {
                var items = db.Select<ProviderItem>();
                foreach (var item in items)
                {
                    var b = item;
                    var decrypted = true;
                    //while encrypted, decrypt
                    do
                    {
                        try
                        {
                            SettingsStorageInDB.decrypt(ref b);
                            //decrypted = true;
                        }
                        catch (WarningException)
                        {
                            decrypted = false;
                        }
                        catch (ArgumentException)
                        {
                            decrypted = false;
                        }
                        catch (FormatException)
                        {
                            decrypted = false;
                        }
                    } while (decrypted);
                    //now decrypted - encrypt once
                    SettingsStorageInDB.encrypt(ref b);
                    //store in db
                    db.Update(b);
                }
                SettingsStorageInDB.storeSetting(db);
                Console.WriteLine("Database patched, version updated.");
            }

            private static void CreateTablesV1702(IDbConnection db)
            {
                //DEPRECATED FROM v17.07
                //db.CreateTableIfNotExists<PDBArtifact>();                                
                db.CreateTableIfNotExists<ProviderItem>();
                //encrypt secure keys in DB
                var items = db.Select<ProviderItem>();
                foreach (var item in items)
                {
                    var b = item;
                    SettingsStorageInDB.encrypt(ref b);
                    db.Update(b);
                }
            }

            private void CreateTablesV1705(IDbConnection db)
            {
                db.CreateTableIfNotExists<Dataset>();
                db.CreateTableIfNotExists<DatasetEntry>();
                db.CreateTableIfNotExists<DatasetEntries>();
            }

            private void CreateTablesV1707(IDbConnection db)
            {
                if (db.TableExists("SBService")) db.DropTable<SBService>();
                //db.DropAndCreateTable<UserJob>();
                db.CreateTableIfNotExists<UserJob>();
            }
            
        }
    }
}