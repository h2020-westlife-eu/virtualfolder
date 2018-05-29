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
 * Aliastable component gets the currently registered aliases for file providers
 * and shows them in a table, allows delete the alias or initiate dialog to create one.
 */
export class Aliastable {
  static inject = [EventAggregator,HttpClient];

  constructor(ea,httpclient){
    this.ea=ea;
    this.serviceurl = Vfstorage.getBaseUrl()+"/metadataservice/files";
    this.ea.subscribe(SettingsSubmitted, msg => this.submitSettings(msg.settings) );
    this.client=httpclient;
    this.providers=[{alias:"Loading available providers ...",temporary:true}];
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
  }

  attached() {
    //adds listener for 
    window.addEventListener("message", this.receiveMessage, false);
    //gets the status of the b2drop connection
    this.client.get(this.serviceurl)
      .then(data => {
        //console.log("data response");
        //console.log(data);
        this.ea.publish(new MayLogout(this.panelid));
        if (data.response) {
          this.providers = JSON.parse(data.response);
        }
      })
      .catch(error =>{
        console.log("aliastable.attached() error:");
        console.log(error);
          //handle 403 unauthorized
          if (error.statusCode === 403) {
            this.ea.publish(new HandleLogin(this.panelid));
          } else
        alert('Sorry. Backend service is not working temporarily. Wait a moment. If the problem persist, report it to system administrator. '+this.serviceurl+' HTTP status:'+error.statusCode+' '+error.statusText)
      });
    //get public key
    this.client.post(this.localsettingservice)
      .then(data => {
        this.publickey=data.response
      })
  }

  submitSettings(settings) {
     this.providers = settings;
  }

  removeProvider(settings){
    //console.log("removeProvider() "+alias);
    if (!confirm('Do you really want to delete the provider with alias "'+settings.alias+'" ?'))
      return;
    this.client.delete(this.serviceurl+"/"+settings.alias)
      .then(data =>{
        //console.log("data response");
        //console.log(data);
        if (data.response) {
          this.providers = JSON.parse(data.response);
        }
      })
      .catch(error =>{
        console.log(error);

        alert('Sorry. Settings not deleted at '+this.serviceurl+' error:'+error.response+" status:"+error.statusText)
      });
  }
  
  importProvider(){
    //1. get public key from this VF instance
    //during attached() this.publickey
    //2. open popup window with public key to remote public VC
    this.remoteurl= window.prompt("Enter URL of West-Life Virtual Volder instance:( https://[yourdomain]/virtualfolder/)","https://portal.west-life.eu/virtualfolder/");
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
    let conflicts = this.resolveConflicts(message.aliases);
    let importmessage = {PublicKey:this.publickey,EncryptedSettings:message.EncryptedSettings,ConflictedAliases:conflicts.oldnames,NewNameAliases:conflicts.newnames};
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
