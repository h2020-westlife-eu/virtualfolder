/**
 * Created by Tomas Kulhanek on 1/6/17.
 */
import {HttpClient} from 'aurelia-http-client';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SettingsSubmitted} from './messages';

let client = new HttpClient();

/**
 * Aliastable component gets the currently registered aliases for file providers
 *
 */
export class Aliastable {
  static inject = [EventAggregator];

  constructor(ea){
    this.serviceurl = "/metadataservice/files";
    ea.subscribe(SettingsSubmitted, msg => this.submitSettings(msg.settings) )
    client.configure(config=> {
      config.withHeader('Accept', 'application/json');
      config.withHeader('Content-Type', 'application/json');
    });
  }

  attached() {
    //gets the status of the b2drop connection
    client.get(this.serviceurl)
      .then(data => {
        console.log("data response");
        console.log(data);
        if (data.response) {
          this.providers = JSON.parse(data.response);
        }
      });
  }

  submitSettings(settings) {
    client.put(this.serviceurl,JSON.stringify(settings))
      .then(data =>{
        console.log("data response");
        console.log(data);
        if (data.response) {
          this.providers = JSON.parse(data.response);
        }
      });
  }

}
