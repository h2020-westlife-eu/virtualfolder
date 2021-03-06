/**
 * created by Tomas Kulhanek on 3/15/17.
 */
import {bindable} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client'; //fetch

/**
 * Dataitem is specifical integration of PDB, Uniprot or other type of item in a dataset
 * integrates pdb components of ebi.ac.uk
 */
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
    //this.pdbred="cc";
//    this.httpsprotocol=location.startsWith('https'); //used to detect/hide buggy components
  }

  bind() {
    //console.log("dataitem.bind()");
    //console.log(this.item);
    this.itemPDBEntry = this.isPDBEntry();
    //this.pdbredo = this.item[1]+this.item[2]; //2nd and 3rd character
    //console.log(this.pdbredo);
    //this.showitem = this.itemPDBEntry;
    //this.showuniprotitem = !this.itemPDBEntry;
    this.itemUniprotEntry = this.isUniprotEntry();
    if (this.itemPDBEntry) {

      this.client.fetch(this.serviceurl + this.item.Name)
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

        console.log('Error dataitem().fetch() of "'+this.serviceurl + this.item.Name+'"');
        console.log(error);
      });
    }

  }

  attached() {
    //console.log("dataitem.attached()");
    //console.log(this.item);
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

  isPDBEntry() {
    //console.log("dataitem.ispdbentry()")
    //console.log(this.item.Type==="pdb_id");
    //console.log(/^[0-9][A-Za-z0-9]{3}$/.test(this.item.Name));
    return (this.item.Type==="pdb_id") || (/^[0-9][A-Za-z0-9]{3}$/.test(this.item.Name));
  }

  isUniprotEntry(entry) {
    return (this.item.Type==="uniprot_accession") || (/^[A-Z][0-9][A-Z0-9]{4}[A-Z0-9]*$/.test(this.item.Name));
  }

}
