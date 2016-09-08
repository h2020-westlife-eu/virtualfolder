using System;
using System.IO;
using System.Diagnostics;
using ServiceStack;

namespace WP6Service2
{
	[Route("/b2dropconnector")]
	public class B2DropConnector
	{
		public bool connected { get; set;}
		public String username { get; set;}		
		public String securetoken {get;set;}
		public String output { get; set; }
	}
	public class B2DropConnectorService : Service
	{
		public object Get(B2DropConnector request) 
		{
			
			return new B2DropConnector (){ connected = GetB2DropStatus() };
		}

		String B2DROPDIR= "/home/vagrant/work/b2drop";
		public object Post(B2DropConnector request)
		{
			using (StreamWriter outputFile = new StreamWriter("/tmp/secrets")) {
				outputFile.WriteLine(B2DROPDIR+" "+request.username+" "+request.securetoken);
			}

			ProcessStartInfo psi = new ProcessStartInfo();
			psi.FileName = "/usr/bin/sudo";
			psi.UseShellExecute = false;
			psi.RedirectStandardOutput = true;
			psi.RedirectStandardError = true;

			psi.Arguments = "/home/vagrant/scripts/mountb2drop.sh";
			Process p = Process.Start(psi);
			request.output=p.StandardOutput.ReadToEnd();
			request.output += p.StandardError.ReadToEnd ();
			p.WaitForExit();
			//Console.WriteLine(strOutput);
			request.connected = GetB2DropStatus();
			return request;
		}

		private bool GetB2DropStatus(){
			var mounteddir = new DirectoryInfo (B2DROPDIR);
			return mounteddir.Exists && (mounteddir.GetFiles ().Length > 0);
		}
	}

}

