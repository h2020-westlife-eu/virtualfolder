/**
 * created by Tomas Kulhanek on 2/21/17.
 */

import 'whatwg-fetch';
import {ProjectApi} from '../components/projectapi';
import {bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SelectedMetadata} from '../filepicker/messages';
import * as CodeMirror from 'codemirror';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/javascript/javascript';
import * as LZString from '../components/lz-string';
import {Vfstorage} from "../components/vfstorage";

const  removewebdavprefix = (x) => {x.startsWith('/webdav/')?x.slice(0,8):x}; 

/** Dataset handles ViewModel of dataset view, performs AJAX call to dataset service,
 * holds dataset structure and includes dataitems
 *
 */
export class Dataset {
  static inject = [ProjectApi, EventAggregator];
  @bindable panelid;

  constructor(pa, ea) {
    this.popup=null;
    this.pa = pa;
    this.ea = ea;
    this.showitem = true;
    this.baseurl =
    this.showlist = true;
    this.pdbdataset = []; //structure could be {name:"2hhd", type:"pdb|uniprot|file|dir",url:"https://pdbe.org/2hhd.pdb",notes:""}
    this.pdbdataitem = '';
    this.pdblinkset = [];
    this.pdbdataitem = '';
    this.submitdisabled2 = true;
    this.id = 0;
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
    this.submission = {data: {firstName: 'Tomas', lastName: 'Kulhanek'}};
    this.initialmetadata = "{}";
    this.initialdocument="document  \n\
    prefix dataset <"+window.location.href+"> \n\
    entity (e1, dataset:data) \n\
    agent (author, anonymous) \n\
endDocument";
    //register to receive message from pop up window
    this.receiveMessage = event =>
    {
      //check whether it's my popup window
      if (this.popup) {
        //console.log("Dataset() received message:", event.data);
        let mydata=JSON.parse(event.data);
        if (mydata && mydata.contentType) {
          if (mydata.contentType === "text/plain") {
            this.initialdocument = mydata.content;

          } else if (mydata.contentType === "application/x-lzip") {
            this.initialdocument = LZString.LZString.decompressFromBase64(mydata.content);
          }
          this.codemirror.setValue(this.initialdocument);
          this.codemirror.refresh();
          //empty popup
          this.popup=null;
        }
      }
      //this.confirmSettings(event.data);
    };
    this.remoteurl="https://portal.west-life.eu/virtualfolder/edit/";
  }

  createnewdataset(file) {
    console.log("createnewdataset()",file)
    this.pdbdataset = [];
    this.pdbdataitem = '';
    this.pdblinkset = [];
    this.pdbdataitem = '';
    this.submitdisabled2 = true;
    //let date = new Date();
    //this.name="dataset-"+date.getFullYear()+"."+(date.getMonth()+1)+"."+date.getDate();
    this.id = 0;
    this.showlist = false;
    this.initialdocument = this.initdocument(file);
    this.initialmetadata = "{}";
  }


  //@computedFrom('submitdisabled2')
  //TODO check,test to trigger only when pdbdataset is changed
  get canSubmit() {
    //console.log("disabled? "+this.pdbdataset.length);
    if (this.pdbdataset.length > 0)      {return true;}
    return false;
  }

  attached() {
  //adds listener for
  window.addEventListener("message", this.receiveMessage, false);

  this.initialdocument=this.initdocument();
    //this.s1=this.ea.subscribe(DatasetFile, msg => this.addDatasetFile(msg.file,msg.senderid));
    //this.s2 = this.ea.subscribe(SelectedFile, msg => this.selectFile(msg.file, msg.senderid));
    this.s3 = this.ea.subscribe(SelectedMetadata, msg => this.selectFile(msg.file, msg.senderid));
    //let editor = this.el.querySelector('.Codemirror');
    //prevent blured render if not shown before
    //if (editor==null)
    this.codemirror = CodeMirror.fromTextArea(this.contentarea, {
      lineNumbers: true,
      mode: 'text/x-less',
      lineWrapping: true,
      readOnly: true
    });
    this.codemirror.refresh();
    this.codemirror2 = CodeMirror.fromTextArea(this.metadataarea, {
      lineNumbers: true,
      matchBrackets:true,
      autoCloseBrackets:true,
      mode: 'application/json',
      lineWrapping: true
    });
    this.codemirror2.refresh();
  }

  detached() {
    //unsubscribe
    this.s3.dispose();
    window.removeEventListener("message", this.receiveMessage)
  }
  
  initdocument(file){
    let datasetrow= file ? ("prefix datafile <" + window.location.protocol + "//" + window.location.host + file.publicwebdavuri + "> \n") : "";
    let entityrow = file ? ("entity (datafile:, [prov:label=\"" + file.name + "\", prov:type=\"document\"]) \n") : "";
    return  `document    
    prefix virtualfolder <https://portal.west-life.eu/virtualfolder/>
    ${datasetrow}
    prefix westlife <https://about.west-life.eu/>
    prefix thisvf <${window.location.href}>
    prefix user <${this.pa.userinfo.AccountLink}>
    ${entityrow}    
    agent (user:${this.pa.userinfo.username}, [ prov:type="prov:Person" ]) 
    wasAttributedTo(datafile:, user:${this.pa.userinfo.username}) 
endDocument`;
  }

  selectFile(file, senderid) {

    this.id = 0;
    if (this.panelid !== senderid) {
      this.datasetfile=file;
      this.name = file.webdavuri.slice(8);
      console.log('metadata of:', this.name);
      this.pa.getDatasetByName(this.name).then(data => {
        console.log("dataset.selectFile() metadata:",data);
        if (data) {
          this.id=data.Id;
          this.initialdocument = data.Provenance;
          this.initialmetadata = data.Metadata;
          this.pdbdataset = data.Entries; //list of string
          //console.log("dataset.selectFile() entries",this.pdbdataset);
          for (let i=0;i<this.pdbdataset.length;i++) {//;if (0;i<) let dataitem of this.pdbdataset){
            let corrected = this.pdbdataset[i].replace(/([^:{},]*):([^,}{]*)/gi, '"$1":"$2"');
            //console.log("corrected:",corrected);
            this.pdbdataset[i] = JSON.parse(corrected);
          } 
          //console.log("dataset.selectFile() converted entries",this.pdbdataset);
          if (!this.pdbdataset) this.pdbdataset =[];
        }else{
          this.createnewdataset(file);
          
        }
        this.codemirror.setValue(this.initialdocument);
        this.codemirror.refresh();
        this.codemirror2.setValue(this.initialmetadata);
        this.codemirror2.refresh();
        }
      ).catch(errorCallback =>{
        console.log("error catched",errorCallback);
        this.createnewdataset(file);
        this.codemirror.setValue(this.initialdocument);
        this.codemirror.refresh();
        this.codemirror2.setValue(this.initialmetadata);
        this.codemirror2.refresh();
      });
    }
  }

  unselectdataset(item) {
    this.showlist = true;
  }

  selectdataset(item) {
    //console.log("selectdataset()");
    //console.log(item)
    this.pa.getDataset(item.Id).then(data=>    {
      this.submitdataset = data;
      this.pdbdataset = this.submitdataset.Entries;
      this.name = this.submitdataset.Name;
      this.id = this.submitdataset.Id;
      this.showlist = false;
    });
  }

  removedataset(item) {
    alert('Remove dataset not yet implemented.');
    //console.log(item)
  }

  additem(item) {
    this.pdbdataset.unshift(item);
  }

  addDatasetFile(file, senderid) {
    if (senderid !== this.panelid) {
      if (window.confirm('The file ' + file.name + ' will be added to dataset.')) {
        let item = {Name: file.name, Url: file.publicwebdavuri, Type: 'file'};
        this.pdbdataset.unshift(item);
      }
    }
  }

  removeitem(itemtodelete) {
    this.pdbdataset = this.pdbdataset.filter(item => item !== itemtodelete);
  }


  //model-view -viewmodel
  hideitem() {
    this.showitem = ! this.showitem;
  }

  load() {
    this.pa.getDataset(this.name).then(data=>    {
      this.submitdataset = data;
      this.pdbdataset = this.submitdataset.Entries;
      if (!this.pdbdataset) this.pdbdataset = [];
      this.name = this.submitdataset.Name;
      this.id = this.submitdataset.Id;
      this.showlist = false;
    });
  }

  submit() {
    console.log("submitting data:");
    this.submitdataset = {};
    //if (this.id>0) 
    this.submitdataset.Id = this.id;
    this.submitdataset.Name = this.name;
    this.submitdataset.Entries = this.pdbdataset;
    this.submitdataset.Provenance = this.codemirror.getValue();
    this.submitdataset.metadata =  this.codemirror2.getValue();
    console.log("dataset",this.submitdataset);
    this.pa.addDataset(this.id,this.submitdataset)
        .then(data =>{
          this.id=data.Id;
        })
        .catch(error =>{
          console.log("error:",error);
          alert('Sorry. Dataset not submitted . Error:' + error.statusText);
        });
  }

  editprovn(){
    this.docencoded = btoa(this.initialdocument);
    return this.openwindow("editor/index.html#contentBase64="+this.docencoded);
  }

  storevf(){
    this.submit();
  }

  submitprovstore(){
//data=
    let apikey = Vfstorage.getValue("provstoreapikey",null);
    let username= Vfstorage.getValue("provstoreusername",null);
    if (apikey) {
      let opu='https://openprovenance.org/store/api/v0/documents';
      let heads= new Headers();
      heads.append('Content-type','application/provn');
      heads.append('Authorization','ApiKey'+username+":"+apikey);
      let body = {content:this.codemirror.getValue(),rec_id:this.name,public:"true"};
      this.pa.postHeaderJsonLog(opu,heads,body).then(response =>
      {
        console.log("submitprovstore",response);
      }).catch(error =>{
        console.log(error);
        alert('Sorry. Dataset not submitted . Error:'+error);
      })
    }
  }

  getprovstoresvg(){
    let formdata=new FormData();
    //formdata.append('file');
    formdata.append('translate','svg');
    //formdata.append('url');
    formdata.append('type','provn');
    formdata.append('statements',this.codemirror.getValue());
    let opu = 'https://openprovenance.org/services/provapi/documents/'
    this.pa.postTextLog(opu,formdata).then(response=>{
      //response is svg?
      console.log("getprovstoresvg()",response);
      this.provvis.innerHTML = response;
    });
  }


  //opens popup window in defined location
  openwindow(href) {
    this.popup=window.open(href, 'newwindow', 'width=720, height=480');
    return false;
  }
}
