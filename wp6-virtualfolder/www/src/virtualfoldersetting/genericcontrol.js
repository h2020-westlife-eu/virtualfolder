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
    this.editing=true;
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
    return this.selectedProvider==this.dropboxcontrol.id;
  }

  @computedFrom('selectedProvider')
  get selectedB2Drop() {
    return this.selectedProvider=='B2Drop';
  }

  @computedFrom('selectedProvider')
  get selectedFileSystem() {
    return this.selectedProvider=='FileSystem';
  }
  @computedFrom('selectedProvider')
  get selectedWebDav() {
    return this.selectedProvider=='WebDav';
  }

  get knowntoken(){
    if (this.knownSecureToken) return this.knownSecureToken.checked;
  }

  clear(){
    this.selectedProvider="";
    this.username="";
    this.securetoken="";
    this.filesystempath="";
    this.alias="";
    this.accessurl="";
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
      }).catch(error => {
      //handle 403 unauthorized
      if (error.statusCode == 403) {
        //try to login
        console.log("redirecting");
        window.location = "/login";
        //window.location =
      }
      console.log('Error');
      console.log(error);
      alert('Sorry, response: '+error.statusCode+':'+error.statusText+' when trying to get: '+this.serviceurl);
    });;
    this.dropboxcontrol.initialize();
  }

  addProvider() {
     var settings = {};
     settings.type=this.selectedProvider;
     settings.alias = this.alias;
     if (this.selectedDropbox) settings.securetoken = this.securetoken;
     if (this.selectedFileSystem) settings.securetoken = this.filesystempath;
     if (this.selectedB2Drop) {
       settings.securetoken = this.password;
       settings.username = this.username;
     }
     if (this.selectedWebDav){
       settings.accessurl=this.accessurl;
       settings.securetoken = this.password;
       settings.username = this.username;
     }
     console.log("publishing");
     this.ea.publish(new SettingsSubmitted(settings));
      this.clear();
  }

  selectSettings(settings){
    this.selectedProvider=settings.type;
    this.alias=settings.alias;
    this.securetoken=settings.securetoken;
    if (!!this.securetoken) { this.editing=false; this.knownSecureToken.checked=true; }
  }

}
