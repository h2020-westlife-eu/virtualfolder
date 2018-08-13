import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SelectedTab} from './messages';
import {VisualizeFile,EditFile,SelectedMetadata} from '../filepicker/messages';
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
        this.showspecial = false;
    }
    
    attached(){
      //will switch the tab according of what message is received
      //visualize ==[2]
      //edit ==[1]
      //metadata == [3]
      this.s1=this.ea.subscribe(VisualizeFile, msg => this.selectTab(2,msg.file,msg.senderid,false));
      this.s2=this.ea.subscribe(EditFile, msg => this.selectTab(1,msg.file,msg.senderid,false));
      this.s3=this.ea.subscribe(SelectedMetadata, msg => this.selectTab(3,msg.file,msg.senderid,true));
      //this.s4=this.ea.subscribe(SpecialTab, msg => this.specialTab(msg.name,msg.senderid));
    }
    detached(){
      this.s1.dispose();
      this.s2.dispose();
      this.s3.dispose();
    }

    bind() {
      console.log("tabs.atached() tabs: "+this.tabs);
      this.activeid=this.tabs[0];
      this.activeid.active = true;
      //this.tabs[]
    }

  selectTab(tabid,file,senderid,shouldbubble) {
    //this.showspecial = false; //other message = disable special tab
    if (!this.activeid.id.startsWith(senderid)) {
      this.activeid.active = false;
      this.activeid=this.tabs[tabid];
      this.activeid.active=true;
      //buble
      if (shouldbubble) 
      this.ea.publish(new SelectedTab(this.activeid.id));
    }
  }
  
  specialTab(name,senderid){
      this.showspecial=true;
  }

    opentab(tabid){
      //old active tab is not active anymore
      this.activeid.active = false;
      this.activeid=tabid;
      this.activeid.active=true;
      //console.log("Tabs selected:"+this.activeid);
      this.ea.publish(new SelectedTab(this.activeid.id));
    }
}
