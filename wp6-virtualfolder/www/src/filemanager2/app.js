import {EventAggregator} from 'aurelia-event-aggregator';
import {SelectedFile} from '../filepicker/messages';
import {computedFrom} from 'aurelia-framework';

export class App {
  static inject = [EventAggregator];

  constructor(ea) {
    this.ea = ea;
    this.ea.subscribe(SelectedFile, msg => this.selectFile(msg.file,msg.senderid));
  }

  selectFile(file,senderid){
    console.log("selectFile()")
    console.log(file);
    console.log(senderid);
    //window.opener.postMessage(window.location.protocol+"//"+window.location.hostname+file.webdavuri, "*");
    //window.close();
  }

  closeviewer(){
  }

}
