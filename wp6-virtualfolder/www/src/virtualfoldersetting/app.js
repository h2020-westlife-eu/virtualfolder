
export class App {
  constructor(){
    let location = window.location.protocol;
    this.islocalhost= location.startsWith('http:');
    // wait for assignement this.genericcontrol from children

  }

}
