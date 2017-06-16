/**
 * Created by Tomas Kulhanek on 2/17/17.
 */

import * as CodeMirror from "codemirror";
import "codemirror/mode/clike/clike";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/javascript/javascript";

import {EventAggregator} from 'aurelia-event-aggregator';
import {HttpClient} from 'aurelia-http-client';
import {EditFile} from '../filepicker/messages';
import {bindable} from 'aurelia-framework';

//import $ from 'jquery';


export class Fileeditor {
  static inject = [Element,EventAggregator, HttpClient];
  @bindable pid;

  constructor(el,ea,httpclient) {
    this.el = el;
    this.ea = ea;
    this.httpclient = httpclient;
    this.ea.subscribe(EditFile, msg => this.selectFile(msg.file,msg.senderid));
    this.fileurl="";
  }

  attached() {
    let editor = this.el.querySelector(".Codemirror");
    //prevent blured render if not shown before
    if (editor==null) this.codemirror = CodeMirror.fromTextArea(this.cmTextarea, {
      lineNumbers: true,
      mode: "text/x-less",
      lineWrapping: true,
      theme: "eclipse"
    });
  }

  selectFile(file,senderid) {
    if (senderid!=this.pid)
    this.httpclient.get(file.webdavuri).then(
      data =>{
        this.fileurl=file.webdavuri;
        console.log("fileeditor.selectfile() loading:"+file.webdavuri);
        //console.log(data);
        this.codemirror.setValue(data.response);

      }
    ).catch(error => {
        alert('Error retrieving content from '+file.webdavuri);
      });
  }
}
