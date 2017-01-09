/**
 * Created by Tomas Kulhanek on 1/5/17.
 */
import {HttpClient} from 'aurelia-http-client';
import {computedFrom} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SettingsSubmitted} from './messages';

let client = new HttpClient();

export class Genericcontrol {

  static inject = [EventAggregator];


  constructor(ea) {
    this.heading="File Provider";
    this.ea= ea;
    this.CLIENTID = "x5tdu20lllmr0nv";
    this.showdropboxbutton = false;
    this.servicecontext = "providers";
    this.dropBoxAuthUrl = "";
    this.providers = [];
    this.selectedProvider="";
    console.log('genericcontrol()');
    client.configure(config=> {
      config.withHeader('Accept', 'application/json');
      config.withHeader('Content-Type', 'application/json');
    });
  }

  @computedFrom('selectedProvider')
  get selectedDropbox() {
    this.securetoken="";
    this.username="";
    this.password="";
    return this.selectedProvider=='Dropbox';
  }

  @computedFrom('selectedProvider')
  get selectedB2Drop() {
    this.securetoken="";
    this.username="";
    this.password="";
    return this.selectedProvider=='B2Drop';
  }

  @computedFrom('selectedProvider')
  get selectedFileSystem() {
    this.securetoken="";
    this.username="";
    this.password="";
    return this.selectedProvider=='FileSystem';
  }

  attached() {
    console.log('genericcontrol.attached()');
    console.log("dialogstate:"+this.dialogstate);
    //attach parent with the instance
    //this.bindingContext.genericcontrol = this;
    //gets the status of the b2drop connection

    client.get("/metadataservice/"+this.servicecontext)
      .then(data => {
        console.log("data response");
        console.log(data);
        if (data.response) {
          this.providers = JSON.parse(data.response);
        }
      });
  }

  failcallback(myresponse) {
    this.updatedropboxstate(1);
    this.status = "fail:";
    if (myresponse.output) {
      this.status += myresponse.output;
    }
  }

  okcallback() {
    this.status = "OK";
    this.updatestate(3);
  }

  // Parses the url and gets the access token if it is in the urls hash
  getAccessTokenFromUrl() {
    return this.parseQueryString(window.location.hash).access_token;
  }

  // If the user was just redirected from authenticating, the urls hash will
  // contain the access token.
  isAuthenticated() {
    return !!this.getAccessTokenFromUrl();
  }

  addProvider() {
     var settings = {};
     settings.type=this.selectedProvider;
     settings.alias = this.alias;
     if (this.selectedDropbox || this.selectedFileSystem) settings.securetoken = this.username;
     else settings.username = this.username;
     if (this.password) settings.securetoken = this.password;
     this.ea.publish(new SettingsSubmitted(settings));
  }
}
