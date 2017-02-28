/**
 * Created by Tomas Kulhanek on 2/27/17.
 */

export class PdbIdsCustomAttribute {
  static inject = [Element]

  constructor (element) {
    //console.log('pdbids()');
    this.element = element;
  }

  /* set's DOM atribute to the binded value.
     valueChanged() is triggered by Aurelia,
     when the value is bind - before attached()
  */
  valueChanged(newValue,oldValue) {
    console.log('pdbids.valueChanged() element:'+this.element.tagName+" newvalue:"+newValue+' this.value:'+this.value+' current.attribute.pdb-ids:'+ this.element.getAttribute('pdb-ids'));
    console.log(this.value); // pdb-ids separated by coma -
    // "2hhd,1r6a,4yg0"
    this.pdbids = this.value.split(',');
    // [ 2hhd, 1r6a, 4yg0 ] -> array()
    this.pdbidsjson = JSON.stringify(this.pdbids);
    // "[ "2hhd", "1r6a", "4yg0" ]"
    this.element.setAttribute('pdb-ids',this.pdbidsjson);
    //bootstrap only if something is in an array
    if (this.pdbids.length>0) angular.bootstrap(this.element, ['pdb.component.library']);
  }

}

