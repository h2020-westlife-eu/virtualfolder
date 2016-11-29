/**
 * Created by vagrant on 9/6/16.
 */

import {HttpClient} from 'aurelia-http-client';

export class App {

    constructor() {
        this.heading = "File manager";
        this.viewpanel1 = false;
        this.viewpanel2 = false;
        this.fileurl = "test1";
    }

    doAction(fileitem,panelid) {
        this.fileurl = fileitem.webdavuri;
        if (panelid=="filepanel1") {
            //hide filepanel2, show file
            this.viewpanel2 = !this.viewpanel2; //switch
        } else {
            this.viewpanel1 = !this.viewpanel1; //switch

        }
    }
}