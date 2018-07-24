/**
 * Created by Tomas Kulhanek on 7/21/17.
 */
//import {HttpClient} from 'aurelia-http-client';
import {ProjectApi} from "../components/projectapi";
import {Vfstorage} from '../utils/vfstorage';

/**
 * taskcontrol component gets available tasks and their status (running/not running)
 * may initiate to start/stop them and shows link to them
 */
export class Taskcontrol {
  static inject = [ProjectApi];

  constructor(pa){
    //this.serviceurl = Vfstorage.getBaseUrl()+"/metadataservice/availabletasks";
    //this.userprocessurl = Vfstorage.getBaseUrl()+"/metadataservice/userprocess/";
//    this.client=httpclient;
    this.pa=pa;
    this.tasks = [];
    this.descriptions=[];
    this.descriptions["jupyter"]="Jupyter notebook web application instance";
    this.descriptions["notebook"]="Jupyter notebook web application instance";
    this.descriptions["lab"]="Jupyter lab web application instance";
    this.descriptions["scipion"]="Scipion Cryo-em web application instance";
  }

  attached() {
    //gets the status of the b2drop connection
    this.pa.getTask()
    //this.client.get(this.serviceurl)
      .then(data => {
        if (data) {
          this.tasks = data;
          let that=this;
          this.tasks.forEach(function(task){
            task.Description = that.descriptions[task.Name] || "";
            task.Updating=false;
          })
        }
      });
  }

  starttask(task1) {
    var task = task1;
    task.Updating=true;
    this.updatetask(task).then((msg) => {
      //sleep(2000); //sleep 2 seconds - just that the server has time to reload
      //setTimeout( () => {
          task.Updating = true;
          task.Running = true;
          task.Warning = false;
          task.LocalUrl = msg;
          task.attempt = 1; 
          let timerid = setInterval(this.checkurl,2000,task,this.pa);
          setTimeout(()=> {clearInterval(timerid); if (task.Updating){ task.Updating = false; task.Warning=true;}}, 20000)
      }
      )
    .catch((reason) => {
        task.Updating=false;
        console.log('start failed');
        console.log(reason)
      })
  }
  
  checkurl(task,pa){
    //check only if it is still in updating state
      if (task.Updating) 
      pa.head(task.LocalUrl).then(()=> {task.Updating = false;})
        .catch((reason)=>{
          if (reason.status === 405 ) {
            //HTTP method not allowed, but very probably returned from Jupyter
            task.Updating = false;
          }
          else {
            task.Updating = true;
            console.log('url not yet available after ' + task.attempt + ' attempt:');
            task.attempt++;
          }
        })
    
  
  }

  stoptask(task1){
    var task = task1;
    task.Updating=true;
    this.updatetask(task).then((msg) => {
      //sleep(2000); //sleep 2 seconds - just that the server has time to reload
      setTimeout( () => {
        task.Updating = false;
        task.Running = false;
      }, 2000)
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
        this.pa.stopTask(task.Name)
         //this.client.delete(this.userprocessurl+task.Name)
           .then(data =>{
             resolve('Deleted')
         })
           .catch(error=>{
             reject(error)
           })
      } else {
        this.pa.startTask(task.Name)
         //this.client.post(this.userprocessurl+task.Name)
           .then(data=>{
             resolve(data.LocalUrl)
           }
         )
           .catch(error=>{
             reject(error)
           })
      }
    })
  }

}
