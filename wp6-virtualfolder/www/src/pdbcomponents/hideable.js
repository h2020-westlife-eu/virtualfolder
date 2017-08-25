/**
 * Created by Tomas Kulhanek on 3/16/17.
 */
import {bindable} from 'aurelia-framework';

/** Hideable component <hideable>content</hideable> renders additional title bar, when clicked
 * it is hidden/shown by aurelia show.bind feature
 */
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
