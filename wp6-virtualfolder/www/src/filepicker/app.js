import {EventAggregator} from 'aurelia-event-aggregator';
import {SelectedFile} from './messages';
import {HandleLogin} from '../behavior';
import {RedirectLogin} from '../behavior';

export class App {
  static inject = [EventAggregator];

  constructor(ea) {
    this.ea = ea;
    this.ea.subscribe(SelectedFile, msg => this.selectFile(msg.file));
    this.handler = new RedirectLogin();
    this.ea.subscribe(HandleLogin, msg => this.handler.handlelogin());
  }

  selectFile(file){
    window.opener.postMessage(window.location.protocol+"//"+window.location.host+file.publicwebdavuri, "*");
    window.close();
  }

}
