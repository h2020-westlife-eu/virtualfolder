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
        console.log("Dataset() received message:", event.data);
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

  createnewdataset() {
    this.pdbdataset = [];
    this.pdbdataitem = '';
    this.pdblinkset = [];
    this.pdbdataitem = '';
    this.submitdisabled2 = true;
    //let date = new Date();
    //this.name="dataset-"+date.getFullYear()+"."+(date.getMonth()+1)+"."+date.getDate();
    this.id = 0;
    this.showlist = false;
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

  this.initialdocument="document  \n\
    prefix dataset <"+this.name+"> \n\
    entity (e1, dataset:data) \n\
    agent (author, "+this.pa.userinfo.username+") \n\
    endDocument";
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
  }

  detached() {
    //unsubscribe
    this.s3.dispose();
    window.removeEventListener("message", this.receiveMessage)
  }

  selectFile(file, senderid) {
    console.log('dataset.selectFile()', file);
    console.log('senderid:', senderid);
    console.log('userinfo:',this.pa.userinfo);
    if (this.panelid !== senderid) {
      console.log('metadata of:', file);
      this.datasetfile=file;
      this.name = file.webdavuri;
      this.initialdocument="document  \n\
    prefix dataset <"+window.location.protocol+"//"+window.location.host+file.publicwebdavuri+"> \n\
    prefix virtualfolder <https://portal.west-life.eu/virtualfolder/>\n\
    prefix westlife <https://about.west-life.eu/>\n\
    prefix thisvf <"+window.location.href+">\n\
    prefix user <"+this.pa.userinfo.AccountLink+">\n\
    entity (dataset:, [prov:label=\""+file.name+ "\", prov:type=\"document\"]) \n\
    agent (user:"+this.pa.userinfo.username+", [ prov:type=\"prov:Person\" ]) \n\
    wasAttributedTo(dataset:, user:"+this.pa.userinfo.username+") \n\
endDocument";

      this.codemirror.setValue(this.initialdocument);
      this.codemirror.refresh();
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
      this.name = this.submitdataset.Name;
      this.id = this.submitdataset.Id;
      this.showlist = false;
    });
  }

  submit() {
    //console.log("submitting data:");
    this.submitdataset = {};
    this.submitdataset.Id = this.id;
    this.submitdataset.Name = this.name;
    this.submitdataset.Entries = this.pdbdataset;
    this.submitdataset.Metadata = this.codemirror.getValue();

    this.pa.addDataset('/' + this.id, this.submitdataset)
        .then(data =>{
          this.showlist = true;
          if (this.id === 0) this.datasetlist.push({Id: data.Id, Name: data.Name});
          this.showlist = true;
        })
        .catch(error =>{
          alert('Sorry. Dataset not submitted  at ' + this.serviceurl + ' error:' + error.response + ' status:' + error.statusText);
        });
  }

  editprovn(){
    this.docencoded = btoa(this.initialdocument);
    return this.openwindow("editor/index.html#contentBase64="+this.docencoded);
  }

  storevf(){

  }

  submitprovstore(){

  }

  //opens popup window in defined location
  openwindow(href) {
    this.popup=window.open(href, 'newwindow', 'width=720, height=480');
    return false;
  }
}
