/**
 * Created by Tomas Kulhanek on 6/16/17.
 */
import {inject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';

@inject(DialogController)

export class Prompt {

  constructor(controller){
    this.controller = controller;
    this.answer = null;
    this.visualizepdb = (typeof(Storage) !== "undefined") ? localStorage.getItem("visualizepdb") ? localStorage.getItem("visualizepdb") === "true": true : true;
    //console.log("constructor visualizepdb:"+this.visualizepdb);
    controller.settings.centerHorizontalOnly = true;
  }

  activate(message) {
    this.visualizepdb = (typeof(Storage) !== "undefined") ? localStorage.getItem("visualizepdb") ? localStorage.getItem("visualizepdb") === "true": true : true;
    //console.log("active visualizepdb:"+this.visualizepdb);
    this.message = message;
  }

  close(){

    if (typeof(Storage) !== "undefined") {
      localStorage.setItem("visualizepdb",this.visualizepdb);
    }
    //console.log(this.visualizepdb);
    //console.log(localStorage.getItem("visualizepdb"));
    this.controller.ok()
  }
}
