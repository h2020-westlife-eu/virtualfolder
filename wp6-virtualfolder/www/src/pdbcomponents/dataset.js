/**
 * created by Tomas Kulhanek on 2/21/17.
 */

import {HttpClient} from "aurelia-http-client";
import {computedFrom} from 'aurelia-framework';

//Model view controller
//Model view viewmodel

export class Dataset {
  static inject = [HttpClient];

  constructor (httpclient) {
    this.pdbdataset = [];
    this.pdbdataitem = "";
    this.pdblinkset = [];
    this.pdbdataitem = "";
    this.submitdisabled2 = true;
    let date = new Date();
    this.name="dataset-"+date.getFullYear()+"."+(date.getMonth()+1)+"."+date.getDate();
    this.client = httpclient;
    this.client.configure(config=> {
      config.withHeader('Accept', 'application/json');
      config.withHeader('Content-Type', 'application/json');
    });
    this.showitem=true;
  }

  //@computedFrom('submitdisabled2')
  //TODO check,test to trigger only when pdbdataset is changed
  get canSubmit() {
    //console.log("disabled? "+this.pdbdataset.length);
    if (this.pdbdataset.length>0)
      return true;
    else
      return false;

  }

  additem(){
    console.log("additem()");
    this.pdbdataset.unshift(this.pdbdataitem);

    //this.canSubmit = this.pdbdataset.length>0?true:false;
  }

  removeitem(itemtodelete){
    this.pdbdataset = this.pdbdataset.filter(item => item!== itemtodelete);
  }


  //model-view -viewmodel
  hideitem() {
    this.showitem = ! this.showitem;
  }


  submit(){
    this.client.put("/metadataservice/dataset",JSON.stringify(this.pdbdataset))
      .then(data =>{
        console.log("data response");
        console.log(data);9
      })
      .catch(error =>{
        console.log(error);
        alert('Sorry. Dataset not submitted  at '+this.serviceurl+' error:'+error.response+" status:"+error.statusText)
      });
  }
}
