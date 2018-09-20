using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Text;
using Dropbox.Api.Team;
using MetadataService;
using MetadataService.Services.Files;
using ServiceStack.Common.Web;
using ServiceStack.DataAnnotations;
using ServiceStack.OrmLite;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;
using ServiceStack.ServiceInterface.Cors;
using ServiceStack.Text;

namespace WP6Service2.Services.Dataset
{
    
    /* database schema */
    [Route("/dataset/{Id}", "GET,PUT,OPTIONS")]
    [Route("/dataset", "POST")]
    public class Dataset  : IReturn<Dataset>//dataset name, owner, id, 
    {
        [AutoIncrement]
        public long Id { get; set; }
        public string Owner { get; set; }
        public string Name { get; set; }
        public List<string> Entries { get; set; } //comma separated or blob of entries
        [StringLength(int.MaxValue)] //as TEXT
        public string Metadata { get; set; } //metadata content
        public string Provenance { get; set; } //metadata content
    }

    [Route("/dataset/name/{Name*}", "GET")]
    [Route("/datasetname/{Name*}", "GET")]
    public class DatasetByName : IReturn<Dataset>
    {
        public string Name { get; set; }
    }
    
    
    //will update provenance record by dat entered
    [Route("/dataset/provenance/wasprocessed/{Name*}", "POST")]
    public class DatasetProvenanceByName : IReturn<String>
    {
        public string Name { get; set; }
        public string Toolname { get; set; }
        public string ToolUrl { get; set; }
        public string ToolParameters { get; set; }
        public string FromEntity { get; set; }
        public string FromEntityUrl { get; set; }
        public string [] FromEntities { get; set; }
        public string [] FromEntitiesUrl { get; set; }
    }
    
    [Route("/dataset/{Id}/provenance", "GET")]
    public class ProvenanceOfDataset : IReturn<String>
    {
        public long Id { get; set; }
    }

    [Route("/dataset/{Id}/cerif", "GET")]
    public class CerifMetadataOfDataset : IReturn<String>
    {
        public long Id { get; set; }
    }
    
//obsolete, left for compatibility, not used anymore    
    public class DatasetEntry //entry of a dataset, consist of entryname (2hhd), type (PDB), url (http://pdb.org/2hhd.pdb)
    {
        [AutoIncrement]
        public long Id { get; set; }

        public string Type { get; set; }
        public string Url { get; set; }
        [Alias("Entry")]
        public string Name { get; set; }
    }

    public class DatasetEntries //relation between entry and dataset, one dataset contains multiple entries, 
    //one entry can be in multiple datasets
    {
        [AutoIncrement]
        public long Id { get; set; }

        [ForeignKey(typeof(Dataset), OnDelete = "CASCADE")]
        public long DatasetId { get; set; }

        [ForeignKey(typeof(DatasetEntry), OnDelete = "CASCADE")]
        public long DatasetEntryId { get; set; }
    }

    [Route("/dataset/{Id}", ",DELETE")]
    public class DeleteDataset : IReturnVoid
    {
        public long Id { get; set; }
    }


    [Route("/dataset", "GET,OPTIONS")]
    public class GetDatasets : IReturn<List<GetEntriesResponse>>
    {
    }

    public class GetEntriesResponse
    {
        public long Id { get; set; }
        public string Name { get; set; }
    }

    [EnableCors(allowCredentials:true)] //options for CORS    
    [VreCookieRequestFilter] //filters authenticated users, sets userid item in request
    public class DatasetService : Service
    {
        /**returns all datasets of a user */
        public List<GetEntriesResponse> Get(GetDatasets dtos)
        {
            var owner = (string) Request.Items["userid"];
            var result = Db.Where<Dataset>(x => x.Owner == owner)
                .Select(x => new GetEntriesResponse {Id = x.Id, Name = x.Name}).ToList();
            return result;
        }

        /** allow cors */
        public void Options(GetDatasets dtos)
        {
        }

        /**returns dataset details, everybody*/
        public Dataset Get(Dataset dto)
        {
            Dataset mydataset;
            try
            {
                //TODO return details for everybody or only to owner?? && x.Owner==owner
                mydataset = Db.Where<Dataset>(x => x.Id == dto.Id).First();
            }
            catch (InvalidOperationException e)
            { //nothing found - first() throws this exception
                    throw HttpError.NotFound("Dataset with id {0} does not exist".Fmt(dto.Id));
            }
            return mydataset;
        }

        //get by name only by owner
        public Dataset Get(DatasetByName dto)
        {
            Dataset mydataset;
            try
            {
              var owner = (string) Request.Items["userid"];
              mydataset = Db.Where<Dataset>(x => (x.Name == dto.Name) && (x.Owner == owner)).First();
            }
            catch (InvalidOperationException e)
            { //nothing found - first() throws this exception
                throw HttpError.NotFound("Dataset {0} does not exist".Fmt(dto.Name));                
            }
            return mydataset;
        }

        public String Get(ProvenanceOfDataset dto)
        {
            Dataset mydataset;
            try
            {
                mydataset = Db.Where<Dataset>(x => x.Id == dto.Id).First();
            }
            catch (InvalidOperationException e)
            { //nothing found - first() throws this exception
                throw HttpError.NotFound("Dataset with id {0} does not exist".Fmt(dto.Id));                
            }
            return mydataset.Provenance;            
        }

        public String Get(CerifMetadataOfDataset dto)
        {
            Dataset mydataset;
            try
            {
                mydataset = Db.Where<Dataset>(x => x.Id == dto.Id).First();
            }
            catch (InvalidOperationException e)
            { //nothing found - first() throws this exception
                throw HttpError.NotFound("Dataset with id {0} does not exist".Fmt(dto.Id));                
            }
            return @"<?xml version=""1.0"" encoding=""utf-8""?>"+ToCerif(mydataset);            
        }

        private String ToCerif(Dataset ds)
        {
            String cerif =@"
<cfResProd xmlns=""https://www.openaire.eu/cerif_schema/cerif-1.6-2_openaire-1.0.xsd""> 
  <cfResProdId>" + ds.Id + @"</cfResProdId> 
  <cfURI>/webdav/"+ ds.Name + @"</cfURI>
  <cfName>" + ds.Name + @"</cfName> 
  <cfDescr></cfDescr> 
  <cfResProd_Class>Dataset</cfResProd_Class>
  <cfResProd_Class>Restricted Access</cfResProd_Class>   
</cfResProd>";
              return cerif;
        }
        

        public void Options(Dataset dto) {}

        /* will store DatasetDTO as tables per DB schema */
        public Dataset Put(Dataset dto)
        {
            try
            {
                var mydataset = UpdateExisting(dto);
                dto.Id = mydataset.Id;
              //  CreateOrUpdateEntries(dto, mydataset);
                return dto;
            }
            catch (KeyNotFoundException) //in case Request.Item["userid"] is not set - unauthorized
            {
                throw new UnauthorizedAccessException();
            }
        }

        public Dataset Post(Dataset dto)
        {
            try
            {
                var mydataset = CreateNew(dto);
                dto.Id = mydataset.Id;
                //    CreateOrUpdateEntries(dto, mydataset);
                return dto;
            }
            catch (KeyNotFoundException) //in case Request.Item["userid"] is not set - unauthorized
            {
                throw new UnauthorizedAccessException();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
                throw e;
            }
        }

        public String Post(DatasetProvenanceByName dto)
        {

            var mydataset = Get(new DatasetByName {Name = dto.Name});
            Provenance provn = new Provenance(mydataset.Provenance);
            provn.AddToolPrefix(dto.Toolname, dto.ToolUrl);
            provn.AddEntityPrefix(dto.FromEntity, dto.FromEntityUrl);
            provn.AddWasDerivedFrom( mydataset.Name,dto.FromEntity+":");
            provn.AddActivity( dto.Toolname, dto.ToolParameters,DateTime.Now.ToString(),"-");
            return provn.ToString();
        }


        private Dataset CreateNew(Dataset dto)
        {//TODO lock
            dto.Owner =  (string) Request.Items["userid"];
            if (dto.Name.EndsWith("/")) dto.Name = dto.Name.TrimEnd('/'); 
            Db.Insert(dto);
            dto.Id = Db.GetLastInsertId();
            if (String.IsNullOrEmpty(dto.Provenance)) Deletescript(dto.Name);
            else Addscript(dto.Name, dto.Id);
            return dto;
        }



        private Dataset UpdateExisting(Dataset dto)
        {
            dto.Owner =  (string) Request.Items["userid"];
            Db.Update(dto);
            //call script to add/remove http header into apache conf
            if (String.IsNullOrEmpty(dto.Provenance)) Deletescript(dto.Name);
            else Addscript(dto.Name, dto.Id);
            return dto;
        }

        public void Delete(DeleteDataset dto)
        {
            try
            {
                var owner = (string) Request.Items["userid"];                
                if (Db.Where<Dataset>(x => x.Id == dto.Id && x.Owner == owner).Count > 0)
                {
                    var name = Db.First<Dataset>(x => x.Id == dto.Id && x.Owner == owner).Name;
                    Db.DeleteById<Dataset>(dto.Id);
                    Deletescript(name);
                } else
                    throw new FileNotFoundException("Cannot delete dataset with Id " + dto.Id);                
            }
            catch (KeyNotFoundException) //in case Request.Item["userid"] is not set - unauthorized
            {
                throw new UnauthorizedAccessException();
            }
        }
        private const string Vfscriptsdirvariable = "VF_SCRIPTS_DIR";
        private static readonly string Scriptsdir = Environment.GetEnvironmentVariable(Vfscriptsdirvariable) != null
            ? Environment.GetEnvironmentVariable(Vfscriptsdirvariable)
            : "/opt/virtualfolder/scripts/";
        private static readonly string Mountscript = Scriptsdir+"addProvHeader.sh";
        
        //execute script to add apache rule for Link header
        private void Addscript(string dtoName, long dtoId)
        {
            int exitcode;
            string url = Program.contextpath + "dataset/" + dtoId + "/provenance";
            string output = Utils.ExecuteShell("/bin/bash", new[]
            {
                //"-H -u vagrant", 
                //TODO make path of mountb2drop script configurable
                Mountscript,
                "add",
                dtoName,
                url
            }, out exitcode);
            Console.WriteLine(output);                        
        }
        
        //execute script to remove apache rule for Link header
        private void Deletescript(string dtoName)
        {
            int exitcode;
            //string url = Program.contextpath + "dataset/" + dtoId + "/provenance";
            string output = Utils.ExecuteShell("/bin/bash", new[]
            {
                //"-H -u vagrant", 
                //TODO make path of mountb2drop script configurable
                Mountscript,
                "remove",
                dtoName                
            }, out exitcode);
            Console.WriteLine(output);                        
        }
    }

    public class Provenance
    {
        private StringBuilder provn;
        public Provenance(string mydatasetProvenance)
        {
            provn = new StringBuilder(mydatasetProvenance);
            
        }

        public void AddToolPrefix(string dtoToolname, string dtoToolUrl)
        {
            //throw new NotImplementedException();
            provn.Append("  prefix"+dtoToolname+"<"+dtoToolUrl+">\n");
        }

        public void AddWasDerivedFrom(string thisentity,string dtoFromEntity)
        {
            //throw new NotImplementedException();
            provn.Append("  wasDerivedFrom(" + thisentity + ", " + dtoFromEntity + ")\n");
        }

        public void AddActivity(string dtoToolname, string dtoToolParameters, string startdate,string enddate)
        {
            //throw new NotImplementedException();
            //activity(wl-tool:haddock2.2, 2018-08-16,2018-08-17, [ex:param1=dataset:run.cns, ex:param2="b"])
            provn.Append("  activity(" + dtoToolname + ", " + startdate + ", " + enddate + ", [wltoolparam:param='" +
                         dtoToolParameters + "'])<n");
        }

        public String ToString()
        {
            return "document\n" + provn.ToString() + "endDocument\n";
        }

        public void AddEntityPrefix(string dtoFromEntity, string dtoFromEntityUrl)
        {
            provn.Append("  prefix"+dtoFromEntity+"<"+dtoFromEntityUrl+">\n");
        }
    }
}