import {HttpClient, json} from 'aurelia-fetch-client';
/* Provides methods to return promise of data from REST Project api*/

export class ProjectApi {
  static inject = [HttpClient];


  constructor(httpclient) {
    this.httpclient = httpclient;
    //needs SSO credentials
    //virtualfolderbaseurl is global variable - if it is defined use it - otherwise "api";
    this.metadataapiurl = virtualfolderbaseurl?virtualfolderbaseurl+"/virtualfolder/api":"api";
    this.userinfourl = this.metadataapiurl + "/userinfo";
    this.fileserviceurl = this.metadataapiurl + "/files";
    this.getpublicwebdavurl = "/api/authproxy/get_signed_url/";
    this.dataseturl = this.metadataapiurl + "/dataset";
    this.taskurl = this.metadataapiurl + "/availabletasks";
    this.userprocessurl = this.metadataapiurl + "/userprocess";
    //this.serviceurl = Vfstorage.getBaseUrl()+"/metadataservice/files";
    this.settingsurl = this.metadataapiurl + "/settings";
    this.providersurl = this.metadataapiurl + "/providers";
    this.httpclient.configure(config => {
      config
        .rejectErrorResponses()
        .withBaseUrl('')
        .withDefaults({
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json'
          }
          //          'X-Requested-With': 'Fetch'
          // }
        })
    });
    this.putHeaders= new Headers();
    this.putHeaders.append('Accept', 'application/json');
    this.putHeaders.append('Content-Type', 'application/json');
    this.emptyHeaders = new Headers();
    //global variables to share
    this.userinfo ={};//no info by default
  }

  //generic methods to fetch, serialize to json and log error
  fetchJsonLog(url) {
    console.log(new Date().toLocaleString()+" Get from url:"+url);
    return this.httpclient.fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(new Date().toLocaleString()+" response from url:"+url);
        return data;
      })
      .catch(error => {
        console.log("fetch on '" + url + "' returns error:", error);
        throw error;
      });
  }

  //generic methods to fetch, (no json serialization) and log error
  fetchTextLog(url) {
    return this.httpclient.fetch(url,{headers:this.emptyHeaders})
      .then(response => response.text())
      .then(data => {
        return data;
      })
      .catch(error => {
        console.log("fetch on '" + url + "' returns error:", error);
        throw error;
      });
  }

  head(url) {
    return this.httpclient.fetch(url,{method:'head'})
      .then(data => {
        return data;
      })
      .catch(error => {
        console.log("head on '" + url + "' returns error:", error);
        throw error;
      });
  }

  deleteJsonLog(url) {
    return this.httpclient.fetch(url, {method: "delete"})
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(error => {
        console.log("delete on '" + url + "' returns error:", error);
        throw error;
      });
  }

  postJsonLogNoBody(url) {
    return this.httpclient.fetch(url, {method: 'post'})
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(error => {
        console.log("post on '" + url + "' returns error:", error);
        throw error;
      });
  }
//text json serialization
  postTextLogNoBody(url) {
    return this.httpclient.fetch(url, {method: 'post'})
      .then(data=> data.text())
      .then(data => {
        return data;
      })
      .catch(error => {
        console.log("post on '" + url + "' returns error:", error);
        throw error;
      });
  }

  postTextLog(url,data) {
    return this.httpclient.fetch(url, {method: 'post', body: data})
      .then(data=> data.text())
      .then(data => {
        return data;
      })
      .catch(error => {
        console.log("post on '" + url + "' returns error:", error);
        throw error;
      });
  }

  postHeaderTextLog(url,header,data) {
    return this.httpclient.fetch(url, {method: 'post', headers: header, body: data})
      .then(data=> data.text())
      .then(data => {
        return data;
      })
      .catch(error => {
        console.log("post on '" + url + "' returns error:", error);
        throw error;
      });
  }

  postHeaderJsonLog(url,header,data) {
    return this.httpclient.fetch(url, {method: 'post', headers: header, body: json(data)})
      .then(data=> data.json())
      .then(data => {
        return data;
      })
      .catch(error => {
        console.log("post on '" + url + "' returns error:", error);
        throw error;
      });
  }

  postJsonLog(url,datatosend) {
    console.log("postjsonlog()",json(datatosend));
    return this.httpclient.fetch(url, {method: 'post', body: json(datatosend)})
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(error => {
        console.log("post on '" + url + "' returns error:", error);
        throw error;
      });
  }

  putJsonLog(url,datatosend){
    console.log("put on '" + url + "' test2");
    return this.httpclient.fetch(url, {method: 'PUT', mode:'cors', body: json(datatosend),credentials:'include',headers:this.putHeaders})
      .then(response => response.json())
      .then(data => {
        //console.log("putjsonlog",data);
        return data;
      })
      .catch(error => {
        console.log("put on '" + url + "' returns error:", error);
        throw error;
      });
  }

  //specific methods to specific urls
  getUserInfo() {
    return this.fetchJsonLog(this.userinfourl);
  }

  getPublicWebDav() {
    return this.fetchJsonLog(this.getpublicwebdavurl);
  }

  getFiles(path = "") {
    return this.fetchJsonLog(this.fileserviceurl + path);
  }

  getProviders() {
    return this.fetchJsonLog(this.providersurl);
  }

  putProvider(settings) {
    return this.putJsonLog(this.fileserviceurl, settings);
  }

  deleteProvider(alias) {
    return this.deleteJsonLog(this.fileserviceurl + "/" + alias);
  }

  getDataset(id) {
    let context = (id === "") ? "" : "/" + id; //prexif slash before id
    return this.fetchJsonLog(this.dataseturl + context);
  }

  getDatasetByName(name) {
    let context = "/name/" + name; //prexif slash before id
    return this.fetchJsonLog(this.dataseturl + context);
  }

  addDataset(id, dataset) {
    if (id > 0)
      return this.putJsonLog(this.dataseturl + "/" + id, dataset);
    else
      return this.postJsonLog(this.dataseturl, dataset)
  }

  getExportedSettings(publickey, selectedaliases) {
//use public key and selectedaliases to construct request with params
    let queryurl = new URL(this.settingsurl,window.location.href);
    let params = {PublicKey: publickey, SelectedAliases: selectedaliases};
    Object.keys(params).forEach(key => queryurl.searchParams.append(key, params[key]));
//now request client
    return this.fetchTextLog(queryurl);
//create selectedaliases
  }

  //    this.client.post(this.localsettingservice)

  getPublicKey() {
    return this.postTextLogNoBody(this.settingsurl);
  }

  //json is made here
  putSettings(importmessage) {
    return this.putJsonLog(this.settingsurl,importmessage);
  }


  getTask() {
    return this.fetchJsonLog(this.taskurl);
  }

  stopTask(taskName) {
    return this.deleteJsonLog(this.userprocessurl + "/" + taskName);
  }

  //this.client.delete(this.userprocessurl+task.Name)

  startTask(taskName) {
    return this.postJsonLogNoBody(this.userprocessurl + "/" + taskName);
  }

  getFileHead(filepath) {
    return filepath.startsWith("/")?this.head(this.fileserviceurl+filepath):this.head(this.fileserviceurl+"/"+filepath);
  }
}
