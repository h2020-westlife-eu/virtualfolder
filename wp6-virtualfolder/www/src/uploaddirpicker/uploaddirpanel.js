/**
 * created by Tomas Kulhanek on 4/11/17.
 */

//import {HttpClient} from 'aurelia-http-client';
import {ProjectApi} from "../components/projectapi";
import {EventAggregator} from 'aurelia-event-aggregator';
import {SelectedFile} from '../filepicker/messages';
import {bindable} from 'aurelia-framework';
import {Filepanel} from '../filepicker/filepanel';

export class Uploaddirpanel extends Filepanel {
  static inject = [EventAggregator, ProjectApi];
  @bindable panelid;

  constructor(ea, pa) {
    super(ea,pa)
  }

  selectFile(file){
    //console.log("filepanel tableid:"+this.panelid);
    if (!file.size || (file.size.endsWith && file.size.endsWith('DIR'))) this.changefolder(file.name);
  }


  selectThisDir() {
    //console.log("selected:"+this.currentdir);
    //publish only if the currentdir is set (metadata exists)
    if (this.currentdir)
      this.ea.publish(new SelectedFile(this.currentdir, this.panelid));
    /*let myfile= {};
    myfile.name = this.path;
    this.pa.getPublicWebDav()
      .then(data => {
          let mypath = data.signed_url;
          mypath+= this.path.startsWith('/')?this.path.slice(1):this.path;
          let mydir = {};
          mydir.webdavuri = mypath;
          this.ea.publish(new SelectedFile(mydir, this.panelid));
      });*/
    
  }
}
