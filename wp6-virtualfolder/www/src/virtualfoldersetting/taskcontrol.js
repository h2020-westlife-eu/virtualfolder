/**
 * Created by Tomas Kulhanek on 7/21/17.
 */
import {HttpClient} from 'aurelia-http-client';
//import {EventAggregator} from 'aurelia-event-aggregator';
//import {SettingsSubmitted} from './messages';
import {Vfstorage} from '../utils/vfstorage';

//let client = new HttpClient();

/**
 * Aliastable component gets the currently registered aliases for file providers
 * and shows them in a table, allows delete the alias or initiate dialog to create one.
 */
export class Taskcontrol {
  static inject = [HttpClient];

  constructor(httpclient){
    this.serviceurl = Vfstorage.getBaseUrl()+"/metadataservice/availabletasks";
    this.userprocessurl = Vfstorage.getBaseUrl()+"/metadataservice/userprocess/";
    this.client=httpclient;
    this.tasks = [];
    this.client.configure(config=> {
      config.withHeader('Accept', 'application/json');
      config.withHeader('Content-Type', 'application/json');
    });
    this.descriptions=[];
    this.descriptions["jupyter"]="Jupyter notebook web application instance";
    this.descriptions["scipion"]="Scipion Cryo-em web application instance";
  }

  attached() {
    //gets the status of the b2drop connection
    this.client.get(this.serviceurl)
      .then(data => {
        console.log("data response");
        console.log(data);
        if (data.response) {
          this.tasks = JSON.parse(data.response);
          console.log(this.tasks);
          let that=this;
          this.tasks.forEach(function(task){
            task.Description = that.descriptions[task.Name] || "";
            task.Updating=false;

          })
        }
      })
      .catch(error =>{
        console.log("taskcontrol.attached() error:")
        console.log(error);
      });
  }

  starttask(task) {
    task.Updating=true;
    this.updatetask(task).then((msg) => {
      task.Updating=false;
      task.Running=true;
    })
      .catch((reason) => {
        task.Updating=false;
        console.log('start failed');
        console.log(reason)
      })
  }

  stoptask(task){
    task.Updating=true;
    this.updatetask(task).then((msg) => {
      task.Updating=false;
      task.Running=false;
    })
      .catch((reason) => {
        task.Updating=false;
        console.log('stop failed');
        console.log(reason)
      })
  }

  updatetask(task){
    return new Promise((resolve, reject) => {
      if (task.Running) {//will try to stop
         this.client.delete(this.userprocessurl+task.Name)
           .then(data =>{
             resolve('Done')
         })
           .catch(error=>{
             reject(error)
           })
      } else {
         this.client.post(this.userprocessurl+task.Name)
           .then(data=>{
            resolve('Done')
           }
         )
           .catch(error=>{
             reject(error)
           })
      }
      //setTimeout(() => resolve('Done'), timeout)
    })
  }

}
