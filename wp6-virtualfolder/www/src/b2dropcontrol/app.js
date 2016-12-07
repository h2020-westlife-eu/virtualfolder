/**
 * Created by vagrant on 9/6/16.
 */
import {HttpClient} from 'aurelia-http-client';

let client = new HttpClient();

export class App {
    constructor() {
        this.heading = "B2Drop connector";
        this.username = "";
        this.usertoken = "";
        this.status = "unknown";
        this.statusdropbox="unknown";
        this.dialogstate = 1;
        this.dialogstateconnected,this.dialogstateconnecting=false;
        this.dialogstateentry = true;
        this.dropboxstate = 1;
        this.dropboxconnected,this.dropboxconnecting=false;
        this.dropboxentry = true;
        this.showdropboxbutton = false;
        this.dropBoxAuthUrl="";
        this.CLIENTID = "x5tdu20lllmr0nv";

        client.configure(config=> {
            config.withHeader('Accept', 'application/json');
            config.withHeader('Content-Type', 'application/json');
        });
    }

    updatestate(state){
        this.dialogstate = state;
        this.dialogstateconnected = state == 3;
        this.dialogstateconnecting = state ==2;
        this.dialogstateentry = state==1;
    }

    updatedropboxstate(state) {
        this.dropboxstate = state;
        this.dropboxconnected = state == 3;
        this.dropboxconnecting = state ==2;
        this.dropboxentry = state==1;

    }

    attached() {
        //gets the status of the b2drop connection
        client.get("/metadataservice/b2dropconnector")
            .then(data => {
                this.status="disconnected";
                this.updatestate(1);
                //console.log("data response");
                //console.log(data);
                if (data.response) {
                    let myresponse = JSON.parse(data.response);
                    if (myresponse.connected) {
                        this.status = "OK";
                        this.updatestate(3);
                    }
                }
            });
        //console.log('dropbox');
        //console.log(Dropbox);
        if (this.isAuthenticated()) {
            this.shodropboxbutton=false;
            this.usertoken=this.getAccessTokenFromUrl();
            this.adddropbox();
        } else {
            var dbx= new Dropbox({clientId:this.CLIENTID});
            console.log(dbx);
        var currentUrl = window.location.href;
        console.log('current url:'+currentUrl);
        this.dropBoxAuthUrl = dbx.getAuthenticationUrl(currentUrl);
        console.log(this.dropBoxAuthUrl);
        this.showdropboxbutton = true;
        }
    }

    reconnect(){
        //triggers to show dialog
        this.updatestate(1);
    }

    addb2drop(){ return this.addserviceb2dropconnector();}//",this.b2dropOKCallback,this.b2dropFailCallback)}

    adddropbox(){ return this.addservicedropboxconnector();}//",this.dropboxOKCallback,this.dropboxFailCallback)}

    addservice(servicename,okcallback,failcallback) { //post credentials to connect to b2dropconnector rest service
        this.updatestate(2);
        let postdata= {username:this.username,securetoken:this.usertoken};
        //console.log(postdata);
        let postdatajson=JSON.stringify(postdata);
        //console.log(postdatajson);

        client.post("/metadataservice/"+servicename,postdatajson)
            .then(data => {
                //console.log(data.response);
                let myresponse = JSON.parse(data.response);
                if (myresponse.connected) { okcallback();}
                else {
                    failcallback(myresponse);
                }
            });
    }

    addserviceb2dropconnector() { //post credentials to connect to b2dropconnector rest service
                this.updatestate(2);
                let postdata= {username:this.username,securetoken:this.usertoken};
                //console.log(postdata);
                let postdatajson=JSON.stringify(postdata);
                //console.log(postdatajson);

                client.post("/metadataservice/b2dropconnector",postdatajson)
                    .then(data => {
                        //console.log(data.response);
                        let myresponse = JSON.parse(data.response);
                        if (myresponse.connected) { this.b2dropOKCallback();}
                        else {
                            this.b2dropFailCallback(myresponse);
                        }
                    });
            }

    addservicedropboxconnector() { //post credentials to connect to b2dropconnector rest service
        this.updatestate(2);
        let postdata= {username:this.username,securetoken:this.usertoken};
        //console.log(postdata);
        let postdatajson=JSON.stringify(postdata);
        //console.log(postdatajson);

        client.post("/metadataservice/dropboxconnector",postdatajson)
            .then(data => {
                //console.log(data.response);
                let myresponse = JSON.parse(data.response);
                if (myresponse.connected) { this.dropboxOKCallback();}
                else {
                    this.dropboxFailCallback(myresponse);
                }
            });
    }

    b2dropFailCallback(myresponse) {
        this.updatestate(1);
        this.status = "fail:";
        if (myresponse.output) {
            this.status += myresponse.output;
        }
    }

    b2dropOKCallback() {
        this.status = "OK";
        this.updatestate(3);
    }


    dropboxFailCallback(myresponse) {
        this.updatedropboxstate(1);
        this.statusdropbox = "fail:";
        if (myresponse.output) {
            this.statusdropbox += myresponse.output;
        }
    }

    dropboxOKCallback() {
        this.statusdropbox = "OK";
        this.updatedropboxstate(3);
    }

    dropboxconnect() {
        this.updatestate(2);

    }

    dropboxreconnect() {
        this.updatestate(1);
    }



    parseQueryString(str) {
        var ret = Object.create(null);

        if (typeof str !== 'string') {
            return ret;
        }

        str = str.trim().replace(/^(\?|#|&)/, '');

        if (!str) {
            return ret;
        }

        str.split('&').forEach(function (param) {
            var parts = param.replace(/\+/g, ' ').split('=');
            // Firefox (pre 40) decodes `%3D` to `=`
            // https://github.com/sindresorhus/query-string/pull/37
            var key = parts.shift();
            var val = parts.length > 0 ? parts.join('=') : undefined;

            key = decodeURIComponent(key);

            // missing `=` should be `null`:
            // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
            val = val === undefined ? null : decodeURIComponent(val);

            if (ret[key] === undefined) {
                ret[key] = val;
            } else if (Array.isArray(ret[key])) {
                ret[key].push(val);
            } else {
                ret[key] = [ret[key], val];
            }
        });

        return ret;
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

