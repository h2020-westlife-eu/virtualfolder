/**
 * Created by Tomas Kulhanek on 2/27/17.
 */

// PdbId => pdb-id MyCustomAttribute => my-custom-attribute

export class PdbIdCustomAttribute {
  static inject = [Element]

  constructor (element) {
    this.element = element;
  }

  /* set's DOM atribute to the binded value.
   valueChanged() is triggered by Aurelia,
   when the value is bind - before attached()
   this.value
   */
  valueChanged(newValue,oldValue){
   //console.log('valueChanged() element:'+this.element.tagName+" newvalue:"+newValue+' this.value:'+this.value+' current.attribute.pdb-id:'+ this.element.getAttribute('pdb-id'));
    // <pdb-redo pdb-id="item"></pdb-redo> -> valueChange()
   this.element.setAttribute('pdb-id',this.value);
   //  <pdb-redo pdb-id="2sc3">

   //console.log(this.element.getAttribute('pdb-id'));
  }



  /* bootstrap the pdb component library just from the element */
  attached(){
    //console.log('attached element with custom attribute pdb-id:')
    //console.log(this.element.getAttribute('pdb-id'));
    angular.bootstrap(this.element, ['pdb.component.library']);
  }
}
