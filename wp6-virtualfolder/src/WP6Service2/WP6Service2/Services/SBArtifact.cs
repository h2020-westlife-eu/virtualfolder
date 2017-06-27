using ServiceStack.Common;
using ServiceStack.Common.Web;
using ServiceStack.DataAnnotations;
using ServiceStack.OrmLite;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;

namespace MetadataService
{
    [Route("/pdbentry")]
    [Route("/pdbentry/{PDBId}")]
    public class PDBArtifact
    {
        [AutoIncrement]
        public long Id { get; set; }

        public string Description { get; set; }
        public string UriOfArtifact { get; set; }
        public string PDBId { get; set; }
    }

    public class PDBArtifactService : Service
    {
        public object Get(PDBArtifact request)
        {
            if (request.PDBId != default(string))
                return Db.First<PDBArtifact>(x => x.PDBId == request.PDBId); //returns single resource

            return Db.Select<PDBArtifact>(); //returns all
        }

        public object Post(PDBArtifact request)
        {
            Db.Insert(request);
            var id = Db.GetLastInsertId();
            var pathToResource = Request.AbsoluteUri.CombineWith(id.ToString());
            return HttpResult.Status201Created(Db.GetById<PDBArtifact>(id), pathToResource);
        }

        public object Put(PDBArtifact request)
        {
            return Post(request);
        }

        public void Delete(PDBArtifact request)
        {
            Db.DeleteById<PDBArtifact>(request.Id);
        }
    }
}