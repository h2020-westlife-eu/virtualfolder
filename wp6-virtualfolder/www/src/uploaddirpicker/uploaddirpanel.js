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
    this.getpublicwebdavurl="/api/authproxy/get_signed_url/"
  }
  selectThisDir() {
    console.log("selected:"+this.path);
    let myfile= {};
    myfile.name = this.path;
    this.client.get(this.getpublicwebdavurl)
      .then(data => {
        if (data.response) {
          this.ea.publish(new SelectedFile(data.response + this.path + "#D", this.panelid));
        }
      });
  }
}
