/**
 * Created by Tomas Kulhanek on 10/9/17.
 */


let _singleton = Symbol();

export class RedirectLogin {

  constructor(rurl = "/login?next=" + window.location.pathname) {
    this.redirectUrl = rurl;
  }

  handlelogin(){
    //redirect to another url - presumably with login feature - should redirect back
    window.location = this.redirectUrl;
  }

}

export class ShowLoginButton {

  constructor() {
  }

  handlelogin(){
    //show/hide login/logout button only
    let loginb = document.getElementById("loginbutton");
    let logoutb = document.getElementById("logoutbutton");
    //removes style - by default style=display:none
    loginb.removeAttribute("style");
    loginb.className = "w3-sign";
    logoutb.className = "w3-hide";
  }

}

export class ShowLogoutButton {

  constructor() {
  }

  handlelogin(){
    //show/hide login/logout button only
    let loginb = document.getElementById("loginbutton");
    let logoutb = document.getElementById("logoutbutton");
    //removes style - by default style=display:none
    loginb.removeAttribute("style");
    loginb.className = "w3-hide";
    logoutb.className = "w3-sign";
  }

}


export class HandleLogin {
  contructor(senderid) {
    this.senderid=senderid;
  }
}
