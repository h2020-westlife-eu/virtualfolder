/**
 * Created by Tomas Kulhanek on 1/16/17.
 */
import {Modulecontrol} from "./modulecontrol";

export class Scipioncontrol extends Modulecontrol{
 constructor(){
   super();
   this.url="/metadataservice/sbservice/scipion";
   this.posturl="/metadataservice/sbservice/scipion";
 }

}
