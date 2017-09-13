/**
 * Created by vagrant on 9/12/17.
 */
import {bindable} from 'aurelia-framework';
import {Pdbresource} from './pdbresource';
export class Pdbpanel {
  @bindable panelid;
  static inject = [Pdbresource];

  constructor(pdbresource) {
    this.resources=[];
    this.currentpath="";
    this.id="pdb";
    this.impl=pdbresource;
  }

  attached(){
    this.resources=this.impl.populateResource({name:this.currentpath,id:this.id});//select root
  }

  //distinguishes what to do
  selectResource(resource){
    if (resource.name=="..") {
      if (this.currentpath.endsWith("*")) this.resources=this.impl.populateResource({name:this.currentpath.slice(0,-2),id:this.id})
      else this.resources=this.impl.populateResource({name:this.currentpath.slice(0,-1)+"*", id:this.id})
    } else
      this.resources=this.impl.populateResource(resource)
  }


}

