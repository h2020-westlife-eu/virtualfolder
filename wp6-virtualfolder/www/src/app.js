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
        this.showdialog = false;
        client.configure(config=>{
            config.withHeader('Accept','application/json');
            config.withHeader('Content-Type','application/json');
        });
        //gets the status of the b2drop connection
        client.get("http://localhost/metadataservice/b2dropconnector")
            .then(data => {
                this.status="disconnected"
                this.showdialog=true;
                if (data.response) {
                    let myresponse = JSON.parse(data.response);
                    if (myresponse.connected) {
                        this.status = "OK"
                        this.showdialog = false;
                    }
                }
            })
    }

    reconnect(){
        //triggers to show dialog
        this.showdialog=true;
    }

    addb2drop() { //post credentials to connect to b2dropconnector rest service
        let postdata= {username:this.username,securetoken:this.usertoken};
        console.log(postdata);
        let postdatajson=JSON.stringify(postdata);
        console.log(postdatajson);

        client.post("/metadataservice/b2dropconnector",postdatajson)
            .then(data => {
                console.log(data.response);
                let myresponse = JSON.parse(data.response);
                if (myresponse.connected) this.status="OK"
                else {
                    this.status="fail:";
                    if (myresponse.output) {
                        this.status+=myresponse.output;
                    }
                }
            });
    }

}

