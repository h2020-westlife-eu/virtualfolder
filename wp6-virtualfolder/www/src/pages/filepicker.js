export class Filepicker {

  constructor() {
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

  openfilepickerwindow(_target){
    return this.openwindow(_target,"filepickercomponent.html")
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
