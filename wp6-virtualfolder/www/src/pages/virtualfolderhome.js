import {ProjectApi} from "../components/projectapi";
import {EventAggregator} from 'aurelia-event-aggregator';
//import {RedirectLogin,HandleLogin,MayLogout} from '../behavior';

export class Virtualfolderhome {
  static inject = [EventAggregator,ProjectApi];

  constructor(ea,projectapi){
    this.ea = ea;
    this.location = window.location.protocol;
    this.islocalhost= this.location.startsWith('http:');
    this.pa=projectapi;
    this.webdavurl="";
    //this.requestpublicurl="/api/authproxy/get_signed_url/";
    // wait for assignement this.genericcontrol from children
    //this.handler = new RedirectLogin();
    //this.ea.subscribe(HandleLogin, msg => this.handler.handlelogin());
    //this.ea.subscribe(MayLogout, msg => this.handler.maylogout());
  }

  generateurl() {
    if (this.webdavurl === "") {
      this.pa.getPublicWebDav()
        .then(data => {
            if (window.location.port === "80" || window.location.port === "")
              this.webdavurl = window.location.protocol+"//"+window.location.hostname+data.signed_url;
            else
              this.webdavurl = window.location.protocol+"//"+window.location.hostname+":"+window.location.port+data.signed_url;
        }).
      catch(error => {
        if (error.statusCode === 401) {
          //try to login
        } else {
          alert("Sorry, cannot generate URL. "+ error.statusCode + ':' + error.statusText );
        }
      });
    }
  }
}
