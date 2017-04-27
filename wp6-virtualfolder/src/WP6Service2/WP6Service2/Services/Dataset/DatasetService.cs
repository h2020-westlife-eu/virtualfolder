using System;
using System.Collections.Generic;
using System.Linq;
using MetadataService.Services.Files;
using MetadataService.Services.Settings;
using ServiceStack.Common.Extensions;
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
        public long DatasetId { get; set; }
        public long DatasetEntryId { get; set; }
    }

    /* DTO for API*/
    [Route("/dataset/{Name}")]
    public class DatasetDTO : IReturn<object>
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public List<string> Entries { get; set; }
        public List<string> Urls { get; set; }

    }

    [Route("/dataset")]
    public class DatasetsDTO : IReturn<object>
    {
        public List<string> DatasetNames { get; set; }
    }

    [VreCookieRequestFilter]
    public class DatasetService : Service
    {

        /**
returns all entries belonging to this dataset
*/
        public object Get(DatasetsDTO dtos)
        {
            var owner = (string) base.Request.Items["userid"];
            var result =Db.Where<Dataset>(x => x.Owner == owner).Select(x=> x.Name);
            return result;
        }

        public object Get(DatasetDTO dto)
        {
            var mydataset = Db.First<Dataset>(x =>  x.Name == dto.Name );
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

        /** will store DatasetDTO as tables per DB schema
*/
        public object Put(DatasetDTO dto)
        {
            try
            {
                var mydataset = new Dataset() {Name = dto.Name, Owner = (string) base.Request.Items["userid"]};
                Db.Insert<Dataset>(mydataset);
                mydataset.Id=Db.GetLastInsertId();
                dto.Id = mydataset.Id;
                for (var i =0;i<dto.Entries.Count;i++) //each (var myentry in dto.Entries)
                {
                    var mydatasetEntry = new DatasetEntry() {Entry = dto.Entries[i], Type = EntryType.OTHER,Url=dto.Urls[i]};
                    var dbentry = Db.Select<DatasetEntry>(x => (x.Entry == dto.Entries[i]) && (x.Url == dto.Urls[i]));
                    if (dbentry.Count > 0)
                    {
                        mydatasetEntry.Id = dbentry[0].Id;
                    }
                    else
                    {
                        Db.Insert<DatasetEntry>(mydatasetEntry);
                        mydatasetEntry.Id = Db.GetLastInsertId();
                    }
                    var mydatasetentries = new DatasetEntries(){DatasetId = mydataset.Id,DatasetEntryId = mydatasetEntry.Id};
                    Db.Insert<DatasetEntries>(mydatasetentries);
                }
                //var entries = new DatasetEntries();
                return dto;
            }
            catch (KeyNotFoundException e) //in case Request.Item["userid"] is not set - unauthorized
            {
                throw new UnauthorizedAccessException();
            }
        }

        public void Delete(DatasetDTO dto)
        {
            try
            {
                var owner = (string) base.Request.Items["userid"];
                var result = Db.Where<Dataset>(x => (x.Owner == owner)&&(x.Name== dto.Name));
                if (result.Count > 0)
                {
                    Db.Delete(result);
                }

            }
            catch (KeyNotFoundException e) //in case Request.Item["userid"] is not set - unauthorized
            {
                throw new UnauthorizedAccessException();
            }

        }
    }
}