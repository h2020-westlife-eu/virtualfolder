import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SelectedTab} from './messages';
import {VisualizeFile,EditFile} from '../filepicker/messages';
//import $ from 'jquery';
//import {tabs} from 'jquery-ui';

/**
 * <tabs></tabs>
 * adds tabs functionality into application filepanel
 */
export class Tabs {
    @bindable tabs;
    static inject = [Element,EventAggregator];


    constructor(el,ea) {
        //this.id = el.id;
        this.element= el;
        this.ea=ea;
        this.ea.subscribe(VisualizeFile, msg => this.selectVisualize(msg.file,msg.senderid));
        this.ea.subscribe(EditFile, msg => this.selectEdit(msg.file,msg.senderid));
    }

    bind() {
      console.log("tabs.atached() tabs: "+this.tabs);
      this.activeid=this.tabs[0];
      this.activeid.active = true;
      //this.tabs[]
    }

    selectVisualize(file,senderid){
      //just switch the tab
      console.log("selectVisualize senderid:"+senderid)
      if (!this.activeid.id.startsWith(senderid)) { //TODO presumes active.id = "left.list" "left.view" .. has suffix with senderid
        this.activeid.active = false;

        this.activeid=this.tabs[2];
        //new active tab is active
        this.activeid.active=true;
      }
    }

    selectEdit(file,senderid) {
      console.log("selectEdit senderid:"+senderid)
      console.log(this.tabs);
      console.log(this.activeid);
      if (!this.activeid.id.startsWith(senderid)) { //TODO presumes active.id = "left.list" "left.view" .. has suffix with senderid
        this.activeid.active = false;

        this.activeid=this.tabs[1];
        //new active tab is active
        this.activeid.active=true;
      }

    }

    opentab(tabid){
      //old active tab is not active anymore
      this.activeid.active = false;

      this.activeid=tabid;
      //new active tab is active
      this.activeid.active=true;
        //console.log("Tabs selected:"+this.activeid);
        this.ea.publish(new SelectedTab(this.activeid.id));
    }
}
