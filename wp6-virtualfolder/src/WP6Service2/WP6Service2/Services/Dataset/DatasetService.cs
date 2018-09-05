using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
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
    public class DatasetByName : IReturn<Dataset>
    {
        public string Name { get; set; }
    }
    [Route("/dataset/{Id}/provenance", "GET")]
    public class ProvenanceOfDataset : IReturn<String>
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

    /* DTO for API*/
/*    [Route("/dataset/{Id}", "GET,PUT,OPTIONS")]
    [Route("/dataset/name/{Name*}", "GET")]
    [Route("/dataset", "POST")]
    public class DatasetDTO : IReturn<DatasetDTO>
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Metadata { get; set; }
        public List<DatasetEntry> Entries { get; set; }    
    }
*/
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

        public void Options(GetDatasets dtos)
        {
        }

        /**returns dataset details, everybody? or owner only*/
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
              mydataset = Db.Where<Dataset>(x => x.Name == dto.Name && x.Owner==owner).First();
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
        }

        /*private void CreateOrUpdateEntries(Dataset dto, Dataset mydataset)
        {
            var existingre = Db.Where<DatasetEntries>(de => de.DatasetId == mydataset.Id).Select(x => x.DatasetEntryId);

            for (var i = 0; i < dto.Entries.Count; i++) //each (var myentry in dto.Entries)
            {
                var mydatasetEntry = dto.Entries[i];
                //new DatasetEntry
                //{
                //    Name = dto.Entries[i].Name,
                //    Type = dto.Entries[i].Type,
                //    Url = dto.Entries[i].Url
                //};
                //check if such entry with url exists
                var dbentry = Db.Where<DatasetEntry>(x => x.Name == dto.Entries[i].Name);
                var dbentryurls = dbentry.Select(x => x.Url); // &&
                //(x.Url == ((dto.Urls != null) ? dto.Urls[i] : "")));
                if (dbentryurls.Contains(mydatasetEntry.Url)) //use existing entry
                {
                    mydatasetEntry.Id = dbentry.First(x => x.Url == mydatasetEntry.Url).Id;
                }
                else //insert new entry
                {
                    Db.Insert(mydatasetEntry);
                    mydatasetEntry.Id = Db.GetLastInsertId();
                }
                //insert relation Dataset-Name
                if (!existingre.Contains(mydatasetEntry.Id))
                {
                    var mydatasetentries =
                        new DatasetEntries {DatasetId = mydataset.Id, DatasetEntryId = mydatasetEntry.Id};

                    Db.Insert(mydatasetentries);
                }
            }
        }
*/
        private Dataset CreateNew(Dataset dto)
        {//TODO lock
            dto.Owner =  (string) Request.Items["userid"];
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
}