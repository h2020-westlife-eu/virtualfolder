/**
 * Created by Tomas Kulhanek on 2/17/17.
 */

import * as CodeMirror from "codemirror";
import "codemirror/mode/clike/clike";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/javascript/javascript";
//import $ from 'jquery';


export class Fileeditor {
  static inject = [Element];
  constructor(el) {
    this.el = el;

  }

  attached() {
    var editor = this.el.querySelector(".Codemirror");
    if (editor==null) CodeMirror.fromTextArea(this.cmTextarea, {
      lineNumbers: true,
      mode: "text/x-less",
      theme: "cobalt"
    });

  }
}
