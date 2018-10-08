/**
 * Created by Tomas Kulhanek on 1/6/17.
 */
import {ProjectApi} from "../components/projectapi";
import {EventAggregator} from 'aurelia-event-aggregator';
import {SettingsSubmitted} from './messages';
/**
 * MigrateProvider component implements workflow to migrate providers from old ARIA account  */
export class Migrateprovider {
  static inject = [EventAggregator,ProjectApi];

  constructor(ea,pa){
    this.migratableproviders=null;
    this.migrateProvidersDTO=null;
  }

  attached() {
    //1. get migratable providers
    this.pa.getMigratableProviders()
      .then(data => {
        console.log("getPublicKey()",data);
        this.migratableproviders = data;
        this.aliases = this.data.aliases.map(item => {return {oldname:item,newname:item} });
      })
      .catch(error => {
        alert('Sorry error when generating keys for import:' + error.response + " status:" + error.statusText)
      });
  }
  
  dettached(){
    
  }
  
  migrateProviders(){
    this.pa.postMigrateProviders(this.migrateProvidersDTO)
      .then(data => {
        this.ea.publish(new SettingsSubmitted(data));
      });

  }

}
