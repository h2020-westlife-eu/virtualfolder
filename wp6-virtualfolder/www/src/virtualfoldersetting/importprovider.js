/**
 * Created by Tomas Kulhanek on 1/6/17.
 */
import {HttpClient} from 'aurelia-http-client';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SettingsSubmitted} from './messages';
import {Vfstorage} from '../utils/vfstorage';
import {HandleLogin,MayLogout} from '../behavior';
import {Dataitem} from "../pdbcomponents/dataitem";

//let client = new HttpClient();

/**
 * Importprovider component implements workflow to transfer providers from one virtualfodler to another
 */
export class Importprovider {
  static inject = [EventAggregator,HttpClient];

  constructor(ea,httpclient){
    this.ea=ea;
    this.publickey = undefined;
    this.serviceurl = Vfstorage.getBaseUrl()+"/metadataservice/files";
    this.client=httpclient;
    this.client.configure(config=> {
      config.withHeader('Accept', 'application/json');
      config.withHeader('Content-Type', 'application/json');
    });

    this.localsettingservice=Vfstorage.getBaseUrl()+"/metadataservice/settings";
    //receives message from popup window, define as arrow function due to eventlistener
    this.receiveMessage = event =>
    {
      console.log("Aliastable() received message:",event.data);
      this.importSettings(event.data);
    }
    this.remoteurl="https://portal.west-life.eu/virtualfolder/";
  }

  attached() {
    //adds listener for 
    window.addEventListener("message", this.receiveMessage, false);
    //1. get public key from this VF instance
    this.client.post(this.localsettingservice)
      .then(data => {
        this.publickey = data.response;
    })
    .catch(error => {
      console.log(error);
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

  importSettings(data){
    //3. popup will return encrypted blob with settings and selected aliases, check aliases with existing one and suggest rename - e.g. automatic one
    //let message = {EncryptedSettings:data.response,aliases:selectedaliases};
    let message = JSON.parse(data);

    //4. import the encrypted settings into this VF instance
    //    public class ImportSettings : IReturnVoid
    //     {
    //         public string PublicKey{ get; set; }
    //         public string EncryptedSettings{ get; set; }
    //         public string ConflictedAliases{ get; set; }
    //         public string NewNameAliases{ get; set; }        
    //     }
    //let conflicts = this.resolveConflicts(message.aliases);
    let conflicts = {oldnames:message.aliases,newnames:message.aliases};
    let importmessage = {PublicKey:this.publickey,EncryptedSettings:message.EncryptedSettings,ConflictedAliases:conflicts.oldnames,NewNameAliases:conflicts.newnames};
    console.log("importSettings",importmessage);
    this.client.put(this.localsettingservice,importmessage);
  }

  resolveConflicts(aliases){
    let aliasarr = aliases.split(';');
    let conflicts = {oldnames:"",newnames:""};
    for (let pr of this.providers) {
      if (aliasarr.indexOf(pr.alias)>=0) {
        //found conflict
        //add ; after existing elements
        if (conflicts.oldnames.length>0) {conflicts.oldnames+=';'; conflicts.newnames+=';'}
        //add conflict name
        conflicts.oldnames+=pr.alias;
        //add new name to be renamed, TODO check whether random number already conflicts too
        let suffix=""+Math.floor((Math.random() * 1000) + 1);
        conflicts.newnames+=pr.alias+suffix;
      }
    }
  }

}
