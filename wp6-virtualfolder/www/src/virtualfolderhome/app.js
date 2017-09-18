import {HttpClient} from 'aurelia-http-client';

export class App {
  static inject = [HttpClient];

constructor(httpclient){
    this.location = window.location.protocol;
    this.islocalhost= this.location.startsWith('http:');
    this.client=httpclient;
    this.webdavurl="";
    this.requestpublicurl="/api/authproxy/get_signed_url/";
    // wait for assignement this.genericcontrol from children

  }

  generateurl() {
    if (this.webdavurl=="") {
      this.client.get(this.requestpublicurl)
        .then(data => {
          if (data.response) {
            let result = JSON.parse(data.response);
            if (window.location.port == "80" || window.location.port== "")
              this.webdavurl = window.location.protocol+"//"+window.location.hostname+result.signed_url;
            else
              this.webdavurl = window.location.protocol+"//"+window.location.hostname+":"+window.location.port+result.signed_url;
            //console.log(this.webdavurl)
          }
        });
    }
  }

}
