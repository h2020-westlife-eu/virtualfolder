/**
 * Created by Tomas Kulhanek on 1/5/17.
 */
import {HttpClient} from 'aurelia-http-client';
import {computedFrom} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SettingsSubmitted} from './messages';
import {DropboxControl} from './dropboxcontrol';
import {SettingsSelected} from './messages';

export class Genericcontrol {

  static inject = [EventAggregator, HttpClient,DropboxControl];


  constructor(ea,httpclient,dropboxcontrol) {
    this.heading="File Provider";
    this.ea= ea;
    this.dropboxcontrol=dropboxcontrol;

    this.servicecontext = "providers";
    this.knowtoken=false;
    this.dropboxauthurl = "";
    this.providers = [];
    this.selectedProvider="";
    console.log('genericcontrol()');
    this.client=httpclient;
    this.client.configure(config=> {
      config.withHeader('Accept', 'application/json');
      config.withHeader('Content-Type', 'application/json');
    });
    this.ea.subscribe(SettingsSelected, msg => this.selectSettings(msg.settings) )
  }

  @computedFrom('selectedProvider')
  get selectedDropbox() {
//    this.securetoken="";
    this.username="";
    this.password="";
    return this.selectedProvider==this.dropboxcontrol.id;
  }

  @computedFrom('selectedProvider')
  get selectedB2Drop() {
//    this.securetoken="";
    this.username="";
    this.password="";
    return this.selectedProvider=='B2Drop';
  }

  @computedFrom('selectedProvider')
  get selectedFileSystem() {
//    this.securetoken="";
    this.username="";
    this.password="";
    return this.selectedProvider=='FileSystem';
  }

  get knowntoken(){
    if (this.knownSecureToken) return this.knownSecureToken.checked;
  }

  attached() {
    console.log('genericcontrol.attached()');
    console.log("dialogstate:"+this.dialogstate);
    //attach parent with the instance
    //this.bindingContext.genericcontrol = this;
    //gets the status of the b2drop connection
    this.dropboxauthurl = this.dropboxcontrol.authurl;
    this.client.get("/metadataservice/"+this.servicecontext)
      .then(data => {
        console.log("data response");
        console.log(data);
        if (data.response) {
          this.providers = JSON.parse(data.response);
        }
      });
    this.dropboxcontrol.initialize();
  }

  addProvider() {
     var settings = {};
     settings.type=this.selectedProvider;
     settings.alias = this.alias;
     if (this.selectedDropbox || this.selectedFileSystem) settings.securetoken = this.securetoken;
     else settings.username = this.username;
     if (this.password) settings.securetoken = this.password;
     console.log("publishing");
     this.ea.publish(new SettingsSubmitted(settings));
  }

  selectSettings(settings){
    this.selectedProvider=settings.type;
    this.alias=settings.alias;
    this.securetoken=settings.securetoken;
    if (!!this.securetoken) { this.knownSecureToken.checked=true; }
  }

}
