/**
 * Created by Tomas Kulhanek on 1/5/17.
 */
//import {HttpClient,json} from 'aurelia-fetch-client';
import {ProjectApi} from "../components/projectapi";
import {computedFrom} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SettingsSubmitted} from './messages';
import {DropboxControl} from './dropboxcontrol';
import {SettingsSelected} from './messages';
import {Vfstorage} from "../utils/vfstorage";
import {Dataitem} from "../pdbcomponents/dataitem";

export class Genericcontrol {

  static inject = [EventAggregator, ProjectApi,DropboxControl];


  constructor(ea,pa,dropboxcontrol) {
    this.heading="File Provider";
    this.ea= ea;
    this.dropboxcontrol=dropboxcontrol;
    this.editing=true;
    //this.providerspath = "providers";
    this.filespath = "files";
    this.knowtoken=false;
    this.dropboxauthurl = "";
    this.providers = [];
    this.selectedProvider="";
    //this.serviceurl = Vfstorage.getBaseUrl()+"/metadataservice/";
    //console.log('genericcontrol()');
    //this.client=httpclient;
    this.pa =pa;

    this.myHeaders = new Headers();
    this.myHeaders.append('Accept', 'application/json');
    this.myHeaders.append('Content-Type', 'application/json');

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

  @computedFrom('selectedProvider')
  get selectedOnedata() {
    return this.selectedProvider=='Onedata';
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
    //console.log('genericcontrol.attached()');
    //console.log("dialogstate:"+this.dialogstate);
    //attach parent with the instance
    //this.bindingContext.genericcontrol = this;
    //gets the status of the b2drop connection
    this.s1 = this.ea.subscribe(SettingsSelected, msg => this.selectSettings(msg.settings) )
    this.dropboxauthurl = this.dropboxcontrol.authurl;
    this.pa.getProviders()
      .then(data=>{
        if (data) {
          this.providers = data;
        }
      }).catch(error => {
      //handle 403 unauthorized
      if (error.statusCode === 403) {
        //try to login
        window.location = "/login?next=" + window.location.pathname;
        //window.location =
      } else {
        console.log('Error', error);
        //alert('Sorry, response: ' + error.statusCode + ':' + error.statusText + ' when trying to get: ' + this.serviceurl);
      }
    });
    /*this.client.fetch(this.serviceurl+this.providerspath,{headers:this.myHeaders,credentials:'include'})
      .then(response => response.json())
      .then(data=> {
        //console.log("data response");
        //console.log(data);
        if (data) {
          this.providers = data;
        }
      }).catch(error => {
      //handle 403 unauthorized
      if (error.statusCode == 403) {
        //try to login
        console.log("genericcontrol.attached() redirecting");
        window.location = "/login?next=" + window.location.pathname;
        //window.location =
      } else {
        console.log('Error');
        console.log(error);
        //alert('Sorry, response: ' + error.statusCode + ':' + error.statusText + ' when trying to get: ' + this.serviceurl);
      }
    });
    */
    this.dropboxcontrol.initialize();
  }
  detached(){
    this.s1.dispose();
  }

  addProvider() {
     let settings = {};
     settings.type=this.selectedProvider;
     settings.alias = this.alias;
     if (this.selectedDropbox) settings.securetoken = this.securetoken;
     if (this.selectedFileSystem) settings.securetoken = this.filesystempath;
     if (this.selectedB2Drop) {
       settings.securetoken = this.password;
       settings.username = this.username;
     } else if (this.selectedWebDav){
       settings.accessurl=this.accessurl;
       settings.securetoken = this.password;
       settings.username = this.username;
     } else if (this.selectedOnedata) {
       // OneProvider host&port
       settings.accessurl=this.accessurl;
       // Access token
       settings.securetoken = this.securetoken;
     }
     //console.log("addProvider() debug:",this, this.pa,settings);
    this.pa.putProvider(settings)
      .then(data => {
        //console.log("addProvider() data returned",data);
        this.ea.publish(new SettingsSubmitted(data));
        this.clear();
        
      })
      .catch(error => {
        console.log(error);
        alert('Sorry. Settings not submitted  at '+this.serviceurl+' error:'+error.response+" status:"+error.statusText)
      });
    return true;
  }

  selectSettings(settings){
    this.selectedProvider=settings.type;
    this.alias=settings.alias;
    this.securetoken=settings.securetoken;
    if (!!this.securetoken) { this.editing=false; this.knownSecureToken.checked=true; }
  }

}
