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
        this.status = "";
        this.dialogstate = 1;
        this.dialogstateconnected,this.dialogstateconnecting=false;
        this.dialogstateentry = true;


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
            })
    }

    reconnect(){
        //triggers to show dialog
        this.updatestate(1);
    }

    addb2drop() { //post credentials to connect to b2dropconnector rest service
        this.updatestate(2);
        let postdata= {username:this.username,securetoken:this.usertoken};
        //console.log(postdata);
        let postdatajson=JSON.stringify(postdata);
        //console.log(postdatajson);

        client.post("/metadataservice/b2dropconnector",postdatajson)
            .then(data => {
                //console.log(data.response);
                let myresponse = JSON.parse(data.response);
                if (myresponse.connected) { this.status="OK"; this.updatestate(3);}
                else {
                    this.updatestate(1);
                    this.status="fail:";
                    if (myresponse.output) {
                        this.status+=myresponse.output;
                    }
                }
            });
    }
}

