import {EventAggregator} from 'aurelia-event-aggregator';
import {HandleLogin, MayLogout,RedirectLogin} from '../behavior';
import {HttpClient} from 'aurelia-http-client';
import {Vfstorage} from "../utils/vfstorage";

export class App {
  static inject = [EventAggregator,HttpClient];

  constructor(ea,httpclient) {
    this.ea=ea;
    this.client=httpclient;
    this.providers=[{alias:"Loading available providers ...",temporary:true}];
    this.serviceurl = Vfstorage.getBaseUrl()+"/metadataservice/files";
    this.settingsurl = Vfstorage.getBaseUrl()+"/metadataservice/settings";
    this.client.configure(config=> {
      config.withHeader('Accept', 'application/json');
      config.withHeader('Content-Type', 'application/json');
    });
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
    //use public key and selectedaliases to construct request with params 
    let queryurl = new URL(this.settingsurl);
    let params= {PublicKey:this.publickey,SelectedAliases:selectedaliases};
    Object.keys(params).forEach(key => queryurl.searchParams.append(key, params[key]));
    //now request client
    this.client.get(queryurl)
      .then(data => {
        if (data.response) {
          //let rawproviders = JSON.parse(data.response);
          console.log("SyncSetting.app import settings encrypteddata:",data.response);
          let message = {EncryptedSettings:data.response,aliases:selectedaliases};
          window.opener.postMessage(JSON.stringify(message), "*");
          //window.close();
        }
      })
      .catch(error => this.handleError(queryurl,error));
    //create selectedaliases
    
  }

}
