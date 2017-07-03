/**
 * Created by vagrant on 6/30/17.
 */

export class Vfstorage{

  constructor() {}

  /**check existence of localstorage property, if undefined set to the value
   *
   * @param propertyName
   * @param defaultvalue
   * @returns {string}
   */
  static checkDefault(propertyName,defaultvalue){
    return (typeof(Storage) !== "undefined")?
      (localStorage.getItem(propertyName)!=="undefined")? this.getValue(propertyName): this.setValue(propertyName,defaultvalue)
      :defaultvalue;
  }

  /**gets value, if storage is not supported by browser then default value string "true"
   *
   * @param propertyName
   * @param defaultvalue
   * @returns {string}
   */
  static getValue(propertyName,defaultvalue="true"){
    return (typeof(Storage) !== "undefined") ? localStorage.getItem(propertyName): defaultvalue;
  }

  /** sets value to the property into localStorage,
   * if not supported by browser, does nothing
   *
   * @param propertyName
   * @param value
   * @returns {*}
   */
  static setValue(propertyName,value){
    return (typeof(Storage) !== "undefined") ? localStorage.setItem(propertyName,value):value;
  }

  /**returns base url set in global variable virtualfolderbaseurl e.g. 'https://portal.west-life.eu'
   *
   * @returns {string}
   */

  static getBaseUrl(){
    console.log("vfstorage.getbaseurl");
    console.log(virtualfolderbaseurl);
    return virtualfolderbaseurl ? virtualfolderbaseurl:"";
  }

  static parseQueryString(str) {
    var ret = Object.create(null);

    if (typeof str !== 'string') {
      return ret;
    }

    str = str.trim().replace(/^(\?|#|&)/, '');

    if (!str) {
      return ret;
    }

    str.split('&').forEach(function (param) {
      var parts = param.replace(/\+/g, ' ').split('=');
      // Firefox (pre 40) decodes `%3D` to `=`
      // https://github.com/sindresorhus/query-string/pull/37
      var key = parts.shift();
      var val = parts.length > 0 ? parts.join('=') : undefined;

      key = decodeURIComponent(key);

      // missing `=` should be `null`:
      // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
      val = val === undefined ? null : decodeURIComponent(val);

      if (ret[key] === undefined) {
        ret[key] = val;
      } else if (Array.isArray(ret[key])) {
        ret[key].push(val);
      } else {
        ret[key] = [ret[key], val];
      }
    });

    return ret;
  }
}
