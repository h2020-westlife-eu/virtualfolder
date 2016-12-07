/**
 * Created by vagrant on 9/6/16.
 */

import {HttpClient} from 'aurelia-http-client';


export class App {

    constructor() {
        this.heading = "File manager";
        this.viewpanel1 = false;
        this.viewpanel2 = false;
        this.showhelp = false;
        this.fileurl = "test1";
        this.myKeypressCallback = this.keypressInput.bind(this);

    }

    activate(){
        window.addEventListener('keypress', this.myKeypressCallback, false);
    }

    deactivate() {
        window.removeEventListener('keypress', this.myKeypressCallback);
    }

    // This function is called by the aliased method
    keypressInput(e) {
        console.log('keypressed');
        if (e.key=='F1') this.help();
        console.log(e);
    }

    doAction(fileitem,panelid) {
        this.fileurl = fileitem.webdavuri;
      console.log('app.doaction()');
      console.log(this.fileurl);
        if (panelid=="filepanel1") {
            //hide filepanel2, show file
            this.viewpanel2 = true;//!this.viewpanel2; //switch
            if (this.childview2)
            this.childview2.viewfile(fileitem.webdavuri);
        } else {
            this.viewpanel1 = true;//!this.viewpanel1; //switch
            if (this.childview)
                this.childview.viewfile(fileitem.webdavuri);

        }
    }
    close1(){
      this.viewpanel1=false;
    }
    close2(){
      this.viewpanel2=false;
    }
    help(){
        this.showhelp=!this.showhelp;
    }
}
