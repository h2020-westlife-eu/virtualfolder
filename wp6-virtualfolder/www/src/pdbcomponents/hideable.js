/**
 * Created by Tomas Kulhanek on 3/16/17.
 */
import {bindable} from 'aurelia-framework';
export class Hideable {
  @bindable title;
  @bindable defaulthide=false;
  constructor(){
    this.showit=true;
  }

  bind(){
    if (this.defaulthide) {
      this.showit=false;
    }
  }

  changeshowit(){
    this.showit=!this.showit;
  }
}
