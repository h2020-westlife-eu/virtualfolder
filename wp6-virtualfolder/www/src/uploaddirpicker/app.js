import {EventAggregator} from 'aurelia-event-aggregator';
import {SelectedFile} from '../filepicker/messages';

export class App {
  static inject = [EventAggregator];

  constructor(ea) {
    this.ea = ea;
    this.ea.subscribe(SelectedFile, msg => this.selectFile(msg.file));
  }

  selectFile(file){
    window.opener.postMessage(window.location.protocol+"//"+window.location.hostname+file.webdavuri, "*");
      //+" "+window.location.protocol+"//"+window.location.hostname+file.publicwebdavuri, "*");
    window.close();
  }

}
