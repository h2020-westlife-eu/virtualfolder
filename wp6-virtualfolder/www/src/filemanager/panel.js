/**
 * Created by Tomas Kulhanek on 2/10/17.
 */
import {EventAggregator} from 'aurelia-event-aggregator';
import {SelectedFile,VisualizeFile,EditFile,DatasetFile} from '../filepicker/messages';
import {SelectedTab} from '../tabs/messages';
import {bindable} from 'aurelia-framework';

export class Panel {
    static inject = [EventAggregator];
    @bindable pid;

    constructor(ea) {
        this.ea = ea;

        //generate unique id from time
        //this.pid = new Date().valueOf();
        this.selectedView=this.selectedVisual=this.selectedDataset=false;
        this.selectedList=true;
        this.showprovenance = false;
        this.provenancelink = "";
    }
    attached(){
      this.s1=this.ea.subscribe(SelectedFile, msg => this.selectFile(msg.file,msg.senderid,msg.linkheader));
      this.s2=this.ea.subscribe(SelectedTab, msg => this.selectTab(msg.tabid));
    }
    detached(){
      this.s1.dispose();
      this.s2.dispose();
    }

    bind(){
      this.ids=[this.pid+'.list',this.pid+'.view',this.pid+'.visual',this.pid+'.analyse',this.pid+'.dataset']; //prefix uid to tab ids
      
      this.selectedTab= this.ids[0];
      this.paneltabs = [
        { id: this.ids[0], label: 'File List'},
        { id: this.ids[1], label: 'View/Edit'},
        { id: this.ids[2], label: 'Visualize'},
        { id: this.ids[3], label: 'Metadata'}
      ];
    }

    selectTab(tabid){
        //if uid belongs to mine - change tab, otherwise ignore this message
        if (tabid.startsWith(this.pid)) {
            this.selectedTab = tabid;
            this.selectedList = this.selectedTab == this.ids[0];
            this.selectedView = this.selectedTab == this.ids[1];
            this.selectedVisual = this.selectedTab == this.ids[2];
            this.selectedDataset = this.selectedTab == this.ids[3];
        }
    }

    selectFile(file,senderid,linkheader) {
      console.log("selectFile(), linkheader value:",linkheader);
      //default action, visualize pdb, if localStorage.getItem("visualizepdb") is defined then it needs to be true,
      let showpdb = (file.webdavuri.endsWith('pdb') || file.webdavuri.endsWith('ent') || file.webdavuri.endsWith('cif')) ? (typeof(Storage) !== "undefined") ? localStorage.getItem("visualizepdb") ? localStorage.getItem("visualizepdb") === "true" : true : true : false;
      if (senderid!=this.pid) { //perform action on second panel
        this.showprovenance = (typeof linkheader !== 'undefined');
        console.log("Link header",linkheader);
        console.log("showprovenanceLink header",linkheader);
        if (this.showprovenance) {
          console.log("Link header is available",linkheader);
          this.provenancelink = linkheader.split('<').pop().split('>').shift();
        }
        
        if (this.selectedDataset) { //dataset tab is active
          this.ea.publish(new DatasetFile(file,senderid));
        }
        else //dataset tab is not active - thus probably visualize/show file
        {
          if (showpdb) {
            //visualize
            this.selectTab(this.ids[2]);
            this.ea.publish(new VisualizeFile(file, senderid));
          } else {
            //edit/raw view
            this.selectTab(this.ids[1]);
            this.ea.publish(new EditFile(file, senderid));
          }
        }
      }
    }
}
