import {EventAggregator} from 'aurelia-event-aggregator';
import {SettingsSubmitted, SettingsSelected} from './messages';

export class App {
  static inject = [EventAggregator];

  constructor(ea) {
    this.showprovider = false;
    ea.subscribe(SettingsSubmitted, msg => this.submitSettings(msg.settings) )
    // wait for assignement this.genericcontrol from children

  }

  newProvider(){
    this.showprovider = true;
  }

  submitSettings(settings){
    //console.log('addProvider: not yet implemented');
    this.showprovider = false;
    //get provider info from subcomponent
  }

}
