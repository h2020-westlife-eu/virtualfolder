/**
 * Created by Tomas Kulhanek on 11/29/16.
 */

import {HttpClient} from 'aurelia-http-client';

let client = new HttpClient();

export class ViewPanel {

    constructor() {
        this.value = "test";
    }

    created(owningView,myview) {
        this.parent = owningView;//.controller.viewModel;
        console.log('viewpanel.created()');
        console.log(this.parent);
    }

    attached(){
        console.log('ViewPanel');
        console.log(this.value);
        console.log(this);
    }

    toView(){
        console.log('toView');
        console.log(this.value);

    }
}