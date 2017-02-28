/**
 * Created by Tomas Kulhanek on 2/27/17.
 */

export class RenderpdbsCustomAttribute {
  static inject = [Element];
  constructor (element){
    this.element = element;
    this.pdbdataitem="";
  }

  bind() {
    this.pdbdataitem = this.value;
    //let selector = '#pdb'+this.pdbdataitem;
    let htmlpdbitem = "<a class='pdb-links' href='javascript:void(0);' pdb-id='"+this.pdbdataitem+"' >"+this.pdbdataitem+"</a>";
    //this.pdblinkset.push(htmlpdbitem);
    //console.log(selector);
    //let el = this.element.querySelector(selector);
    //console.log(el);
    //console.log(this.element);
    this.element.insertAdjacentHTML('beforeend',htmlpdbitem);
    angular.bootstrap(this.element, ['pdb.component.library']);
  }

  attached() {
  }
}
