/**
 * created by Tomas Kulhanek on 2/21/17.
 */

import 'whatwg-fetch';
import {HttpClient} from "aurelia-http-client";
import {bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {DatasetFile} from '../filepicker/messages';

//Model view controller
//Model view viewmodel

export class Dataset {
  static inject = [HttpClient,EventAggregator];
  @bindable panelid;

  constructor (httpclient,ea) {
    this.client = httpclient;
    this.client.configure(config=> {
      config.withHeader('Accept', 'application/json');
      config.withHeader('Content-Type', 'application/json');
    });
    this.ea = ea;
    this.ea.subscribe(DatasetFile, msg => this.addDatasetFile(msg.file,msg.senderid));

    this.showitem=true;
    this.dataseturl="/metadataservice/dataset";
    this.showlist=true;
    this.pdbdataset = []; //structure could be {name:"2hhd", type:"pdb|uniprot|file|dir",url:"https://pdbe.org/2hhd.pdb",notes:""}
    this.pdbdataitem = "";
    this.pdblinkset = [];
    this.pdbdataitem = "";
    this.submitdisabled2 = true;
    this.id=0;
  }

  createnewdataset(){
    this.pdbdataset = [];
    this.pdbdataitem = "";
    this.pdblinkset = [];
    this.pdbdataitem = "";
    this.submitdisabled2 = true;
    let date = new Date();
    this.name="dataset-"+date.getFullYear()+"."+(date.getMonth()+1)+"."+date.getDate();
    this.id = 0;
    this.showlist=false;
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

  attached(){
    this.client.get(this.dataseturl).then(data=>
    {
      //console.log("dataset.attached(), data:")
      //console.log(data)
      this.datasetlist = JSON.parse(data.response);
      console.log('Dataset().datasetlist:')
      console.log(this.datasetlist)
    })
  }

  unselectdataset(item){
    this.showlist=true;
  }

  selectdataset(item){
    //console.log("selectdataset()");
    //console.log(item)
    this.client.get(this.dataseturl+"/"+item.Id).then(data=>
    {
      //console.log("selecteddataset(), data:")
      //console.log(data)
      this.submitdataset=JSON.parse(data.response)
      //console.log(this.submitdataset)
      this.pdbdataset = this.submitdataset.Entries
      this.name = this.submitdataset.Name
      this.id = this.submitdataset.Id
      this.showlist = false
    })
  }

  removedataset(item){
    console.log("removedataset() not implemented");
    console.log(item)
  }

  additem(item){
    console.log("additem()");
    console.log(item);
    this.pdbdataset.unshift(item);
    console.log(this.pdbdataset);
    //this.canSubmit = this.pdbdataset.length>0?true:false;
  }

  addDatasetFile(file,senderid) {
    if (window.confirm("The file "+file.name+" will be added to dataset."))
      this.pdbdataset.shift(file);
  }

  removeitem(itemtodelete){
    this.pdbdataset = this.pdbdataset.filter(item => item!== itemtodelete);
  }


  //model-view -viewmodel
  hideitem() {
    this.showitem = ! this.showitem;
  }


  submit(){
    console.log("submitting data:");
    this.submitdataset = {};
    this.submitdataset.Id = this.id;
    this.submitdataset.Name = this.name;
    this.submitdataset.Entries = this.pdbdataset;
    //this.submitdataset.Urls =
    console.log(this.submitdataset);
    console.log(JSON.stringify(this.submitdataset));
    //PUT = UPDATE, POST = create new
    if (this.id>0)
      this.client.put(this.dataseturl+"/"+this.id,JSON.stringify(this.submitdataset))
        .then(data =>{
          console.log("data response");
          console.log(data);
          let myitem = JSON.parse(data.response);
          //this.datasetlist.push({Id:myitem.Id, Name:myitem.Name})
          this.showlist=true;
        })
        .catch(error =>{
          console.log(error);
          alert('Sorry. Dataset not submitted  at '+this.serviceurl+' error:'+error.response+" status:"+error.statusText)
        });
    else
      this.client.post(this.dataseturl,JSON.stringify(this.submitdataset))
        .then(data =>{
          console.log("data response");
          console.log(data);
          let myitem = JSON.parse(data.response);
          this.datasetlist.push({Id:myitem.Id, Name:myitem.Name})
          this.showlist=true;
        })
        .catch(error =>{
          console.log(error);
          alert('Sorry. Dataset not submitted  at '+this.serviceurl+' error:'+error.response+" status:"+error.statusText)
        });
  }
}
