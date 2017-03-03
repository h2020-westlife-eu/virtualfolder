/**
 * Created by Tomas Kulhanek on 2/27/17.
 */

import {bindable} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Sasclient} from './sasclient';

export class Pdbautocompletesearch {
  @bindable searchbox = "";
  static inject = [HttpClient];

  constructor(httpclient) {
    this.searchbox="";
    this.sasclient = new Sasclient(httpclient);
  }

  //triggered when the element is attached to DOM
  attached(){

  }


  searchboxChanged(newVal,oldVal) {
    console.log("pdbautocomplete.searchboxChanged()");
    console.log(this.searchbox);
    this.sasclient.search(this.searchbox);
  }

}
