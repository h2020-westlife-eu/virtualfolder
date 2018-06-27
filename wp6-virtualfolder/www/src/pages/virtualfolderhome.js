import {ProjectApi} from "../components/projectapi";
import {EventAggregator} from 'aurelia-event-aggregator';
//import {RedirectLogin,HandleLogin,MayLogout} from '../behavior';

export class Virtualfolderhome {
  static inject = [EventAggregator,ProjectApi];

  constructor(ea,projectapi){
    this.ea = ea;
    this.location = window.location.protocol;
    this.islocalhost= this.location.startsWith('http:');
    this.pa=projectapi;
    this.webdavurl="";
    
    this.popup;
    this.target;
    //receives message from popup window, define as arrow function due to eventlistener
    this.receiveMessage = event =>
    {
      document.getElementById(this.target).innerHTML=event.data;
      document.getElementById(this.target).setAttribute("href",event.data);
    }
  }

  attached(){
    window.addEventListener("message", this.receiveMessage, false);
  }

  detached() {
    window.removeEventListener("message", this.receiveMessage)
  }


  openuploaddirpickerwindow(_target){
    return this.openwindow(_target,"uploaddirpickercomponent.html")
  }
  //opens popup window in defined location
  openwindow(_target,href) {
    this.target=_target;
    this.popup=window.open(href, 'newwindow', 'width=640, height=480');
    return false;
  }
  
}
