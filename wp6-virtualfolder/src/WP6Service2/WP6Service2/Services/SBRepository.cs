using System;
using ServiceStack;
using ServiceStack.OrmLite;
using ServiceStack.DataAnnotations;

namespace WP6Service2
{
	[Route("/sbrepository")]
	[Route("/sbrepository/{Id}")]
	public class SBRepository
	{
		[AutoIncrement] //OrmLite hint
		public long Id { get; set; }
		public String Description { get; set;}
		public String MountScript { get; set;}
	}

	public class SBRepositoryService : Service
	{
		public object Get(SBRepository request) 
		{
			if (request.Id != default(long))
				return Db.SingleById<SBRepository>(request.Id); //returns single resource

			return Db.Select<SBRepository>(); //returns all
		}

		public object Post(SBRepository request)
		{
			var id = Db.Insert(request);
			var pathToResource =  base.Request.AbsoluteUri.CombineWith(id.ToString());
			return HttpResult.Status201Created (Db.SingleById<SBRepository> (id), pathToResource);
		}
		public object Put(SBRepository request)
		{
			return Put (request);
		}
		public void Delete(SBRepository request)
		{
			Db.DeleteById<SBRepository> (request.Id);
		}

	}


}
	