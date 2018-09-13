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
    
    let fileurl="";
    //full url, will return it
    if (file.publicwebdavuri.startsWith("http")) fileurl = file.publicwebdavuri;
      //partial url - e.g. pdb redo, will add protocol
      else if (file.publicwebdavuri.startsWith("//")) fileurl = window.location.protocol+file.publicwebdavuri;
      //relative url - local resources, will add protocol and host
      else fileurl = window.location.protocol+"//"+window.location.host+file.publicwebdavuri;
    
    window.opener.postMessage(fileurl, "*");
    window.close();
  }

}
