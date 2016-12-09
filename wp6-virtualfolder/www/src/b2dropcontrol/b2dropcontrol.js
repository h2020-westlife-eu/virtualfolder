/**
 * Created by vagrant on 9/6/16.
 */
import {HttpClient} from 'aurelia-http-client';
import {AControl} from 'acontrol';

let client = new HttpClient();

export class B2dropcontrol extends AControl{

    constructor (){
        super();
        this.heading="B2DROP connector";
        this.servicecontext = "b2dropconnector";
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
