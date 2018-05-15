import {HttpClient} from 'aurelia-http-client';
import {EventAggregator} from 'aurelia-event-aggregator';
import {RedirectLogin,HandleLogin,MayLogout} from '../behavior';

export class Virtualfolderhome {
  static inject = [EventAggregator,HttpClient];

  constructor(ea,httpclient){
    this.ea = ea;
    this.location = window.location.protocol;
    this.islocalhost= this.location.startsWith('http:');
    this.client=httpclient;
    this.webdavurl="";
    this.requestpublicurl="/api/authproxy/get_signed_url/";
    // wait for assignement this.genericcontrol from children
    this.handler = new RedirectLogin();
    this.ea.subscribe(HandleLogin, msg => this.handler.handlelogin());
    this.ea.subscribe(MayLogout, msg => this.handler.maylogout());
  }

  generateurl() {
    if (this.webdavurl=="") {
      this.client.get(this.requestpublicurl)
        .then(data => {
          this.ea.publish(new MayLogout(this.panelid));
          if (data.response) {
            let result = JSON.parse(data.response);
            if (window.location.port == "80" || window.location.port== "")
              this.webdavurl = window.location.protocol+"//"+window.location.hostname+result.signed_url;
            else
              this.webdavurl = window.location.protocol+"//"+window.location.hostname+":"+window.location.port+result.signed_url;
            //console.log(this.webdavurl)
          }
        }).
      catch(error => {
        if (error.statusCode == 401) {
          //try to login
          //console.log("redirecting");
          this.ea.publish(new HandleLogin(this.panelid));
          //window.location = "/login?next=" + window.location.pathname;
          //window.location =
        } else {
          alert("Sorry, cannot generate URL. "+ error.statusCode + ':' + error.statusText );
        }
      });
    }
  }

}
