/**
 * Created by Nurul on 3/10/17.
 */

export class EntryIdCustomAttribute {
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
    this.element.setAttribute('entry-id',this.value);
  }



  /* bootstrap the pdb component library just from the element */
  attached(){
    angular.bootstrap(this.element, ['pdb.component.library']);
  }
}
