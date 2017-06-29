
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
      this.pdbredoentry="";
      this.pdburl= "";
    }

    attached() {
      angular.bootstrap(this.element.querySelector('#pdbviewer'), ['pdb.component.library']);
    }

    viewfile(file,senderid) {
        if (senderid!=this.pid) {
          //console.log("viewfile " + file.webdavuri);
          this.pdburl=file.webdavuri;
          var pdblitemol = '<pdb-lite-mol load-ed-maps="true" source-url="' + this.pdburl + '" pdb-id="\'\'" source-format="pdb"></pdb-lite-mol>';
          this.replacepdblitemol(pdblitemol);
        }
    }

  loadfromredo() {
    //http://pdb-redo.eu/db/1r6a/1r6a_final.pdb;jsessionid=C2F739E5913AEA9460EDA0B9F024C471
    this.pdburl = "//pdb-redo.eu/db/"+this.pdbredoentry+"/"+this.pdbredoentry+"_final.pdb";//'http://www.cmbi.ru.nl/pdb_redo/'+this.pdbredoentry.substring(1,3)+'/'+this.pdbredoentry+'/'+this.pdbredoentry+'_final.pdb';
    var pdblitemol = '<pdb-lite-mol load-ed-maps="true" source-url="' + this.pdburl + '" pdb-id="\'\'" source-format="pdb"></pdb-lite-mol>';
    this.replacepdblitemol(pdblitemol);
  }


  loadpdb() {
    //console.log("loadpdb "+this.pdbentry);
    this.pdburl=this.pdbentry;
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
