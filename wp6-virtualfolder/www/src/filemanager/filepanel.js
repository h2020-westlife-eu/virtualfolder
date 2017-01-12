/**
 * Created by vagrant on 9/28/16.
 */

import {HttpClient} from 'aurelia-http-client';
import {bindable, bindingMode, decorators} from 'aurelia-framework';

let client = new HttpClient();

//TODO refactor to use Observer pattern and Dependency injection

export const FilepanelCustomElement = decorators (
    bindable({ name: 'tableid', defaultBindingMode: bindingMode.oneTime }),
    bindable('allowDestruction')
     ).on(class {

/*export class FilePanel {*/
    constructor() {
        this.files = [];
        this.filescount = this.files.length;
        this.path= "";
        this.dynatable = {};
        this.serviceurl = "/metadataservice/files";
        //not yet accessible here console.log("file panel constructed:" + this.tableid);
        //http to accept json
        client.configure(config=>{
            config.withHeader('Accept','application/json');
            config.withHeader('Content-Type','application/json');
        });
    }

    created(owningView,myview) {
        this.parent = owningView;//.controller.viewModel;
//        console.log('parent');
//        console.log(this.parent);
    }

    //triggered after this object is placed to DOM
    attached() {
        //console.log("file panel attached:" + this.tableid);

        //read the directory infos
        client.get(this.serviceurl)
            .then(data => {
                if (data.response) {
                    this.populateFiles(data.response);

                    this.dynatable = $('#'+this.tableid).dynatable({
                        dataset: {
                            records: this.files
                        },
                        features: {
                            paginate: false,
                            search: false,
                            recordCount: false,
                            perPageSelect: false,
                            pushState:false

                        }
                    });
                    //adds click listener to the table items
                    let a = this;
                    let b = this.parent.controller.viewModel;

//                    console.log('b');
//                    console.log(b);
                    this.dynatable.on('click', 'tr', function () {
                        if (this.children[1].innerText.endsWith('DIR')) //if directory in second column
                            a.changefolder(this.firstChild.innerText);
                        else {
                            var fileitem = this.firstChild.innerText;
                            var fileindex = a.files.map(function(e) {return e.name;}).indexOf(fileitem);
                            console.log('fileitem');
                            console.log(fileitem);
                            console.log(fileindex);
                            b.doAction(a.files[fileindex], a.tableid);//do some file related stuff
                        }
                    });
                }
            }).catch(error => {

                console.log('Error');
                console.log(error);
                this.status="unavailable";
                this.showdialog=false;
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

          client.get(this.serviceurl + this.path)
                .then(data => {
                    if (data.response) {
                        this.populateFiles(data.response);
                        //update files in table view
                        var d = this.dynatable.data('dynatable');
                        d.settings.dataset.originalRecords = this.files;
                        d.process();
                        let a = this;
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
      //console.log("filepane.doaction()");
        //console.log(fileitem.children);
        this.parent.doAction(fileitem);
    }

}
);



