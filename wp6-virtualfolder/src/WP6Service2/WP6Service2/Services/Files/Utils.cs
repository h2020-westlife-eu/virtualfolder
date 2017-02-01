using System.Diagnostics;
using System.IO;

namespace WP6Service2.Services.Files
{
    public class Utils
    {
        /// <summary>
        /// Executes Shell command or script
        /// </summary>
        public static string ExecuteShell(string shellcommand, string[] args, out int exitcode)
        {
            ProcessStartInfo psi = new ProcessStartInfo();
            psi.FileName = shellcommand;
            psi.UseShellExecute = false;
            psi.RedirectStandardOutput = true;
            psi.RedirectStandardError = true;
            foreach (var arg in args)
            {
                psi.Arguments += arg + " ";
            }
            Process p = Process.Start(psi);
            string output = p.StandardOutput.ReadToEnd();
            output += p.StandardError.ReadToEnd();
            p.WaitForExit();
            exitcode = p.ExitCode;
            return output;
        }

        public static string ExecuteShell(string shellcommand, string[] args)
        {
            int exitcode;
            var output = ExecuteShell(shellcommand, args, out exitcode);
            output += "Exit code " + exitcode;
            return output;
        }

        /// <summary>
        /// Copies the contents of input to output. Doesn't close either stream.
        /// </summary>
        public static void CopyStream(Stream input, Stream output)
        {
            byte[] buffer = new byte[8 * 1024];
            int len;
            while ( (len = input.Read(buffer, 0, buffer.Length)) > 0)
            {
                output.Write(buffer, 0, len);
            }
        }

        public static void CreateSystemSubFolder(string folder)
        {
            var subdir = Path.GetDirectoryName(folder);
            Directory.CreateDirectory(subdir);
        }
    }
}