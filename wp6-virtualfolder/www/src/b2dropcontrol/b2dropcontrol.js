/**
 * Created by vagrant on 9/6/16.
 */
import {HttpClient} from 'aurelia-http-client';
import {AControl} from 'acontrol';

let client = new HttpClient();

export class B2dropcontrol extends AControl{

    constructor (){
        this.heading="B2DROP connector";
    }
    attached(){
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
    }

    failcallback(myresponse) {
        this.updatestate(1);
        this.status = "fail:";
        if (myresponse.output) {
            this.status += myresponse.output;
        }
    }

    okcallback() {
        this.status = "OK";
        this.updatestate(3);
    }

}