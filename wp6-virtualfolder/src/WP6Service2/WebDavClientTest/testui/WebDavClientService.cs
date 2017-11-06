using System.Dynamic;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;
using WebDavClientTest.csharp;

namespace WebDavClientTest
{
    [Route("/testwebdav")]
    public class WebdavClientDTO 
    {
        public string davurl { get; set; }
        public string filename { get; set; }
        public string content { get; set; }
        public string log { get; set; }
    }
    [Route("/testwebdav2")]
    public class WebdavClientDTO2 
    {
        public string davurl { get; set; }
        public string log { get; set; }
    }
    //user set the webdav url, service then connects to the webdav url gets list of file, upload test file, check for existence , delete the test file
    public class WebDavClientService : Service
    {
        //public string _davurl;
        private static WebdavClientDTO _dto = new WebdavClientDTO(){davurl="",log=""};
        
        public  WebdavClientDTO Get(WebdavClientDTO request)
        {
            if (_dto.davurl != null)
            {
                _dto.content = WebDavClient.Get(_dto.davurl, _dto.filename);
            }
            return _dto;
        }

        public WebdavClientDTO2 Get(WebdavClientDTO2 request)
        {
            return new WebdavClientDTO2{davurl="test1",log="testlog"};
        }

        public WebdavClientDTO Post(WebdavClientDTO request)
        {
            if (request.davurl != null)
            {
                _dto.davurl = request.davurl;
                _dto.content = request.content;
                _dto.filename = request.filename;
                //put file via WEBDAV
                _dto.log=WebDavClient.Put(_dto.davurl, _dto.filename, _dto.content);
            }
            return _dto;
        }

        public WebdavClientDTO  Delete(WebdavClientDTO request)
        {
            _dto.davurl = "";
            _dto.log = "";
            return _dto;
        }
    }
}