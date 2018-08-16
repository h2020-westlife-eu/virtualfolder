/**
 * created by Tomas Kulhanek on 2/21/17.
 */

import * as CodeMirror from 'codemirror';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/javascript/javascript';
import * as LZString from '../components/lz-string';
import {Vfstorage} from "../components/vfstorage";
import {EventAggregator} from 'aurelia-event-aggregator';
import {ProvenanceData} from "./messages";
import {ProjectApi} from "../components/projectapi";

export class Provenance {
  static inject = [EventAggregator,ProjectApi];

  constructor(ea,pa) {
    this.popup = null;
    this.ea = ea;
    this.pa =pa;
    this.provenance = "";
    this.receiveMessage = event => {
      console.log("Dataset() 1 received message:", event.data);
      //check whether it's my popup window
      if (this.popup) {
        console.log("Dataset() 2 received message:", event.data);
        let mydata = JSON.parse(event.data);
        if (mydata && mydata.contentType) {
          if (mydata.contentType === "text/plain") {
            this.provenance = mydata.content;

          } else if (mydata.contentType === "application/x-lzip") {
            this.provenance = LZString.LZString.decompressFromBase64(mydata.content);
          }
          this.codemirror.setValue(this.provenance);
          this.codemirror.refresh();
          //empty popup
          this.popup = null;
        }
      }
    }
  }

  attached() {
    this.codemirror = CodeMirror.fromTextArea(this.contentarea, {
      lineNumbers: true,
      mode: 'text/x-less',
      lineWrapping: true,
      readOnly: true
    });
    this.codemirror.refresh();
    //get content from url
    this.s1 = this.ea.subscribe(ProvenanceData, msg => this.provenanceData(msg.content));
  }

  detached() {
    this.s1.dispose();
  }

  provenanceData(content){
    this.provenance=content;
    this.codemirror.setValue(this.provenance);
    this.codemirror.refresh();
  }

  edithere(){
    this.codemirror.setOption("readOnly",false);
  }

  editprovn(){
    this.provenance = this.codemirror.getValue();
    this.docencoded = btoa(this.provenance);
    return this.openwindow("editor/index.html#contentBase64="+this.docencoded);
  }

  submitprovstore(){
    //don't work issue #77, https://github.com/h2020-westlife-eu/virtualfolder/issues/77
    let apikey = Vfstorage.getValue("provstoreapikey",null);
    let username= Vfstorage.getValue("provstoreusername",null);
    if (apikey) {
      let opu='https://openprovenance.org/store/api/v0/documents';
      let heads= new Headers();
      heads.append('Content-type','application/provn');
      heads.append('Authorization','ApiKey'+username+":"+apikey);
      let body = {content:this.codemirror.getValue(),rec_id:this.name,public:"true"};
      this.pa.postHeaderJsonLog(opu,heads,body).then(response =>
      {
        console.log("submitprovstore",response);
      }).catch(error =>{
        console.log(error);
        alert('Sorry. Dataset not submitted . Error:'+error);
      })
    }
  }

  getprovstoresvg(){
    let formdata=new FormData();
    //formdata.append('file');
    formdata.append('translate','svg');
    //formdata.append('url');
    formdata.append('type','provn');
    formdata.append('statements',this.codemirror.getValue());
    let opu = 'https://openprovenance.org/services/provapi/documents/'
    this.pa.postTextLog(opu,formdata).then(response=>{
      //response is svg?
      //console.log("getprovstoresvg()",response);
      this.provvis.innerHTML = response;
    });
  }

  //opens popup window in defined location
  openwindow(href) {
    this.popup=window.open(href, 'newwindow', 'width=720, height=480');
    return false;
  }

}
