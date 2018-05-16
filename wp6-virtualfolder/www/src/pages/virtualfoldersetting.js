export class Virtualfoldersetting {
constructor(){
  let location = window.location.protocol;
  this.islocalhost= location.startsWith('http:');
  console.log("Virtualfoldersetting() location", location,"islocalhost",this.islocalhost);
}
}
