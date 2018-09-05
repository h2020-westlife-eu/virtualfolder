/**
 * * Created by Tomas Kulhanek on 2/27/17.
 */

/** adds functionality into pdb-id attribute, if used, then
 * it is integrated with ebi.ac.uk PDB components - which use
 * this attribute torender specific content
 *
 */
export class PdbIdCustomAttribute {
  static inject = [Element]

  constructor (element) {
    this.element = element;
    this.caninitialize=false;
    this.initialized = false;
  }

  /* set's DOM atribute to the binded value.
   valueChanged() is triggered by Aurelia,
   when the value is bind - before attached()
   this.value
   */
  valueChanged(newValue,oldValue){
   this.element.setAttribute('pdb-id',this.value);
    if (this.caninitialize && !this.initialized) this.initializeAngular(); 
  }



  /* bootstrap the pdb component library just from the element */
  attached(){
    this.caninitialize = true; 
    if (this.value !== "''") this.initializeAngular() 
  }
  
  initializeAngular(){
    this.initialized=true;
    angular.bootstrap(this.element, ['pdb.component.library']);
  }
}
