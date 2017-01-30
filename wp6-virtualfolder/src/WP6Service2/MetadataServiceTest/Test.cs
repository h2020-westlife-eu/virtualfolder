using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using ServiceStack.Common.Web;
using ServiceStack.ServiceClient.Web;
using ServiceStack.Text;
using WP6Service2;
using WP6Service2.Services.Files;

namespace MetadataServiceTest
{
	[TestFixture ()]
	public class Test
	{
	    string BaseUri = "http://localhost:8001/metadataservice/";


	    private string _dk = "";

	    [TestFixtureSetUp]
	    public void TestFixtureSetUp()
	    {
	        //sets the dropbox key to parallel task
	        //WP6Service2.Program.StartHost(BaseUri,new string[]{});
	        //wait 1 second
	        Thread.Sleep(1000);
	    }

	    [TestFixtureTearDown]
	    public void TestFixtureTearDown()
	    {
	        //Dispose it on TearDown
	        //Program.StopHost();
	    }

	    [Test()]
	    public void DropboxTestCase()
	    {
	        //Assert.AreEqual(DropBoxFS.accesstoken, _dk);
	    }

	    [Test ()]
	    public void DropboxListFilesTestCase (){

	    var client = new JsonServiceClient(BaseUri);
		    //GET /customers

		    //Assert.That(all.Count > 0); //at least some files returned
		}

	    [Test()]
	    public void SBServiceTestCase()
	    {
	        var client = new JsonServiceClient(BaseUri);
	        var all = client.Get(new SBService() {Name = "scipion"});
	        Assert.True(all.ToString().Length>0);
	        Assert.True(all.ToString().StartsWith("{Id"));
	    }

	    [Test()]
	    public void SessionIdTestCase()
	    {
	        var sessionid = "nfy6putttqh3vsa3tfxyc6qhmghur896";
	        var client = new JsonServiceClient("http://localhost:8004/api/vfsession/" + sessionid);
            var response = client.Get<DjangoUserInfo>("");
	        Assert.True(response.username.Equals("vagrant"));
	    }

	    [Test()]
	    public void SessionId2TestCase()
	    {
	        var sessionid = "nfy6putttqh3vsa3tfxyc6qhmghur896";
	        var client = new JsonServiceClient("http://localhost:8004/api/");
	        var response = client.Get<DjangoUserInfo>("vfsession/" + sessionid);
	        Assert.True(response.username.Equals("vagrant"));
	    }
	    [Test()]

	    public void SessionBadIdTestCase()
	    {
	        var sessionid = "nonsense";
	        var client = new JsonServiceClient("http://localhost:8004/api/");
	        try
	        {
	            var response = client.Get<DjangoUserInfo>("vfsession/" + sessionid);
	            Assert.Fail("no exception thrown");
	        }
	        catch (Exception e)
	        {
	            Assert.Pass("expected exception thrown:"+e.Message);
	        }
	    }


	    [Test()]
	    public void RawMetadataServiceTestCase()
	    {
	        var client = new JsonServiceClient("http://localhost:8001/metadataservice/");
	        var response = client.Get<string>("");
	        Assert.True(response.Length>0);
	    }

	    [Test()]
	    public void ApacheMetadataServiceTestCase()
	    {
	        var client = new JsonServiceClient("http://localhost/metadataservice/metadata");
	        IWebProxy webProxy = new WebProxy("http://localhost:8080");
	        client.Proxy = webProxy;
	        var response = client.Get<string>("");
	        Assert.True(response.Length>0);
	    }
	}
}

