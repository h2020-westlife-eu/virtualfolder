using System.Collections.Generic;
using System.Data;
using ServiceStack.ServiceHost;

namespace WP6Service2.Services.PerUserProcess
{
    /** holder of available job types and factory method to create strategy instance for the job
    */
    public static class AvailableJobs
    {
        private static readonly string[][] services =
        {
            new[] {"ccp4suite", "/bin/sudo", "/home/vagrant/bootstrap/bootstrapcvmfsccp4.sh yes"},
            new[] {"scipion", "/bin/sh", "/home/vagrant/scripts/startScipionWeb.sh"},
            new[] {"virtuoso", "/bin/sh", "/home/vagrant/scripts/startVirtuoso.sh"},
            new[] {"jupyter","/bin/sh","/home/vagrant/scripts/startJupyter.sh"},
            new[] {"vminstance","/bin/sh","/home/vagrant/scripts/startvm.sh"}
        };
        private static readonly List<JobType> list;

        static AvailableJobs()
        {
            list = new List<JobType>();
            foreach (var service in services)              
                list.Add(new JobType {Name = service[0], Shell = service[1], Script = service[2]});               
        }
        
        public static List<JobType> getList() { return list; }

        public static IJobStrategy CreateJobInstance(string jobname,IHttpRequest request, IDbConnection db, int pid) //factory method
        {
            switch (jobname)
            {
                case "jupyter": 
                    return new JupyterJob(jobname,request,db,pid);
                default: 
                    return new DefaultJobStrategy(jobname,request,db,pid);
            }
        }

        public static IJobStrategy CreateJobInstance(string requestName, IHttpRequest request, IDbConnection db)
        {
            return CreateJobInstance(requestName, request, db, 0);
        }
    }
}