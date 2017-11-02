import easywebdav
import sys
print len(sys.argv);

if (len(sys.argv) <= 1):
    sys.exit(0);

if (sys.argv[1] == 'PUT'):
    webdav = easywebdav.connect(sys.argv[2]);
    webdav.upload(sys.argv[3], sys.argv[3]);
else:
    webdav = easywebdav.connect(sys.argv[1]);
    webdav.download(sys.argv[2], sys.argv[2]);
    
