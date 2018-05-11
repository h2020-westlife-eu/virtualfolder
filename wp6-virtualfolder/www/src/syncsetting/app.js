import {EventAggregator} from 'aurelia-event-aggregator';
import {SelectedFile} from './messages';
import {HandleLogin, MayLogout} from '../behavior';
import {HttpClient} from 'aurelia-http-client';

export class App {
  static inject = [EventAggregator,HttpClient];

  constructor(ea,httpclient) {
    this.ea=ea;
    this.client=httpclient;
    this.providers=[{alias:"Loading available providers ...",temporary:true}];
    this.client.configure(config=> {
      config.withHeader('Accept', 'application/json');
      config.withHeader('Content-Type', 'application/json');
    });
  }
  attached() {
    //gets the status of the b2drop connection
    this.client.get(this.serviceurl)
      .then(data => {
        //console.log("data response");
        //console.log(data);
        this.ea.publish(new MayLogout(this.panelid));
        if (data.response) {
          this.providers = JSON.parse(data.response);
        }
      })
      .catch(error =>{
        console.log("aliastable.attached() error:");
        console.log(error);
        //handle 403 unauthorized
        if (error.statusCode == 403) {
          this.ea.publish(new HandleLogin(this.panelid));
        } else
          alert('Sorry. Backend service is not working temporarily. Wait a moment. If the problem persist, report it to system administrator. '+this.serviceurl+' HTTP status:'+error.statusCode+' '+error.statusText)
      });
  }

  includeSettings(provider) {
    provider.selected = true;
  }
  
  notincludeSettings(provider) {
    provider.selected = false;
  }

}
