import {DialogService} from 'aurelia-dialog';
import {inject} from 'aurelia-framework';
import {Prompt} from '../filemanager2/fmsettings';

@inject(DialogService)

export class Filemanager {

  constructor(ds) {
    this.dialogService=ds;
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
