/**
 * Created by Tomas Kulhanek on 9/6/16.
 */

import {AControl} from './acontrol';

export class Dropboxcontrol extends AControl {

    constructor() {
       super();
        this.heading="DROPBOX connector";
        this.CLIENTID = "x5tdu20lllmr0nv";
        this.showdropboxbutton = false;
        this.servicecontext = "dropboxconnector";
        this.dropBoxAuthUrl = "";
    }

    attached() {
        console.log('dropbox');
        console.log(Dropbox);
        if (this.isAuthenticated()) {
            this.showdropboxbutton = false;
            this.usertoken = this.getAccessTokenFromUrl();
            this.addservice('dropboxconnector');
        } else {
          console.log("dropboxcontrol.attached()");
          console.log(this.dialogstateentry);
          console.log(this.dialogstate);
            console.log(this.CLIENTID);
            this.showdropboxbutton = true;
            console.log(this.showdropboxbutton);

            var dbx = new Dropbox({clientId: this.CLIENTID});
            console.log(dbx);
            var currentUrl = window.location.href;
            console.log('current url:' + currentUrl);
            this.dropBoxAuthUrl = dbx.getAuthenticationUrl(currentUrl);
            console.log(this.dropBoxAuthUrl);
        }
        super.attached();
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
}
