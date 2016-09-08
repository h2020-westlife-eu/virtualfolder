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
        client.configure(config=>{
            config.withHeader('Accept','application/json');
            config.withHeader('Content-Type','application/json');
        });
    }

    getb2drop() {
        client.get("http://localhost/metadataservice/b2dropconnector")
            .then(data => {
                if (data.connected) {
                    this.status="OK"
                } else {
                    this.status="fail"
                }
            })
    }

    addb2drop() {

        let postdata= {username:this.username,securetoken:this.usertoken};
        console.log(postdata);
        let postdatajson=JSON.stringify(postdata);
        console.log(postdatajson);

        client.post("http://localhost/metadataservice/b2dropconnector",postdatajson)
            .then(data => {
                console.log(data);
                if (data.response.connected) this.status="OK"
                else {
                    this.status="fail:";
                    if (data.response.output) {
                        this.status+=data.response.output;
                    }
                }
            });

    }

}

