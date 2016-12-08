/**
 * Created by vagrant on 9/6/16.
 */
import {HttpClient} from 'aurelia-http-client';
import {AControl} from 'acontrol';
let client = new HttpClient();

export class Dropboxcontrol extends AControl {
    contructor() {
        this.dropBoxAuthUrl = "";
        this.CLIENTID = "x5tdu20lllmr0nv";
        this.showdropboxbutton = false;
        this.heading="ONEDRIVE connector";
    }

    attached() {
        //console.log('dropbox');
        //console.log(Dropbox);
        if (this.isAuthenticated()) {
            this.shodropboxbutton = false;
            this.usertoken = this.getAccessTokenFromUrl();
            this.addservice('dropboxconnector');
        } else {
            console.log(this.CLIENTID);
            var dbx = new Dropbox({clientId: this.CLIENTID});
            console.log(dbx);
            var currentUrl = window.location.href;
            console.log('current url:' + currentUrl);
            this.dropBoxAuthUrl = dbx.getAuthenticationUrl(currentUrl);
            console.log(this.dropBoxAuthUrl);
            this.showdropboxbutton = true;
        }
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
