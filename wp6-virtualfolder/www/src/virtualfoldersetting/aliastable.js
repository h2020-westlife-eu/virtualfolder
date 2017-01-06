/**
 * Created by Tomas Kulhanek on 1/6/17.
 */
import {HttpClient} from 'aurelia-http-client';

let client = new HttpClient();

export class Aliastable {
  constructor(){
    this.servicecontext = "files";
    console.log('genericcontrol()');
    client.configure(config=> {
      config.withHeader('Accept', 'application/json');
      config.withHeader('Content-Type', 'application/json');
    });
  }

  attached() {
    console.log('genericcontrol.attached()');
    //gets the status of the b2drop connection
    client.get("/metadataservice/"+this.servicecontext)
      .then(data => {
        console.log("data response");
        console.log(data);
        if (data.response) {
          this.providers = JSON.parse(data.response);
        }
      });
  }

}
