/**
 * Created by Tomas Kulhanek on 12/8/16.
 */
import {HttpClient} from 'aurelia-http-client';

let client = new HttpClient();

export class AControl {

    constructor() {
        this.heading = "connector";
        this.username = "";
        this.usertoken = "";
        this.status = "unknown";
        this.dialogstate = 1;
        this.dialogstateconnected, this.dialogstateconnecting = false;
        this.dialogstateentry = true;
        this.servicecontext="";
        this.showbutton = false;
        client.configure(config=> {
            config.withHeader('Accept', 'application/json');
            config.withHeader('Content-Type', 'application/json');
        });
    }

    updatestate(state) {
        this.dialogstate = state;
        this.dialogstateconnected = state == 3;
        this.dialogstateconnecting = state == 2;
        this.dialogstateentry = state == 1;
    }

    attached() {
      console.log("Acontrol.attached()");
      console.log("dialogstate:"+this.dialogstate);
        //gets the status of the b2drop connection
        client.get("/metadataservice/"+this.servicecontext)
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
    }

    reconnect() {
        //triggers to show dialog
        this.updatestate(1);
    }

    /*    addb2drop(){ return this.addserviceb2dropconnector();}//",this.b2dropOKCallback,this.b2dropFailCallback)}

     adddropbox(){ return this.addservicedropboxconnector();}//",this.dropboxOKCallback,this.dropboxFailCallback)}
     */
    addservice(servicename) { //post credentials to connect to b2dropconnector rest service
        this.updatestate(2);
        let postdata = {username: this.username, securetoken: this.usertoken};
        //console.log(postdata);
        let postdatajson = JSON.stringify(postdata);
        //console.log(postdatajson);

        client.post("/metadataservice/" + servicename, postdatajson)
            .then(data => {
                //console.log(data.response);
                let myresponse = JSON.parse(data.response);
                if (myresponse.connected) {
                    okcallback();
                }
                else {
                    failcallback(myresponse);
                }
            });
    }

    failcallback() {
        console.log('acontrol.okcallback() should be overridden')
        //empty, implemented by child
    }

    okcallback() {
        console.log('acontrol.okcallback() should be overridden')
        //empty, implemented by child
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
}

