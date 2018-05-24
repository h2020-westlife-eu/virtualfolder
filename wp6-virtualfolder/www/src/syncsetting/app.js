import {EventAggregator} from 'aurelia-event-aggregator';
import {HandleLogin, MayLogout} from '../behavior';
import {HttpClient} from 'aurelia-http-client';
import {Vfstorage} from "../utils/vfstorage";

export class App {
  static inject = [EventAggregator,HttpClient];

  constructor(ea,httpclient) {
    this.ea=ea;
    this.client=httpclient;
    this.providers=[{alias:"Loading available providers ...",temporary:true}];
    this.serviceurl = Vfstorage.getBaseUrl()+"/metadataservice/files";
    this.client.configure(config=> {
      config.withHeader('Accept', 'application/json');
      config.withHeader('Content-Type', 'application/json');
    });
    this.loading =true;
    this.loadederror = false;
  }
  attached() {
    //gets the status of the b2drop connection
    this.client.get(this.serviceurl)
      .then(data => {
        this.loading =false;
        this.loadederror = false;
        this.ea.publish(new MayLogout(this.panelid));
        if (data.response) {
          let rawproviders = JSON.parse(data.response);
          this.providers = rawproviders.map(x => {x.selected=false; return x; });
        }
      })
      .catch(error =>{
        console.log("aliastable.attached() error:");
        console.log(error);
        //handle 403 unauthorized
        this.loading =false;
        this.loadederror = true;
        if (error.statusCode == 403) {
          this.ea.publish(new HandleLogin(this.panelid));
        } else
          alert('Sorry. Backend service is not working temporarily. Wait a moment. If the problem persist, report it to system administrator. '+this.serviceurl+' HTTP status:'+error.statusCode+' '+error.statusText)
      });
  }

  include(provider) {
    provider.selected = true;
    console.log("syncsetting. include()",provider);
  }
  
  notinclude(provider) {
    provider.selected = false;
    console.log("syncsetting. notinclude()",provider);
  }

  import() {
    window.opener.postMessage("TODO test providers", "*");
    window.close();
  }

}
