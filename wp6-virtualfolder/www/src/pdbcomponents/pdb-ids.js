/**
 * Created by Tomas Kulhanek on 2/27/17.
 */

export class PdbsIdCustomAttribute {
  static inject = [Element]
  constructor (element) {
    this.element = element;
  }

  bind() {
    console.log(this.value);
    angular.bootstrap(this.element, ['pdb.component.library']);
  }

}

