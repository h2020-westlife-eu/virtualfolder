/**
 * Created by vagrant on 2/21/17.
 */
/*
<script type="text/javascript" src="/scripts/autocomplete/build/inline.bundle.js"></script>
  <script type="text/javascript" src="/scripts/autocomplete/build/vendor.bundle.js"></script>
  <script type="text/javascript" src="/scripts/autocomplete/build/main.bundle.js"></script>
*/

//import "autocomplete";

//import "autocomplete";
import {HttpClient} from "aurelia-http-client";
import {computedFrom} from 'aurelia-framework';

//Model view controller
//Model view viewmodel

export class Dataset {
  static inject = [Element,HttpClient];

  constructor (element,httpclient) {
    this.element = element;
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

  /*bootstrapPdbeAutocomplete(){
    console.log("pdb-autocomplete bootstrap()");
    var event;
    if (typeof MouseEvent == 'function') {
      event = new MouseEvent('PDBeWebComponentsReady', { 'view': window, 'bubbles': true, 'cancelable': true });
    } else if (typeof document.createEvent == 'function') {
      event = document.createEvent('MouseEvents');
      event.initEvent('PDBeWebComponentsReady', true, true );
    }
    //Dispatch
    document.dispatchEvent(event);
  }

  attached() {
    console.log("Dataset attached(), calling bootstrap.")
    var PdbeAutocompleteSearchConfig = {
      resultBoxAlign: 'left',
      redirectOnClick: false,
      searchUrl: '//www.ebi.ac.uk/pdbe/search/pdb-autocomplete/select',
      fields: 'value,num_pdb_entries,var_name',
      group: 'group=true&group.field=category',
      groupLimit: '25',
      sort: 'category+asc,num_pdb_entries+desc',
      searchParams: 'rows=20000&json.nl=map&wt=json'
    }
    document.addEventListener('PDBe.autocomplete.click', function(e){ console.log(e.eventData) })

    //this.bootstrapPdbeAutocomplete();
  }
*/
  additem(){
    console.log("additem()");
    this.pdbdataset.unshift(this.pdbdataitem);

    //this.canSubmit = this.pdbdataset.length>0?true:false;
  }

  removeitem(itemtodelete){
    this.pdbdataset = this.pdbdataset.filter(item => item!== itemtodelete);
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
