/**
 * Created by Tomas Kulhanek on 1/6/17.
 */
//import {HttpClient} from 'aurelia-http-client';
import {ProjectApi} from "../components/projectapi";
import {EventAggregator} from 'aurelia-event-aggregator';
import {SettingsSubmitted} from './messages';
import {Vfstorage} from '../utils/vfstorage';
import {Aliastable} from "./aliastable";

//let client = new HttpClient();

/**
 * Importprovider component implements workflow to transfer providers from one virtualfodler to another
 */
export class Importprovider {
  static inject = [EventAggregator,ProjectApi];

  constructor(ea,pa){
    this.importingSettings=false;
    this.ea=ea;
    this.publickey = undefined;
    //this.serviceurl = Vfstorage.getBaseUrl()+"/metadataservice/files";
    //this.client=httpclient;
    this.pa=pa;

    //this.localsettingservice=Vfstorage.getBaseUrl()+"/metadataservice/settings";
    //receives message from popup window, define as arrow function due to eventlistener
    this.receiveMessage = event =>
    {
      console.log("Aliastable() received message:",event.data);
      this.confirmSettings(event.data);
    };
    this.remoteurl="https://portal.west-life.eu/virtualfolder/";
  }

  attached() {
    //adds listener for 
    window.addEventListener("message", this.receiveMessage, false);
    //1. get public key from this VF instance
    this.pa.getPublicKey()
      .then(data => {
        console.log("getPublicKey()",data);
        this.publickey = data;
    })
    .catch(error => {
      alert('Sorry error when generating keys for import:' + error.response + " status:" + error.statusText)
    });
  }

  submitSettings(settings) {
    this.providers = settings;
  }
  
  importProvider(){
    //2. open popup window with public key to remote public VC
    //this.remoteurl= window.prompt("Enter URL of West-Life Virtual Volder instance:( https://[yourdomain]/virtualfolder/)","https://portal.west-life.eu/virtualfolder/");
    let remotesettingsurl = new URL(this.remoteurl+'syncsettingcomponent.html');
    let params= {PublicKey:this.publickey};
    Object.keys(params).forEach(key => remotesettingsurl.searchParams.append(key, params[key]));
    this.openwindow(remotesettingsurl);
  }


  detached() {
    window.removeEventListener("message", this.receiveMessage)
  }

  //opens popup window in defined location
  openwindow(href) {
    this.popup=window.open(href, 'newwindow', 'width=640, height=480');
    return false;
  }

  confirmSettings(data){
    //3. popup will return encrypted blob with settings and selected aliases, check aliases with existing one and suggest rename - e.g. automatic one
    //let message = {EncryptedSettings:data.response,aliases:selectedaliases};
    this.message = JSON.parse(data);
    this.conflicts = {oldnames:this.message.aliases,newnames:this.message.aliases};
    this.aliasestmp = this.message.aliases.split(";");
    this.aliases = this.aliasestmp.map(item => {return {oldname:item,newname:item} });
    this.importingSettings=true;
  }
  
  importSettings2(){
    this.importingSettings=false;
    //console.log("importSettings2() aliases:",this.aliases);
    
    this.conflicts = {oldnames:this.aliases.map(item => item.oldname).join(';'),newnames:this.aliases.map(item=>item.newname).join(';')};
    //console.log("importSettings2() conflicts:",this.conflicts);
    
//4. import the encrypted settings into this VF instance
    //    public class ImportSettings : IReturnVoid
    //     {
    //         public string PublicKey{ get; set; }
    //         public string EncryptedSettings{ get; set; }
    //         public string ConflictedAliases{ get; set; }
    //         public string NewNameAliases{ get; set; }        
    //     }
    //let conflicts = this.resolveConflicts(message.aliases);    
    let importmessage = {PublicKey:this.publickey,EncryptedSettings:this.message.EncryptedSettings,ConflictedAliases:this.conflicts.oldnames,NewNameAliases:this.conflicts.newnames};
    //console.log("importSettings",importmessage);
    this.pa.putSettings(importmessage)
    //this.client.put(this.localsettingservice,importmessage)
      .then(data => {
        //console.log("importSettings2() data:",data);
        this.ea.publish(new SettingsSubmitted(data));
      });

  }
  
}
