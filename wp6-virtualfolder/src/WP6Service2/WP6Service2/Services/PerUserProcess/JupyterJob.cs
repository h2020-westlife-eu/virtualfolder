using System;
using System.CodeDom;
using System.Data;
using System.Linq;
using ServiceStack.OrmLite;
using ServiceStack.ServiceHost;

namespace WP6Service2.Services.PerUserProcess
{
    /** specific strategy pattern for jupyter notebook - first arg is userid, second arg is portnumber
    */
    public class JupyterJob : DefaultJobStrategy
    {
        public JupyterJob(string jobname, IHttpRequest request, IDbConnection db,int pid) : base(jobname,request,db,pid) {}
        private long port =0;
        private string suffix;
        public override string getArgs()
        {
            var portnumber = getAvailablePort();
            suffix = portnumber+ " "+"/vfnotebook/"+request.Items["authproxy"]+" "+getUrl();
            return request.Items["userid"] + " " +suffix;
        }

        public override string getStopArgs()
        {
            return "remove " + suffix;
        }

        //returns 8901 + max id of already existing jobs.
        private long getAvailablePort()
        {
            var b = db.Select<UserJob>().Select(x => x.Id);  
            port = 8900 + (b.Any() ? b.Max()+1 : 0) ;
            return 8900 + (b.Any() ? b.Max()+1 : 0) ;
        }

        public override string getUrl()
        {
            if (port==0) throw new ArgumentNullException("port","port not set. Call getArgs() first.");
            return "http://localhost:" + port + "/";
        }
    }
}