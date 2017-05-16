/**
 * Created by Tomas Kulhanek on 1/16/17.
 */
import {Modulecontrol} from "./modulecontrol";
import {bindable} from 'aurelia-framework';

export class Scipioncontrol extends Modulecontrol{
  @bindable classin = "w3-sand";
 constructor(){
   super();
   this.url="/metadataservice/sbservice/scipion";
   this.posturl="/metadataservice/sbservice/scipion";
 }

}
