/**
 * created by Tomas Kulhanek on 4/11/17.
 */

import {HttpClient} from 'aurelia-http-client';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SelectedFile} from '../filepicker/messages';
import {bindable} from 'aurelia-framework';
import {Filepanel} from '../filepicker/filepanel';

export class Uploaddirpanel extends Filepanel {
  static inject = [EventAggregator, HttpClient];
  @bindable panelid;

  constructor(ea, httpclient) {
    super(ea,httpclient)
  }

  selectFile(file){
    console.log("filepanel tableid:"+this.panelid);
    if (file.size.endsWith && file.size.endsWith('DIR')) this.changefolder(file.name);
  }


  selectThisDir() {
    console.log("selected:"+this.path);
    let myfile= {};
    myfile.name = this.path;
    this.client.get(this.getpublicwebdavurl)
      .then(data => {
        if (data.response) {
          let mypath2=JSON.parse(data.response);
          let mypath = mypath2.signed_url;
          mypath+= this.path.startsWith('/')?this.path.slice(1):this.path;
          let mydir = {};
          mydir.webdavuri = mypath;
          this.ea.publish(new SelectedFile(mydir, this.panelid));
        }
      });
  }
}
