/**
 * created by Tomas Kulhanek on 9/28/16.
 */

import {HttpClient} from 'aurelia-http-client';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SelectedFile} from './messages';
import {bindable} from 'aurelia-framework';

export class Filepanel{
  static inject = [EventAggregator,HttpClient];
  @bindable panelid;

  constructor(ea,httpclient) {
        this.ea = ea;
        this.client = httpclient;
        this.files = [];
        this.filescount = this.files.length;
        this.path= "";
        this.lastpath="";
        this.dynatable = {};
        this.serviceurl = "/metadataservice/files";
        //http to accept json
        this.client.configure(config=>{
            config.withHeader('Accept','application/json');
            config.withHeader('Content-Type','application/json');
        });
        console.log("filepanel tableid:"+this.panelid);
        this.getpublicwebdavurl="/api/authproxy/get_signed_url/"
    }

    //triggered after this object is placed to DOM
    attached() {

        //read the directory infos
        this.client.get(this.serviceurl)
            .then(data => {
                if (data.response) {
                    this.populateFiles(data.response);
                }
            }).catch(error => {
                //handle 403 unauthorized
                if (error.statusCode == 403) {
                  //try to login
                  console.log("redirecting");
                  window.location = "/login?next=" + window.location.pathname;
                  //window.location =
                } else {
                  console.log('Error');
                  console.log(error);
                  //alert('Sorry, response: ' + error.statusCode + ':' + error.statusText + ' when trying to get: ' + this.serviceurl);
                }
            });
      console.log("filepanel tableid:"+this.panelid);
    }

    //parse .NET encoded Date in JSON
    dateTimeReviver(key, value) {
        var a;
        if (typeof value === 'string') {
            a = /\/Date\(([\d\+]*)\)\//.exec(value);
            if (a) {
                return new Date(parseInt(a[1])).toLocaleDateString('en-GB');
            }
        }
        return value;
    }

    //removes last subdirectory
    cdup(){
        this.lastpath= this.path;
        let sepIndex= this.path.lastIndexOf('/');
        this.path = this.path.substring(0,sepIndex);
    }

    //adds subdirectory to the path
    cddown(subdir) {
      this.lastpath=this.path;
        this.path+='/'+subdir;
    }


    //change folder, reads the folder content and updates the table structure
    changefolder(folder){
        if (!this.lock) {
            this.lock = true;
            if (folder) {
                if (folder == '..') this.cdup();
                else this.cddown(folder);
            }

          this.client.get(this.serviceurl + this.path)
                .then(data => {
                    if (data.response) {
                        this.populateFiles(data.response);
                        //update files in table view
                    }
                    this.lock = false;
                }).catch(error => {
                console.log('Error');
                console.log(error);
                alert('Sorry, response: '+error.statusCode+':'+error.statusText+' when trying to get: '+this.serviceurl+this.path);
                this.lock = false;
                this.path=this.lastpath;
            });
        } //else doubleclick when the previous operation didn't finished
    }

    //refresh the file content
    refresh() {
        this.changefolder(); //changefolder with empty folder - just refresh
    }

    //parses response and fills file array with customization (DIRS instead of size number)
    populateFiles(dataresponse){

        this.files = JSON.parse(dataresponse,this.dateTimeReviver);//populate window list
        this.filescount =  this.files.length;
        if (this.path.length>0) {//non root path
            this.files.unshift({name: "..", size: "UP DIR",date:""}); //up dir item
        }
        this.files.forEach (function (item,index,arr){
          if(!arr[index].name && arr[index].alias) {
            arr[index].name=arr[index].alias;
            arr[index].attributes = 16;
            arr[index].date="";
          }
          if (arr[index].attributes & 16) arr[index].size="DIR"});
    }

    selectFile(file){
      console.log("filepanel tableid:"+this.panelid);
      if (file.size.endsWith && file.size.endsWith('DIR')) this.changefolder(file.name);
      else {
        this.client.get(this.getpublicwebdavurl)
          .then(data => {
            if (data.response) {
              let mypath2=JSON.parse(data.response);
              let mypath = mypath2.signed_url;
              mypath+= this.path.startsWith('/')?this.path.slice(1):this.path;
              file.publicwebdavuri=mypath+"/"+file.name;
              this.ea.publish(new SelectedFile(file, this.panelid));
              //this.ea.publish(new SelectedFile(file,this.panelid));
            }
          });

      }
    }

}




