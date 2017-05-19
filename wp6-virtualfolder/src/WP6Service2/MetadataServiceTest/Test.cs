using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using ServiceStack.ServiceClient.Web;
using MetadataService;
using MetadataService.Services.Files;
using MetadataService.Services.Settings;
using WP6Service2.Services.Dataset;

namespace MetadataServiceTest
{
	[TestFixture ()]
	public class Test
	{
	    string _baseUri = "http://localhost:8001/metadataservice/";


	    [TestFixtureSetUp]
	    public void TestFixtureSetUp()
	    {
	        //sets the dropbox key to parallel task
	        //WP6Service2.Program.StartHost(BaseUri,new string[]{});
	        //wait 1 second
		    //Environment.SetEnvironmentVariable("VF_STORAGE_PKEY", "xYD+jvVfisbY5Mer1ZfTEuv7KWw/NZN0BJaUoTBSFXw=");
		    //Environment.SetEnvironmentVariable("VF_DATABASE_FILE", "home/vagrant/.westlife/metadata.sqlite");
	        Program.StartHost(_baseUri,null);
	        Thread.Sleep(1000);
	    }

	    [TestFixtureTearDown]
	    public void TestFixtureTearDown()
	    {
	        //Dispose it on TearDown
	        Program.StopHost();
	    }

	    [Test()]
	    public void SbServiceTestCase()
	    {
	        var client = new JsonServiceClient(_baseUri);
	        var all = client.Get(new SBService() {Name = "scipion"});
	        Assert.That(all.ToString(), Is.StringStarting("{Id"));
	    }



	    [Test()]
	    public void RawMetadataServiceTestCase()
	    {
	        var client = new JsonServiceClient(_baseUri);
	        var response = client.Get<string>("");
	        Assert.True(response.Length>0);
	    }

	    [Test()]
	    public void EncryptingChangeContentOfSecureItemTestCase()
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
	    public void EncryptingAndDecriptingListOfItemsTestCase()
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
	        SettingsStorageInDB.decrypt(ref items,testpassword);
	        Assert.True(items[0].securetoken.Equals(testmessage));
	        Assert.True(items[1].securetoken.Equals(testmessage));

	    }

	    [Test()]
	    public void PostingDeletingDatasetTestCase()
	    {
	        var client = new JsonServiceClient(_baseUri);
	        var all = client.Get(new GetDatasets() );
		    var firstcount = all.Count;
		    Console.WriteLine(" DatasetTestCase() firstcount:"+firstcount);
		    Assert.True(all.Count >= 0);
		    //    Is.StringStarting("[")); // asserts that the json is array
	        var mydto = new DatasetDTO()
	        {
	            Name="testdataset",
	            Entries=new string[]{"2hhd","3csb","4yg0"}.ToList(),
	            Urls=new string[]{"http://www.pdb.org/2hhd","http://www.pdb.org/3csb","http://www.pdb.org/4yg0"}.ToList()
	        };

	        var mydto2=client.Post(mydto);

		    all = client.Get(new GetDatasets() );
		    Console.WriteLine(" DatasetTestCase() all.count:"+all.Count);
		    Assert.True(all.Count == (firstcount+1));

	        var all2 = client.Get(new GetDatasets());//gets all
	        //var testdto = JsonSerializer.DeserializeFromString<DatasetsDTO>(all2.ToString());
	        var all3 = client.Get(new DatasetDTO() {Id = mydto2.Id});
	        //var all3 = JsonSerializer.DeserializeFromString<DatasetDTO>(all3.ToString());
		    Console.WriteLine(" DatasetTestCase() all3.name:"+all3.Name+" mydto.Name"+mydto.Name);
	        Assert.True(all3.Name == mydto.Name);
	        //Assert.True(all3.Entries.Count==mydto.Entries.Count);
	        //Assert.True(all3.Entries[0]==mydto.Entries[0]);
	        //Assert.True(all3.Urls.Count==mydto.Urls.Count);
	        //Assert.True(all3.Urls[0]==mydto.Urls[0]);

		    client.Delete(new DeleteDataset(){Id = mydto2.Id});

		    all = client.Get(new GetDatasets() );
		    Assert.True(all.Count == firstcount);

	    }

		[Test()]
		public void PostingDeletingDatasetShouldIncreaseDecreaseEntriesTestCase()
		{
			//check no entries 2hh1,3csa,4yg1, get entries relation to dataset - put dataset, check whether entries present
			//check whether number of relation increased by 3, then delete
			var client = new JsonServiceClient(_baseUri);
			var entries = client.Get(new GetEntries());
			Assert.False(entries.Select(x => x.Name).Contains("2hh1"));
			Assert.False(entries.Select(x => x.Name).Contains("3csa"));
			Assert.False(entries.Select(x => x.Name).Contains("4yg1"));

			var datasetentries = client.Get(new GetDatasetEntries());
			int dErelations = datasetentries.Count;
			var mydto = new DatasetDTO()
			{
				Name="testdataset2",
				Entries=new string[]{"2hh1","3csa","4yg1"}.ToList(),
				Urls=new string[]{"http://www.pdb.org/2hh1","http://www.pdb.org/3csa","http://www.pdb.org/4yg1"}.ToList()
			};
			var mydto2=client.Post(mydto);

			entries = client.Get(new GetEntries());
			Assert.True(entries.Select(x => x.Name).Contains("2hh1"));
			Assert.True(entries.Select(x => x.Name).Contains("3csa"));
			Assert.True(entries.Select(x => x.Name).Contains("4yg1"));
			datasetentries = client.Get(new GetDatasetEntries());
			Assert.True(datasetentries.Count>dErelations);
			Assert.True(datasetentries.Count==(dErelations+3));

			client.Delete(new DeleteDataset(){Id = mydto2.Id});

			datasetentries = client.Get(new GetDatasetEntries());
			Assert.True(datasetentries.Count==dErelations);
		}

		[Test()]
		public void CheckDeletingDatasetWithForeignKeyDisablesTestCase()
		{
			//the same as dataset2TestCase - calls NoFK service. Warning released when cascade delete doesnt work =>
			//foreign key is very probably disabled
			var client = new JsonServiceClient(_baseUri);
			var entries = client.Get(new GetEntries());

			var datasetentries = client.Get(new GetDatasetEntries());
			int dErelations = datasetentries.Count;
			var mydto = new DatasetDTO()
			{
				Name="testdataset2",
				Entries=new string[]{"2hh1","3csa","4yg1"}.ToList(),
				Urls=new string[]{"http://www.pdb.org/2hh1","http://www.pdb.org/3csa","http://www.pdb.org/4yg1"}.ToList()
			};
			var mydto2=client.Post(mydto);

			entries = client.Get(new GetEntries());
			Assert.True(entries.Select(x => x.Name).Contains("2hh1"));
			Assert.True(entries.Select(x => x.Name).Contains("3csa"));
			Assert.True(entries.Select(x => x.Name).Contains("4yg1"));
			datasetentries = client.Get(new GetDatasetEntries());
			Assert.True(datasetentries.Count>dErelations);
			Assert.True(datasetentries.Count==(dErelations+3));

			client.Delete(new DeleteDatasetNoFk(){Id = mydto2.Id});

			datasetentries = client.Get(new GetDatasetEntries());
			if (datasetentries.Count!=dErelations)
				Console.Error.WriteLine("Warning: connection foreign key not working - NO CASCADE DELETE.");
		}

		[Test()]
		public void DatasetUpdateShouldAddOnlyNewEntriesTestCase()
		{
			//submit dataset, then update it, check whether only relevant entries were updated - not doubled
			var client = new JsonServiceClient(_baseUri);
			var mydto = new DatasetDTO()
			{
				Name="testdataset3",
				Entries=new string[]{"2hh1","3csa","4yg1"}.ToList(),
				Urls=new string[]{"http://www.pdb.org/2hh1","http://www.pdb.org/3csa","http://www.pdb.org/4yg1"}.ToList()
			};
			var mydto2=client.Post(mydto);
			Assert.True(mydto2.Entries.Count==3);
			Assert.True(mydto2.Urls.Count==3);
			mydto2.Entries.Add("2hhd");
			mydto2.Urls.Add("http://www.pdb.org/2hhd");
			var mydto3 = client.Put(mydto2);
			var mydto4 = client.Get(new DatasetDTO(){Id = mydto2.Id});

			Assert.True(mydto4.Entries.Count==4);
			//Assert.True(mydto4.Urls.Count==4);
			Assert.True(mydto4.Entries.Contains("2hhd"));
			//Assert.True(mydto4.Urls.Contains("http://www.pdb.org/2hhd"));
		}

	}
}

