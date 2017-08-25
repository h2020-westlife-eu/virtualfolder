import {EventAggregator} from 'aurelia-event-aggregator';
import {SelectedFile} from './messages';

export class App {
  static inject = [EventAggregator];

  constructor(ea) {
    this.ea = ea;
    this.ea.subscribe(SelectedFile, msg => this.selectFile(msg.file));
  }

  selectFile(file){
    //console.log("selectFile()")
    //console.log(file);
    window.opener.postMessage(window.location.protocol+"//"+window.location.hostname+file.publicwebdavuri, "*");
      //+" "+window.location.protocol+"//"+window.location.hostname+file.publicwebdavuri, "*");
    window.close();
  }

}
