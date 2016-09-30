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
        this.path= "";
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
        console.log("file panel attached:" + this.tableid);
        client.get("/metadataservice/sbfiles")
            .then(data => {
                //console.log("debug filemanager files:");
                //console.log(data);
                //console.log(data.response);
                if (data.response) {
                    //console.log(data.response);

                    this.files = JSON.parse(data.response);//populate window list
                    //debug
                    //console.log(this.files);
                    //attached();
                    console.log("populating:"+this.tableid+" files:"+data.response);
                    //console.log(this.files);
                    $('#'+this.tableid).dynatable({
                        dataset: {records: this.files}
                    });
                    let a = this;
                    $('#'+this.tableid).dynatable().on('click', 'tr', function () {
                        console.log(a);
                        console.log(this);
                        console.log(this.firstChild.innerText);
                        a.changefolder(this.firstChild.innerText);
                        // do stuff here
                    });
                }
            })
    }

    //removes last subdirectory
    cdup(){
        let sepIndex= this.folder.lastIndexOf('/');
        this.path = this.directory.substring(0,sepIndex);
    }

    //adds subdirectory to the path
    cddown(subdir) {
        this.path+='/'+subdir;
    }



    changefolder(folder){
        if (folder=='..') this.cdup();
        else this.cddown(folder);
        console.log("file panel attached:" + this.tableid);
        client.get("/metadataservice/sbfiles/"+this.path)
            .then(data => {
                //console.log("debug filemanager files:");
                //console.log(data);
                //console.log(data.response);
                if (data.response) {
                    //console.log(data.response);
                    if (this.path.length>0) //non root path
                        this.files = [{name:"..",size:"UP DIR"}]; //up dir item
                    else this.files = []; //root path - empty list
                    this.files.push(JSON.parse(data.response));//populate window list
                    //debug
                    //console.log(this.files);
                    //attached();
                    console.log("populating:"+this.tableid+" files:"+data.response);
                    //console.log(this.files);
                    $('#'+this.tableid).dynatable({
                        dataset: {records: this.files}
                    });
                    $('#'+this.tableid).dynatable().on('click', 'tr', function () {
                        console.log(this.firstChild.innerText);
                        // do stuff here
                    });
                }
            })
    }

    })


