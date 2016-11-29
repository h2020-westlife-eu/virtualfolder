/**
 * Created by vagrant on 9/6/16.
 */

import {HttpClient} from 'aurelia-http-client';
import {bindable, bindingMode} from 'aurelia-framework';


export class App {
    constructor() {
        this.heading = "File manager";
        this.viewpanel1 = false;
        this.viewpanel2 = false;
    }

    doAction(fileitem,panelid) {
        //console.log('app.doaction');
        //console.log(fileitem);
        //console.log(this);
        if (panelid=="filepanel1") {
            //hide filepanel2, show file
            this.viewpanel2 = true;
            this.fileurl2 = fileitem.webdavuri;

            //if (fileitem)
        } else {
            this.viewpanel1 = true;
            this.fileurl1 = fileitem.webdavuri;
        }
    }
}