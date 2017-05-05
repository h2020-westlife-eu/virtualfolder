/**
 * Created by Tomas Kulhanek on 2/27/17.
 */

export class PdbIdsCustomAttribute {
  static inject = [Element]

  constructor (element) {
    //console.log('pdbids()');
    this.element = element;
    this.bootstrapped=false;
  }

  /* set's DOM atribute to the binded value.
     valueChanged() is triggered by Aurelia,
     when the value is bind - before attached()
  */
  valueChanged(newValue,oldValue) {
    //console.log('pdbids.valueChanged() element:'+this.element.tagName+" newvalue:"+newValue+' this.value:'+this.value+' current.attribute.pdb-ids:'+ this.element.getAttribute('pdb-ids'));
    //console.log(this.value); // pdb-ids separated by coma -
    // "2hhd,1r6a,4yg0"
    if (this.value.length>0) {

      this.pdbids = this.value.split(',');
      // [ 2hhd, 1r6a, 4yg0 ] -> array()
      //filter pdbids, uniprot and other entries are not included
      this.pdbidsfilter = this.pdbids.filter(function (obj) {
        return /^[0-9][A-Za-z0-9]{3}$/.test(obj);
      });

      this.pdbidsjson = JSON.stringify(this.pdbidsfilter);
      // "[ "2hhd", "1r6a", "4yg0" ]"
      if (this.pdbids.length > 0) {        //bootstrap only if something is in an array
        if (this.bootstrapped) { //replace the angularized element with clean clone
          //create clone from stem clone
          var myclone = this.elementclone.cloneNode();
          //console.log('angular element');
          //console.log(this.element);
          this.parent = this.element.parentNode;
          //remove the element - angular
          this.parent.removeChild(this.element);
          //append the clean clone
          this.parent.appendChild(myclone);
          this.element = this.parent.children[0];
        } else {
          this.elementclone = this.element.cloneNode(); //stem clone

        }
        this.element.setAttribute('pdb-ids', this.pdbidsjson);
        angular.bootstrap(this.element, ['pdb.component.library']);
        this.bootstrapped = true;
      }
    }
  }

}

