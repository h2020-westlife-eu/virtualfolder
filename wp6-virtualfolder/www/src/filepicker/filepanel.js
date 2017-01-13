/**
 * Created by vagrant on 9/28/16.
 */

import {HttpClient} from 'aurelia-http-client';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SelectedFile} from './messages';

export class Filepanel{
  static inject = [EventAggregator,HttpClient];

  constructor(ea,httpclient) {
        this.ea = ea;
        this.client = httpclient;
        this.files = [];
        this.filescount = this.files.length;
        this.path= "";
        this.dynatable = {};
        this.serviceurl = "/metadataservice/files";
        //not yet accessible here console.log("file panel constructed:" + this.tableid);
        //http to accept json
        this.client.configure(config=>{
            config.withHeader('Accept','application/json');
            config.withHeader('Content-Type','application/json');
        });
    }

    //triggered after this object is placed to DOM
    attached() {
        console.log("attached()");

        //read the directory infos
        this.client.get(this.serviceurl)
            .then(data => {
                if (data.response) {
                    this.populateFiles(data.response);
                }
            }).catch(error => {

                console.log('Error');
                console.log(error);
                alert('Sorry, response: '+error.statusCode+':'+error.statusText+' when trying to get: '+this.serviceurl);
            });
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
        let sepIndex= this.path.lastIndexOf('/');
        this.path = this.path.substring(0,sepIndex);
    }

    //adds subdirectory to the path
    cddown(subdir) {
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
            });
        } //else doubleclick when the previous operation didn't finished
    }

    //refresh the file content
    refresh() {
        this.changefolder(); //changefolder with empty folder - just refresh
    }

    //parses response and fills file array with customization (DIRS instead of size number)
    populateFiles(dataresponse){
      console.log('doaction()');
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
        console.log(this.files);
    }

    doAction(fileitem) {
      console.log('doaction()');
      console.log(fileitem);
    }

    selectFile(file){
      console.log("selected file:");
      console.log(file);
      if (file.size.endsWith && file.size.endsWith('DIR')) this.changefolder(file.name);
      else this.ea.publish(new SelectedFile(file));

    }

}




