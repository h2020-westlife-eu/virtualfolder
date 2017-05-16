/**
 * Created by Tomas Kulhanek on 1/16/17.
 */

import {HttpClient} from 'aurelia-http-client';

export class Modulecontrol{


  constructor () {
    this.httpclient=new HttpClient();
    this.url=window.location.href;
    this.enabled=false;
    this.httpclient.configure(config=> {
      config.withHeader('Accept', 'application/json');
      config.withHeader('Content-Type', 'application/json');
    });

  }

  attached(){
    console.log("attached() url:"+this.url);
    this.httpclient.get(this.url)
      .then(response => this.okcallback(response))
      .catch(error => this.failcallback(error))
  }

  okcallback(response){
    console.log("okcallback()");
    var res= JSON.parse(response.response);
    console.log(res.enabled);
    this.enabled= res.enabled;
  }

  failcallback(error){
    this.enabled=false;
    console.log('Sorry, error when connecting backend web service at '+this.url+' error:'+error.response+" status:"+error.statusText);
  }

  enable(){
    this.httpclient.post(this.url)
      .then(response => this.okcallback(response))
      .catch(error => this.failcallback(error))
  }

}
