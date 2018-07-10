/**
 * created by Tomas Kulhanek on 2/21/17.
 */

import 'whatwg-fetch';
//import {HttpClient} from "aurelia-http-client";
import {ProjectApi} from "../components/projectapi";
import {bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {DatasetFile} from '../filepicker/messages';
import {Vfstorage} from '../utils/vfstorage';

//Model view controller
//Model view viewmodel
/** Dataset handles ViewModel of dataset view, performs AJAX call to dataset service,
 * holds dataset structure and includes dataitems
 *
 */
export class Dataset {
  static inject = [ProjectApi,EventAggregator];
  @bindable panelid;

  constructor (pa,ea) {
    this.pa = pa;
    
    this.ea = ea;

    this.showitem=true;
    this.baseurl =
//    this.dataseturl=Vfstorage.getBaseUrl()+"/metadataservice/dataset";
    this.showlist=true;
    this.pdbdataset = []; //structure could be {name:"2hhd", type:"pdb|uniprot|file|dir",url:"https://pdbe.org/2hhd.pdb",notes:""}
    this.pdbdataitem = "";
    this.pdblinkset = [];
    this.pdbdataitem = "";
    this.submitdisabled2 = true;
    this.id=0;
    this.form = {components: [
        {
          type: 'textfield',
          input: true,
          key: 'firstName',
          label: 'First Name'
        },
        {
          type: 'textfield',
          input: true,
          key: 'lastName',
          label: 'Last Name'
        }
      ]};
      this.submission = {data:{firstName:"Tomas",lastName:"Kulhanek"}}
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
    this.s1=this.ea.subscribe(DatasetFile, msg => this.addDatasetFile(msg.file,msg.senderid));
    this.pa.getDataset().then(data=>
    {
      this.datasetlist = data;
    })
  }
  detached(){
    //unsubscribe 
    this.s1.dispose();
  }

  unselectdataset(item){
    this.showlist=true;
  }

  selectdataset(item){
    //console.log("selectdataset()");
    //console.log(item)
    this.pa.getDataset(item.Id).then(data=>
    {
      this.submitdataset=data;
      this.pdbdataset = this.submitdataset.Entries;
      this.name = this.submitdataset.Name;
      this.id = this.submitdataset.Id;
      this.showlist = false;
    })
  }

  removedataset(item){
    alert("Remove dataset not yet implemented.");
    //console.log(item)
  }

  additem(item){
    //console.log("additem()");
    //console.log(item);
    this.pdbdataset.unshift(item);
    //console.log(this.pdbdataset);
    //this.canSubmit = this.pdbdataset.length>0?true:false;
  }

  addDatasetFile(file,senderid) {
    if (senderid!== this.panelid) {
      //console.log("dataset.adddatasetfile()");
      //console.log(file);
      if (window.confirm("The file " + file.name + " will be added to dataset.")) {
        let item = {Name: file.name, Url: file.publicwebdavuri, Type: "file"}
        this.pdbdataset.unshift(item);
      }
    }
  }

  removeitem(itemtodelete){
    this.pdbdataset = this.pdbdataset.filter(item => item!== itemtodelete);
  }


  //model-view -viewmodel
  hideitem() {
    this.showitem = ! this.showitem;
  }


  submit(){
    //console.log("submitting data:");
    this.submitdataset = {};
    this.submitdataset.Id = this.id;
    this.submitdataset.Name = this.name;
    this.submitdataset.Entries = this.pdbdataset;
    //this.submitdataset.Urls =
    //console.log(this.submitdataset);
    //console.log(JSON.stringify(this.submitdataset));
    //PUT = UPDATE, POST = create new
    
      this.pa.addDataset("/"+this.id,this.submitdataset)
        .then(data =>{
          this.showlist=true;
          if (this.id === 0) this.datasetlist.push({Id:data.Id, Name:data.Name});
          this.showlist=true;
        })
        .catch(error =>{
          alert('Sorry. Dataset not submitted  at '+this.serviceurl+' error:'+error.response+" status:"+error.statusText)
        });
  }
}
