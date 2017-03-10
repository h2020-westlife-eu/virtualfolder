using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Net;
using System.Security.Policy;
using System.Threading;
using System.Threading.Tasks;
using ServiceStack.Common.Web;
using ServiceStack.ServiceClient.Web;
using ServiceStack.Text;
using MetadataService;
using MetadataService.Services.Files;
using MetadataService.Services.Settings;
using ServiceStack.Common.Extensions;

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

	    [Test()]
	    public void RefTestCase()
	    {
	        ProviderItem item;
	        ProviderItem item2;
	        string testmessage;
	        string testpassword;
	        PrepareTestProviderItems(out item, out item2, out testmessage, out testpassword);
	        SettingsStorageInDB.encrypt(ref item,testpassword);
	        Assert.False(item.securetoken.Equals(item2.securetoken)); //encrypted and nonencrypted are not same
	        Assert.True(item.loggeduser.Equals(item2.loggeduser)); //nonencrypted items are same
	        SettingsStorageInDB.decrypt(ref item, testpassword);
	        Assert.True(item.securetoken.Equals(item2.securetoken)); //decrypted and nonencrypted are same
	        Assert.True(item.loggeduser.Equals(item2.loggeduser)); //nonencrypted items are still same
	    }

	    private static void PrepareTestProviderItems(out ProviderItem item, out ProviderItem item2, out string testmessage,
	        out string testpassword)
	    {
	        item = new ProviderItem();
	        item2 = new ProviderItem();
	        testmessage = "secretmessage";
	        item2.securetoken = item.securetoken = testmessage;
	        item.loggeduser = item2.loggeduser = "testuser";
	        testpassword = "testkey89012";
	    }

	    [Test()]
	    public void Encrypt2TestCase()
	    {
	        ProviderItem item,item2;
	        string testmessage,testpassword;
	        PrepareTestProviderItems(out item, out item2, out testmessage, out testpassword);

	        SettingsStorageInDB.encrypt(ref item, testpassword);
	        SettingsStorageInDB.encrypt(ref item2, testpassword);
	        Assert.False(item2.securetoken.Equals(testmessage)); //item2 is encrypted not same as plaintext
	        var items = new List<ProviderItem>();
	        items.Add(item);
	        items.Add(item2);
	        Assert.False(items[0].securetoken.Equals(testmessage)); //item2 is encrypted not same as plaintext
	        Assert.False(items[1].securetoken.Equals(testmessage)); //item2 is encrypted not same as plaintext
	        SettingsStorageInDB.decrypt(ref items);
	        Assert.True(items[0].securetoken.Equals(testmessage));
	        Assert.True(items[1].securetoken.Equals(testmessage));

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

