/**
 * Created by Tomas Kulhanek on 2/17/17.
 */

import * as CodeMirror from "codemirror";
import "codemirror/mode/clike/clike";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/javascript/javascript";

import {EventAggregator} from 'aurelia-event-aggregator';
import {HttpClient} from 'aurelia-fetch-client';
import {EditFile} from '../filepicker/messages';
import {bindable} from 'aurelia-framework';
import {Vfstorage} from '../utils/vfstorage';

//import $ from 'jquery';


export class Fileeditor {
  static inject = [Element,EventAggregator, HttpClient];
  @bindable pid;

  constructor(el,ea,httpclient) {
    this.el = el;
    this.ea = ea;
    this.client = httpclient;
    this.ea.subscribe(EditFile, msg => this.selectFile(msg.file,msg.senderid));
    this.isimage=false;
    this.filename="";
  }

  attached() {
    let editor = this.el.querySelector(".Codemirror");
    //prevent blured render if not shown before
    //if (editor==null)
    this.codemirror = CodeMirror.fromTextArea(this.cmTextarea, {
      lineNumbers: true,
      mode: "text/x-less",
      lineWrapping: true
    });
    this.codemirror.refresh();
  }

  selectFile(file,senderid) {
    let that =this
    if (senderid!=this.pid) {
      this.imageurl = file.webdavuri;
      //visualizeimg is set & image extension is detected
      //console.log("fileeditor.selectfile() visualizeimg: isimage:")
      //console.log(localStorage.getItem("visualizeimg"));
      //vfstorage returns string - should convert to boolean
      this.isimage = (Vfstorage.getValue("visualizeimg") == "true") &&
      ((file.name.endsWith('.JPG'))||
      (file.name.endsWith('.jpg'))||
      (file.name.endsWith('.PNG'))||
      (file.name.endsWith('.png'))||
      (file.name.endsWith('.GIF'))||
      (file.name.endsWith('.gif'))||
      (file.name.endsWith('.BMP'))||
      (file.name.endsWith('.bmp'))||
      (file.name.endsWith('.SVG'))||
      (file.name.endsWith('.svg')));

      //console.log("fileeditor.selectfile() visualizeimg: isimage:")
      //console.log(this.isimage);
      if (!this.isimage)
        this.client.fetch(file.webdavuri, {credentials: 'same-origin'})
          .then(response => response.text())
          .then(data =>{

            console.log("fileeditor.selectfile() loading:" + file.webdavuri);
            console.log(data);
            that.codemirror.setValue(data);
            that.codemirror.refresh();
            that.filename=file.webdavuri;
          }
        ).catch(error => {
          alert('Error retrieving content from ' + file.webdavuri);
          console.log(error);
        });

    }
  }
}
