import {EventAggregator} from 'aurelia-event-aggregator';
import {SelectedFile} from '../filepicker/messages';
import {computedFrom} from 'aurelia-framework';
import {DialogService} from 'aurelia-dialog';
import {inject} from 'aurelia-framework';
import {Prompt} from './fmsettings';
import {HandleLogin} from '../behavior';
import {ShowLoginButton} from '../behavior'

//@inject(DialogService)

export class App {
  static inject = [EventAggregator,DialogService];

  constructor(ea,dialogService) {
    this.ea = ea;
    this.handler = new ShowLoginButton();
    this.ea.subscribe(SelectedFile, msg => this.selectFile(msg.file,msg.senderid));
    this.ea.subscribe(HandleLogin, msg => this.handler.handlelogin());
    this.dialogService=dialogService;
  }

  selectFile(file,senderid){
    //console.log("selectFile()")
    //console.log(file);
    //console.log(senderid);
    //window.opener.postMessage(window.location.protocol+"//"+window.location.hostname+file.webdavuri, "*");
    //window.close();
  }

  closeviewer(){
  }

  setupFileManager(){
    this.dialogService.open({viewModel: Prompt, model: 'File Manager Settings' }).then(response => {
      //console.log(response);

      if (!response.wasCancelled) {
        //console.log('dialog OK');
      } else {
        //console.log('dialog cancelled');
      }
      //console.log(response.output);
    });
  }

}
