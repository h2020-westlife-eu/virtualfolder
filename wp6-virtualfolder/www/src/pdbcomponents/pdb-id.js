/**
 * Created by Tomas Kulhanek on 2/27/17.
 */
import {bindable} from 'aurelia-framework';

export class PdbIdCustomAttribute {
  static inject = [Element]
  @bindable value;
  constructor (element) {
    this.element = element;
  }

  valueChanged(newvalue,oldvalue) {
    console.log('valuechanged()');
    console.log(newvalue);
    console.log(this.value);
    angular.bootstrap(this.element, ['pdb.component.library']);
  }

  bind(o1,o2){
   console.log('bind()');
   console.log(o1);
   this.value = o1.item;
   console.log(o2);

  }
}
