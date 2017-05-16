/**
 * Created by Tomas Kulhanek on 1/16/17.
 */
import {Modulecontrol} from "./modulecontrol";
import {bindable} from 'aurelia-framework';

export class Ccp4control extends Modulecontrol{
  @bindable classin = "w3-sand";
  constructor(){
    super();
    this.posturl="/metadataservice/sbservice/ccp4suite";
    this.url="/metadataservice/sbservice/ccp4suite";
  }


}
