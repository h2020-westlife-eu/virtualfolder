/**
 * created by Tomas Kulhanek on 3/15/17.
 */
import {bindable} from 'aurelia-framework';
export class Dataitem {
    @bindable item;
    constructor() {
      this.showitem=true;
    }

    hideitem() {
      this.showitem = ! this.showitem;
    }

}
