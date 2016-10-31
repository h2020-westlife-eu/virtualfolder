/**
 * Created by vagrant on 9/28/16.
 */

import {HttpClient} from 'aurelia-http-client';
import {bindable, bindingMode, decorators} from 'aurelia-framework';

let client = new HttpClient();

export const FilepanelCustomElement = decorators (
    bindable({ name: 'tableid', defaultBindingMode: bindingMode.oneTime }),
    bindable('allowDestruction')
     ).on(class {

    constructor() {
        this.files = [];
        this.filescount = this.files.length;
        this.path= "";
        this.dynatable = {};
        //not yet accessible here console.log("file panel constructed:" + this.tableid);
        client.configure(config=>{
            config.withHeader('Accept','application/json');
            config.withHeader('Content-Type','application/json');
        });

        this.handleBodyClick = e => {
            console.log(e.target);
        };
    }

    attached() {
        //console.log("file panel attached:" + this.tableid);
        client.get("/metadataservice/sbfiles")
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
                    let a = this;
                    this.dynatable.on('click', 'tr', function () {
                        if (this.children[1].innerText.endsWith('DIR')) //if directory in second column
                            a.changefolder(this.firstChild.innerText);
                        else
                            //do some file related stuff
                            console.log(this.firstChild.innerText);
                    });
                }
            }).catch(error => {
                console.log('Error');
                console.log(error);
                this.status="unavailable"
                this.showdialog=false;
            });
    }

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
            client.get("/metadataservice/sbfiles/" + this.path)
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
                this.lock = false;
            });
        } //else doubleclick when the previous operation didn't finished
    }

    refresh() {
        this.changefolder(); //changefolder with empty folder - just refresh
    }

    populateFiles(dataresponse){
        this.files = JSON.parse(dataresponse,this.dateTimeReviver);//populate window list
        this.filescount =  this.files.length;
        if (this.path.length>0) {//non root path
            this.files.unshift({name: "..", size: "UP DIR",date:""}); //up dir item
        }
        this.files.forEach (function (item,index,arr){if (arr[index].attributes & 16) arr[index].size="DIR"})
    }



});



