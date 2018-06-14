import {ProjectApi} from './projectapi';
import {bindable} from 'aurelia-framework'

export class Sharedheader {
  static inject = [ProjectApi];
  @bindable router;

  constructor(projectapi) {
    this.pa = projectapi;
    this.showuserinfo=false;
  }

  attached(){
    console.log("Sharedheader",this.router);
    this.pa.getUserInfo().then(data => {
      //console.log(data);
      this.userinfo=data;
      //vagrant user - no link
      if (this.userinfo.username ==='vagrant') this.userinfo.AccountLink="";
      //west-life sso user - link to westlife sso page
      else if (this.userinfo.username.endsWith("west-life.eu")) this.userinfo.AccountLink="https://auth.west-life.eu/user/"
      //ARIA user - link to structuralbiology
      else this.userinfo.AccountLink = "https://www.structuralbiology.eu/user";
      this.userinfo.LogoutLink="/logout";
      if (!this.userinfo.name) this.userinfo.name=this.userinfo.username;
      this.showuserinfo=true;
    })
      .catch(error => {
        console.log("no user info, disable showing it");
        this.showuserinfo=false;
      })
  }
}
