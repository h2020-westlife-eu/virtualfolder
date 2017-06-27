using System;
using MetadataService.Services.Files;
using ServiceStack.DataAnnotations;
using ServiceStack.OrmLite;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;

namespace MetadataService
{
    /** Abstract API for setting services in West-life instance
    */
    [Route("/sbservice")]
    [Route("/sbservice/{Name}")]
    public class SBService : IReturn<object>
    {
        [AutoIncrement]
        public long Id { get; set; }

        public bool enabled { get; set; }
        public string Shell { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Securetoken { get; set; }
        public string Description { get; set; }
        public string TriggerScript { get; set; }
        public string TriggerOutput { get; set; }
    }

    public class SBRepositoryService : Service
    {
        /** gets information
         */

        public object Get(SBService request)
        {
            if (!string.IsNullOrEmpty(request.Name))
                return Db.First<SBService>(x => x.Name == request.Name);
            //returns single resource
            return Db.Select<SBService>(); //returns all
        }

        /** triggers action
         */
        public object Post(SBService request)
        {
            if (string.IsNullOrEmpty(request.Name))
                throw new ArgumentNullException("Name");

            var service = Db.First<SBService>(x => x.Name == request.Name);
            //returns single resource
            int exitcode;
            service.TriggerOutput = Utils.ExecuteShell(service.Shell, new[] {service.TriggerScript}, out exitcode);
            service.enabled = exitcode == 0;
            //service.TriggerOutput = request.TriggerOutput;
            Db.Update(service);
            return service;
        }

        // PUT and DELETE removed - security risk
    }
}