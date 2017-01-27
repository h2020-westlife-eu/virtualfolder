using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Dropbox.Api;
using ServiceStack.Common;
using ServiceStack.Common.Web;
using ServiceStack.Text;

namespace WP6Service2
{

    public class B2DropProviderCreator : IProviderCreator
    {
        public AFileProvider CreateProvider(ProviderItem item)
        {
            return new B2DropProvider(item);
        }
    }

    public class B2DropProvider : AFileProvider
    {


        private static bool registeredalias = false;
        //private string _webdavprefix;


        public B2DropProvider(ProviderItem item) :base(item)
        {
            if (!registeredalias) registeredalias = true;//item.alias;
            else throw new ApplicationException("B2DROP already registered. Connecting to another B2DROP account not yet implemented.");
            var task = Initialize(item);
            //task.Start();
        }

        public override object GetFileOrList(string Path)
        {
            string path = (Path != null) ? Path : "";
            if (path.Contains(".."))
                path = ""; //prevents directory listing outside
            //MAIN splitter for strategies of listing files
            //return DropBoxFS.ListOfFiles(path);

            return FileSystemProvider.ListOfFiles(FILESYSTEMFOLDER,WEBDAVFOLDER,path);
        }

        public override bool Destroy()
        {
            registeredalias = false;
            return base.Destroy();
        }

        private async Task Initialize(ProviderItem request)
        {
            using (StreamWriter outputFile = new StreamWriter("/home/vagrant/.westlife/secrets"+alias))
            {
                outputFile.WriteLine(FILESYSTEMFOLDER + " " + request.username + " " + request.securetoken);
            }
            using (StreamWriter outputFile = new StreamWriter("/home/vagrant/.westlife/secrets2"+alias))
            {
                outputFile.Write(request.username + ":" + request.securetoken);
            }
            ProcessStartInfo psi = new ProcessStartInfo();
            psi.FileName = "/usr/bin/sudo";
            psi.UseShellExecute = false;
            psi.RedirectStandardOutput = true;
            psi.RedirectStandardError = true;

            psi.Arguments = "/home/vagrant/scripts/mountb2drop.sh " + FILESYSTEMFOLDER;
            Console.WriteLine("B2Drop initializing...");
            Process p = Process.Start(psi);
            request.output = p.StandardOutput.ReadToEnd();
            request.output += p.StandardError.ReadToEnd();
            p.WaitForExit();
            Console.WriteLine(request.output);
            request.securetoken = ""; //just remove secure token, as it is not needed anymore

            //request.connected = GetB2DropStatus();
            //return request;
        }
    }
}
