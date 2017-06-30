/**
 * Created by vagrant on 6/30/17.
 */

export class Vfstorage{

  constructor() {}

  //check existence of localstorage property, if undefined set to the value
  static checkDefault(propertyName,defaultvalue){
    return (typeof(Storage) !== "undefined")?
      (localStorage.getItem(propertyName)!=="undefined")? this.getValue(propertyName): this.setValue(propertyName,defaultvalue)
      :defaultvalue;
  }

  //gets value, if storage is not supported by browser then default value string "true"
  static getValue(propertyName,defaultvalue="true"){
    return (typeof(Storage) !== "undefined") ? localStorage.getItem(propertyName): defaultvalue;
  }

  //sets value, if storage is not supported by browser then returns value
  static setValue(propertyName,value){
    return (typeof(Storage) !== "undefined") ? localStorage.setItem(propertyName,value):value;
  }
}
