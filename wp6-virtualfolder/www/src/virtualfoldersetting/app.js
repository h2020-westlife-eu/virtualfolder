export class App {
  constructor() {
    this.showprovider = false;
  }

  newProvider(){
    this.showprovider = true;
  }

  addProvider(){
    console.log('addProvider: not yet implemented');
    this.showprovider = false;
  }
}
