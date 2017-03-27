/**
 * created by Tomas Kulhanek on 3/15/17.
 */
import {bindable} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

//export class Filepanel{
  //static inject = [EventAggregator,HttpClient];
  //@bindable panelid;

  //constructor(ea,httpclient) {
    //this.ea = ea;
    //this.client = httpclient;
    //this.files = [];
    //this.filescount = this.files.length;
    //this.path= "";
    //this.lastpath="";
    //this.dynatable = {};
    //this.serviceurl = "/metadataservice/files";
    //http to accept json
    //this.client.configure(config=>{
      //config.withHeader('Accept','application/json');
      //config.withHeader('Content-Type','application/json');
    //});
    //console.log("filepanel tableid:"+this.panelid);
  //}

export class Dataitem {
  static inject = [HttpClient];
    @bindable item = "";
    constructor(httpclient) {
      console.log('dataitem()')
      console.log(this.item);
      this.serviceurl = "http://www.ebi.ac.uk/pdbe/api/pdb/entry/molecules/"
      this.client = httpclient;
      this.client.configure(config => {
        config
          .withDefaults({
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'X-Requested-With': 'Fetch'
            }
          })
      });
/*
      this.client.configure(config => {
        config.withHeader('Accept', 'application/json');
        config.withHeader('Content-Type', 'application/json');
      });*/
    }
      //console.log(this.serviceurl)

      attached() {
        if (this.itemPDBEntry) {
          this.client.fetch(this.serviceurl + this.item)
            .then(response => response.json())
            .then(data => {

              console.log("ENTRY ID Fetch, there is response");
              console.log(data)
              //this.populateFiles(data.response);

            }).catch(error => {

            console.log('Error');
            console.log(error);
            alert('Sorry, response: ' + error.statusCode + ':' + error.statusText + ' when trying to get: ' + this.serviceurl);
          });
        }
    }

    bind() {
      this.itemPDBEntry= this.isPDBEntry(this.item);
      this.showitem=this.itemPDBEntry;
      this.showuniprotitem=! this.itemPDBEntry;
      console.log(this.item);
    }

    hideitem() {
      if (this.itemPDBEntry) {
        this.showitem = !this.showitem;
      } else {
        this.showuniprotitem = !this.showuniprotitem;
      }
    }

    isPDBEntry (entry) {
      return /^[0-9][A-Za-z0-9]{3}$/.test(entry);
    }

    getIdentityID () {
      //console.log("This item is " + this.item);
      console.log("This try is " + this.serviceurl)
    }

}
