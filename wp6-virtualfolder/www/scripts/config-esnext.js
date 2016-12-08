System.config({
  transpiler: "plugin-babel",
  devConfig: {
    "map": {
      "plugin-babel": "babel:systemjs-plugin-babel@0.0.12"
    }
  },
  paths: {
    "babel:": "scripts/babel/",
    "aurelia-http-client":"scripts/aurelia-http-client.js",
    "acontrol":"src/b2dropcontrol/acontrol.js"
  },
  packageConfigPaths: [
    "babel:@*/*.json",
    "babel:*.json"
  ],
  packages: {
    "src": {
      defaultJSExtensions: true,
      defaultExtension: "js"
    }
  }
});
