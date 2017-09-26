/**
 * Created by Tomas Kulhanek on 7/21/17.
 */
import {HttpClient} from 'aurelia-http-client';

import {Vfstorage} from '../utils/vfstorage';

/**
 * taskcontrol component gets available tasks and their status (running/not running)
 * may initiate to start/stop them and shows link to them
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
        if (data.response) {
          this.tasks = JSON.parse(data.response);
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
      sleep(2000); //sleep 2 seconds - just that the server has time to reload
      task.Updating=false;
      task.Running=true;
      task.LocalUrl=msg;
      console.log("task.LocalUrl:"+task.LocalUrl);
    })
      .catch((reason) => {
        task.Updating=false;
        console.log('start failed');
        console.log(reason)
      })
  }

  stoptask(task){
    task.Updating=true;
    let that=this;
    this.updatetask(task).then((msg) => {setTimeout(
      function(task) {
        task.Updating=false;
        task.Running=false;
    }, 2000
    )
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
             resolve('Deleted')
         })
           .catch(error=>{
             reject(error)
           })
      } else {
         this.client.post(this.userprocessurl+task.Name)
           .then(data=>{
             let updatedtask=JSON.parse(data.response);
             resolve(updatedtask.LocalUrl)
           }
         )
           .catch(error=>{
             reject(error)
           })
      }
    })
  }

}
