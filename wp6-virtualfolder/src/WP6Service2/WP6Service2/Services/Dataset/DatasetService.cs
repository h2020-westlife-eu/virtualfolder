using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using MetadataService.Services.Files;
using ServiceStack.DataAnnotations;
using ServiceStack.OrmLite;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;

namespace WP6Service2.Services.Dataset
{

    /* database schema */
    public class Dataset
    {
        [AutoIncrement]
        public long Id { get; set; }
        public string Owner { get; set; }
        public string Name { get; set; }
    }

    /** enumeration of structural biology entry types, currently pdb, uniprot and other */
    public enum EntryType { OTHER, PDB, UNIPROT}

    public class DatasetEntry
    {
        [AutoIncrement]
        public long Id { get; set; }
        public EntryType Type { get; set; }
        public string Url { get; set; }
        public string Entry { get; set; }
    }

    public class DatasetEntries
    {
        [AutoIncrement]
        public long Id { get; set; }
        [ForeignKey(typeof(Dataset),OnDelete = "CASCADE")]
        public long DatasetId { get; set; }
        [ForeignKey(typeof(DatasetEntry),OnDelete = "CASCADE")]
        public long DatasetEntryId { get; set; }
    }

    /* DTO for API*/
    [Route("/dataset/{Id}", "GET,PUT")]
    [Route("/dataset", "POST")]
    public class DatasetDTO : IReturn<DatasetDTO>
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public List<string> Entries { get; set; }
        public List<string> Urls { get; set; }

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

    [Route("/dataset", "GET")]
    public class GetDatasets : IReturn<List<GetResponse>> {}


    public class GetResponse
    {
        public long Id { get; set; }
        public string Name { get; set; }
    }

    [Route("/entry", "GET")]
    public class GetEntries : IReturn<List<GetResponse>>{}

    [Route("/entry/{Name}", "GET")] //list of urls associated with the entry name
    public class GetEntry : IReturn<List<string>>
    {
        public string Name { get; set; }
    }

    [Route("/datasetentry", "GET")]
    public class GetDatasetEntries : IReturn<List<DatasetEntries>>{}

    [VreCookieRequestFilter]
    public class DatasetService : Service
    {

        /**
returns all entries belonging to this dataset
*/
        public List<GetResponse> Get(GetDatasets dtos)
        {
            var owner = (string) base.Request.Items["userid"];
            var result =Db.Where<Dataset>(x => x.Owner == owner).
                Select(x=> new GetResponse(){Id=x.Id, Name= x.Name}).ToList();
            return result;
        }

        public DatasetDTO Get(DatasetDTO dto)
        {
            var mydataset = Db.Where<Dataset>(x =>  x.Id == dto.Id ).First();
            dto.Name = mydataset.Name;
            dto.Entries = new List<string>();
            var myentries = Db.Select<DatasetEntries>(x => x.DatasetId == dto.Id);
            foreach (var myentryid in myentries)
            {
                var myentry = Db.First<DatasetEntry>(x => x.Id == myentryid.DatasetEntryId);
                dto.Entries.Add(myentry.Entry);
            }
            return dto;
        }

        public List<GetResponse> Get(GetEntries dtos)
        {
            return Db.Select<DatasetEntry>().Select(x => new GetResponse() {Id = x.Id, Name = x.Entry}).ToList();
        }

        public List<string> Get(GetEntry dto)
        {
            return Db.Where<DatasetEntry>(x => x.Entry == dto.Name).Select(x => x.Url).ToList();
        }

        public List<DatasetEntries> Get(GetDatasetEntries dtos)
        {
            return Db.Select<DatasetEntries>().ToList();
        }

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
            catch (KeyNotFoundException e) //in case Request.Item["userid"] is not set - unauthorized
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
            catch (KeyNotFoundException e) //in case Request.Item["userid"] is not set - unauthorized
            {
                throw new UnauthorizedAccessException();
            }
        }

        private void CreateOrUpdateEntries(DatasetDTO dto, Dataset mydataset)
        {
            var existingre = Db.Where<DatasetEntries>(de => (de.DatasetId==mydataset.Id)).Select(x => x.DatasetEntryId);
            for (var i = 0; i < dto.Entries.Count; i++) //each (var myentry in dto.Entries)
            {
                var mydatasetEntry = new DatasetEntry()
                {
                    Entry = dto.Entries[i],
                    Type = EntryType.OTHER,
                    Url = (dto.Urls != null) ? dto.Urls[i] : ""
                };
                //check if such entry with url exists
                var dbentry = Db.Where<DatasetEntry>(x => (x.Entry == dto.Entries[i]));
                    var dbentryurls =dbentry.Select(x => x.Url);// &&
                                                           //(x.Url == ((dto.Urls != null) ? dto.Urls[i] : "")));
                if (dbentryurls.Contains(mydatasetEntry.Url)) //use existing entry
                {
                    mydatasetEntry.Id = dbentry.First(x => x.Url==mydatasetEntry.Url).Id;
                }
                else //insert new entry
                {
                    Db.Insert<DatasetEntry>(mydatasetEntry);
                    mydatasetEntry.Id = Db.GetLastInsertId();
                }
                //insert relation Dataset-Entry
                if (!existingre.Contains(mydatasetEntry.Id))
                {
                    var mydatasetentries =
                        new DatasetEntries() {DatasetId = mydataset.Id, DatasetEntryId = mydatasetEntry.Id};

                    Db.Insert<DatasetEntries>(mydatasetentries);
                }
            }
        }

        private Dataset CreateNew(DatasetDTO dto)
        {
            var mydataset = new Dataset() {Name = dto.Name, Owner = (string) base.Request.Items["userid"]};
            Db.Insert<Dataset>(mydataset);
            mydataset.Id = Db.GetLastInsertId();
            return mydataset;
        }

        private Dataset UpdateExisting(DatasetDTO dto)
        {
            var myowner = (string) Request.Items["userid"];
            var mydataset = Db.Select<Dataset>(x => x.Id == dto.Id && x.Owner == myowner);
            if (mydataset.Count==0) throw new FileNotFoundException("dataset with Id "+dto.Id);
            return mydataset.First();
        }

        public void Delete(DeleteDataset dto)
        {

            var fk = Db.SqlScalar<int>("PRAGMA foreign_keys=ON;"); //enable foreign keys and cascade delete

            try
            {
                var owner = (string) base.Request.Items["userid"];
                if (Db.Where<Dataset>(x => x.Id == dto.Id && x.Owner == owner).Count > 0)
                {
                    Db.DeleteById<Dataset>(dto.Id);
                    //cascade delete?

                    //workaround for cascade delete
                    /*var deids= Db.Where<DatasetEntries>(x => x.DatasetId == dto.Id).Select(x => x.Id);
                    Db.DeleteByIds<DatasetEntries>(deids);
*/
                }
                else
                    throw new FileNotFoundException("Cannot delete dataset with Id " + dto.Id);

            }
            catch (KeyNotFoundException e) //in case Request.Item["userid"] is not set - unauthorized
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
                var owner = (string) base.Request.Items["userid"];
                if (Db.Where<Dataset>(x => x.Id == dto.Id && x.Owner == owner).Count > 0)
                {
                    Db.DeleteById<Dataset>(dto.Id);
                    //cascade delete?

                    //workaround for cascade delete
                    /*var deids= Db.Where<DatasetEntries>(x => x.DatasetId == dto.Id).Select(x => x.Id);
                    Db.DeleteByIds<DatasetEntries>(deids);
*/
                }
                else
                    throw new FileNotFoundException("Cannot delete dataset with Id " + dto.Id);

            }
            catch (KeyNotFoundException e) //in case Request.Item["userid"] is not set - unauthorized
            {
                throw new UnauthorizedAccessException();
            }

        }
    }
}