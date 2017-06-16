
/**
 * Created by Tomas Kulhanek on 11/29/16.
 */

import {EventAggregator} from 'aurelia-event-aggregator';
import {VisualizeFile} from '../filepicker/messages';
import {HttpClient} from 'aurelia-http-client';
import {bindable} from 'aurelia-framework';

export class  Viewpanel {
    static inject = [Element,EventAggregator, HttpClient];
    @bindable pid;

    constructor(el,ea, httpclient) {
        this.element = el;
        this.ea = ea;
        this.httpclient = httpclient;
      this.ea.subscribe(VisualizeFile, msg => this.viewfile(msg.file,msg.senderid));
        //this.uid = new Date().valueOf().toString();
        this.sourceurl="";
        this.sourceformat="pdb";
      this.pdbentry = "";
    }

    attached() {
      angular.bootstrap(this.element.querySelector('#pdbviewer'), ['pdb.component.library']);
    }

    viewfile(file,senderid) {
        if (senderid!=this.pid) {
          console.log("viewfile " + file.webdavuri);
          var pdblitemol = '<pdb-lite-mol load-ed-maps="true" source-url="' + file.webdavuri + '" pdb-id="\'\'" source-format="pdb"></pdb-lite-mol>';
          this.replacepdblitemol(pdblitemol);
        }
    }

  loadpdb() {
    //console.log("loadpdb "+this.pdbentry);
    var pdblitemol = '<pdb-lite-mol load-ed-maps="true" pdb-id="\''+this.pdbentry+'\'"></pdb-lite-mol>'
    this.replacepdblitemol(pdblitemol);
  }

  replacepdblitemol(pdblitemol) {
      //remove pdblitemol
      var pdbviewer = this.element.querySelector('#pdbviewer');
      var parentnode = this.element.querySelector('#pdbwrapper');
      parentnode.removeChild(pdbviewer);
      //create pdblitemol
      parentnode.insertAdjacentHTML('afterbegin', '<div style="position:relative;height:400px;width:800px;" id="pdbviewer">'+pdblitemol+'</div>');

      //call angular bootstrap
      angular.bootstrap(this.element.querySelector('#pdbviewer'), ['pdb.component.library']);
    }

}
