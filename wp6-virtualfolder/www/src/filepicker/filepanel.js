/**
 * created by Tomas Kulhanek on 9/28/16.
 */

import 'whatwg-fetch';
import {ProjectApi} from '../components/projectapi';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SelectedFile} from './messages';
import {CheckedFile} from './messages';
import {HandleLogin,MayLogout} from '../behavior';

import {bindable} from 'aurelia-framework';
import {Vfstorage} from '../utils/vfstorage';

import {Pdbresource} from './pdbresource';
import {Uniprotresource} from './uniprotresource';

export class Filepanel {
  static inject = [EventAggregator, ProjectApi, Pdbresource, Uniprotresource];
  @bindable panelid;

  constructor(ea, pa, pdbresource, uniprotresource) {
    this.ea = ea;
    this.pa = pa;
    this.files = [];
    this.path = "";
    this.lastpath = this.path;
    this.dynatable = {};
    this.sorted = {none: 0, reverse: 1, byname: 2, bydate: 4, bysize: 8, byext: 16}
    this.wassorted = this.sorted.none;
    this.baseresources = [{name: "PDB", info: "Protein Data Bank repository entries from ebi.ac.uk", id: "pdb"}]
    this.resources = [];
    //this.ea.subscribe(PopulateResources, msg => this.populateResource(msg.resources,msg.senderid));
    this.filescount = this.files.length + this.resources.length;
    this.isPdb = this.isUniprot = false;
    this.pdbresource = pdbresource;
    this.uniprotresource = uniprotresource;
    this.isFiles = true;
    this.selectedResources = [];
  }

  bind() {
    this.path = Vfstorage.getValue("filepanel" + this.panelid, "");
    if (this.path == "") this.resources = this.baseresources;
    //localStorage && (localStorage.getItem("filepanel" + this.panelid)) ? localStorage.getItem("filepanel" + this.panelid) : "";
    this.lastpath = "";
  }

  sortByX(sortflag, sortfunction) {
    //console.log("Filepanel sort");
    //console.log(this.files);
    if (this.path.length > 0) {//non root path
      this.files.shift(); //take the first '..'
    }

    //sort by name if previously not this.sorted by name
    if (!(this.wassorted & sortflag)) {
      this.files.sort(sortfunction)
      this.wassorted = sortflag;
    } else {
      //if previously reversed
      if (this.wassorted & this.sorted.reverse) {
        this.files.reverse(); //reverse again
        this.wassorted = sortflag;
      } else { //not reversed - reverse and set flag
        this.files.reverse();
        this.wassorted = this.wassorted | this.sorted.reverse;
      }
    }//sort(function(a,b){return a.name>b.name?-1:1;})
    if (this.path.length > 0) {//non root path add the first '..'
      this.addUpDir()
    }
    //this.wassorted = this.wassorted | sortflag;
    //console.log(this.files);
  }

  addUpDir() {
    this.files.unshift({name: "..", nicesize: "UP-DIR", date: "", available: true}); //up dir item
  }

  sortByName() {
    this.sortByX(this.sorted.byname, function (a, b) {
      return a.name > b.name ? 1 : -1;
    })
  }

  sortBySize() {
    this.sortByX(this.sorted.bysize, function (a, b) {
      return a.size - b.size
    })
  }

  sortByDate() {
    this.sortByX(this.sorted.bydate, function (a, b) {
      return a.date > b.date ? 1 : -1;
    })
  }

  extension(filename) {
    var re = /(?:\.([^.]+))?$/;
    return re.exec(filename)[1];
  }

  sortByExt() {
    this.sortByX(this.sorted.byext, function (a, b) {
      return a.ext > b.ext ? 1 : -1;
    })
  }

  handleError(error) {
    console.log("Filepanel error:", error);
    alert('Sorry. Backend service is not working temporarily. You may browse files from publicly accessible repositories only. If the problem persist, report it to system administrator.'+this.serviceurl+' HTTP status:'+error.statusCode+' '+error.statusText)
  }
  
  //triggered after this object is placed to DOM
  attached() {
    //read the directory infos
    this.pa.getFiles(this.path)
      .then(data => {
          this.populateFiles(data);
        }) /* do not handle error if return message is empty, only log data, for debug purposes */
      .catch(error => {
        //this.handleError(error);
      //handle 403 unauthorized
      if (error.statusCode == 403) {
        //try to login
        this.ea.publish(new HandleLogin(this.panelid));
      } else if (error.statusCode == 502 || error.statusCode == 503) {
        this.handleError(error);
      } else {
        //try empty path
        if (this.path && this.path.length > 0) {
          this.path = "";
          this.pa.getFiles(this.path)
            .then(data => {
                this.populateFiles(data);
            }).catch(error => {
            this.handleError(error);
          });
        }
      }
    });
  }

  //parse .NET encoded Date in JSON
  dateTimeReviver(key, value) {
    var a;
    if (typeof value === 'string') {
      a = /\/Date\(([\d\+]*)\)\//.exec(value);
      if (a) {
        return new Date(parseInt(a[1])).toLocaleDateString(navigator.language ? navigator.language : "en-GB");
      }
    }
    return value;
  }

  //removes last subdirectory
  cdup() {
    this.lastpath = this.path;
    let sepIndex = this.path.lastIndexOf('/');
    this.path = this.path.substring(0, sepIndex);
    if (this.path == "") this.resources = this.baseresources;
  }

  //adds subdirectory to the path
  cddown(subdir) {
    this.lastpath = this.path;
    this.path += '/' + subdir;
    this.resources = [];
  }

  cdroot() {
    this.lastpath = this.path;
    this.path = "";
    this.resources = this.baseresources;
    this.isFiles = true;
    this.isUniprot = false;
    this.isPdb = false;
  }

  //goes to the root
  goroot() {
    this.changefolder("/");
  }


  //change folder, reads the folder content and updates the table structure
  changefolder(folder) {
    if (!this.lock) {
      this.lock = true;
      if (folder) {
        if (folder == '..') this.cdup();
        else if (folder == '/') this.cdroot();
        else this.cddown(folder);
      }
      this.pa.getFiles(this.path)
        .then(data => {
            this.populateFiles(data);
            this.lock = false;
        }).catch(error => {
        if (error.statusCode == 403) {
          this.lock = false;
          this.path = this.lastpath;
          this.ea.publish(new HandleLogin(this.panelid));
        } else {
          console.log('Error');
          console.log(error);
          alert('Sorry, response: ' + error.statusCode + ':' + error.statusText + ' when trying to get: ' + this.serviceurl + this.path);
          this.lock = false;
          this.path = this.lastpath;
        }
      });
    } //else doubleclick when the previous operation didn't finished
  }

  //refresh the file content
  refresh() {
    this.changefolder(); //changefolder with empty folder - just refresh
  }

  //parses response and fills file array with customization (DIRS instead of size number)
  populateFiles(dataresponse) {
    //console.log("filepanel.populateFiles()")
    Vfstorage.setValue("filepanel" + this.panelid, this.path);
    //it is assumed that first element is "." describing the content of current dir
    if (dataresponse.length>0 && dataresponse[0].name === ".") this.currentdir = dataresponse.shift(); 
    else this.currentdir = null;
    //console.log("populateFiles currentdir:",this.currentdir);
    this.files = dataresponse;//JSON.parse(dataresponse);//,this.dateTimeReviver);//populate window list
    this.filescount = this.files.length + this.resources.length;
    let that = this;
    this.files.forEach(function (item, index, arr) {
      if (!arr[index].name && arr[index].alias) {
        arr[index].name = arr[index].alias;
        arr[index].attributes = 16;
        arr[index].date = "";
        arr[index].filetype = 8;
      }
      //console.log(arr[index]);
      arr[index].ext = that.extension(arr[index].name); //may return undefined
      arr[index].nicedate = that.dateTimeReviver(null, arr[index].date);
      if (!arr[index].ext) arr[index].ext = "";
      arr[index].available = !!(arr[index].filetype & 8); //available if the filetype attribute contains flag 8
      if (arr[index].attributes & 16) arr[index].nicesize = "DIR";
      else
      //convert to 4GB or 30MB or 20kB or 100b
        arr[index].nicesize = ~~(arr[index].size / 1000000000) > 0 ? ~~(arr[index].size / 1000000000) + "GB" : (~~(arr[index].size / 1000000) > 0 ? ~~(arr[index].size / 1000000) + "MB" : (~~(arr[index].size / 1000) > 0 ? ~~(arr[index].size / 1000) + "kB" : arr[index].size + " b"));
    });
    if (this.path.length > 0) {//non root path
      this.addUpDir();
    }

  }

  selectFile(file) {
    //console.log("selectFile("+file+") panelid:"+this.panelid);
    if (file.nicesize.endsWith && file.nicesize.endsWith('DIR')) this.changefolder(file.name);
    else {

      //HEAD the file - so it can be obtained - cached by metadata service, fix #45
      //let fileurl = this.serviceurl + this.path + '/' + file.name
      if (this.path) //path exists -standard file 
      this.pa.getFileHead(this.path + '/' + file.name)
        .then(response => {
            //console.log('file head'+fileurl);
            //console.log(response);
            this.ea.publish(new SelectedFile(file, this.panelid));
          }
        ).catch(error => {
        console.log("Error when geting metadata information about file:");
        console.log(error);
      });
      else //path don't exist, probably resource
        this.ea.publish(new SelectedFile(file, this.panelid));       
      //console.log("SelectedFile",file);
      
      //constructs public url
      /*this.pa.getPublicWebDav()
        .then(data => {
            //let mypath2 = JSON.parse(data.response);
            let mypath = data.signed_url;
            mypath += this.path.startsWith('/') ? this.path.slice(1) : this.path;
            file.publicwebdavuri = mypath + "/" + file.name;
            this.ea.publish(new SelectedFile(file, this.panelid));
        });
        */
    }
  }

  selectResource(resource) {
    if (resource.id == "") {
      this.goroot();
      return;
    }
    if (resource.url) {
      console.log("select resource");
      let file = resource;
      //fix: blocked content from http - origin page at https
      if (window.location.protocol == "https:" && file.url.startsWith("http:")) file.url = file.url.replace("http:", "https:");

      file.webdavuri = file.url;
      file.publicwebdavuri = file.url;
      this.ea.publish(new SelectedFile(file, this.panelid));
      return
    }
    this.isPdb = (resource.id == "pdb");
    this.isUniprot = (resource.id == "uniprot");
    this.isFiles = !(this.isPdb || this.isUniprot);
    let that = this;
    //console.log(that);
    if (this.isPdb) this.resources = this.pdbresource.selectResource(resource, that);
    if (this.isUniprot) this.resources = this.uniprotresource.selectResource(resource, that);
    //this.files = [];
    if (!this.isFiles) this.files = [];
    this.filescount = this.files.length + this.resources.length;
  }

  checkResource(resource) {
    //if (resource.id=="") {this.goroot(); return;}
    if (resource.url) {
      console.log("check resource");
      let file = resource;
      //fix: blocked content from http - origin page at https
      if (window.location.protocol == "https:" && file.url.startsWith("http:")) file.url = file.url.replace("http:", "https:");

      file.webdavuri = file.url;
      file.publicwebdavuri = file.url;
      this.ea.publish(new CheckedFile(file, this.panelid));
      return
    }
  }

  appendResources(resources) {
    //append resources to existing array
    this.resources.push(...resources);
    this.filescount = this.files.length + this.resources.length;
  }

//TODO introduce key based navigation - letter will highlight first file beginning on the letter pressed,
// up, down left right keys will move cursor

  keypressed(evt) {
    let key = evt.keyCode;
    console.log("keypressed:" + key);
    if (key === 13) {
      /*may not be updated with input field as debounce has 750 ms this.submit({item:this.value});
       */
      //console.log("keypressed(): submitting()")
      //this.hideSuggestions();
      if (evt.originalTarget) this.submit({item: {Name: evt.originalTarget.value}}) //in Firefox
      else if (evt.target) this.submit({item: {Name: evt.target.value}}) //in IE
      //this.hideSuggestions();
    } else if (key === 27) this.escape();
    return true;
  }
}




