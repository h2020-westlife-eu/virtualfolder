import {ProjectApi} from './projectapi';
import {bindable} from 'aurelia-framework'

export class Sharedheader {
  static inject = [ProjectApi];
  @bindable router;

  constructor(projectapi) {
    this.pa = projectapi;
    this.showuserinfo=false;
    this.navs = [{href:"#",title:"home"}]
  }

  bind(){
//    console.log("Sharedheader router navigation",this.router.navigation);
    this.pa.getUserInfo().then(data => {
      console.log(data);
      this.userinfo=data;
      //vagrant user - no link
      if (this.userinfo.username ==='vagrant') {
        this.userinfo.AccountLink="";
        this.userinfo.LogoutLink="/logout";
        }
      //west-life sso user - link to westlife sso page
      else if (this.userinfo.username.endsWith("west-life.eu")) {
        this.userinfo.AccountLink="https://auth.west-life.eu/user/";
        this.userinfo.LogoutLink="/mellon/logout?ReturnTo=/";
      //ARIA user - link to structuralbiology
      }
      else {
        this.userinfo.AccountLink = "https://www.structuralbiology.eu/user";
        this.userinfo.LogoutLink="/logout";
      }
      if (!this.userinfo.name) this.userinfo.name=this.userinfo.username;
      this.pa.userinfo=this.userinfo;
      this.showuserinfo=true;
    })
      .catch(error => {
        console.log("no user info, disable showing it");
        this.showuserinfo=false;
      })
  }
  attached(){
      //console.log("Sharedheader attached router navigation",this.router.navigation);
    //fix bug router.navigation seems not render the menu after attached, 
      this.navs=this.router.navigation.slice();
      //console.log("Sharedheader attached navs",this.navs);
    }
}
