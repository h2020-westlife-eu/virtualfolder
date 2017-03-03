using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using ServiceStack.Common.Web;
using ServiceStack.ServiceClient.Web;
using ServiceStack.Text;
using MetadataService;
using MetadataService.Services.Files;

namespace MetadataServiceTest
{
	[TestFixture ()]
	public class Test
	{
	    string BaseUri = "http://localhost:8002/metadataservice/";


	    [TestFixtureSetUp]
	    public void TestFixtureSetUp()
	    {
	        //sets the dropbox key to parallel task
	        //WP6Service2.Program.StartHost(BaseUri,new string[]{});
	        //wait 1 second
	        Program.StartHost(BaseUri,null);
	        Thread.Sleep(1000);
	    }

	    [TestFixtureTearDown]
	    public void TestFixtureTearDown()
	    {
	        //Dispose it on TearDown
	        Program.StopHost();
	    }

	    [Test()]
	    public void SBServiceTestCase()
	    {
	        var client = new JsonServiceClient(BaseUri);
	        var all = client.Get(new SBService() {Name = "scipion"});
	        Assert.That(all.ToString(), Is.StringStarting("{Id"));
	    }



	    [Test()]
	    public void RawMetadataServiceTestCase()
	    {
	        var client = new JsonServiceClient(BaseUri);
	        var response = client.Get<string>("");
	        Assert.True(response.Length>0);
	    }

	    /*[Test()]
	    public void ApacheIntegrationServiceTestCase()
	    {
	        var client = new JsonServiceClient("http://localhost/metadataservice/metadata");
	        var response = client.Get<string>("");
	        Assert.True(response.Length>0);
	    }*/
	    //TODO tune up test for providers
	    /*[Test()]
	    public void GetListOfProvidersTestCase()
	    {
	        var client = new JsonServiceClient(BaseUri);
	        var response = client.Get<List<string>>("/providers");//new Providers(){});
	        //response must contain dropbox, b2drop, optionally filesystem
	        Assert.True(response.Contains("Dropbox"));
	        Assert.True(response.Contains("B2drop"));
	        //filesystem is available only when it is allowed by environment variable
	        if (Environment.GetEnvironmentVariable(ProviderFactory.ALLOW_FILESYSTEM_VAR)=="true")
	            Assert.True(response.Contains("FileSystem"));
	        else
	            Assert.False(response.Contains("FileSystem"));

	    }*/
	}
}

