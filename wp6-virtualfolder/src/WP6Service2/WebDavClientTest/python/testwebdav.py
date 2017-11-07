import easywebdav
import sys
from urllib.parse import urlparse

def printhelp():
    print ("Usage:\ntestwebda.py [PUT] [webdav url to dir] [filename]\nExamples:\n"
           "  testwebdav.py https://portal.west-life.eu/webdav/1234 README.md\n"
           "                this will download the file README.md from WEBDAV url\n"
           "  testwebdav.py PUT https://portal.west-life.eu/webdav/1234 README.md"
           "                this will upload the file README.md to WEBDAV url\n");


if len(sys.argv) <= 1:
    printhelp();
    sys.exit(0);

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
    
