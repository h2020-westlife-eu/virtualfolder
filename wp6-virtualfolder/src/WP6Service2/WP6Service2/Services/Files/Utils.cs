using System;
using System.Diagnostics;
using System.IO;
using System.Runtime.InteropServices.WindowsRuntime;

namespace MetadataService.Services.Files
{
    public class Utils
    {
        /// <summary>
        ///     Executes Shell command or script
        /// </summary>
        public static string ExecuteShell(string shellcommand, string[] args, out int exitcode,bool errortooutput=true,bool useshellexecute=false)
        {
            var psi = new ProcessStartInfo
            {
                FileName = shellcommand,
                UseShellExecute = false,
                RedirectStandardOutput = true,
                RedirectStandardError = true
            };
            foreach (var arg in args)
                psi.Arguments += arg + " ";
            
            Console.WriteLine("Utils.ExecuteShell() arguments:"+psi.Arguments);
            var p = Process.Start(psi);
            var output = p.StandardOutput.ReadToEnd();
            if (errortooutput) output += p.StandardError.ReadToEnd();
            p.WaitForExit();
            exitcode = p.ExitCode;
            return output;
        }

        public static string ExecuteShell(string shellcommand, string[] args,bool errortooutput)
        {
            int exitcode;
            var output = ExecuteShell(shellcommand, args, out exitcode,errortooutput);
            if (errortooutput) output += "Exit code " + exitcode;
            return output;
        }

        public static string ExecuteShell(string shellcommand, string[] args)
        {
            return ExecuteShell(shellcommand, args, true);
        }

        
        /// <summary>
        ///     Copies the contents of input to output. Doesn't close either stream.
        /// </summary>
        public static void CopyStream(Stream input, Stream output)
        {
            var buffer = new byte[8 * 1024];
            int len;
            while ((len = input.Read(buffer, 0, buffer.Length)) > 0)
                output.Write(buffer, 0, len);
        }

        public static void CreateSystemSubFolder(string folder)
        {
            var subdir = Path.GetDirectoryName(folder);
            //TODO vagrant user has control over created directory ??
            //DirectorySecurity securityRules = new DirectorySecurity();
            //securityRules.AddAccessRule(new FileSystemAccessRule("vagrant", FileSystemRights.FullControl, AccessControlType.Allow));
            Directory.CreateDirectory(subdir);
        }
    }
}