import {HttpClient,json} from 'aurelia-fetch-client';
//import {Csrfheaderinterceptor} from '../components/csrfheaderinterceptor';
/* Provides methods to return promise of data from REST Project api*/

export class ProjectApi {
  static inject = [HttpClient];


  constructor(httpclient) {
    this.httpclient=httpclient;
    //needs SSO credentials
    this.metadataapiurl = "/metadataservice";
    this.userinfourl=this.metadataapiurl+"/userinfo";
    this.httpclient.configure(config => {
      config
        .rejectErrorResponses()
        .withBaseUrl('')
        .withDefaults({
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        })
    });
  }

  getUserInfo() {
    console.log("projectapi.getUserInfo:",this.userinfourl)
    return this.httpclient.fetch(this.userinfourl)
        .then(response => response.json())
        .then(data => {
          return data;
        })
        .catch(error => {
          console.log('getUserInfo() returns error:');
          //console.log(error);
          throw error;
          //          alert("Sorry, error:"+error.statusCode+" "+error.message);
        });
    }
}
