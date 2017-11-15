using System;
using System.Reflection;
using Mono.Unix;
using Mono.Unix.Native;
using ServiceStack.OrmLite;
using ServiceStack.WebHost.Endpoints;
using Container = Funq.Container;

namespace WebDavClientTest
{
    internal class Program
    {
        private static AppHost _appHost;

        //Run it!
        public static void Main(string[] args)
        {
            var listeningOn = "http://*:8002/webdavclienttest/";
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

            public AppHost()
                : base("HttpListener Self-Host", typeof(WebdavClientDTO).Assembly)
            {
            }

            public override void Configure(Container container)
            {

                //sets URL context to /metadataservice
                SetConfig(new EndpointHostConfig
                {
                    ServiceStackHandlerFactoryPath = "webdavclienttest",
                    WebHostUrl = "/webdavclienttest"
                });
            }
            
        }
    }        
}
