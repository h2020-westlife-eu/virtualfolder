using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using MetadataService;
using MetadataService.Services.Files;
using MetadataService.Services.Settings;
using NUnit.Framework;
using ServiceStack.Common;
using ServiceStack.ServiceClient.Web;
using WP6Service2.Services.Dataset;
using WP6Service2.Services.PerUserProcess;

namespace MetadataServiceTest
{
    [TestFixture]
    public class Tests
    {
        private readonly string _baseUri = "http://localhost:8001/virtualfolder/api/";
        //private readonly string _baseUri = "http://localhost:8002/metadataservice/";
        private readonly string homeVagrantWork = "/srv/virtualfolder/";
        

        [TestFixtureSetUp]
        public void TestFixtureSetUp()
        {
            System.Environment.SetEnvironmentVariable("VF_ALLOW_FILESYSTEM","true");
            try
            {
                Program.StartHost(_baseUri, null);
                Thread.Sleep(500);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                Console.WriteLine("metadataservice already running by another process, testing ...");
                Program.StopHost();
            }
        }

        [TestFixtureTearDown]
        public void TestFixtureTearDown()
        {
            //Dispose it on TearDown
            Program.StopHost();
        }

        private static void PrepareTestProviderItems(out ProviderItem item, out ProviderItem item2,
            out string testmessage,
            out string testpassword)
        {
            item = new ProviderItem();
            item2 = new ProviderItem();
            testmessage = "secretmessage";
            item2.securetoken = item.securetoken = testmessage;
            item.loggeduser = item2.loggeduser = "testuser";
            testpassword = "testkey89012";
        }



        [Test]
        public void EncryptingAndDecriptingListOfItemsTestCase()
        {
            ProviderItem item, item2;
            string testmessage, testpassword;
            PrepareTestProviderItems(out item, out item2, out testmessage, out testpassword);

            SettingsStorageInDB.encrypt(ref item, testpassword);
            SettingsStorageInDB.encrypt(ref item2, testpassword);
            Assert.False(item2.securetoken.Equals(testmessage)); //item2 is encrypted not same as plaintext
            var items = new List<ProviderItem>();
            items.Add(item);
            items.Add(item2);
            Assert.False(items[0].securetoken.Equals(testmessage)); //item2 is encrypted not same as plaintext
            Assert.False(items[1].securetoken.Equals(testmessage)); //item2 is encrypted not same as plaintext
            SettingsStorageInDB.decrypt(ref items, testpassword);
            Assert.True(items[0].securetoken.Equals(testmessage));
            Assert.True(items[1].securetoken.Equals(testmessage));
        }

        [Test]
        public void EncryptingChangeContentOfSecureItemTestCase()
        {
            ProviderItem item;
            ProviderItem item2;
            string testmessage;
            string testpassword;
            PrepareTestProviderItems(out item, out item2, out testmessage, out testpassword);
            SettingsStorageInDB.encrypt(ref item, testpassword);
            Assert.False(item.securetoken.Equals(item2.securetoken)); //encrypted and nonencrypted are not same
            Assert.True(item.loggeduser.Equals(item2.loggeduser)); //nonencrypted items are same
            SettingsStorageInDB.decrypt(ref item, testpassword);
            Assert.True(item.securetoken.Equals(item2.securetoken)); //decrypted and nonencrypted are same
            Assert.True(item.loggeduser.Equals(item2.loggeduser)); //nonencrypted items are still same
        }


        [Test]
        public void PostingDeletingDatasetTestCase()
        {
            var client = new JsonServiceClient(_baseUri);
            var all = client.Get(new GetDatasets());
            var firstcount = all.Count;
            //Console.WriteLine(" DatasetTestCase() firstcount:" + firstcount);
            Assert.True(all.Count >= 0);
            //    Is.StringStarting("[")); // asserts that the json is array
            var myEntries = new List<string>();
            myEntries.Add("2hhd");
            myEntries.Add("3csb");
            myEntries.Add("4yg0");

            var mydto = new Dataset
            {
                Name = "testdataset",
                Entries = myEntries,
                Provenance = @"document 
                prefix virtualfolder <https://portal.west-life.eu/virtualfolder/> 
                prefix dataset <http://localhost:8081/webdav/vagrant/filesystem/patient_data/LICENSE> 

                prefix westlife <https://about.west-life.eu/>
                prefix thisvf <http://localhost:8081/virtualfolder/#/filemanager>
                prefix user <>
                entity (dataset:, [prov:label=""LICENSE"", prov:type=""document""]) 
    
                agent (user:vagrant, [ prov:type=""prov:Person"" ]) 
                wasAttributedTo(dataset:, user:vagrant) 
                endDocument",
                Metadata = "{size:5,date:07/09/2017,localurl:http://localhost/webdav/vagrant/filesystem}"
            };

            var mydto2 = client.Post(mydto);

            all = client.Get(new GetDatasets());
            //Console.WriteLine(" DatasetTestCase() all.count:" + all.Count);
            Assert.True(all.Count == firstcount + 1);

            //var all2 =
            client.Get(new GetDatasets()); //gets all
            //var testdto = JsonSerializer.DeserializeFromString<DatasetsDTO>(all2.ToString());
            var all3 = client.Get(new Dataset {Id = mydto2.Id});
            //var all3 = JsonSerializer.DeserializeFromString<DatasetDTO>(all3.ToString());
            //Console.WriteLine(" DatasetTestCase() all3.name:" + all3.Name + " mydto.Name" + mydto.Name);
            Assert.True(all3.Name == mydto.Name);
            //Assert.True(all3.Entries.Count==mydto.Entries.Count);
            //Assert.True(all3.Entries[0]==mydto.Entries[0]);
            //Assert.True(all3.Urls.Count==mydto.Urls.Count);
            //Assert.True(all3.Urls[0]==mydto.Urls[0]);

            client.Delete(new DeleteDataset {Id = mydto2.Id});

            all = client.Get(new GetDatasets());
            Assert.True(all.Count == firstcount);
        }
        [Test]
        public void PostGetDatasetByNameTestCase()
        {
            var client = new JsonServiceClient(_baseUri);
            var all = client.Get(new GetDatasets());
            var firstcount = all.Count;
            //Console.WriteLine(" DatasetTestCase() firstcount:" + firstcount);
            //Assert.True(all.Count >= 0);
            //    Is.StringStarting("[")); // asserts that the json is array
            var myEntries = new List<string>();
            myEntries.Add("2hhd");
            myEntries.Add("3csb");
            myEntries.Add("4yg0");
            var myname = "test/directory/someother/testdataset";
            var mydto = new Dataset
            {
                Name = myname,
                Entries = myEntries,
                Provenance = @"document 
                prefix virtualfolder <https://portal.west-life.eu/virtualfolder/> 
                prefix dataset <http://localhost:8081/webdav/vagrant/filesystem/patient_data/LICENSE> 

                prefix westlife <https://about.west-life.eu/>
                prefix thisvf <http://localhost:8081/virtualfolder/#/filemanager>
                prefix user <>
                entity (dataset:, [prov:label=""LICENSE"", prov:type=""document""]) 
    
                agent (user:vagrant, [ prov:type=""prov:Person"" ]) 
                wasAttributedTo(dataset:, user:vagrant) 
                endDocument",
                Metadata = "{size:5,date:07/09/2017,localurl:http://localhost/webdav/vagrant/filesystem}"
            };

            var mydto2 = client.Post(mydto);            
            var mydtobyid = client.Get(new Dataset(){Id=mydto2.Id});
            var mydtobyname=client.Get(new DatasetByName(){Name=myname});
            Assert.AreEqual(mydtobyid.Id,mydtobyname.Id);
            Assert.AreEqual(mydtobyid.Name,mydtobyname.Name);
            Assert.AreEqual(mydtobyid.Entries,mydtobyname.Entries);
            Assert.AreEqual(mydtobyid.Provenance,mydtobyname.Provenance);
            Assert.AreEqual(mydtobyid.Metadata,mydtobyname.Metadata);            
            client.Delete(new DeleteDataset {Id = mydto2.Id});
            all = client.Get(new GetDatasets());
            //Assert.True(all.Count == firstcount);
        }
        
        [Test]
        public void HttpOptionsShouldReturn200OnFileProvidersDatasetTestCase()
        {
            var client = new JsonServiceClient(_baseUri);
            var response = client.Send<HttpWebResponse>("OPTIONS", "files", null);
            Assert.True(response.StatusCode == HttpStatusCode.OK);
            response = client.Send<HttpWebResponse>("OPTIONS", "files/filesystem", null);
            Assert.True(response.StatusCode == HttpStatusCode.OK);
            response = client.Send<HttpWebResponse>("OPTIONS", "dataset", null);
            Assert.True(response.StatusCode == HttpStatusCode.OK);
            
            try
            {
                response = client.Send<HttpWebResponse>("OPTIONS", "otherservice", null);
                Assert.Fail();
            }
            catch (WebServiceException)
            {
                //Assert.Pass();
            }
        }

        private ProviderItem createTestProviderItem()
        {
            var pi = new ProviderItem
            {
                alias = "b2drop_test",
                type = "B2Drop",
                securetoken = System.Environment.GetEnvironmentVariable("VF_TEST_B2DROP_TOKEN"),                
                username = System.Environment.GetEnvironmentVariable("VF_TEST_B2DROP_USER"),
                loggeduser="vagrant"
            };
            return pi;
        }


        [Test]
        public void DecryptSecretsRegisterB2dropTestCase()
        {
            var pi = createTestProviderItem();
            //ignore on machines, where pkey is different - cannot decrypt the securetoken
            
            if (pi.securetoken == null)
            {
                Console.WriteLine("Ignoring test B2DROP");
                Assert.Ignore();
            }                
            //Console.WriteLine("Testing B2DROP");            
            var client = new JsonServiceClient(_baseUri);
            var providerlist = client.Get(new ProviderItem());            
            var providerlistwithnew = client.Put(pi);
            //should register - new providers is added
            Assert.True(providerlist.Count < providerlistwithnew.Count);
            Assert.True(providerlistwithnew.Last().alias=="b2drop_test");
            //test directory exists, it is mounted
            
            Assert.True(Directory.Exists($"{homeVagrantWork}vagrant/b2drop_test"));
            //test directory is not empty - some dirs or files
            Assert.True(Directory.GetFiles($"{homeVagrantWork}vagrant/b2drop_test").Length>0);

            var providerlistdeleted = client.Delete(pi);
            //should delete - no provider list is there
            Assert.True(providerlistdeleted.Count == providerlist.Count);
        }                       

        private ProviderItem createTestDropboxProviderItem()
        {
            var pi = new ProviderItem
            {
                alias = "dropbox_test",
                type = "Dropbox",
                securetoken = System.Environment.GetEnvironmentVariable("VF_TEST_DROPBOX_TOKEN"),                                      
                loggeduser="vagrant"
            };
            return pi;
        }

        [Test]
        public void DecryptSecretsRegisterDropboxTestCase()
        {
            var pi = createTestDropboxProviderItem();
            //ignore on machines, where pkey is different - cannot decrypt the securetoken
            
            if (pi.securetoken == null)
            {
                Console.WriteLine("Ignoring test Dropbox");
                Assert.Ignore();
            }   
            //Console.WriteLine("Testing Dropbox");
            var client = new JsonServiceClient(_baseUri);
            var providerlist = client.Get(new ProviderItem());            
            var providerlistwithnew = client.Put(pi);
            //should register - new providers is added
            Assert.True(providerlist.Count < providerlistwithnew.Count);
            Assert.True(providerlistwithnew.Last().alias=="dropbox_test");

            var providerlistdeleted = client.Delete(pi);
            //should delete - no provider list is there
            Assert.True(providerlistdeleted.Count == providerlist.Count);
        }

        private ProviderItem createTestFilesystemProviderItem()
        {
            return createTestFilesystemProviderItem("filesystem_test");
            
        }
        private ProviderItem createTestFilesystemProviderItem(string name)
        {
            var pi = new ProviderItem
            {
                alias = name,
                type = "FileSystem",
                securetoken =
                    "/home/vagrant",                
                loggeduser="vagrant"
            };
            return pi;
        }
        
        [Test]
        public void RegisterFilesystemTestCase()
        {
            var name = "filesystem_test3";
            var pi = createTestFilesystemProviderItem(name);            
            var client = new JsonServiceClient(_baseUri);
            try {
                var providerlist = client.Get(new ProviderItem());
                
                var providerlistwithnew = client.Put(pi);
                //should register - new providers is added
                Assert.True(providerlist.Count < providerlistwithnew.Count);
                Assert.True(providerlistwithnew.Last().alias==name);
                //test directory exists, it is mounted
                Assert.True(Directory.Exists($"{homeVagrantWork}vagrant/"+name));
                //test directory is not empty - some dirs or files
                Assert.True(Directory.GetFiles($"{homeVagrantWork}vagrant/"+name).Length>0);

                var providerlistdeleted = client.Delete(pi);
                //should delete - no provider list is there
                Assert.True(providerlistdeleted.Count == providerlist.Count);
            }
            catch (WebServiceException e)
            {
        	   if (e.Message == "UnauthorizedAccessException") Assert.Ignore();
               Console.WriteLine(e.Message);
               throw;
            }
            
        }   

        [Test]
        public void Task1CreateAndDeleteUserJobServiceTestCase()
        {
            var client = new JsonServiceClient(_baseUri);
            var all = client.Get(new GetUserJobs());
            Assert.True(all.Count>=0);
            try
            {
                var jp = client.Post(new PostUserJob() {Name = "notebook"});


                Assert.True(jp.jobType == "notebook");
                Assert.True(jp.Id >= 0);
                Assert.True(jp.Username.Equals("vagrant"));
                Thread.Sleep(10000);
                jp = client.Delete(
                    new PostUserJob()
                    {
                        Name = "notebook"
                    });
                //Assert.True(jp.);
            }
            catch (WebServiceException e)
            {
                Console.WriteLine(e.Message);//ignore 
            }
        }
        [Test]
        public void Task2CreateTwiceCheckStartedOnceAndDeleteUserJobServiceTestCase()
        {
            try {
            var client = new JsonServiceClient(_baseUri);
            var all = client.Get(new GetUserJobs());
            //something is returned
            Assert.True(all.Count>=0);
            var runingjobs = all.Count;
            //create job
            var jp = client.Post(new PostUserJob() {Name = "notebook"});
            Assert.True(jp.jobType=="notebook");
            Assert.True(jp.Id>=0);
            Assert.True(jp.Username.Equals("vagrant"));
            all = client.Get(new GetUserJobs());
            //number of jobs increases by 1
            Assert.True(all.Count==(runingjobs+1));            
            Thread.Sleep(10000);
            //create 2nd job
            jp = client.Post(new PostUserJob() {Name = "notebook"});
            Assert.True(jp.jobType=="notebook");
            Assert.True(jp.Id>=0);
            Assert.True(jp.Username.Equals("vagrant"));
            all = client.Get(new GetUserJobs());
            //number of jobs don't increases, it is still same
            Assert.True(all.Count==(runingjobs+1));            
            
            jp = client.Delete(
                new PostUserJob()
                {
                    Name = "notebook"
                });
            all = client.Get(new GetUserJobs());
            //number of jobs decreases by 1, to previous number of running jobs
            Assert.True(all.Count==runingjobs);            
        }
        catch (WebServiceException e)
        {
            Console.WriteLine(e.Message);//ignore 
 
        }
        }

        [Test]
        public void Task3CreateTaskCheckAvailableTaskDeleteTaskTestCase()
        {
            try {
            var client = new JsonServiceClient(_baseUri);
            var all = client.Get(new GetUserJobs());
            Assert.That(all.Count>=0);
            var jp = client.Post(new PostUserJob() {Name = "notebook"});
            Assert.True(jp.jobType=="notebook");
            Assert.True(jp.Id>=0);
            Assert.True(jp.Username.Equals("vagrant"));
            Thread.Sleep(10000);
            
            var at = client.Get(new AvailableTasks());
            //check that notebook is there
            Assert.True(at.Select(x=>x.Name).Contains("notebook"));
            //check it is running
            var task = at.First(x => x.Name == "notebook");            
            Assert.True(task.Running);
            
            jp = client.Delete(
                new PostUserJob()
                {
                    Name = "notebook"
                });
            at = client.Get(new AvailableTasks());
            //check that notebook is there
            Assert.True(at.Select(x=>x.Name).Contains("notebook"));
            //check it is not running
            task = at.First(x => x.Name == "notebook");            
            Assert.False(task.Running);
            
            //Assert.True(jp.);            
            }
            catch (WebServiceException e)
            {
                Console.WriteLine(e.Message);//ignore 
            }

        }

        [Test]
        public void Settings1CreatePublicKeyExportSettingsTestCase()
        {
            var client = new JsonServiceClient(_baseUri);
            //SettingsExportImport mysettings= new SettingsExportImport();
            GeneratePublicKey generatePublicKey = new GeneratePublicKey();
            var pkey = client.Post(generatePublicKey);
            Assert.That(! pkey.IsNullOrEmpty());
        }

        [Test]
        public void Settings2ExportSettingsTestCase()
        {
            var client = new JsonServiceClient(_baseUri);
            //SettingsExportImport mysettings= new SettingsExportImport();
            GeneratePublicKey generatePublicKey = new GeneratePublicKey();
            try
            {
                var pkey = client.Post(generatePublicKey);
                //Assert.That(! pkey.IsNullOrEmpty());
                ExportSettings es = new ExportSettings() {PublicKey = pkey, SelectedAliases = "filesystem_test"};
                var settings2 = client.Get(es);
                Assert.That(!settings2.IsNullOrEmpty());
            }
            catch (WebServiceException we)
            {
                //ignore if e.g. SSO enabled, this test don't authenticate
                if (we.ErrorMessage.Equals("UnauthorizedAccessException"))
                    Assert.Ignore();
            }
        }

        [Test]
        public void Settings3ImportSettingsTestCase()
        {
            try
            {
                var client = new JsonServiceClient(_baseUri);
                Random r = new Random();
                var name = "filesystem_test" + r.Next(1, 10000);
                var pi = createTestFilesystemProviderItem(name);
                //var providerlist = client.Get(new ProviderItem());
                //register test filesystem provider
                //var providerlistwithnew =
                client.Put(pi);
                //get list of providers - to compare at the end of the test
                var providerlist = client.Get(new ProviderItem());
                int plength = providerlist.Count;
                //SettingsExportImport mysettings= new SettingsExportImport();
                GeneratePublicKey generatePublicKey = new GeneratePublicKey();
                var pkey = client.Post(generatePublicKey);
                //Assert.That(! pkey.IsNullOrEmpty());
                ExportSettings es = new ExportSettings() {PublicKey = pkey, SelectedAliases = name};
                var settings2 = client.Get(es);
                //Assert.That(! settings2.IsNullOrEmpty());
                ImportSettings isc = new ImportSettings()
                {
                    PublicKey = pkey,
                    EncryptedSettings = settings2,
                    ConflictedAliases = name,
                    NewNameAliases = name + "_import"
                };
                client.Put(isc);
                var providerlist2 = client.Get(new ProviderItem());
                Assert.That(providerlist2.Count > plength);
                // now clean after test, delete registered providers
                foreach (var item in providerlist2)
                {
                    client.Delete(item);
                }
            }
            catch (WebServiceException we)
            {
                //ignore if e.g. SSO enabled, this test don't authenticate
                if (we.ErrorMessage.Equals("UnauthorizedAccessException"))
                    Assert.Ignore();
            }
        }

        [Test]
        public void StringUrlComplessDecompressTestCase()
        {
            var str = new[] {"vagrant", "3ehdj59sdh584j3ldfh349sjdl3958ghzx@west-life.eu", "3ehdj59sdh584j3ldfh349sjdl3958ghzx@west-life.eu/b2drop","3ehdj59sdh584j3ldfh349sjdl3958ghzx@west-life.eu/b2drop/test1","3ehdj59sdh584j3ldfh349sjdl3958ghzx@west-life.eu/b2drop/test2","3ehdj59sdh584j3ldfh349sjdl3958ghzx@west-life.eu/b2drop/test3","3ehdj59sdh584j3ldfh349sjdl3958ghzx@west-life.eu/b2drop","3ehdj59sdh584j3ldfh349sjdl3958ghzx@west-life.eu/b2drop/test1","3ehdj59sdh584j3ldfh349sjdl3958ghzx@west-life.eu/b2drop/test2","3ehdj59sdh584j3ldfh349sjdl3958ghzx@west-life.eu/b2drop/test3","3ehdj59sdh584j3ldfh349sjdl3958ghzx@west-life.eu/b2drop","3ehdj59sdh584j3ldfh349sjdl3958ghzx@west-life.eu/b2drop/test1/experiment/data/2hhd.pdb","3ehdj59sdh584j3ldfh349sjdl3958ghzx@west-life.eu/b2drop/test2/test2/test2/txt.txt","3ehdj59sdh584j3ldfh349sjdl3958ghzx@west-life.eu/b2drop/test3/test.txt"};
            var pkey = "1234567812345678";
            var iv = "0123456789abcdef";
            //var encstr = new String[]{};
            foreach (var s in str)
            {
                var zipped = AESThenHMAC.Zip(s);
                var zipped2 = AESThenHMAC.Zip2(s);
                //Console.WriteLine("Original: "+s+" original length:"+s.Length+" zipped.Length:"+zipped.Length+" zipped2.Length:"+zipped2.Length);
                var enc = AESThenHMAC.Encrypt(s,Encoding.Default.GetBytes(pkey),Encoding.Default.GetBytes(iv));
                //Console.WriteLine("Encrypted: "+enc+" encrypted length:"+enc.Length);
                var dec = AESThenHMAC.Decrypt(enc, Encoding.Default.GetBytes(pkey),Encoding.Default.GetBytes(iv));
                //test decoded should be equal to original
                Assert.AreEqual(s,dec);
                var enc2 = SettingsStorageInDB.getencryptedpath(s);
                var dec2 = SettingsStorageInDB.getdecryptedpath(enc2);
                //Console.WriteLine("Encrypted2:"+enc2+" encrypted length2:"+enc2.Length);
                Assert.AreEqual(s,dec2);
            }
        }

    }
}
