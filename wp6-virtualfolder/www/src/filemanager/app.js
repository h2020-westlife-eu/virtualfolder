import {EventAggregator} from 'aurelia-event-aggregator';
import {SelectedFile} from '../filepicker/messages';
import {DialogService} from 'aurelia-dialog';
import {Prompt} from './fmsettings';
import {HandleLogin,MayLogout,ShowLoginButton} from '../behavior';

//@inject(DialogService)

export class App {
  static inject = [EventAggregator,DialogService];

  constructor(ea,dialogService) {
    this.ea = ea;
    this.ea.subscribe(SelectedFile, msg => this.selectFile(msg.file,msg.senderid));
    //shows logout button by default
    this.handler = new ShowLoginButton();
    //if it detects that it is not logged in - e.g. 403 returned - shows Login button instead
    this.ea.subscribe(HandleLogin, msg => this.handler.handlelogin());
    this.ea.subscribe(MayLogout, msg => this.handler.maylogout());
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
