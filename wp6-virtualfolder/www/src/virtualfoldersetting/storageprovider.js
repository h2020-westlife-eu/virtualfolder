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
    this.s3=this.ea.subscribe(SettingsMigrated, msg => this.migrateSettings(msg.settings) )
  }
  detached(){
    this.s1.dispose();
    this.s2.dispose();
  }

  newProvider(){
    this.showprovider = true;
    this.showmigrate=false;
    this.showimport=false;
  }

  importProvider(){
    this.showprovider = false;
    this.showmigrate=false;
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

  migrateSettings(settings){
    //console.log('addProvider: not yet implemented');
    this.showmigrate = false;
    //get provider info from subcomponent
  }

  migrateProvider(){
    this.showprovider = false;
    this.showmigrate=true;
    this.showimport=false;
  }
  
}
