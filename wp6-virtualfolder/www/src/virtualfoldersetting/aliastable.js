/**
 * Created by Tomas Kulhanek on 1/6/17.
 */
import {HttpClient} from 'aurelia-http-client';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SettingsSubmitted} from './messages';
import {Vfstorage} from '../utils/vfstorage';
import {HandleLogin,MayLogout} from '../behavior';

//let client = new HttpClient();

/**
 * Aliastable component gets the currently registered aliases for file providers
 * and shows them in a table, allows delete the alias or initiate dialog to create one.
 */
export class Aliastable {
  static inject = [EventAggregator,HttpClient];

  constructor(ea,httpclient){
    this.ea=ea;
    this.serviceurl = Vfstorage.getBaseUrl()+"/metadataservice/files";
    this.ea.subscribe(SettingsSubmitted, msg => this.submitSettings(msg.settings) );
    this.client=httpclient;
    this.providers=[{alias:"Loading available providers ...",temporary:true}];
    this.client.configure(config=> {
      config.withHeader('Accept', 'application/json');
      config.withHeader('Content-Type', 'application/json');
    });
  }

  attached() {
    //gets the status of the b2drop connection
    this.client.get(this.serviceurl)
      .then(data => {
        //console.log("data response");
        //console.log(data);
        this.ea.publish(new MayLogout(this.panelid));
        if (data.response) {
          this.providers = JSON.parse(data.response);
        }
      })
      .catch(error =>{
        console.log("aliastable.attached() error:")
        console.log(error);
          //handle 403 unauthorized
          if (error.statusCode == 403) {
            this.ea.publish(new HandleLogin(this.panelid));
          } else
        alert('Sorry. Backend service is not working temporarily. Wait a moment. If the problem persist, report it to system administrator. '+this.serviceurl+' HTTP status:'+error.statusCode+' '+error.statusText)
      });
  }

  submitSettings(settings) {
     this.providers = settings;
  }

  removeProvider(settings){
    //console.log("removeProvider() "+alias);
    if (!confirm('Do you really want to delete the provider with alias "'+settings.alias+'" ?'))
      return;
    this.client.delete(this.serviceurl+"/"+settings.alias)
      .then(data =>{
        //console.log("data response");
        //console.log(data);
        if (data.response) {
          this.providers = JSON.parse(data.response);
        }
      })
      .catch(error =>{
        console.log(error);

        alert('Sorry. Settings not deleted at '+this.serviceurl+' error:'+error.response+" status:"+error.statusText)
      });
  }

}
