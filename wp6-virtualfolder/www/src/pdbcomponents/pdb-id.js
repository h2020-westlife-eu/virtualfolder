/**
 * Created by Tomas Kulhanek on 2/27/17.
 */

export class PdbIdCustomAttribute {
  static inject = [Element]

  constructor (element) {
    this.element = element;
  }

  /* set's DOM atribute to the binded value.
   valueChanged() is triggered by Aurelia,
   when the value is bind - before attached()
   */
  valueChanged(newValue,oldValue){
   //console.log('valueChanged() element:'+this.element.tagName+" newvalue:"+newValue+' this.value:'+this.value+' current.attribute.pdb-id:'+ this.element.getAttribute('pdb-id'));
   this.element.setAttribute('pdb-id',this.value);
   //console.log(this.element.getAttribute('pdb-id'));
  }

  /* bootstrap the pdb component library just from the element */
  attached(){
    angular.bootstrap(this.element, ['pdb.component.library']);
  }
}
