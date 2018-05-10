using System;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Text;
using ServiceStack.Common;
using ServiceStack.ServiceHost;

namespace WP6Service2.Services.PerUserProcess
{
    /** default job implementation - no args returns jobtype
    */
    public class DefaultJob:IJobStrategy
    {
        protected readonly JobType jobtype;
        protected IHttpRequest request;
        protected IDbConnection db;
        private int pid;
        public DefaultJob(string jobname,IHttpRequest _request,IDbConnection _db,int _pid=0,string args="")
        {
            jobtype = AvailableJobs.getList().First(x => x.Name == jobname);
            request = _request;
            db = _db;
            pid = _pid;
        }

        public virtual string getStartArgs()
        {
            return "add "+getArgs();
        }
        
        public virtual string getArgs()
        {
            return "";
        }
        
        public virtual string getStopArgs()
        {
            return "remove "+getArgs();
        }

        public virtual int Start()
        {
            var psi = new ProcessStartInfo
            {
                FileName = jobtype.Shell,
                WorkingDirectory = jobtype.Pwd,
                UseShellExecute = false,
                RedirectStandardOutput = false,
                RedirectStandardError = false,
                Arguments = jobtype.Script +" "+ getStartArgs()
            };
            pid = Process.Start(psi).Id;
            return pid;
        }

        public virtual void Stop()
        {
            //stops remaining process
            try
            {
                var psi = Process.GetProcessById(pid);
                //Output = psi.StandardOutput.ReadToEndAsync();
                //Error = psi.StandardError.ReadToEndAsync();            
                psi.Kill();
            }
            catch (Exception) {}
            //get stop arguments and launch
            var psi2 = new ProcessStartInfo
            {
                FileName = jobtype.Shell,
                UseShellExecute = false,
                RedirectStandardOutput = false,
                RedirectStandardError = false,
                Arguments = jobtype.Script +" "+ getStopArgs()
            };
            Process.Start(psi2);
        }

        public virtual bool Running()
        {
            //throw new NotImplementedException();
            Process[] localProcesses = Process.GetProcessesByName(jobtype.Name);
            return localProcesses.Length > 0;
        }

        public virtual string getUrl()
        {
            return "";
        }        
    }
}