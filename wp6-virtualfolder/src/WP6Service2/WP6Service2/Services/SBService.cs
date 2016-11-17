using System;
using ServiceStack;
using ServiceStack.OrmLite;
using ServiceStack.DataAnnotations;

namespace WP6Service2
{
	[Route("/sbservice")]
	[Route("/sbservice/{Id}")]
	public class SBService
	{
		[AutoIncrement] //OrmLite hint
		public long Id { get; set; }
		public String Description { get; set;}
		public String MountScript { get; set;}
	}

	public class SBRepositoryService : Service
	{
		public object Get(SBService request) 
		{
			if (request.Id != default(long))
				return Db.SingleById<SBService>(request.Id); //returns single resource

			return Db.Select<SBService>(); //returns all
		}

		public object Post(SBService request)
		{
			var id = Db.Insert(request);
			var pathToResource =  base.Request.AbsoluteUri.CombineWith(id.ToString());
			return HttpResult.Status201Created (Db.SingleById<SBService> (id), pathToResource);
		}
		public object Put(SBService request)
		{
			return Post (request);
		}
		public void Delete(SBService request)
		{
			Db.DeleteById<SBService> (request.Id);
		}

	}


}
	