/**
 * Created by Tomas Kulhanek on 1/16/17.
 */
import {Modulecontrol} from "./modulecontrol";

export class Ccp4control extends Modulecontrol{
  constructor(){
    super();
    this.posturl="/metadataservice/sbservice/ccp4suite";
    this.url="/metadataservice/sbservice/ccp4suite";
  }


}
