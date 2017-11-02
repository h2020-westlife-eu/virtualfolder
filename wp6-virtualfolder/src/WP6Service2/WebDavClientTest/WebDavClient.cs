using System;
using System.IO;
using System.Net;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using ServiceStack.Common.Utils;

namespace WebDavClientTest
{
    public class WebDavClient
    {
        public static string Put(string url, string filename, string content)
        {
            string log = "";

            ServicePointManager.ServerCertificateValidationCallback +=
                ValidateRemoteCertificate;
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Ssl3;
            try
            {
                // Create an HTTP request for the URL.
                HttpWebRequest httpPutRequest =
                    (HttpWebRequest) WebRequest.Create(url);

                // Set up new credentials.
                //httpPutRequest.Credentials =
                // new NetworkCredential(szUsername, szPassword);

                // Pre-authenticate the request.
                httpPutRequest.PreAuthenticate = true;

                // Define the HTTP method.
                httpPutRequest.Method = @"PUT";

                // Specify that overwriting the destination is allowed.
                httpPutRequest.Headers.Add(@"Overwrite", @"T");

                // Specify the content length.
                httpPutRequest.ContentLength = content.Length;

                // Optional, but allows for larger files.
                httpPutRequest.SendChunked = true;

                // Retrieve the request stream.
                Stream requestStream =
                    httpPutRequest.GetRequestStream();

                // Write the string to the destination as a text file.
                requestStream.Write(
                    Encoding.UTF8.GetBytes((string) content),
                    0, content.Length);

                // Close the request stream.
                requestStream.Close();

                // Retrieve the response.
                HttpWebResponse httpPutResponse =
                    (HttpWebResponse) httpPutRequest.GetResponse();

                // Write the response status to the console.
                log += @"PUT Response: " + httpPutResponse.StatusDescription;
                return log;
            }
            catch (Exception e)
            {
                log += "PUT Response: Exception" + e.Message + " StackTrace:" + e.StackTrace;
                return log;
            }
        }

        public static string Get(string url, string filename)
        {
            
            string content = "";
// Create an HTTP request for the URL.
            ServicePointManager.ServerCertificateValidationCallback +=
                ValidateRemoteCertificate;
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Ssl3;
            try
            {
                HttpWebRequest httpGetRequest =
                    (HttpWebRequest) WebRequest.Create(url + "/" + filename);

                // Set up new credentials.
                //httpGetRequest.Credentials =
                //    new NetworkCredential(szUsername, szPassword);

                // Pre-authenticate the request.
                httpGetRequest.PreAuthenticate = true;

                // Define the HTTP method.
                httpGetRequest.Method = @"GET";

                // Specify the request for source code.
                httpGetRequest.Headers.Add(@"Translate", "F");

                // Retrieve the response.
                HttpWebResponse httpGetResponse =
                    (HttpWebResponse) httpGetRequest.GetResponse();

                // Retrieve the response stream.
                Stream responseStream =
                    httpGetResponse.GetResponseStream();

                // Retrieve the response length.
                long responseLength =
                    httpGetResponse.ContentLength;

                // Create a stream reader for the response.
                StreamReader streamReader =
                    new StreamReader(responseStream, Encoding.UTF8);

                // Write the response status to the console.
                Console.WriteLine(
                    @"GET Response: {0}",
                    httpGetResponse.StatusDescription);
                Console.WriteLine(
                    @"  Response Length: {0}",
                    responseLength);
                content = streamReader.ReadToEnd();
                Console.WriteLine(@"  Response Text: {0}", content);

                // Close the response streams.
                streamReader.Close();
                responseStream.Close();

                return content;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message+e.StackTrace);
                return (e.Message+e.StackTrace);
            }
        }

        static string Delete(string url, string filename)
        {
            string log = "";
            
            return log;            
        }
        
        public static bool ValidateRemoteCertificate(object sender, X509Certificate cert, X509Chain chain,
            SslPolicyErrors policyErrors)
        {
            bool isOk = true;
            return isOk;
            // If there are errors in the certificate chain,
            // look at each error to determine the cause.
            if (policyErrors != SslPolicyErrors.None) {
                for (int i=0; i<chain.ChainStatus.Length; i++) {
                    if (chain.ChainStatus[i].Status == X509ChainStatusFlags.RevocationStatusUnknown) {
                        continue;
                    }
                    chain.ChainPolicy.RevocationFlag = X509RevocationFlag.EntireChain;
                    chain.ChainPolicy.RevocationMode = X509RevocationMode.Online;
                    chain.ChainPolicy.UrlRetrievalTimeout = new TimeSpan (0, 1, 0);
                    chain.ChainPolicy.VerificationFlags = X509VerificationFlags.AllFlags;
                    bool chainIsValid = chain.Build ((X509Certificate2)cert);
                    if (!chainIsValid) {
                        isOk = false;
                        break;
                    }
                }
            }
            return isOk;            
            //check subject for portal.west-life.eu on portal deployment it raises SslPolicyError
            if (cert.Subject.Contains("portal.west-life.eu"))
                //Console.WriteLine(policyErrors);
                return true;
            else
                return policyErrors == SslPolicyErrors.None; 
            
        }

        
    }
}