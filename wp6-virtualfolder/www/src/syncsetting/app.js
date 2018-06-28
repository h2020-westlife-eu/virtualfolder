import {EventAggregator} from 'aurelia-event-aggregator';
import {HandleLogin, MayLogout,RedirectLogin} from '../behavior';
//import {HttpClient} from 'aurelia-http-client';
import {ProjectApi} from "../components/projectapi";
import {Vfstorage} from "../utils/vfstorage";

export class App {
  static inject = [EventAggregator,ProjectApi];

  constructor(ea,pa) {
    this.ea=ea;
    //this.client=httpclient;
    this.pa = pa;
    this.providers=[{alias:"Loading available providers ...",temporary:true}];
    this.loading =true;
    this.loadederror = false;
    this.handler = new RedirectLogin();
    //if it detects that it is not logged in - e.g. 403 returned - shows Login button instead
    this.ea.subscribe(HandleLogin, msg => this.handler.handlelogin());
    this.ea.subscribe(MayLogout, msg => this.handler.maylogout());
    
  }
  
  attached() {
    this.params=Vfstorage.getParams(window.location.search.substring(1));
    this.publickey = this.params.PublicKey;
    //gets the status of the b2drop connection
    this.pa.getFiles()
      .then(data => {
        this.loading =false;
        this.loadederror = false;
        this.ea.publish(new MayLogout(this.panelid));
        this.providers = data.map(x => {x.selected=false; return x; });
      })
      .catch(error =>{
        console.log("aliastable.attached() error:");
        console.log(error);
        //handle 403 unauthorized
        this.loading =false;
        this.loadederror = true;
        if (error.statusCode === 403) {
          this.ea.publish(new HandleLogin(this.panelid));
        } else
          alert('Sorry. Backend service is not working temporarily. Wait a moment. If the problem persist, report it to system administrator. '+this.serviceurl+' HTTP status:'+error.statusCode+' '+error.statusText)
      });
  }
  
  handleError(url,error){
    console.log("aliastable.attached() error:");
    console.log(error);
    alert('Sorry. Error when accessing '+url+' HTTP status:'+error.statusCode+' '+error.statusText)
    
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
    let selectedaliases = this.providers.filter( prov => prov.selected).map(prov => prov.alias).join(';');
    console.log('syncsetting, import:',selectedaliases);
    if (selectedaliases.length===0) return; //nothing is selected return
    this.pa.getExportedSettings(this.publickey, selectedaliases)
      .then(response =>{
        console.log("SyncSetting.app import settings encrypteddata:",response);
        let message = {EncryptedSettings:response,aliases:selectedaliases};
        window.opener.postMessage(JSON.stringify(message), "*");
        window.close();
      })
      .catch(error => this.handleError(queryurl,error));
  }

}
