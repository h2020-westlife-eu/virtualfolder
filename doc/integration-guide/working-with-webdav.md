# Working with WEBDAV

File picker and upload dir picker returns URL capable of WEBDAV API[^1] which doesn't need any other type of authentication. Thus use this URL as confidential as possible. WEBDAV is HTTP extension, it supports basic HTTP VERBS to download file ('GET'), upload file ('PUT'), delete file ('DELETE') etc. It is possible to use WEBDAV capable client application to connect to the selected folder or download selected file. Following sections contains samples how to download or upload file to Virtual Fodler via WEBDAV using scripting or compiled languages.

# Bash, CURL
Prerequisite: install curl using your OS package manager `yum install curl` or `apt-get install curl`.
cURL[^4] is  command-line tool for transferring data using various protocols available as standard package in most OS. 

Bash script to UPLOAD file to the webdav URL

```bash
curl -X PUT [updirurl+filename] --data "any text content"
```

Bash script to DOWNLOAD file from the webdav URL

```bash
curl [updirurl+filename] --data "any text content"
```
Full sample script can be downloaded from [here](https://raw.githubusercontent.com/h2020-westlife-eu/west-life-wp6/dev/wp6-virtualfolder/src/WP6Service2/WebDavClientTest/bash/testwebdav.sh)



# Javascript

The following code uses XMLHTTPRequest API[^2].

```javascript

function ajaxrequest(method, url, callback,contentdivid,content) {
    var request;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if (request.readyState == 4 && request.status == 200){
            callback(request.responseText,contentdivid);
        } else {
            console.log(request.response)
            alert('There was an error. See console. ');
        }
    }
    request.open(method, url, true);
    request.send(content);
}

function downloadcallback(responsetext,contentdivid) {
    document.getElementById(contentdivid).innerHTML = responsetext;
}

function uploadcallback(responsetext,contentdivid) {
    document.getElementById(contentdivid).innerHTML = "Upload OK.";
}

function downloadwebdavfile(url,contentdivid) {
    ajaxrequest("GET",url, downloadcallback,contentdivid)
}

function uploadwebdavfile(url,contentdivid,content) {
    ajaxrequest("PUT",url,uploadcallback,content)
}
```
# Python

Prerequisite: 
* for  Python 2.x install easywebdav [^3] using your favorite packaging system(`pip install easywebdav`)
* for Python 3.x download easywebdav from [here](https://raw.githubusercontent.com/h2020-westlife-eu/west-life-wp6/dev/wp6-virtualfolder/src/WP6Service2/WebDavClientTest/python/easywebdav.py).

```python
import easywebdav;

if sys.argv[1] == 'PUT':
    url = urlparse(sys.argv[2]);
    webdav = easywebdav.connect(url.hostname,protocol=url.scheme,path=url.path);
    print("Uploading ", sys.argv[3], " to ", sys.argv[2]);
    webdav.upload(sys.argv[3], sys.argv[3]);
else:
    url = urlparse(sys.argv[1]);
    webdav = easywebdav.connect(url.hostname,protocol=url.scheme,path=url.path);
    print("Downloading ",sys.argv[2]," from ", sys.argv[1]);
    webdav.download(sys.argv[2], sys.argv[2]);

```

#.NET [Draft]
Standard [HttpWebRequest](https://msdn.microsoft.com/en-us/library/system.net.httpwebrequest.aspx) class use used
```csharp
        public static string Put(string url, string filename, string content)
        {
            string log = "";
            try
            {
                // Create an HTTP request for the URL.
                HttpWebRequest httpPutRequest =
                    (HttpWebRequest) WebRequest.Create(url+'/'+filename);
                httpPutRequest.PreAuthenticate = false;                
                httpPutRequest.Method = @"PUT";                
                httpPutRequest.Headers.Add(@"Overwrite", @"T");                
                httpPutRequest.ContentLength = content.Length;                
                httpPutRequest.SendChunked = true;                
                Stream requestStream = httpPutRequest.GetRequestStream();
                requestStream.Write(
                    Encoding.UTF8.GetBytes((string) content),
                    0, content.Length);

                requestStream.Close();
                
                HttpWebResponse httpPutResponse =
                    (HttpWebResponse) httpPutRequest.GetResponse();                
                log += @"PUT Response: " + httpPutResponse.StatusDescription;
                return log;
            }
            catch (Exception e)
            {
                
                Console.WriteLine("PUT Response: Exception" + e.Message + " StackTrace:" + e.StackTrace);
                throw e;
            }
            
        }
```
# Java [Draft]
```java
//webdav client sample
```

# References:
[^1] HTTP Extensions for Web Distributed Authoring and Versioning (WebDAV): [tools.ietf.org/html/rfc4918](https://tools.ietf.org/html/rfc4918)

[^2] XMLHttpRequest Living Standard: https://xhr.spec.whatwg.org/

[^3] easywebdav 1.2.0 A straight-forward WebDAV client, implemented using Requests https://pypi.python.org/pypi/easywebdav

[^4] cURL, https://curl.haxx.se/docs/
