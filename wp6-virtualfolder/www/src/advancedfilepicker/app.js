import {EventAggregator} from 'aurelia-event-aggregator';
import {SelectedFile} from '../filepicker/messages';
import {CheckedFile} from '../filepicker/messages';
import {HandleLogin} from '../behavior';
import {ShowLoginButton} from '../behavior';

export class App {
  static inject = [EventAggregator];

  constructor(ea) {
    this.ea = ea;
    this.handler = new ShowLoginButton();
    //this.ea.subscribe(SelectedFile, msg => this.selectFile(msg.file));
    this.ea.subscribe(CheckedFile, msg => this.selectFile(msg.file));
    this.ea.subscribe(HandleLogin, msg => this.handler.handlelogin());
  }

  selectFile(file){
    window.opener.postMessage(window.location.protocol+"//"+window.location.hostname+file.publicwebdavuri, "*");
    window.close();
  }

}
