import {ProjectApi} from './projectapi';

export class Userinfo {
  static inject = [ProjectApi];

  constructor(projectapi) {
    this.pa = projectapi;
    this.showuserinfo=false;
  }

  attached(){
    this.pa.getUserInfo().then(data => {
        console.log(data);
        this.userinfo=data;
        this.showuserinfo=true;
      })
      .catch(error => {
        console.log("no user info, disable showing it");
        this.showuserinfo=false;
      })
  }
}
