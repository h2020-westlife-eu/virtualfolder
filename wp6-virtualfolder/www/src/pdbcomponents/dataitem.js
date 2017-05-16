/**
 * created by Tomas Kulhanek on 3/15/17.
 */
import {bindable} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client'; //fetch

export class Dataitem {

  static inject = [HttpClient];
  @bindable item = "";

  constructor(httpclient) {
    //console.log('dataitem()')
    //console.log(this.item);
    this.serviceurl = "//www.ebi.ac.uk/pdbe/api/pdb/entry/molecules/"
    this.client = httpclient;

    this.entityids = [1];
    this.selectedid = this.entityids[0];
    this.showitem = false;
    let location = window.location.protocol;
    this.httpsprotocol=location.startsWith('https'); //used to detect/hide buggy components
  }

  bind() {
    this.itemPDBEntry = this.isPDBEntry(this.item);
    //this.showitem = this.itemPDBEntry;
    //this.showuniprotitem = !this.itemPDBEntry;
    this.itemUniprotEntry = this.isUniprotEntry(this.item);
    if (this.itemPDBEntry) {
      this.client.fetch(this.serviceurl + this.item)
        .then(response => response.json())
        .then(data => {

          //console.log("ENTRY ID Fetch, data:");
          //console.log(data)
          this.entityids=[];
          for (var entryname in data) {  //data.2hhd data.4yg0 data.1cbs data.{ }   for (var ... in ...) { } //enumeration
            for (let item of data[entryname]) { //data[{}] == data[2hhd] == data.2hhd, for (let ... of ...)  [ ]  //array
              //only polypeptide molecules can be viewed by components
              if (item.molecule_type.startsWith("polypeptide"))
                this.entityids.push(item.entity_id);
            }
          }
          this.selectedid=this.entityids[0]; //first one

        }).catch(error => {

        console.log('Error dataitem().fetch() of "'+this.serviceurl + this.item+'"');
        console.log(error);
      });
    }

  }

  attached() {
  }

  selectedValueChanged() {
    //create stem clones of element
    if (!this.stemel1 && this.itemPDBEntry) {
      this.stemel1 = this.el1.cloneNode(); //pure <pdb-topology
      this.stemel2 = this.el2.cloneNode(); //pure <pdb-sequence
    }

    //replacing first element
    let newel=this.stemel1.cloneNode();

    //repleace old <pdb-topology with new pure <pdb-topology
    let parent = this.el1.parentNode;
    //remove the element - angular
    parent.removeChild(this.el1);
    //append the clean clone
    newel.setAttribute("entity-id",this.selectedid)
    this.el1 = parent.appendChild(newel);
    angular.bootstrap(newel, ['pdb.component.library']);

    //replacing second element
    newel=this.stemel2.cloneNode();

    parent = this.el2.parentNode;
    //remove the element - angular
    parent.removeChild(this.el2);
    //append the clean clone
    newel.setAttribute("entity-id",this.selectedid)

    this.el2 =parent.appendChild(newel);
    angular.bootstrap(newel, ['pdb.component.library']);
  }

  hideitem() {
      this.showitem = !this.showitem;
  }

  isPDBEntry(entry) {
    return /^[0-9][A-Za-z0-9]{3}$/.test(entry);
  }
  isUniprotEntry(entry) {
    return /^[P][0-9]{5}-?[0-9]*$/.test(entry);
  }

}
