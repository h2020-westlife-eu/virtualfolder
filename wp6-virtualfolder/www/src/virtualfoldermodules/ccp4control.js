/**
 * Created by Tomas Kulhanek on 1/16/17.
 */
import {Modulecontrol} from "./modulecontrol";
import {bindable} from 'aurelia-framework';

export class Ccp4control extends Modulecontrol{
//  @bindable classin = "w3-sand";
  @bindable classin = "w3-card-4 w3-sand w3-padding w3-margin w3-round";
  constructor(){
    super();
    this.posturl="/metadataservice/sbservice/ccp4suite";
    this.url="/metadataservice/sbservice/ccp4suite";
  }


}
