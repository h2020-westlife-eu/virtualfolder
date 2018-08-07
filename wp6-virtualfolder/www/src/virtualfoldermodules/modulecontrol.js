/**
 * Created by Tomas Kulhanek on 1/16/17.
 */

//import {HttpClient} from 'aurelia-http-client';
import {ProjectApi} from "../components/projectapi";
import {Vfstorage} from '../components/vfstorage';
//import {bindable} from 'aurelia-framework';


export class Modulecontrol{
//  @bindable classin = "w3-card-4 w3-sand w3-padding w3-margin w3-round";
  constructor () {
    this.client=new HttpClient();
    this.url=window.location.href;
    this.baseurl=Vfstorage.getBaseUrl()
    this.enabled=false;
    this.client.configure(config=> {
      config.withHeader('Accept', 'application/json');
      config.withHeader('Content-Type', 'application/json');
    });

  }

  attached(){
    //console.log("attached() url:"+this.url);
    this.client.get(this.baseurl+this.url)
      .then(response => this.okcallback(response))
      .catch(error => this.failcallback(error))
  }

  okcallback(response){
    //console.log("okcallback()");
    var res= JSON.parse(response.response);
    //console.log(res.enabled);
    this.enabled= res.enabled;
  }

  failcallback(error){
    this.enabled=false;
    console.log('Sorry, error when connecting backend web service at '+this.url+' error:'+error.response+" status:"+error.statusText);
  }

  enable(){
    this.client.post(this.baseurl+this.url)
      .then(response => this.okcallback(response))
      .catch(error => this.failcallback(error))
  }

}
