/**
 * Created by Tomas Kulhanek on 1/10/17.
 */
/**
 * Created by Tomas Kulhanek on 1/5/17.
 */

import {UrlUtils} from './urlutils';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SettingsSelected} from './messages';

//let client = new HttpClient();

export class DropboxControl {

  static inject = [EventAggregator, UrlUtils];

  constructor(ea,urlutils){
    //this.dbx = dropbox;
    // Parses the url and gets the access token if it is in the urls hash
    this.ea= ea;
    this.urlutils = urlutils;
    this.accesstoken=this.urlutils.parseQueryString(window.location.hash).access_token;
    this.isAuthenticated = !!this.accesstoken;
    console.log('dropboxcontrol() accesstoken:'+this.accesstoken);
    //instantiate dropboxclient - needed for getting URL to redirect
    this.CLIENTID = "x5tdu20lllmr0nv";
    var dbx = new Dropbox({clientId: this.CLIENTID});

    var currentUrl = window.location.href;
    console.log('dropboxcontrol() current url:' + currentUrl);
    this.authurl = dbx.getAuthenticationUrl(currentUrl);
    console.log(this.dropBoxAuthUrl);
    this.id="Dropbox";
  }

  initialize(){
    if (this.isAuthenticated) {
      var settings = {};
      settings.type=this.id;
      //settings.alias = this.alias;
      settings.securetoken = this.accesstoken;
      //else settings.username = this.username;
      //if (this.password) settings.securetoken = this.password;
      this.ea.publish(new SettingsSelected(settings));
    }
  }

}
