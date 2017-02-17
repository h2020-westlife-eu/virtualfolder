import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SelectedTab} from './messages';
//import $ from 'jquery';
//import {tabs} from 'jquery-ui';


export class Tabs {
    @bindable tabs = null;
    static inject = [Element,EventAggregator];


    constructor(el,ea) {
        this.id = el.id;
        this.element= el;
        this.ea=ea;
    }

    attached() {
        //console.log("tabs.atached() tabs: "+this.tabs);
;

    }

    opentab(tabid){
        this.activeid=tabid.id;
        //console.log("Tabs selected:"+this.activeid);
        this.ea.publish(new SelectedTab(this.activeid));
    }

}
