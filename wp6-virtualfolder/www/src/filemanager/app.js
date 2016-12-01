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
      console.log('app.doaction()');
      console.log(this);
        if (panelid=="filepanel1") {
            //hide filepanel2, show file
            this.viewpanel2 = true;//!this.viewpanel2; //switch

            this.childview2.viewfile(fileitem.webdavuri);
        } else {
            this.viewpanel1 = true;//!this.viewpanel1; //switch
            this.childview.viewfile(fileitem.webdavuri);

        }
    }
    close1(){
      this.viewpanel1=false;
    }
    close2(){
      this.viewpanel2=false;
    }
}
