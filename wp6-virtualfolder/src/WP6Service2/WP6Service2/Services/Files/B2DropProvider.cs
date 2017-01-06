using System;
using System.Collections.Generic;
using System.Diagnostics;
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
        public B2DropProvider()
        {
        }


        private String CONTEXT = "b2drop";
        private String B2DROPDIR;

        public B2DropProvider(ProviderItem item)
        {
            CONTEXT = item.alias;
            B2DROPDIR = "/home/vagrant/work/" + item.alias;
        }

        public override object GetFileList(string Path)
        {
            string path = (Path != null) ? Path : "";
            if (path.Contains(".."))
                path = ""; //prevents directory listing outside
            //MAIN splitter for strategies of listing files
            //return DropBoxFS.ListOfFiles(path);
            return SystemFs.ListOfFiles(CONTEXT + "/" + Path);
        }

        public override void ConfigStored(ProviderItem request)
        {
            using (StreamWriter outputFile = new StreamWriter("/home/vagrant/.westlife/secrets"))
            {
                outputFile.WriteLine(B2DROPDIR + " " + request.username + " " + request.securetoken);
            }
            using (StreamWriter outputFile = new StreamWriter("/home/vagrant/.westlife/secrets2"))
            {
                outputFile.Write(request.username + ":" + request.securetoken);
            }
            ProcessStartInfo psi = new ProcessStartInfo();
            psi.FileName = "/usr/bin/sudo";
            psi.UseShellExecute = false;
            psi.RedirectStandardOutput = true;
            psi.RedirectStandardError = true;

            psi.Arguments = "/home/vagrant/scripts/mountb2drop.sh " + CONTEXT;
            Process p = Process.Start(psi);
            request.output = p.StandardOutput.ReadToEnd();
            request.output += p.StandardError.ReadToEnd();
            p.WaitForExit();
            //Console.WriteLine(strOutput);
            request.securetoken = ""; //just remove secure token, as it is not needed anymore
            //request.connected = GetB2DropStatus();
            //return request;
        }
    }
}
