using NUnit.Framework;
using System;
using System.Threading;
using System.Threading.Tasks;
using ServiceStack.ServiceClient.Web;
using WP6Service2;

namespace MetadataServiceTest
{
	[TestFixture ()]
	public class Test
	{
	    string BaseUri = "http://localhost:8002/metadataservice/";

	    string keyencoded = "WHgxeVdKbTJaa0FBQUFBQUFBQUFDcHpUY0xSamhzeU1LRkZ6X3lxY1gwcDdUa0pId1pucVhyMEZVQnpKT2JRcw==";

	    private string _dk = "";

	    [TestFixtureSetUp]
	    public void TestFixtureSetUp()
	    {
	        //Start service apphost as another task
	        _dk = System.Text.Encoding.UTF8.GetString(Convert.FromBase64String(keyencoded));
	        //sets the dropbox key to parallel task
	        WP6Service2.Program.StartHost(BaseUri, new string[]{_dk});
	        //wait 1 second
	        Thread.Sleep(1000);
	    }

	    [TestFixtureTearDown]
	    public void TestFixtureTearDown()
	    {
	        //Dispose it on TearDown
	        Program.StopHost();
	    }

	    [Test()]
	    public void DropboxTestCase()
	    {
	        Assert.AreEqual(DropBoxFS.accesstoken, _dk);
	    }
	    [Test ()]
	    public void DropboxListFilesTestCase (){

	    var client = new JsonServiceClient(BaseUri);
		    //GET /customers
		    var all = client.Get(new DropBoxSBFile(){path=""});
		    Assert.That(all.Count > 0); //at least some files returned
		}

	    [Test()]
	    public void SBServiceTestCase()
	    {
	        var client = new JsonServiceClient(BaseUri);
	        var all = client.Get(new SBService() {Name = "scipion"});
	        Assert.True(all.GetType() == typeof(SBService));
	        Assert.True(((SBService) all).Name == "scipion");
	    }
	}
}

