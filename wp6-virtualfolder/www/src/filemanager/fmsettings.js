/**
 * Created by Tomas Kulhanek on 6/16/17.
 */
import {inject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';
import {Vfstorage} from '../components/vfstorage';

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
    this.provstoreapikey = Vfstorage.checkDefault("provstoreapikey","");
    this.provstoreusername = Vfstorage.checkDefault("provstoreusername","");
    //console.log("active visualizepdb:"+this.visualizepdb);
    this.message = message;
    this.log("activate.post");
  }

  close(){
    if (typeof(Storage) !== "undefined") {
      Vfstorage.setValue("visualizepdb",this.visualizepdb);
      Vfstorage.setValue("visualizeimg",this.visualizeimg);
      Vfstorage.setValue("provstoreapikey",this.provstoreapikey);
      Vfstorage.setValue("provstoreusername",this.provstoreusername);
    }
    this.log("close");
    this.controller.ok()
  }

  log(method){
    /*console.log("Fmsettings."+method+"(), visualizepdb, visualizeimg")
    console.log(this.visualizepdb);
    console.log(localStorage.getItem("visualizepdb"));
    console.log(this.visualizeimg);
    console.log(localStorage.getItem("visualizeimg"));
*/
  }

}
