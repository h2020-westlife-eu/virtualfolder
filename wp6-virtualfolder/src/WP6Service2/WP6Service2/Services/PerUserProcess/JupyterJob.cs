using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.NetworkInformation;
using System.Net.Sockets;
using System.Text.RegularExpressions;
using System.Threading;

using ServiceStack.OrmLite;
using ServiceStack.ServiceHost;

namespace WP6Service2.Services.PerUserProcess
{
    /** specific implementation for jupyter notebook - first arg is userid, second arg is portnumber
    */
    public class JupyterJob : DefaultJob
    {
        private long port =0;
        private string suffix;
        private string proxyurl;
        private string outputlog;        
        private const string Vflogdirvariable = "VF_LOG_DIR";

        private readonly string _logdir = String.IsNullOrEmpty(Environment.GetEnvironmentVariable(Vflogdirvariable))
            ? "/var/log/westlife/"
            : Environment.GetEnvironmentVariable(Vflogdirvariable);
            

        
        public JupyterJob(string jobname, IHttpRequest request, IDbConnection db, int pid) : base(jobname, request, db,
            pid)
        {
            port = getAvailablePort();
            var suffix2 = Regex.Replace(request.Items["authproxy"].ToString().Trim('/'),"[^A-Za-z0-9//]","");
            suffix2 = suffix2.StartsWith("webdav/")?suffix2.Substring("webdav/".Length):suffix2;
            //Console.WriteLine("JupyterJob: suffix="+suffix);
            suffix2 = ShortUrl;//suffix2.GetHashCode().ToString(); //workaround apache bug 53218 ProxyPass worker name too long, https://bz.apache.org/bugzilla/show_bug.cgi?id=53218
            proxyurl = "/vfnotebook" + "/"+suffix2;
            //proxyurl= proxyurl.TrimEnd('/');
            outputlog = _logdir+jobname + DateTime.Now.Ticks + ".log";
            suffix = request.Items["userid"] + " " +port + " " + proxyurl;//l+" "+getUrl();                        
        }
        
        const string BaseUrlChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        private static string ShortUrl
        {
            get
            {
                const int numberOfCharsToSelect = 8;
                int maxNumber = BaseUrlChars.Length;

                var rnd = new Random();
                var numList = new List<int>();

                for (int i = 0; i < numberOfCharsToSelect; i++)
                    numList.Add(rnd.Next(maxNumber));

                return numList.Aggregate(string.Empty, (current, num) => current + BaseUrlChars.Substring(num, 1));
            } 
        }
        
        //startJupyter.sh add|remove [username] [port] [proxyurlpart]
        public override string getArgs()
        {
            return suffix + " " + outputlog;
        }

        //returns 8901 + max id of already existing jobs.
        private long getAvailablePort()
        {
            
            long port = 8950; //<--- This is your value
            bool isAvailable = true;
            IPGlobalProperties ipGlobalProperties = IPGlobalProperties.GetIPGlobalProperties();
            TcpConnectionInformation[] tcpConnInfoArray = ipGlobalProperties.GetActiveTcpConnections();
            do
            {
                foreach (TcpConnectionInformation tcpi in tcpConnInfoArray)
                {
                    if (tcpi.LocalEndPoint.Port == port)
                    {
                        isAvailable = false;
                        port++;
                        break;
                    }
                }
                if (isAvailable) return port;
                else {port++;
                    isAvailable = true;
                }
              if (port>9950) throw new SocketException(1);//port is not available - tried 1000 loop                
            } while (true);            
        }

        public override string getUrl()
        {
            if (port==0) throw new ArgumentNullException("port","port not set.");
            return proxyurl;
        }

        public override bool Running()
        {
            //throw new NotImplementedException();
            //Thread.Sleep(1000);
            
            bool foundmyargs = false;
            var i = 0;
            do
            {
                if (i > 0) Thread.Sleep(i * 1000); //sleep 0, 1, 2, 3, 4 seconds and try to find local processes 
                Process[] localProcesses = Process.GetProcessesByName("python");
                foreach (var localProcess in localProcesses)
                {
                    //OS specific - works in Linux, on Windows use https://stackoverflow.com/questions/2633628/can-i-get-command-line-arguments-of-other-processes-from-net-c                
                    foundmyargs = foundmyargs || File.ReadAllText("/proc/" + localProcess.Id + "/cmdline")
                                      .Contains(port.ToString());
                }
            } while (!foundmyargs || i++ >= 2);
            return foundmyargs;
            //return localProcesses.Length > 0;
        }
        
    }
}