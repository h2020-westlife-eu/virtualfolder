/**
 * Created by Tomas Kulhanek on 1/6/17.
 */
import{ProjectApi} from "../components/projectapi";
import {EventAggregator} from 'aurelia-event-aggregator';
import {SettingsSubmitted} from './messages';
import {HandleLogin,MayLogout} from '../behavior';

/**
 * Aliastable component gets the currently registered aliases for file providers
 * and shows them in a table, allows delete the alias or initiate dialog to create one.
 */
export class Aliastable {
  static inject = [EventAggregator,ProjectApi];

  constructor(ea,pa){
    this.ea=ea;
    //this.serviceurl = Vfstorage.getBaseUrl()+"/metadataservice/files";
    //this.client=httpclient;
    this.pa=pa;
    this.providers=[{alias:"Loading available providers ...",temporary:true}];
  }

  attached() {
    this.s1 = this.ea.subscribe(SettingsSubmitted, msg => this.submitSettings(msg.settings) );
    this.pa.getFiles()
      .then(data => {
        this.ea.publish(new MayLogout(this.panelid));
        this.providers = data;
        
      })
      .catch(error =>{
        if (error.status === 403) {
            this.ea.publish(new HandleLogin(this.panelid));
          } else
        alert('Sorry. Backend service is not working temporarily. Wait a moment. If the problem persist, report it to system administrator. HTTP status:'+error.statusCode+' '+error.statusText)
      });
  }
  detached(){
    this.s1.dispose()
  }

  submitSettings(settings) {
     this.providers = settings;
  }

  removeProvider(settings){
    //console.log("removeProvider() "+alias);
    if (!confirm('Do you really want to delete the provider with alias "'+settings.alias+'" ?'))
      return;
    this.pa.deleteProvider(settings.alias)
      .then(data =>{
          this.providers = (data);
      })
      .catch(error =>{
        alert('Sorry. Settings not deleted. error:'+error.response+" status:"+error.statusText)
      });
  }
  
  
}
