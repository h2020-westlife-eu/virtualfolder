/**
 * Created by Tomas Kulhanek on 5/28/17.
 */
import {EventAggregator} from 'aurelia-event-aggregator';
import {SettingsSubmitted, SettingsSelected} from './messages';

export class Storageprovider {
  static inject = [EventAggregator];

  constructor(ea) {
    this.showprovider = false;
    this.showimport = false;
    this.ea = ea;
  }
  attached(){
    this.s1=this.ea.subscribe(SettingsSubmitted, msg => this.submitSettings(msg.settings) )
    this.s2=this.ea.subscribe(SettingsSelected, msg => this.selectSettings(msg.settings) )
  }
  detached(){
    this.s1.dispose();
    this.s2.dispose();
  }

  newProvider(){
    this.showprovider = true;
    this.showimport=false;
  }

  importProvider(){
    this.showprovider = false;
    this.showimport=true;
  }

  submitSettings(settings){
    //console.log('addProvider: not yet implemented');
    this.showprovider = false;
    //get provider info from subcomponent
  }

  selectSettings(settings){
    //console.log('addProvider: not yet implemented');
    this.showprovider = true;
    //get provider info from subcomponent
  }

}
