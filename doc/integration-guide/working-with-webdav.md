# Working with WEBDAV

File picker and upload dir picker returns URL capable of WEBDAV API[^1]. As HTTP extension, it supports basic HTTP VERBS to download file ('GET'), upload file ('PUT') etc. It is possible to use WEBDAV capable client application to connect to the selected folder or download selected file. Following sections describes downloading file or uploading file using different technologies.

# Bash, CURL
cURL is  command-line tool for transferring data using various protocols available as standard package in most OS.
```bash
  if [ $1 == 'PUT' ]; then    
    curl -X PUT $2 --data "$3"
  else
    curl $1  
  fi
```


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

The following uses easywebdav [^3] library, unfortunately support for Python 3 is not included in binary release 1.2.0

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


# References:
[^1] HTTP Extensions for Web Distributed Authoring and Versioning (WebDAV): [tools.ietf.org/html/rfc4918](https://tools.ietf.org/html/rfc4918)

[^2] XMLHttpRequest Living Standard: https://xhr.spec.whatwg.org/

[^3] easywebdav 1.2.0 A straight-forward WebDAV client, implemented using Requests https://pypi.python.org/pypi/easywebdav

