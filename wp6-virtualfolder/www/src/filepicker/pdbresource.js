/**
 * Created by Tomas Kulhanek on 9/13/17.
 */

//import {HttpClient} from 'aurelia-http-client';
import {HttpClient} from 'aurelia-fetch-client'; //fetch

export class Pdbresource {
  static inject = [HttpClient];

  constructor(httpclient) {
    this.client=httpclient;
    this.requesturlpdbid="//www.ebi.ac.uk/pdbe/search/pdb/select?rows=100&wt=json&sort=pdb_id+desc&q=pdb_id:";
    this.requesturlnums="//www.ebi.ac.uk/pdbe/search/pdb/select?rows=0&wt=json&sort=pdb_id+desc&q=pdb_id:";
    this.requesturlfiles="//www.ebi.ac.uk/pdbe/api/pdb/entry/files/";
  }

  static cdup(resource) {
    //12* -> 1*
    let myresource = {};
    myresource.name= resource.link.endsWith("*")? resource.link.slice(0,-2)+"*":resource.link.slice(0,-1)+"*";
    myresource.id = resource.id;
    myresource.link= myresource.name.slice(0,-2)+"*";
    return myresource;
  }

  //distinguishes what to do
  selectResource(resource,callback){
    console.log("selectResource .. :");
    console.log(resource);

    if (resource.name=="..") {
      console.log("selectResource .. :");
      console.log(resource);
      //go up one level
      return this.populateResource(Pdbresource.cdup(resource),callback);
      /*if (resource.link.endsWith("*"))
        return this.populateResource({name:resource.link,link:resource.link.slice(0,-2)+"*",id:resource.id})

      else if (resource.link=="PDB" || resource.link=="")
        return this.populateResource({name:resource.link,link:resource.link.slice(0,-1)+"*", id:resource.id})*/
    } else
      return this.populateResource(resource,callback)
  }

//populates level of virtual folders
  populateResource(resource,callback) {
    //console.log("populateResource():");
    //console.log(resource);
    //console.log(this)
    let resources = [];
    let that = this;


    function push1_9() {
      resources.push({name: "..", info: "UP-DIR", id: ""});
      for (var i = 1; i < 10; i++) {
        resources.push({name: i + "*", info: "pdb entries begining with '" + i + "'", id: resource.id});
      }
    }

    function push0_9a_z(prefix) {
      {
        resources.push({name: "..", info: "UP-DIR", id: resource.id,link:resource.name});

        //let queryurl = that.requesturlpdbid+resource.name;

        for (let i = 0; i <= 9; i++){

          that.client.fetch(that.requesturlnums+ prefix + i + "*")
            .then(response => response.json())
            .then(data => {
              //console.log(data)
              let resources2 = [];
              if (data.response && data.response.numFound) {
                resources2.push({name:data.responseHeader.params.q.slice(7),info:"("+data.response.numFound+")",id:resource.id})
              }
              //do callback
              callback.appendResources(resources2);
            });
        }
          //resources.push({name: prefix + i + "*", info: "", id: resource.id})
        for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {

          that.client.fetch(that.requesturlnums+ prefix + String.fromCharCode(i) + "*")
            .then(response => response.json())
            .then(data => {
              //console.log(data)
              let resources2 = [];
              if (data.response && data.response.numFound>0) {
                resources2.push({name:data.responseHeader.params.q.slice(7),info:"("+data.response.numFound+")",id:resource.id})
              }
              //do callback
              callback.appendResources(resources2);
            });
        }
      }
    }

    function check0_9a_z(prefix) {
      {
        console.log("check0_9a_z");
        resources.push({name: "..", info: "UP-DIR", id: resource.id,link:resource.name});
        let queryurl = that.requesturlpdbid+resource.name;
        that.client.fetch(queryurl)
          .then(response => response.json())
          .then(data => {
              //console.log(data)
              let resources2 = [];
              if (data.response && data.response.docs) {

                  for (let item of data.response.docs) {
                    item.id=resource.id;item.name= item.pdb_id; item.info = item.title;resources2.push(item);
                  }
              }
              //do callback
              callback.appendResources(resources2);
            });

      }
    }



    function getlisttodownload(pdbid){
      console.log("getlisttodownload");
      resources.push({name: "..", info: "UP-DIR", id: resource.id,link:resource.name});
      let queryurl = that.requesturlfiles+pdbid;

      that.client.fetch(queryurl)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          let resources2 = [];
          Object.keys(data).forEach(key =>{ //traverse via pdb name e.g. "2hhd"
            Object.keys(data[key]).forEach(key2 => { // traverse via "PDB","assembly","validation","SIFTS","molecule"
              for (let item of data[key][key2].downloads) {
                item.id = resource.id;
                item.name = item.url.substr(item.url.lastIndexOf("/")+1);
                item.info = key2+":"+item.label;
                resources2.push(item);
              }
            })
          });
          //loopNestedObj(data);
          callback.appendResources(resources2);
        });
    }

    if (resource.name == "" || resource.name == "PDB" || resource.name=="*") push1_9();

    else if (resource.name.endsWith("*")) {
      if (resource.name.length<4) push0_9a_z(resource.name.slice(0, -1));
      else check0_9a_z(resource.name.slice(0, -10))
    } else getlisttodownload(resource.name);
    //console.log(resources[1].name);
    return resources;
  }
}
