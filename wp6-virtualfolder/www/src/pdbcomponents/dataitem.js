/**
 * created by Tomas Kulhanek on 3/15/17.
 */
import {bindable} from 'aurelia-framework';
export class Dataitem {
    @bindable item = "";
    constructor() {
      console.log('dataitem()')
      console.log(this.item);
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

}
