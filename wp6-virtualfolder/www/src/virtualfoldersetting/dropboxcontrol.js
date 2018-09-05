/**
 * Created by Tomas Kulhanek on 1/10/17.
 */

import {EventAggregator} from 'aurelia-event-aggregator';
import {SettingsSelected} from './messages';
import {Vfstorage} from '../components/vfstorage';
import 'dropbox';

export class DropboxControl {

  static inject = [EventAggregator];

  constructor(ea){
    //this.dbx = dropbox;
    // Parses the url and gets the access token if it is in the urls hash
    this.ea= ea;
    this.accesstoken=Vfstorage.parseQueryString(window.location.hash).access_token;
    this.isAuthenticated = !!this.accesstoken;
    //console.log('dropboxcontrol() accesstoken:'+this.accesstoken);

    //instantiate dropboxclient - needed for getting URL to redirect
    this.CLIENTIDENC = "o\"csb%'{{{ze'ya";
    try {
      var Dropbox = require("dropbox");
      //console.log(mdb)
      var dbx = new Dropbox({
        clientId: this.CLIENTIDENC.split('').map(function (c) {
          return String.fromCharCode(23 ^ c.charCodeAt());
        }).join("")
      });
      var currentUrl = window.location.href;
      //console.log('dropboxcontrol() current url:' + currentUrl);
      this.authurl = dbx.getAuthenticationUrl(currentUrl);
      //console.log('dropboxcontrol() auth url:' + this.authurl);
      //console.log(this.dropBoxAuthUrl);
    } catch(e){
      console.log("Dropboxcontrol() exception:")
      console.log(e)
    }

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
