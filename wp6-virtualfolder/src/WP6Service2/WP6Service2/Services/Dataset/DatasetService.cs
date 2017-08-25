using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using MetadataService.Services.Files;
using ServiceStack.DataAnnotations;
using ServiceStack.OrmLite;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;
using ServiceStack.ServiceInterface.Cors;

namespace WP6Service2.Services.Dataset
{
    /* database schema */
    public class Dataset //dataset name, owner, id
    {
        [AutoIncrement]
        public long Id { get; set; }
        public string Owner { get; set; }
        public string Name { get; set; }
    }

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
    [Route("/dataset/{Id}", "GET,PUT,OPTIONS")]
    [Route("/dataset", "POST")]
    public class DatasetDTO : IReturn<DatasetDTO>
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public List<DatasetEntry> Entries { get; set; }
    }

    [Route("/dataset/{Id}", ",DELETE")]
    public class DeleteDataset : IReturnVoid
    {
        public long Id { get; set; }
    }

    [Route("/datasetnofk/{Id}", ",DELETE")]
    public class DeleteDatasetNoFk : IReturnVoid
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

    //returns list of entries, which exists in some of the dataset
    [Route("/entry", "GET,OPTIONS")]
    public class GetEntries : IReturn<List<GetEntriesResponse>>
    {
    }

    [Route("/entry/{Name}", "GET,OPTIONS")] //list of urls associated with the entry name
    public class GetEntry : IReturn<List<DatasetEntry>>
    {
        public string Name { get; set; }
    }

    [Route("/datasetentry", "GET,OPTIONS")]
    public class GetDatasetEntries : IReturn<List<DatasetEntries>>
    {
    }

    [EnableCors(allowCredentials:true)] //options for CORS    
    [VreCookieRequestFilter] //filters authenticated users, sets userid item in request
    public class DatasetService : Service
    {
        /**returns all entries belonging to this dataset */
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

        /**returns dataset details */
        public DatasetDTO Get(DatasetDTO dto)
        {
            var mydataset = Db.Where<Dataset>(x => x.Id == dto.Id).First();
            dto.Name = mydataset.Name;
            //var entries = Db.Where<DatasetEntries>(x => x.DatasetId == dto.Id).First();
            //dto.Entries = Db.Select<DatasetEntry>().ToList();
            /* RAW SQL seems to produce sqliteexception
            var myentries = Db.Select<DatasetEntry>(
                "SELECT * FROM DatasetEntry " +
                "INNER JOIN DatasetEntries ON DatasetEntries.DatasetEntryId = DatasetEntry.Id" +
                "WHERE DatasetEntries.DatasetId = "+dto.Id+ ";"
                ).ToList();
            dto.Entries = myentries;*/
            
            dto.Entries = new List<DatasetEntry>();
            var myentries= Db.Select<DatasetEntries>(x => x.DatasetId == dto.Id).ToList();
            foreach (var myentryid in myentries)
            {
                var myentry = Db.First<DatasetEntry>(x => x.Id == myentryid.DatasetEntryId);
                dto.Entries.Add(myentry);
            }
            return dto;
        }

        public void Options(DatasetDTO dto) {}

        //returns list of entries, which exists in some of the dataset
        public List<GetEntriesResponse> Get(GetEntries dtos)
        {
            return Db.Select<DatasetEntry>().Select(x => new GetEntriesResponse {Id = x.Id, Name = x.Name}).ToList();
        }

        public void Options(GetEntries dtos)
        {
        }

        public List<string> Get(GetEntry dto)
        {
            return Db.Where<DatasetEntry>(x => x.Name == dto.Name).Select(x => x.Url).ToList();
        }
        
        public void Options(GetEntry dto) {}

        public List<DatasetEntries> Get(GetDatasetEntries dtos)
        {
            return Db.Select<DatasetEntries>().ToList();
        }

        public void Options(GetDatasetEntries dtos) {}
        /** will store DatasetDTO as tables per DB schema
*/
        public DatasetDTO Put(DatasetDTO dto)
        {
            try
            {
                var mydataset = UpdateExisting(dto);
                dto.Id = mydataset.Id;
                CreateOrUpdateEntries(dto, mydataset);
                return dto;
            }
            catch (KeyNotFoundException) //in case Request.Item["userid"] is not set - unauthorized
            {
                throw new UnauthorizedAccessException();
            }
        }


        public DatasetDTO Post(DatasetDTO dto)
        {
            try
            {
                var mydataset = CreateNew(dto);
                dto.Id = mydataset.Id;
                CreateOrUpdateEntries(dto, mydataset);
                return dto;
            }
            catch (KeyNotFoundException) //in case Request.Item["userid"] is not set - unauthorized
            {
                throw new UnauthorizedAccessException();
            }
        }

        private void CreateOrUpdateEntries(DatasetDTO dto, Dataset mydataset)
        {
            var existingre = Db.Where<DatasetEntries>(de => de.DatasetId == mydataset.Id).Select(x => x.DatasetEntryId);
            for (var i = 0; i < dto.Entries.Count; i++) //each (var myentry in dto.Entries)
            {
                var mydatasetEntry = dto.Entries[i];
                /*new DatasetEntry
                {
                    Name = dto.Entries[i].Name,
                    Type = dto.Entries[i].Type,
                    Url = dto.Entries[i].Url
                };*/
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

        private Dataset CreateNew(DatasetDTO dto)
        {//TODO lock
            var mydataset = new Dataset {Name = dto.Name, Owner = (string) Request.Items["userid"]};
            Db.Insert(mydataset);
            mydataset.Id = Db.GetLastInsertId();
            return mydataset;
        }

        private Dataset UpdateExisting(DatasetDTO dto)
        {
            var myowner = (string) Request.Items["userid"];
            var mydataset = Db.Select<Dataset>(x => x.Id == dto.Id && x.Owner == myowner);
            if (mydataset.Count == 0) throw new FileNotFoundException("dataset with Id " + dto.Id);
            return mydataset.First();
        }

        public void Delete(DeleteDataset dto)
        {
            Db.SqlScalar<int>("PRAGMA foreign_keys=ON;"); //enable foreign keys and cascade delete
            try
            {
                var owner = (string) Request.Items["userid"];
                if (Db.Where<Dataset>(x => x.Id == dto.Id && x.Owner == owner).Count > 0)
                    Db.DeleteById<Dataset>(dto.Id);
                else
                    throw new FileNotFoundException("Cannot delete dataset with Id " + dto.Id);
            }
            catch (KeyNotFoundException) //in case Request.Item["userid"] is not set - unauthorized
            {
                throw new UnauthorizedAccessException();
            }
        }

        //for testing purposes
        public void Delete(DeleteDatasetNoFk dto)
        {
            //var fk = Db.SqlScalar<int>("PRAGMA foreign_keys=ON;"); //enable foreign keys and cascade delete

            try
            {
                var owner = (string) Request.Items["userid"];
                if (Db.Where<Dataset>(x => x.Id == dto.Id && x.Owner == owner).Count > 0)
                    Db.DeleteById<Dataset>(dto.Id);
                else
                    throw new FileNotFoundException("Cannot delete dataset with Id " + dto.Id);
            }
            catch (KeyNotFoundException) //in case Request.Item["userid"] is not set - unauthorized
            {
                throw new UnauthorizedAccessException();
            }
        }
    }
}