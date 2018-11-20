/**
 * Created by Tomas Kulhanek on 1/6/17.
 */
import {ProjectApi} from "../components/projectapi";
import {EventAggregator} from 'aurelia-event-aggregator';
import {SettingsMigrated,SettingsSubmitted} from './messages';
/**
 * MigrateProvider component implements workflow to migrate providers from old ARIA account  */
export class Migrateprovider {
  static inject = [EventAggregator,ProjectApi];

  constructor(ea,pa){
    this.ea = ea;
    this.pa = pa;
    this.migratableproviders=null;
    this.migrateProvidersDTO=null;
    this.aliases = [{oldname:"loading old settings...",type:"",nename:""}]
  }

  attached() {
    //1. get migratable providers
    this.pa.getMigratableProviders()
      .then(data => {
        //console.log("MigrateProviders:data:",data);
        this.migratableproviders = data;
        this.aliases = this.migratableproviders.map(item => {console.log("item:",item); return {oldname:item.alias,type:item.type,newname:item.alias,selected:true} });
      })
      .catch(error => {
        console.log("MigrateProviders error:",error);
        alert('Sorry error:' + error.response + " status:" + error.statusText)
      });
  }
  
  dettached(){
  }
  
  select(alias){
    //console.log("migrateproviders select:",alias);
    alias.selected = ! alias.selected;
    //console.log("migrateproviders select2:",alias);
  }
  
  migrateProviders(){
    this.migrateProvidersDTO = {}; 
    this.migrateProvidersDTO.Alias=this.aliases.filter(item=> item.selected).map(item=> item.oldname);
    this.migrateProvidersDTO.RenameAlias=this.aliases.filter(item=>item.selected).map(item=> item.newname);
    console.log("migrateProviders() aliases:",this.aliases);
    console.log("migrateProviders() dto:",this.migrateProvidersDTO);
    //2. post list of providers which will be migrated to new account
    this.pa.postMigratableProviders(this.migrateProvidersDTO)
      .then(data => {
        this.ea.publish(new SettingsSubmitted(data));
        this.ea.publish(new SettingsMigrated(data));
      });
  }

}
