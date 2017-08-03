using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading;
using Dropbox.Api.Properties;
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
        
        public JupyterJob(string jobname, IHttpRequest request, IDbConnection db, int pid) : base(jobname, request, db,
            pid)
        {
            var portnumber = getAvailablePort();            
            proxyurl = "/vfnotebook" + "/"+request.Items["authproxy"].ToString().Trim('/');
            //proxyurl= proxyurl.TrimEnd('/');
            outputlog = "/home/vagrant/logs/"+jobname + DateTime.Now.Ticks + ".log";
            suffix = request.Items["userid"] + " " +portnumber + " " + proxyurl;//l+" "+getUrl();                        
        }
        
        //startJupyter.sh add|remove [username] [port] [proxyurlpart]
        public override string getArgs()
        {
            return suffix + " " + outputlog;
        }

        //returns 8901 + max id of already existing jobs.
        private long getAvailablePort()
        {
            var b = db.Select<UserJob>().Select(x => x.Id);  
            port = 8950 + (b.Any() ? b.Max()+1 : 0) ;
            return port ;
        }

        public override string getUrl()
        {
            if (port==0) throw new ArgumentNullException("port","port not set.");
            return proxyurl;
        }

        public override bool Running()
        {
            //throw new NotImplementedException();
            Thread.Sleep(1000);
            Process[] localProcesses = Process.GetProcessesByName("jupyter-notebook");
            bool foundmyargs = false;
            foreach (var localProcess in localProcesses)
            {
                //OS specific - works in Linux, on Windows use https://stackoverflow.com/questions/2633628/can-i-get-command-line-arguments-of-other-processes-from-net-c                
                foundmyargs = foundmyargs || File.ReadAllText("/proc/" + localProcess.Id + "/cmdline").Contains(port.ToString());
            }
            return foundmyargs;
            //return localProcesses.Length > 0;
        }
        
    }
}