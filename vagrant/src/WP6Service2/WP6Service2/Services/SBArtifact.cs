using System;
using ServiceStack;
using ServiceStack.OrmLite;
using ServiceStack.DataAnnotations;

namespace WP6Service2
{
	[Route("/pdbentry")]
	[Route("/pdbentry/{PDBId}")]
	public class PDBArtifact
	{
		[AutoIncrement]
		public long Id { get; set; }
		public String Description { get; set;}
		public String UriOfArtifact { get; set;}		
		public String PDBId { get; set;}
	}

	public class PDBArtifactService : Service
	{
		public object Get(PDBArtifact request) 
		{
			if (request.PDBId != default(String))
				return Db.Single<PDBArtifact>(x => x.PDBId == request.PDBId); //returns single resource

			return Db.Select<PDBArtifact>(); //returns all
		}

		public object Post(PDBArtifact request)
		{
			var id = Db.Insert(request);
			var pathToResource =  base.Request.AbsoluteUri.CombineWith(id.ToString());
			return HttpResult.Status201Created (Db.SingleById<PDBArtifact> (id), pathToResource);
		}
		public object Put(PDBArtifact request)
		{
			return Post (request);
		}
		public void Delete(PDBArtifact request)
		{
			Db.DeleteById<PDBArtifact> (request.Id);
		}
	}

}

