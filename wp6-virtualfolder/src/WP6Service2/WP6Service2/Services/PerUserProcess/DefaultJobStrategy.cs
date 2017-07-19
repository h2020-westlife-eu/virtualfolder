using System.Data;
using System.Diagnostics;
using System.Linq;
using ServiceStack.ServiceHost;

namespace WP6Service2.Services.PerUserProcess
{
    /** default job strategy - no args returns jobtype
    */
    public class DefaultJobStrategy:IJobStrategy
    {
        private readonly JobType jobtype;
        protected IHttpRequest request;
        protected IDbConnection db;
        private int pid;
        public DefaultJobStrategy(string jobname,IHttpRequest _request,IDbConnection _db,int _pid=0)
        {
            jobtype = AvailableJobs.getList().First(x => x.Name == jobname);
            request = _request;
            db = _db;
            pid = _pid;
        }
        public virtual string getArgs()
        {
            return "";
        }
        public virtual string getStopArgs()
        {
            return "remove";
        }

        public virtual int Start()
        {
            var psi = new ProcessStartInfo
            {
                FileName = jobtype.Shell,
                UseShellExecute = false,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                Arguments = jobtype.Script +" "+ getArgs()
            };
            pid = Process.Start(psi).Id;
            return pid;
        }

        public virtual void Stop()
        {
            var psi = Process.GetProcessById(pid);
            //Output = psi.StandardOutput.ReadToEndAsync();
            //Error = psi.StandardError.ReadToEndAsync();            
            psi.Kill();
            var psi2 = new ProcessStartInfo
            {
                FileName = jobtype.Shell,
                UseShellExecute = false,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                Arguments = jobtype.Script +" "+ getStopArgs()
            };
            Process.Start(psi2);
        }

        public virtual string getUrl()
        {
            return "";
        }
    }
}