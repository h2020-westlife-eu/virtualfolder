/**
 * Created by Tomas Kulhanek on 6/16/17.
 */
import {inject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';
import {Vfstorage} from '../utils/vfstorage';

@inject(DialogController)

export class Prompt {

  constructor(controller){
    this.controller = controller;
    this.answer = null;
    controller.settings.centerHorizontalOnly = true;
  }

  activate(message) {

    this.visualizepdb = Vfstorage.checkDefault("visualizepdb","true") == "true"; //localstorage stores string instead of bool - convert to bool
    this.visualizeimg = Vfstorage.checkDefault("visualizeimg","true") == "true";
    //console.log("active visualizepdb:"+this.visualizepdb);
    this.message = message;
    this.log("activate.post");
  }

  close(){
    if (typeof(Storage) !== "undefined") {
      Vfstorage.setValue("visualizepdb",this.visualizepdb);
      Vfstorage.setValue("visualizeimg",this.visualizeimg);
    }
    this.log("close");
    this.controller.ok()
  }

  log(method){
    console.log("Fmsettings."+method+"(), visualizepdb, visualizeimg")
    console.log(this.visualizepdb);
    console.log(localStorage.getItem("visualizepdb"));
    console.log(this.visualizeimg);
    console.log(localStorage.getItem("visualizeimg"));

  }

}
