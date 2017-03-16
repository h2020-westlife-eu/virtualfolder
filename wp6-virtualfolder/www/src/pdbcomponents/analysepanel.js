/**
 * created by Tomas Kulhanek on 2/16/17.
 */
import {bindable, inject} from 'aurelia-framework';

export class  Analysepanel {
  static inject = [Element];
  @bindable pdbids;
  //@bindable pdbid;

  constructor(el) {
    this.pdbids=['1cbs','2hhd'];
    //this.pdbIds=['1cbs','2hhd'];
    this.element=el;
  }

  attached() {
    var el = this.element;
    this.pdbids.forEach(function(pdbid){
      el.insertAdjacentHTML('beforeend',
        "<a class='pdb-links' pdb-id='"+pdbid+"' href='javascript:void(0);'>"+pdbid+"</a><hr/>");

    });



      angular.bootstrap(this.element, ['pdb.component.library']);
  }

  pdbidsChanged(newValue, oldValue) {
    this.element.setAttribute('pdbids', newValue);
  }

  pdbidChanged(newValue, oldValue) {
    this.element.setAttribute('pdbid', newValue);
  }

}
