using System;
using System.Collections.Generic;
using System.Linq;
using Dropbox.Api.TeamPolicies;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface.Cors;

namespace MetadataService.Services.Files
{
    [Route("/migratefiles", "GET,POST")] //GET returns aliases able to migrate, POST do migration 
    public class MigrateAliases :IReturn<List<ProviderItem>>
    {
        public List<string> Alias { get; set; }
        public List<string> RenameAlias { get; set; }
    }
    
    [EnableCors(allowCredentials:true)]
    [VreCookieRequestFilter]
    
    public class MigrateAliasesService : GenericProviderMethods
    {
        /** returns list of configured file providers */
        public List<ProviderItem> Get(MigrateAliases request)
        {
            return getOldUserProviderItems();
        }

        /** returns list of configured file providers */
        public List<ProviderItem> Post(MigrateAliases request)
        {
            try
            {
                //get full items from old account
                var pis = getFullOldUserProviderItems();
                var up = getUserProviders();

                //move them the new account
                foreach (var alias in request.Alias)
                {
                    var pi2 = pis.First(x => x.alias == alias);
                    var pi= new ProviderItem(){accessurl = pi2.accessurl,alias=pi2.alias,loggeduser = pi2.loggeduser,securetoken = pi2.securetoken,type=pi2.type,username=pi2.username};
                    //what if same already exist? rename if such field is provided
                    if ((request.RenameAlias != null) && (request.RenameAlias.Count > 0))
                    {
                        pi.alias = request.RenameAlias[request.Alias.IndexOf(alias)];
                    }

                    up.Add(pi, storage, Db);
                }
            }
            catch (Exception e)
            {
                //Console.WriteLine(e.Message);
                Console.WriteLine(e.StackTrace);
                throw;
            }

            //now return the list in new account
            return getUserProviderItems();
        }
        
    }
}