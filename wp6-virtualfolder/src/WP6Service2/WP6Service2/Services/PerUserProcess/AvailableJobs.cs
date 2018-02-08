﻿using System;
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
            new[] {"scipion", "/bin/bash", "/home/vagrant/scripts/startScipionWeb.sh"},
            new[] {"virtuoso", "/bin/bash", "/home/vagrant/scripts/startVirtuoso.sh"},
            new[] {"notebook","/bin/bash","/home/vagrant/scripts/startJupyter.sh"},
            new[] {"lab","/bin/bash","/home/vagrant/scripts/startJupyterlab.sh"},
            new[] {"vminstance","/bin/bash","/home/vagrant/scripts/startvm.sh"}
        };
        private static readonly List<JobType> list;
        private static readonly string ALLOW_ALL = "VF_ALLOW_ALL";
        private static readonly string ALLOW = "VF_ALLOW_"; //environment variable to allow will be ALLOW_JUPYTER, ALLOW_CCP4SUITE

        static AvailableJobs()
        {
            list = new List<JobType>();
            foreach (var service in services)
                if ((Environment.GetEnvironmentVariable(ALLOW_ALL) == "true")||(Environment.GetEnvironmentVariable((ALLOW+service[0]).ToUpper()) == "true"))
                list.Add(new JobType {Name = service[0], Shell = service[1], Script = service[2],Pwd="/home/vagrant"});               
        }
        
        public static List<JobType> getList() { return list; }

        public static IJobStrategy CreateJobInstance(string jobname,IHttpRequest request, IDbConnection db, int pid) //factory method
        {
            switch (jobname)
            {
                case "jupyter": 
                case "notebook": 
                case "lab": 
                    return new JupyterJob(jobname,request,db,pid);
                default: 
                    return new DefaultJob(jobname,request,db,pid);
            }
        }

        public static IJobStrategy CreateJobInstance(string requestName, IHttpRequest request, IDbConnection db)
        {
            return CreateJobInstance(requestName, request, db, 0);
        }
    }
}