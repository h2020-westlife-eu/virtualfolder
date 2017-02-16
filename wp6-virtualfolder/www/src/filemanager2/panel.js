/**
 * Created by Tomas Kulhanek on 2/10/17.
 */
import {EventAggregator} from 'aurelia-event-aggregator';
import {SelectedFile} from '../filepicker/messages';
import {SelectedTab} from '../tabs/messages';
import {computedFrom} from 'aurelia-framework';


export class Panel {
    static inject = [EventAggregator];

    constructor(ea) {
        this.ea = ea;
        this.ea.subscribe(SelectedFile, msg => this.selectFile(msg.file,msg.senderid));
        this.ea.subscribe(SelectedTab, msg => this.selectTab(msg.tabid));
        //generate unique id from time
        this.uid = new Date().valueOf();
        this.ids=[this.uid+'.list',this.uid+'.view',this.uid+'.visual',this.uid+'.analyse']; //prefix uid to tab ids

        this.selectedTab= this.ids[0];
        this.paneltabs = [
            { id: this.ids[0], label: 'File List'},
            { id: this.ids[1], label: 'RAW File View' },
            { id: this.ids[2], label: 'Visualize' },
          { id: this.ids[3], label: 'PDB Analyse' }
        ];
        this.selectedAnalyse=this.selectedView=this.selectedVisual=false;
        this.selectedList=true;
    }

    /*@computedFrom('selectedTab')
    get selectedList() {
        return this.selectedTab=='list';
    }

    @computedFrom('selectedTab')
    get selectedView() {
        return this.selectedTab=='view';
    }

    @computedFrom('selectedTab')
    get selectedVisual() {
        return this.selectedProvider=='visual';
    }
    */
    selectTab(tabid){
        //if uid belongs to mine - change tab, otherwise ignore this message
        if (tabid.startsWith(this.uid)) {
            this.selectedTab = tabid;
            this.selectedList = this.selectedTab == this.ids[0];
            this.selectedView = this.selectedTab == this.ids[1];
            this.selectedVisual = this.selectedTab == this.ids[2];
          this.selectedAnalyse=  this.selectedTab == this.ids[3];
        }
    }

    selectFile(file,senderid) {
      //default action, visualize pdb, change tab
      if (senderid==this.uid)
      this.selectTab(this.ids[2]);

    }
}
