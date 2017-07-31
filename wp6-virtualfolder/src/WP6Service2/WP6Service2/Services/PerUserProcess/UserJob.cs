using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using MetadataService.Services.Files;
using ServiceStack.Common.Web;
using ServiceStack.DataAnnotations;
using ServiceStack.OrmLite;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;
using ServiceStack.ServiceClient.Web;
using ServiceStack.Text;
using ServiceStack.WebHost.Endpoints.Support.Markdown;

namespace WP6Service2.Services.PerUserProcess
{

    //list of available jobs

    /** Abstract API for managing jobs in West-life Virtual Folder instance
    */    
            
    public class UserJob 
    {
        [AutoIncrement]
        public long Id { get; set; }
        public int pid { get; set; }
        public string jobType { get; set; }        
        public string Username { get; set; }
        public string Args { get; set; }
        public string Output { get; set; }
        public string Error { get; set; }
        public string LocalUrl { get; set; }
    }

    [Route("/userprocess", "GET")]
    public class GetUserJobs : IReturn<List<UserJob>>
    { }

    [Route("/userprocess/{Name}/{Args*}", "POST,DELETE")]
    public class PostUserJob : IReturn<UserJob>
    {
        public string Name { get; set; }
        public string Args { get; set; }
    }

    [Route("/accessprocess/{Name}/{Url*}")]
    public class AccessProcess : IReturn<object>
    {
        public string Name { get; set; }
        public string Url { get; set; }
    }

    [Route("/availabletasks", "GET")]
    public class AvailableTasks : IReturn<List<AvailableTasks>>
    {
        public string Name { get; set; }
        public bool Running { get; set; }
        public string LocalUrl { get; set; }
    }
        
    
    [VreCookieRequestFilter]
    public class UserJobService : Service
    {
        /** gets information
         */

        public object Get(GetUserJobs request)
        {            
            //gets username which is loffed within this session
            var owner = (string) Request.Items["userid"];
            //returns all his jobs
            try
            {
                return SelectUserJobs(owner);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message+e.StackTrace);
                throw;
            }
        }

        private List<UserJob> SelectUserJobs(string owner)
        {
            return Db.Select<UserJob>(x => x.Username == owner).ToList();
        }

        /** triggers action
         */
        public object Post(PostUserJob request)
        {
            try
            {
                if (string.IsNullOrEmpty(request.Name))
                    throw new ArgumentNullException("Missing 'Name' in requesting to trigger user job.");

                //gets username which is loffed within this session
                var owner = (string) Request.Items["userid"];
                //returns existing job info
                if (Db.Select<UserJob>(x => x.jobType == request.Name && x.Username == owner).Count > 0)
                    return Db.First<UserJob>(x => x.jobType == request.Name && x.Username == owner);

                //creates new job
                var service = new UserJob()
                {
                    jobType = request.Name,
                    Username = owner
                };                
                var job = AvailableJobs.CreateJobInstance(request.Name, Request, Db);
                service.pid = job.Start();
                service.LocalUrl = job.getUrl();
                service.Args = job.getArgs();
                Db.Insert(service);
                return service;
            } catch (Exception e)
            {
                Console.WriteLine(e.Message+e.StackTrace);
                throw e;
            }
        }

        public object Delete(PostUserJob request)
        {
            try
            {

                //gets username which is loffed within this session
                var owner = (string) Request.Items["userid"];
                //returns existing job info
                if (Db.Select<UserJob>(x => x.jobType == request.Name && x.Username == owner).Count > 0)
                {
                    var j = Db.First<UserJob>(x => x.jobType == request.Name && x.Username == owner);
                    var p = AvailableJobs.CreateJobInstance(request.Name, Request, Db, j.pid);
                    Db.DeleteById<UserJob>(j.Id);
                    p.Stop();
                    return j;
                }
                throw new FileNotFoundException("Cannot kill job '" + request.Name + "' for user '" + owner +
                                                "'. No such job exists.");
            } catch (Exception e)
            {
                Console.WriteLine(e.Message+e.StackTrace);
                throw e;
            }
        }

        public object Any(AccessProcess ap)
        {
            var owner = (string) Request.Items["userid"];
            if (Db.Select<UserJob>(x => x.jobType == ap.Name && x.Username == owner).Count == 0) 
                throw new FileNotFoundException("Cannot access job '" + ap.Name + "' for user '" + owner +
                                                "'. No such job exists.");
                var url= Db.First<UserJob>(x => x.jobType == ap.Name && x.Username == owner).LocalUrl;
            return (url+ap.Url).GetBytesFromUrl();
        }

        public object Get(AvailableTasks at)
        {
            var owner = (string) Request.Items["userid"];
            var userjobs = SelectUserJobs(owner).Select(x=> x.jobType);
            var result = AvailableJobs.getList().Select(x => new AvailableTasks() {Name = x.Name,Running=userjobs.Contains(x.Name),LocalUrl=userjobs.Contains(x.Name)?SelectUserJobs(owner).First(y=>y.jobType==x.Name).LocalUrl:""}).ToList();
            return result;
        }
    }
}