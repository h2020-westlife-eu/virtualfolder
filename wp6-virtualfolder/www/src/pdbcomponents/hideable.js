/**
 * Created by Tomas Kulhanek on 3/16/17.
 */
import {bindable} from 'aurelia-framework';
export class Hideable {
  @bindable title;
  constructor(){
    this.showit=true;
  }
  changeshowit(){
    this.showit=!this.showit;
  }
}
