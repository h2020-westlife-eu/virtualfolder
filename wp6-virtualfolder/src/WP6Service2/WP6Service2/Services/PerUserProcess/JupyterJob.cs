using System;
using System.CodeDom;
using System.Data;
using System.Linq;
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
    }
}