define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function App() {
    _classCallCheck(this, App);

    this.message = 'Hello World!';
  };
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    longStackTraces: _environment2.default.debug,
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('b2dropcontrol/acontrol',["exports", "aurelia-http-client"], function (exports, _aureliaHttpClient) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.AControl = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var client = new _aureliaHttpClient.HttpClient();

    var AControl = exports.AControl = function () {
        function AControl() {
            _classCallCheck(this, AControl);

            this.heading = "connector";
            this.username = "";
            this.usertoken = "";
            this.status = "unknown";
            this.dialogstate = 1;
            this.dialogstateconnected, this.dialogstateconnecting = false;
            this.dialogstateentry = true;
            this.servicecontext = "";
            this.showbutton = false;
            client.configure(function (config) {
                config.withHeader('Accept', 'application/json');
                config.withHeader('Content-Type', 'application/json');
            });
        }

        AControl.prototype.updatestate = function updatestate(state) {
            this.dialogstate = state;
            this.dialogstateconnected = state == 3;
            this.dialogstateconnecting = state == 2;
            this.dialogstateentry = state == 1;
        };

        AControl.prototype.attached = function attached() {
            var _this = this;

            console.log("Acontrol.attached()");
            console.log("dialogstate:" + this.dialogstate);

            client.get("/metadataservice/" + this.servicecontext).then(function (data) {
                _this.status = "disconnected";
                _this.updatestate(1);

                if (data.response) {
                    var myresponse = JSON.parse(data.response);
                    if (myresponse.connected) {
                        _this.status = "OK";
                        _this.updatestate(3);
                    }
                }
            });
        };

        AControl.prototype.reconnect = function reconnect() {
            this.updatestate(1);
        };

        AControl.prototype.addservice = function addservice(servicename) {
            this.updatestate(2);
            var postdata = { username: this.username, securetoken: this.usertoken };

            var postdatajson = JSON.stringify(postdata);


            client.post("/metadataservice/" + servicename, postdatajson).then(function (data) {
                var myresponse = JSON.parse(data.response);
                if (myresponse.connected) {
                    okcallback();
                } else {
                    failcallback(myresponse);
                }
            });
        };

        AControl.prototype.failcallback = function failcallback() {
            console.log('acontrol.okcallback() should be overridden');
        };

        AControl.prototype.okcallback = function okcallback() {
            console.log('acontrol.okcallback() should be overridden');
        };

        AControl.prototype.parseQueryString = function parseQueryString(str) {
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

                var key = parts.shift();
                var val = parts.length > 0 ? parts.join('=') : undefined;

                key = decodeURIComponent(key);

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
        };

        return AControl;
    }();
});
define('b2dropcontrol/app',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function App() {
    _classCallCheck(this, App);
  };
});
define('b2dropcontrol/b2dropcontrol',['exports', 'aurelia-http-client', './acontrol'], function (exports, _aureliaHttpClient, _acontrol) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.B2dropcontrol = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var client = new _aureliaHttpClient.HttpClient();

    var B2dropcontrol = exports.B2dropcontrol = function (_AControl) {
        _inherits(B2dropcontrol, _AControl);

        function B2dropcontrol() {
            _classCallCheck(this, B2dropcontrol);

            var _this = _possibleConstructorReturn(this, _AControl.call(this));

            _this.heading = "B2DROP connector";
            _this.servicecontext = "b2dropconnector";
            return _this;
        }

        B2dropcontrol.prototype.failcallback = function failcallback(myresponse) {
            this.updatestate(1);
            this.status = "fail:";
            if (myresponse.output) {
                this.status += myresponse.output;
            }
        };

        B2dropcontrol.prototype.okcallback = function okcallback() {
            this.status = "OK";
            this.updatestate(3);
        };

        return B2dropcontrol;
    }(_acontrol.AControl);
});
define('b2dropcontrol/dropboxcontrol',["exports", "./acontrol"], function (exports, _acontrol) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Dropboxcontrol = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var Dropboxcontrol = exports.Dropboxcontrol = function (_AControl) {
        _inherits(Dropboxcontrol, _AControl);

        function Dropboxcontrol() {
            _classCallCheck(this, Dropboxcontrol);

            var _this = _possibleConstructorReturn(this, _AControl.call(this));

            _this.heading = "DROPBOX connector";
            _this.CLIENTID = "x5tdu20lllmr0nv";
            _this.showdropboxbutton = false;
            _this.servicecontext = "dropboxconnector";
            _this.dropBoxAuthUrl = "";
            return _this;
        }

        Dropboxcontrol.prototype.attached = function attached() {
            console.log('dropbox');
            console.log(Dropbox);
            if (this.isAuthenticated()) {
                this.showdropboxbutton = false;
                this.usertoken = this.getAccessTokenFromUrl();
                this.addservice('dropboxconnector');
            } else {
                console.log("dropboxcontrol.attached()");
                console.log(this.dialogstateentry);
                console.log(this.dialogstate);
                console.log(this.CLIENTID);
                this.showdropboxbutton = true;
                console.log(this.showdropboxbutton);

                var dbx = new Dropbox({ clientId: this.CLIENTID });
                console.log(dbx);
                var currentUrl = window.location.href;
                console.log('current url:' + currentUrl);
                this.dropBoxAuthUrl = dbx.getAuthenticationUrl(currentUrl);
                console.log(this.dropBoxAuthUrl);
            }
            _AControl.prototype.attached.call(this);
        };

        Dropboxcontrol.prototype.failcallback = function failcallback(myresponse) {
            this.updatedropboxstate(1);
            this.status = "fail:";
            if (myresponse.output) {
                this.status += myresponse.output;
            }
        };

        Dropboxcontrol.prototype.okcallback = function okcallback() {
            this.status = "OK";
            this.updatestate(3);
        };

        Dropboxcontrol.prototype.getAccessTokenFromUrl = function getAccessTokenFromUrl() {
            return this.parseQueryString(window.location.hash).access_token;
        };

        Dropboxcontrol.prototype.isAuthenticated = function isAuthenticated() {
            return !!this.getAccessTokenFromUrl();
        };

        return Dropboxcontrol;
    }(_acontrol.AControl);
});
define('b2dropcontrol/environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: false
  };
});
define('b2dropcontrol/main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.basicConfiguration();

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('b2dropcontrol/onedrivecontrol',['exports', 'aurelia-http-client', './acontrol'], function (exports, _aureliaHttpClient, _acontrol) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Onedrivecontrol = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var client = new _aureliaHttpClient.HttpClient();

  var Onedrivecontrol = exports.Onedrivecontrol = function (_AControl) {
    _inherits(Onedrivecontrol, _AControl);

    function Onedrivecontrol() {
      _classCallCheck(this, Onedrivecontrol);

      var _this = _possibleConstructorReturn(this, _AControl.call(this));

      _this.heading = "ONEDRIVE connector";
      _this.clientid = "xUfizTokQv6mAiZ9sgzQnm0";
      _this.servicecontext = "onedriveconnector";
      return _this;
    }

    return Onedrivecontrol;
  }(_acontrol.AControl);
});
define('filemanager/actions',['exports', 'aurelia-http-client'], function (exports, _aureliaHttpClient) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Actions = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var client = new _aureliaHttpClient.HttpClient();

    var Actions = exports.Actions = function () {
        function Actions() {
            _classCallCheck(this, Actions);

            client.configure(function (config) {
                config.withHeader('Accept', 'application/json');
                config.withHeader('Content-Type', 'application/json');
            });
        }

        Actions.prototype.attached = function attached() {};

        Actions.prototype.help = function help() {};

        Actions.prototype.menu = function menu() {};

        Actions.prototype.view = function view() {};

        Actions.prototype.edit = function edit() {};

        return Actions;
    }();
});
define('filemanager/app',["exports", "aurelia-http-client"], function (exports, _aureliaHttpClient) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.App = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var App = exports.App = function () {
        function App() {
            _classCallCheck(this, App);

            this.heading = "File manager";
            this.viewpanel1 = false;
            this.viewpanel2 = false;
            this.showhelp = false;
            this.fileurl = "test1";
            this.myKeypressCallback = this.keypressInput.bind(this);
        }

        App.prototype.activate = function activate() {
            window.addEventListener('keypress', this.myKeypressCallback, false);
        };

        App.prototype.deactivate = function deactivate() {
            window.removeEventListener('keypress', this.myKeypressCallback);
        };

        App.prototype.keypressInput = function keypressInput(e) {
            console.log('keypressed');
            if (e.key == 'F1') this.help();
            console.log(e);
        };

        App.prototype.doAction = function doAction(fileitem, panelid) {
            this.fileurl = fileitem.webdavuri;
            console.log('app.doaction()');
            console.log(this.fileurl);
            if (panelid == "filepanel1") {
                this.viewpanel2 = true;
                if (this.childview2) this.childview2.viewfile(fileitem.webdavuri);
            } else {
                this.viewpanel1 = true;
                if (this.childview) this.childview.viewfile(fileitem.webdavuri);
            }
        };

        App.prototype.close1 = function close1() {
            this.viewpanel1 = false;
        };

        App.prototype.close2 = function close2() {
            this.viewpanel2 = false;
        };

        App.prototype.help = function help() {
            this.showhelp = !this.showhelp;
        };

        return App;
    }();
});
define('filemanager/environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: false
  };
});
define('filemanager/filepanel',['exports', 'aurelia-http-client', 'aurelia-framework'], function (exports, _aureliaHttpClient, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FilepanelCustomElement = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var client = new _aureliaHttpClient.HttpClient();

    var FilepanelCustomElement = exports.FilepanelCustomElement = (0, _aureliaFramework.decorators)((0, _aureliaFramework.bindable)({ name: 'tableid', defaultBindingMode: _aureliaFramework.bindingMode.oneTime }), (0, _aureliaFramework.bindable)('allowDestruction')).on(function () {
        function _class() {
            _classCallCheck(this, _class);

            this.files = [];
            this.filescount = this.files.length;
            this.path = "";
            this.dynatable = {};
            this.serviceurl = "/metadataservice/files";

            client.configure(function (config) {
                config.withHeader('Accept', 'application/json');
                config.withHeader('Content-Type', 'application/json');
            });
        }

        _class.prototype.created = function created(owningView, myview) {
            this.parent = owningView;
        };

        _class.prototype.attached = function attached() {
            var _this = this;

            client.get(this.serviceurl).then(function (data) {
                if (data.response) {
                    (function () {
                        _this.populateFiles(data.response);

                        _this.dynatable = $('#' + _this.tableid).dynatable({
                            dataset: {
                                records: _this.files
                            },
                            features: {
                                paginate: false,
                                search: false,
                                recordCount: false,
                                perPageSelect: false,
                                pushState: false

                            }
                        });

                        var a = _this;
                        var b = _this.parent.controller.viewModel;

                        _this.dynatable.on('click', 'tr', function () {
                            if (this.children[1].innerText.endsWith('DIR')) a.changefolder(this.firstChild.innerText);else {
                                var fileitem = this.firstChild.innerText;
                                var fileindex = a.files.map(function (e) {
                                    return e.name;
                                }).indexOf(fileitem);
                                console.log('fileitem');
                                console.log(fileitem);
                                console.log(fileindex);
                                b.doAction(a.files[fileindex], a.tableid);
                            }
                        });
                    })();
                }
            }).catch(function (error) {

                console.log('Error');
                console.log(error);
                _this.status = "unavailable";
                _this.showdialog = false;
                alert('Sorry, response: ' + error.statusCode + ':' + error.statusText + ' when trying to get: ' + _this.serviceurl);
            });
        };

        _class.prototype.dateTimeReviver = function dateTimeReviver(key, value) {
            var a;
            if (typeof value === 'string') {
                a = /\/Date\(([\d\+]*)\)\//.exec(value);
                if (a) {
                    return new Date(parseInt(a[1])).toLocaleDateString('en-GB');
                }
            }
            return value;
        };

        _class.prototype.cdup = function cdup() {
            var sepIndex = this.path.lastIndexOf('/');
            this.path = this.path.substring(0, sepIndex);
        };

        _class.prototype.cddown = function cddown(subdir) {
            this.path += '/' + subdir;
        };

        _class.prototype.changefolder = function changefolder(folder) {
            var _this2 = this;

            if (!this.lock) {
                this.lock = true;
                if (folder) {
                    if (folder == '..') this.cdup();else this.cddown(folder);
                }

                client.get(this.serviceurl + this.path).then(function (data) {
                    if (data.response) {
                        _this2.populateFiles(data.response);

                        var d = _this2.dynatable.data('dynatable');
                        d.settings.dataset.originalRecords = _this2.files;
                        d.process();
                        var a = _this2;
                    }
                    _this2.lock = false;
                }).catch(function (error) {
                    console.log('Error');
                    console.log(error);
                    alert('Sorry, response: ' + error.statusCode + ':' + error.statusText + ' when trying to get: ' + _this2.serviceurl + _this2.path);
                    _this2.lock = false;
                });
            }
        };

        _class.prototype.refresh = function refresh() {
            this.changefolder();
        };

        _class.prototype.populateFiles = function populateFiles(dataresponse) {
            this.files = JSON.parse(dataresponse, this.dateTimeReviver);
            this.filescount = this.files.length;
            if (this.path.length > 0) {
                this.files.unshift({ name: "..", size: "UP DIR", date: "" });
            }
            this.files.forEach(function (item, index, arr) {
                if (!arr[index].name && arr[index].alias) {
                    arr[index].name = arr[index].alias;
                    arr[index].attributes = 16;
                    arr[index].date = "";
                }
                if (arr[index].attributes & 16) arr[index].size = "DIR";
            });
            console.log(this.files);
        };

        _class.prototype.doAction = function doAction(fileitem) {
            this.parent.doAction(fileitem);
        };

        return _class;
    }());
});
define('filemanager/filesettings',['exports', 'aurelia-http-client', 'aurelia-framework'], function (exports, _aureliaHttpClient, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FileSettings = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var FileSettings = exports.FileSettings = function FileSettings() {
        _classCallCheck(this, FileSettings);

        this.heading = "File View";
    };
});
define('filemanager/main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.standardConfiguration();

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('filemanager/viewpanel',['exports', 'aurelia-http-client'], function (exports, _aureliaHttpClient) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Viewpanel = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var client = new _aureliaHttpClient.HttpClient();

    var Viewpanel = exports.Viewpanel = function () {
        function Viewpanel() {
            _classCallCheck(this, Viewpanel);

            this.fileurl = "";
        }

        Viewpanel.prototype.attached = function attached() {
            console.log('viewpanel.attached()');

            if (this.bindingContext.viewpanel2) {
                this.bindingContext.childview2 = this;
                this.viewerdom = $('.fileviewer')[0];
            }
            if (this.bindingContext.viewpanel1) {
                this.bindingContext.childview = this;
                this.viewerdom = $(".fileviewer")[0];
            }
            if (this.bindingContext.fileurl) this.fileurl = this.bindingContext.fileurl;

            var options = {
                width: 'auto',
                height: 'auto',
                antialias: true,
                quality: 'medium'
            };

            console.log(this);
            console.log(this.viewer);
            if (!this.viewer) this.viewer = pv.Viewer(this.viewerdom, options);
            if (this.fileurl) this.viewfile();
        };

        Viewpanel.prototype.bind = function bind(bindingContext, overrideContext) {
            console.log("bind(). fileurl:");
            console.log(this.fileurl);
            console.log(this.viewid);
            console.log(bindingContext);
            console.log(overrideContext);
            this.bindingContext = bindingContext;
        };

        Viewpanel.prototype.viewfile = function viewfile(fileurl) {
            if (fileurl) this.fileurl = fileurl;
            console.log("viewFile(). fileurl:");
            console.log(this.fileurl);
            if (this.fileurl && this.fileurl.endsWith('pdb')) {
                this.loadfromurl(this.fileurl);
            }
        };

        Viewpanel.prototype.created = function created(owningView, myview) {
            this.parent = owningView;
        };

        Viewpanel.prototype.process = function process(pdb) {

            var structure = pv.io.pdb(pdb);
            this.viewer.cartoon('protein', structure, { color: color.ssSuccession() });
            this.viewer.centerOn(structure);
        };

        Viewpanel.prototype.loadlocalpdbfile = function loadlocalpdbfile() {};

        Viewpanel.prototype.loadpdbfile = function loadpdbfile() {
            var url = 'http://files.rcsb.org/view/' + this.pdbentry + '.pdb';

            this.loadfromurl(url);
        };

        Viewpanel.prototype.loadfromurl = function loadfromurl(url) {
            var _this = this;

            client.get(url).then(function (data) {
                _this.process(data.response);
            }).catch(function (error) {
                console.log(error);
                alert('Sorry, response: ' + error.statusCode + ':' + error.statusText + ' when trying to get: ' + url);
            });
        };

        Viewpanel.prototype.loadfromredo = function loadfromredo() {
            this.loadfromurl('http://www.cmbi.ru.nl/pdb_redo/' + this.pdbentry2.substring(1, 3) + '/' + this.pdbentry2 + '/' + this.pdbentry2 + '_final.pdb');
        };

        return Viewpanel;
    }();
});
define('filemanager2/app',['exports', 'aurelia-event-aggregator', '../filepicker/messages'], function (exports, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class, _temp;

  var App = exports.App = (_temp = _class = function () {
    function App(ea) {
      var _this = this;

      _classCallCheck(this, App);

      this.ea = ea;
      this.ea.subscribe(_messages.SelectedFile, function (msg) {
        return _this.selectFile(msg.file, msg.senderid);
      });
      this.showpanels = true;
    }

    App.prototype.selectFile = function selectFile(file, senderid) {
      console.log("selectFile()");
      console.log(file);
      console.log(senderid);
      this.showpanels = false;
    };

    App.prototype.closeviewer = function closeviewer() {
      this.showpanels = true;
    };

    return App;
  }(), _class.inject = [_aureliaEventAggregator.EventAggregator], _temp);
});
define('filemanager2/environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: false
  };
});
define('filemanager2/main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    longStackTraces: _environment2.default.debug,
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('filemanager2/viewpanel',['exports', 'aurelia-event-aggregator', '../filepicker/messages', 'aurelia-http-client'], function (exports, _aureliaEventAggregator, _messages, _aureliaHttpClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Viewpanel = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class, _temp;

  var Viewpanel = exports.Viewpanel = (_temp = _class = function () {
    function Viewpanel(ea, httpclient) {
      var _this = this;

      _classCallCheck(this, Viewpanel);

      this.ea = ea;
      this.httpclient = httpclient;
      this.ea.subscribe(_messages.SelectedFile, function (msg) {
        return _this.viewfile(msg.file);
      });
    }

    Viewpanel.prototype.attached = function attached() {
      console.log('viewpanel.attached()');
      this.viewerdom = $(".fileviewer")[0];
      console.log(this.viewerdom);
      var options = {
        width: '1200',
        height: '600',
        antialias: true,
        quality: 'medium'
      };

      console.log(this);
      console.log(this.viewer);
      if (!this.viewer) this.viewer = pv.Viewer(this.viewerdom, options);
    };

    Viewpanel.prototype.viewfile = function viewfile(file) {
      if (file.webdavuri.endsWith('pdb')) {
        this.fileurl = file.webdavuri;
        console.log("viewfile()");
        console.log(file.webdavuri);
        this.loadfromurl(file.webdavuri);
      } else console.log("viewfile() not pdb file");
    };

    Viewpanel.prototype.process = function process(pdb) {
      var structure = pv.io.pdb(pdb);
      this.viewer.cartoon('protein', structure, { color: color.ssSuccession() });
      this.viewer.centerOn(structure);
    };

    Viewpanel.prototype.loadlocalpdbfile = function loadlocalpdbfile() {};

    Viewpanel.prototype.loadpdbfile = function loadpdbfile() {
      var url = 'http://files.rcsb.org/view/' + this.pdbentry + '.pdb';

      this.loadfromurl(url);
    };

    Viewpanel.prototype.loadfromurl = function loadfromurl(url) {
      var _this2 = this;

      this.httpclient.get(url).then(function (data) {
        console.log("loadfromurl() OK");
        console.log(data.response);
        _this2.process(data.response);
      }).catch(function (error) {
        console.log("loadfromurl() error");
        console.log(error);
        alert('Sorry, response: ' + error.statusCode + ':' + error.statusText + ' when trying to get: ' + url);
      });
    };

    Viewpanel.prototype.loadfromredo = function loadfromredo() {
      this.loadfromurl('http://www.cmbi.ru.nl/pdb_redo/' + this.pdbentry2.substring(1, 3) + '/' + this.pdbentry2 + '/' + this.pdbentry2 + '_final.pdb');
    };

    return Viewpanel;
  }(), _class.inject = [_aureliaEventAggregator.EventAggregator, _aureliaHttpClient.HttpClient], _temp);
});
define('filepicker/app',['exports', 'aurelia-event-aggregator', './messages'], function (exports, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class, _temp;

  var App = exports.App = (_temp = _class = function () {
    function App(ea) {
      var _this = this;

      _classCallCheck(this, App);

      this.ea = ea;
      this.ea.subscribe(_messages.SelectedFile, function (msg) {
        return _this.selectFile(msg.file);
      });
    }

    App.prototype.selectFile = function selectFile(file) {
      console.log("selectFile()");
      console.log(file);
      window.opener.postMessage(window.location.protocol + "//" + window.location.hostname + file.webdavuri, "*");
      window.close();
    };

    return App;
  }(), _class.inject = [_aureliaEventAggregator.EventAggregator], _temp);
});
define('filepicker/environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: false
  };
});
define('filepicker/filepanel',['exports', 'aurelia-http-client', 'aurelia-event-aggregator', './messages', 'aurelia-framework'], function (exports, _aureliaHttpClient, _aureliaEventAggregator, _messages, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Filepanel = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _desc, _value, _class, _descriptor, _class2, _temp;

    var Filepanel = exports.Filepanel = (_class = (_temp = _class2 = function () {
        function Filepanel(ea, httpclient) {
            _classCallCheck(this, Filepanel);

            _initDefineProp(this, 'panelid', _descriptor, this);

            this.ea = ea;
            this.client = httpclient;
            this.files = [];
            this.filescount = this.files.length;
            this.path = "";
            this.dynatable = {};
            this.serviceurl = "/metadataservice/files";

            this.client.configure(function (config) {
                config.withHeader('Accept', 'application/json');
                config.withHeader('Content-Type', 'application/json');
            });
            console.log("filepanel tableid:" + this.panelid);
        }

        Filepanel.prototype.attached = function attached() {
            var _this = this;

            this.client.get(this.serviceurl).then(function (data) {
                if (data.response) {
                    _this.populateFiles(data.response);
                }
            }).catch(function (error) {

                console.log('Error');
                console.log(error);
                alert('Sorry, response: ' + error.statusCode + ':' + error.statusText + ' when trying to get: ' + _this.serviceurl);
            });
            console.log("filepanel tableid:" + this.panelid);
        };

        Filepanel.prototype.dateTimeReviver = function dateTimeReviver(key, value) {
            var a;
            if (typeof value === 'string') {
                a = /\/Date\(([\d\+]*)\)\//.exec(value);
                if (a) {
                    return new Date(parseInt(a[1])).toLocaleDateString('en-GB');
                }
            }
            return value;
        };

        Filepanel.prototype.cdup = function cdup() {
            var sepIndex = this.path.lastIndexOf('/');
            this.path = this.path.substring(0, sepIndex);
        };

        Filepanel.prototype.cddown = function cddown(subdir) {
            this.path += '/' + subdir;
        };

        Filepanel.prototype.changefolder = function changefolder(folder) {
            var _this2 = this;

            if (!this.lock) {
                this.lock = true;
                if (folder) {
                    if (folder == '..') this.cdup();else this.cddown(folder);
                }

                this.client.get(this.serviceurl + this.path).then(function (data) {
                    if (data.response) {
                        _this2.populateFiles(data.response);
                    }
                    _this2.lock = false;
                }).catch(function (error) {
                    console.log('Error');
                    console.log(error);
                    alert('Sorry, response: ' + error.statusCode + ':' + error.statusText + ' when trying to get: ' + _this2.serviceurl + _this2.path);
                    _this2.lock = false;
                });
            }
        };

        Filepanel.prototype.refresh = function refresh() {
            this.changefolder();
        };

        Filepanel.prototype.populateFiles = function populateFiles(dataresponse) {

            this.files = JSON.parse(dataresponse, this.dateTimeReviver);
            this.filescount = this.files.length;
            if (this.path.length > 0) {
                this.files.unshift({ name: "..", size: "UP DIR", date: "" });
            }
            this.files.forEach(function (item, index, arr) {
                if (!arr[index].name && arr[index].alias) {
                    arr[index].name = arr[index].alias;
                    arr[index].attributes = 16;
                    arr[index].date = "";
                }
                if (arr[index].attributes & 16) arr[index].size = "DIR";
            });
        };

        Filepanel.prototype.selectFile = function selectFile(file) {
            console.log("filepanel tableid:" + this.panelid);
            if (file.size.endsWith && file.size.endsWith('DIR')) this.changefolder(file.name);else this.ea.publish(new _messages.SelectedFile(file, this.panelid));
        };

        return Filepanel;
    }(), _class2.inject = [_aureliaEventAggregator.EventAggregator, _aureliaHttpClient.HttpClient], _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'panelid', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class);
});
define('filepicker/main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    longStackTraces: _environment2.default.debug,
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('filepicker/messages',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var SelectedFile = exports.SelectedFile = function SelectedFile(file, senderid) {
    _classCallCheck(this, SelectedFile);

    this.file = file;
    this.senderid = senderid;
  };
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('virtualfoldermodules/app',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function App() {
    _classCallCheck(this, App);
  };
});
define('virtualfoldermodules/ccp4control',["exports", "./modulecontrol"], function (exports, _modulecontrol) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Ccp4control = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Ccp4control = exports.Ccp4control = function (_Modulecontrol) {
    _inherits(Ccp4control, _Modulecontrol);

    function Ccp4control() {
      _classCallCheck(this, Ccp4control);

      var _this = _possibleConstructorReturn(this, _Modulecontrol.call(this));

      _this.posturl = "/metadataservice/sbservice/ccp4suite";
      _this.url = "/metadataservice/sbservice/ccp4suite";
      return _this;
    }

    return Ccp4control;
  }(_modulecontrol.Modulecontrol);
});
define('virtualfoldermodules/main',['exports', '../environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    longStackTraces: _environment2.default.debug,
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('virtualfoldermodules/modulecontrol',['exports', 'aurelia-http-client'], function (exports, _aureliaHttpClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Modulecontrol = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Modulecontrol = exports.Modulecontrol = function () {
    function Modulecontrol() {
      _classCallCheck(this, Modulecontrol);

      this.httpclient = new _aureliaHttpClient.HttpClient();
      this.url = window.location.href;
      this.enabled = false;
      this.httpclient.configure(function (config) {
        config.withHeader('Accept', 'application/json');
        config.withHeader('Content-Type', 'application/json');
      });
    }

    Modulecontrol.prototype.attached = function attached() {
      var _this = this;

      console.log("attached() url:" + this.url);
      this.httpclient.get(this.url).then(function (response) {
        return _this.okcallback(response);
      }).catch(function (error) {
        return _this.failcallback(error);
      });
    };

    Modulecontrol.prototype.okcallback = function okcallback(response) {
      console.log("okcallback()");
      var res = JSON.parse(response.response);
      console.log(res.enabled);
      this.enabled = res.enabled;
    };

    Modulecontrol.prototype.failcallback = function failcallback(error) {
      this.enabled = false;
      console.log('Sorry, error when connecting backend web service at ' + this.url + ' error:' + error.response + " status:" + error.statusText);
    };

    Modulecontrol.prototype.enable = function enable() {
      var _this2 = this;

      this.httpclient.post(this.url).then(function (response) {
        return _this2.okcallback(response);
      }).catch(function (error) {
        return _this2.failcallback(error);
      });
    };

    return Modulecontrol;
  }();
});
define('virtualfoldermodules/modulesetting',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Modulesetting = exports.Modulesetting = function Modulesetting() {
    _classCallCheck(this, Modulesetting);
  };
});
define('virtualfoldermodules/scipioncontrol',["exports", "./modulecontrol"], function (exports, _modulecontrol) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Scipioncontrol = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Scipioncontrol = exports.Scipioncontrol = function (_Modulecontrol) {
    _inherits(Scipioncontrol, _Modulecontrol);

    function Scipioncontrol() {
      _classCallCheck(this, Scipioncontrol);

      var _this = _possibleConstructorReturn(this, _Modulecontrol.call(this));

      _this.url = "/metadataservice/sbservice/scipion";
      _this.posturl = "/metadataservice/sbservice/scipion";
      return _this;
    }

    return Scipioncontrol;
  }(_modulecontrol.Modulecontrol);
});
define('virtualfoldermodules/virtuosocontrol',["exports", "./modulecontrol"], function (exports, _modulecontrol) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Virtuosocontrol = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Virtuosocontrol = exports.Virtuosocontrol = function (_Modulecontrol) {
    _inherits(Virtuosocontrol, _Modulecontrol);

    function Virtuosocontrol() {
      _classCallCheck(this, Virtuosocontrol);

      var _this = _possibleConstructorReturn(this, _Modulecontrol.call(this));

      _this.url = "/metadataservice/sbservice/virtuoso";
      return _this;
    }

    return Virtuosocontrol;
  }(_modulecontrol.Modulecontrol);
});
define('virtualfoldersetting/aliastable',['exports', 'aurelia-http-client', 'aurelia-event-aggregator', './messages'], function (exports, _aureliaHttpClient, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Aliastable = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class, _temp;

  var Aliastable = exports.Aliastable = (_temp = _class = function () {
    function Aliastable(ea, httpclient) {
      var _this = this;

      _classCallCheck(this, Aliastable);

      this.serviceurl = "/metadataservice/files";
      ea.subscribe(_messages.SettingsSubmitted, function (msg) {
        return _this.submitSettings(msg.settings);
      });
      this.client = httpclient;
      this.providers = [{ alias: "Loading available providers ...", temporary: true }];
      this.client.configure(function (config) {
        config.withHeader('Accept', 'application/json');
        config.withHeader('Content-Type', 'application/json');
      });
    }

    Aliastable.prototype.attached = function attached() {
      var _this2 = this;

      this.client.get(this.serviceurl).then(function (data) {
        console.log("data response");
        console.log(data);
        if (data.response) {
          _this2.providers = JSON.parse(data.response);
        }
      }).catch(function (error) {
        console.log(error);

        alert('Sorry, error when connecting backend web service at ' + _this2.serviceurl + ' error:' + error.response + " status:" + error.statusText);
      });
    };

    Aliastable.prototype.submitSettings = function submitSettings(settings) {
      var _this3 = this;

      this.client.put(this.serviceurl, JSON.stringify(settings)).then(function (data) {
        console.log("data response");
        console.log(data);
        if (data.response) {
          _this3.providers = JSON.parse(data.response);
        }
      }).catch(function (error) {
        console.log(error);

        alert('Sorry. Settings not submitted  at ' + _this3.serviceurl + ' error:' + error.response + " status:" + error.statusText);
      });
    };

    Aliastable.prototype.removeProvider = function removeProvider(settings) {
      var _this4 = this;

      if (!confirm('Do you really want to delete the provider with alias "' + settings.alias + '" ?')) return;
      this.client.delete(this.serviceurl + "/" + settings.alias).then(function (data) {
        console.log("data response");
        console.log(data);
        if (data.response) {
          _this4.providers = JSON.parse(data.response);
        }
      });
    };

    return Aliastable;
  }(), _class.inject = [_aureliaEventAggregator.EventAggregator, _aureliaHttpClient.HttpClient], _temp);
});
define('virtualfoldersetting/app',['exports', 'aurelia-event-aggregator', './messages'], function (exports, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class, _temp;

  var App = exports.App = (_temp = _class = function () {
    function App(ea) {
      var _this = this;

      _classCallCheck(this, App);

      this.showprovider = false;
      ea.subscribe(_messages.SettingsSubmitted, function (msg) {
        return _this.submitSettings(msg.settings);
      });
      ea.subscribe(_messages.SettingsSelected, function (msg) {
        return _this.selectSettings(msg.settings);
      });
    }

    App.prototype.newProvider = function newProvider() {
      this.showprovider = true;
    };

    App.prototype.submitSettings = function submitSettings(settings) {
      this.showprovider = false;
    };

    App.prototype.selectSettings = function selectSettings(settings) {
      this.showprovider = true;
    };

    return App;
  }(), _class.inject = [_aureliaEventAggregator.EventAggregator], _temp);
});
define('virtualfoldersetting/dropboxcontrol',['exports', './urlutils', 'aurelia-event-aggregator', './messages'], function (exports, _urlutils, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DropboxControl = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class, _temp;

  var DropboxControl = exports.DropboxControl = (_temp = _class = function () {
    function DropboxControl(ea, urlutils) {
      _classCallCheck(this, DropboxControl);

      this.ea = ea;
      this.urlutils = urlutils;
      this.accesstoken = this.urlutils.parseQueryString(window.location.hash).access_token;
      this.isAuthenticated = !!this.accesstoken;
      console.log('dropboxcontrol() accesstoken:' + this.accesstoken);

      this.CLIENTID = "x5tdu20lllmr0nv";
      var dbx = new Dropbox({ clientId: this.CLIENTID });

      var currentUrl = window.location.href;
      console.log('dropboxcontrol() current url:' + currentUrl);
      this.authurl = dbx.getAuthenticationUrl(currentUrl);
      console.log(this.dropBoxAuthUrl);
      this.id = "Dropbox";
    }

    DropboxControl.prototype.initialize = function initialize() {
      if (this.isAuthenticated) {
        var settings = {};
        settings.type = this.id;

        settings.securetoken = this.accesstoken;

        this.ea.publish(new _messages.SettingsSelected(settings));
      }
    };

    return DropboxControl;
  }(), _class.inject = [_aureliaEventAggregator.EventAggregator, _urlutils.UrlUtils], _temp);
});
define('virtualfoldersetting/genericcontrol',['exports', 'aurelia-http-client', 'aurelia-framework', 'aurelia-event-aggregator', './messages', './dropboxcontrol'], function (exports, _aureliaHttpClient, _aureliaFramework, _aureliaEventAggregator, _messages, _dropboxcontrol) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Genericcontrol = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _dec4, _desc, _value, _class, _class2, _temp;

  var Genericcontrol = exports.Genericcontrol = (_dec = (0, _aureliaFramework.computedFrom)('selectedProvider'), _dec2 = (0, _aureliaFramework.computedFrom)('selectedProvider'), _dec3 = (0, _aureliaFramework.computedFrom)('selectedProvider'), _dec4 = (0, _aureliaFramework.computedFrom)('selectedProvider'), (_class = (_temp = _class2 = function () {
    function Genericcontrol(ea, httpclient, dropboxcontrol) {
      var _this = this;

      _classCallCheck(this, Genericcontrol);

      this.heading = "File Provider";
      this.ea = ea;
      this.dropboxcontrol = dropboxcontrol;
      this.editing = true;
      this.servicecontext = "providers";
      this.knowtoken = false;
      this.dropboxauthurl = "";
      this.providers = [];
      this.selectedProvider = "";
      console.log('genericcontrol()');
      this.client = httpclient;
      this.client.configure(function (config) {
        config.withHeader('Accept', 'application/json');
        config.withHeader('Content-Type', 'application/json');
      });
      this.ea.subscribe(_messages.SettingsSelected, function (msg) {
        return _this.selectSettings(msg.settings);
      });
    }

    Genericcontrol.prototype.clear = function clear() {
      this.selectedProvider = "";
      this.username = "";
      this.securetoken = "";
      this.filesystempath = "";
      this.alias = "";
      this.accessurl = "";
    };

    Genericcontrol.prototype.attached = function attached() {
      var _this2 = this;

      console.log('genericcontrol.attached()');
      console.log("dialogstate:" + this.dialogstate);

      this.dropboxauthurl = this.dropboxcontrol.authurl;
      this.client.get("/metadataservice/" + this.servicecontext).then(function (data) {
        console.log("data response");
        console.log(data);
        if (data.response) {
          _this2.providers = JSON.parse(data.response);
        }
      });
      this.dropboxcontrol.initialize();
    };

    Genericcontrol.prototype.addProvider = function addProvider() {
      var settings = {};
      settings.type = this.selectedProvider;
      settings.alias = this.alias;
      if (this.selectedDropbox) settings.securetoken = this.securetoken;
      if (this.selectedFileSystem) settings.securetoken = this.filesystempath;
      if (this.selectedB2Drop) {
        settings.securetoken = this.password;
        settings.username = this.username;
      }
      if (this.selectedWebDav) {
        settings.accessurl = this.accessurl;
        settings.securetoken = this.password;
        settings.username = this.username;
      }
      console.log("publishing");
      this.ea.publish(new _messages.SettingsSubmitted(settings));
      this.clear();
    };

    Genericcontrol.prototype.selectSettings = function selectSettings(settings) {
      this.selectedProvider = settings.type;
      this.alias = settings.alias;
      this.securetoken = settings.securetoken;
      if (!!this.securetoken) {
        this.editing = false;this.knownSecureToken.checked = true;
      }
    };

    _createClass(Genericcontrol, [{
      key: 'selectedDropbox',
      get: function get() {
        return this.selectedProvider == this.dropboxcontrol.id;
      }
    }, {
      key: 'selectedB2Drop',
      get: function get() {
        return this.selectedProvider == 'B2Drop';
      }
    }, {
      key: 'selectedFileSystem',
      get: function get() {
        return this.selectedProvider == 'FileSystem';
      }
    }, {
      key: 'selectedWebDav',
      get: function get() {
        return this.selectedProvider == 'WebDav';
      }
    }, {
      key: 'knowntoken',
      get: function get() {
        if (this.knownSecureToken) return this.knownSecureToken.checked;
      }
    }]);

    return Genericcontrol;
  }(), _class2.inject = [_aureliaEventAggregator.EventAggregator, _aureliaHttpClient.HttpClient, _dropboxcontrol.DropboxControl], _temp), (_applyDecoratedDescriptor(_class.prototype, 'selectedDropbox', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'selectedDropbox'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'selectedB2Drop', [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, 'selectedB2Drop'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'selectedFileSystem', [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, 'selectedFileSystem'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'selectedWebDav', [_dec4], Object.getOwnPropertyDescriptor(_class.prototype, 'selectedWebDav'), _class.prototype)), _class));
});
define('virtualfoldersetting/main',['exports', '../environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    longStackTraces: _environment2.default.debug,
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('virtualfoldersetting/messages',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var SettingsSubmitted = exports.SettingsSubmitted = function SettingsSubmitted(settings) {
    _classCallCheck(this, SettingsSubmitted);

    this.settings = settings;
  };

  var SettingsSelected = exports.SettingsSelected = function SettingsSelected(settings) {
    _classCallCheck(this, SettingsSelected);

    this.settings = settings;
  };

  var SettingsRemoved = exports.SettingsRemoved = function SettingsRemoved(settings) {
    _classCallCheck(this, SettingsRemoved);

    this.settings = settings;
  };
});
define('virtualfoldersetting/urlutils',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var UrlUtils = exports.UrlUtils = function () {
    function UrlUtils() {
      _classCallCheck(this, UrlUtils);
    }

    UrlUtils.prototype.parseQueryString = function parseQueryString(str) {
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

        var key = parts.shift();
        var val = parts.length > 0 ? parts.join('=') : undefined;

        key = decodeURIComponent(key);

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
    };

    return UrlUtils;
  }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <h1>${message}</h1>\n</template>\n"; });
define('text!b2dropcontrol/app.html', ['module'], function(module) { module.exports = "<template>\n\n    <require from=\"./b2dropcontrol\"></require>\n    <require from=\"./dropboxcontrol\"></require>\n    <require from=\"./onedrivecontrol\"></require>\n\n\n    <b2dropcontrol></b2dropcontrol>\n    <dropboxcontrol></dropboxcontrol>\n    <onedrivecontrol></onedrivecontrol>\n  <div class=\"w3-clear\"></div>\n\n</template>\n"; });
define('text!b2dropcontrol/b2dropcontrol.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"w3-third\">\n        <div class=\"w3-card-2 w3-sand w3-hover-shadow w3-round-large\">\n            <h3>${heading}</h3>\n            <p>B2DROP is academic secure and trusted data exchange service provided by EUDAT.\n                West-life portal uses B2DROP TO store, upload and download AND share the data files. </p>\n            <!-- form is showed only if the b2drop is not connected -->\n            <form show.bind=\"dialogstateentry\" submit.trigger=\"addservice('b2dropconnector')\">\n                <p>You need to create B2DROP account first at <a href=\"https://b2drop.eudat.eu/pwm/public/NewUser?\">b2drop.eudat.eu/pwm/public/NewUser?</a>\n                    Then ,if you have an existing account, fill in the B2DROP username and password here:</p>\n\n                <input type=\"text\" value.bind=\"username\">\n                <input type=\"password\" value.bind=\"usertoken\">\n                <button class=\"w3-btn w3-round-large\" type=\"submit\">Connect to B2DROP</button>\n                Status: <span>${status}</span>\n            </form>\n            <!-- if it is connected, then status info is showed and option to reconnect is showed-->\n            <form show.bind=\"dialogstateconnected\" submit.trigger=\"reconnect()\">\n                <span>B2Drop service connected.</span>\n                <button class=\"w3-btn w3-round-large\" type=\"submit\">reconnect</button>\n            </form>\n\n            <div show.bind=\"dialogstateconnecting\">\n                <span>B2Drop connecting ...</span>\n            </div>\n        </div>\n    </div>\n</template>\n"; });
define('text!b2dropcontrol/dropboxcontrol.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"w3-third\">\n    <div class=\"w3-card-2 w3-sand w3-hover-shadow w3-round-large\">\n        <h3>${heading}</h3>\n        <p>DROPBOX is a commercial data store and exchange service.\n            West-life portal can use your DROPBOX account to access and download your data files. </p>            <!-- form is showed only if the b2drop is not connected -->\n        <form show.bind=\"dialogstateentry\">\n            <p>You need to have existing DROPBOX account. </p>\n            <a show.bind=\"showdropboxbutton\" class=\"w3-btn w3-round-large\" href=\"${dropBoxAuthUrl}\" id=\"authlink\">Connect to DROPBOX</a>\n            <hr/>Status: <span>${status}</span>\n        </form>\n        <!-- if it is connected, then status info is showed and option to reconnect is showed-->\n        <form show.bind=\"dialogstateconnected\" submit.trigger=\"reconnect()\">\n            <span>DROPBOX service connected.</span>\n            <button class=\"w3-btn w3-round-large\" type=\"submit\">reconnect</button>\n        </form>\n\n        <div show.bind=\"dialogstateconnecting\">\n            <span>DROPBOX connecting ...</span>\n        </div>\n    </div>\n</div>\n</template>\n"; });
define('text!b2dropcontrol/onedrivecontrol.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"w3-third\">\n    <div class=\"w3-card-2 w3-sand w3-hover-shadow w3-round-large\">\n      <h3>${heading}</h3>\n      <p>ONEDRIVE is a commercial data store and exchange service.\n        West-life portal can use your ONEDRIVE account to access and download your data files. </p>            <!-- form is showed only if the b2drop is not connected -->\n      <form show.bind=\"dialogstateentry\">\n        <p>You need to have existing ONEDRIVE account. </p>\n        <a show.bind=\"showonedrivebutton\" class=\"w3-btn w3-round-large\" href=\"${oneDriveAuthUrl}\" id=\"authlink\">Connect to ONEDRIVE</a>\n        <hr/>Status: <span>${status}</span>\n      </form>\n      <!-- if it is connected, then status info is showed and option to reconnect is showed-->\n      <form show.bind=\"dialogstateconnected\" submit.trigger=\"reconnect()\">\n        <span>ONEDRIVE service connected.</span>\n        <button class=\"w3-btn w3-round-large\" type=\"submit\">reconnect</button>\n      </form>\n\n      <div show.bind=\"dialogstateconnecting\">\n        <span>ONEDRIVE connecting ...</span>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('text!filepicker/app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./filepanel\"></require>\n  <div class=\"w3-card-2 w3-sand w3-center\">\n    <h3>Virtual Folder - File Picker</h3>\n  </div>\n<div class=\"w3-margin w3-padding w3-card w3-sand\">\n  <filepanel></filepanel>\n</div>\n</template>\n"; });
define('text!filepicker/filepanel.html', ['module'], function(module) { module.exports = "<template bindable=\"panelid\">\n    <div class=\"w3-card-2 w3-pale-blue w3-hoverable w3-padding w3-margin-right\">\n        <span>Panel ${panelid}, ${path} contains ${filescount} items.<button click.delegate=\"refresh()\">refresh</button></span>\n        <table id=\"${panelid}\">\n            <thead>\n            <tr>\n                <th style=\"text-align:left\">name</th>\n                <th style=\"text-align:right\">size</th>\n                <th style=\"text-align:center\">date</th>\n            </tr>\n            </thead>\n            <tbody>\n            <tr class=\"w3-hover-green\" repeat.for=\"file of files\" click.trigger=\"selectFile(file)\">\n              <td>${file.name}</td><td>${file.size}</td><td align=\"center\">${file.date}</td>\n            </tr>\n            </tbody>\n        </table>\n    </div>\n</template>\n"; });
define('text!virtualfoldermodules/app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./modulesetting\"></require>\n\n  <modulesetting></modulesetting>\n\n</template>\n"; });
define('text!virtualfoldermodules/ccp4control.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"w3-third w3-card-4 w3-sand w3-padding\">\n\n    <h4>CCP4 suite</h4>\n    <p>The CCP4 (Collaborative Computational Project, Number 4)\n      software suite is a collection of programs and associated data\n      and software libraries which can be used for macromolecular\n      structure determination by X-ray crystallography.</p>\n    <p>West-life portal allows access to CCP4 software tools without need to install them separatately. </p>\n    <p show.bind=\"!enabled\">To enable local copy of CCP4 suite you agree that you have Academic or Commercial License. If not, please obtain a license first at <a href=\"http://www.ccp4.ac.uk/ccp4license.php\">CCP4License</a>.</p>\n    <button show.bind=\"!enabled\" class=\"w3-btn w3-round-large\" click.trigger=\"enable()\">Agree & Enable CCP4</button>\n\n</div>\n</template>\n"; });
define('text!virtualfoldermodules/modulesetting.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./scipioncontrol\"></require>\n  <require from=\"./virtuosocontrol\"></require>\n  <require from=\"./ccp4control\"></require>\n  <div class=\"w3-card-2 w3-sand\">\n    <h3 align=\"center\">Virtual Folder Modules</h3>\n  </div>\n  <scipioncontrol></scipioncontrol>\n  <virtuosocontrol></virtuosocontrol>\n  <ccp4control></ccp4control>\n  <div class=\"w3-padding w3-margin w3-clear\"></div>\n</template>\n"; });
define('text!virtualfoldermodules/scipioncontrol.html', ['module'], function(module) { module.exports = "<template>\n<div class=\"w3-third w3-card-4 w3-sand w3-padding\">\n\n    <h4>Scipion</h4>\n    <p>Scipion is an image processing framework to obtain 3D models\n      of macromolecular complexes using Electron Microscopy.</p>\n    <p>West-life portal allows access to Scipion software tools without need to install them separatately. </p>\n    <p show.bind=\"!enabled\">To enable and start local copy of Scipion Webtools, please click the Enable button.</p>\n    <button show.bind=\"!enabled\" class=\"w3-btn w3-round-large\" click.trigger=\"enable()\">Enable Scipion</button>\n    <p show.bind=\"enabled\">\n      Access Scipion Services:<a href=\"http://localhost:8001/\">local Scipion webtool</a>\n    </p>\n</div>\n</template>\n"; });
define('text!virtualfoldermodules/virtuosocontrol.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"w3-third\">\n    <div class=\"w3-card-4 w3-sand w3-padding w3-margin-left w3-margin-right\">\n    <h4>Virtuoso</h4>\n    <p>Virtuoso-opensource is Virtuoso is a scalable cross-platform server that combines Relational, Graph, and Document Data Management with Web Application Server and Web Services Platform functionality.\n    </p>\n    <p>To enable and start local instance of Virtuoso, please click the Enable button.</p>\n    <button class=\"w3-btn w3-round-large\" onclick=\"$.post('/metadataservice/sbservice/virtuoso'); this.disabled=true\">Enable Virtuoso</button>\n    <p>\n      Access Virtuoso Services:<a href=\"/virtuoso\">local Virtuoso webtool</a>\n    </p>\n    </div>\n</div>\n</template>\n"; });
define('text!virtualfoldersetting/aliastable.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"w3-half w3-sand w3-padding\">\n\n\n      <table class=\"w3-sand \">\n        <thead>\n        <tr><th colspan=\"3\">List of connected providers</th> </tr>\n        <tr>\n          <th align=\"left\">Alias</th>\n          <th align=\"left\">Type</th>\n          <th></th>\n        </tr>\n        </thead>\n        <tbody>\n        <tr class=\"w3-hover-green\" repeat.for=\"provider of providers\">\n          <td>${provider.alias}</td><td>${provider.type}</td><td><a href=\"filemanager2.html\"class=\"w3-button\">Browse content</a></td><td align=\"center\"><i show.bind=\"!provider.temporary\" class=\"fa fa-remove\" click.delegate=\"removeProvider(provider)\"></i></td>\n        </tr>\n        </tbody>\n        <tfoot>\n        <tr>\n          <td colspan=\"3\"><button  class=\"w3-btn w3-round-large w3-blue\" type=\"submit\" class=\"w3-buttons\">Add new file provider</button></td>\n        </tr>\n        </tfoot>\n      </table>\n\n  </div>\n</template>\n"; });
define('text!virtualfoldersetting/app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./genericcontrol\"></require>\n  <require from=\"./aliastable\"></require>\n  <div class=\"w3-card-2 w3-sand w3-center\">\n    <h3>Virtual Folder - Settings</h3>\n  </div>\n\n\n     <form submit.trigger=\"newProvider()\">\n    <aliastable></aliastable>\n    </form>\n\n    <genericcontrol show.bind=\"showprovider\"></genericcontrol>\n\n\n</template>\n"; });
define('text!virtualfoldersetting/genericcontrol.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"w3-half w3-sand w3-padding\">\n\n    <form submit.trigger=\"addProvider()\">\n\n\n      <select class=\"w3-select\" name=\"option\" value.bind=\"selectedProvider\">\n        <option value=\"\" disabled selected>Choose provider</option>\n        <option repeat.for=\"provider of providers\" value.bind=\"provider\">${provider}</option>\n      </select>\n\n      <div show.bind=\"selectedProvider\">\n\n        <div show.bind=\"selectedB2Drop\">\n          <p>B2DROP is academic secure and trusted data exchange service provided by EUDAT.\n            West-life portal uses B2DROP TO store, upload and download AND share the data files.</p>\n          <p>You need to create B2DROP account first at <a href=\"https://b2drop.eudat.eu/pwm/public/NewUser?\">b2drop.eudat.eu/pwm/public/NewUser?</a>\n            Fill in the existing B2DROP username and password here:</p>\n          Username:<input type=\"text\" name=\"username\" size=\"15\" maxlength=\"1024\" value.bind=\"username\"/><br/>\n          Password:<input type=\"password\" name=\"securetoken\" size=\"30\" maxlength=\"1024\" value.bind=\"password\"/><br/>\n          Alias (optional):<input type=\"text\" name=\"alias\" size=\"15\" maxlength=\"1024\" value.bind=\"alias\"/><br/>\n          <span class=\"w3-tiny\">Alias is a unique name of the 'folder' under which the provider wil be 'mounted' and accessible.</span>\n          <button class=\"w3-btn w3-round-large w3-right\" type=\"submit\">Add</button>\n        </div>\n\n        <div show.bind=\"selectedDropbox\">\n          <p>DROPBOX is a commercial data store and exchange service.\n            West-life portal can use your DROPBOX account to access and download your data files. </p>\n\n          <input type=\"checkbox\" ref=\"knownSecureToken\"/><span class=\"w3-tiny\">I know secure token </span>\n          <div show.bind=\"!knowntoken\">\n            <p>You need to have existing DROPBOX account. </p>\n            <a class=\"w3-btn w3-round-large\" href=\"${dropboxauthurl}\" id=\"authlink\">Connect to DROPBOX</a>\n          </div>\n          <div show.bind=\"knowntoken\">Secure token:\n            <input type=\"text\" name=\"securetoken\" size=\"30\" maxlength=\"1024\" value.bind=\"securetoken\"\n                   readonly.bind=\"!editing\"/><br/>\n            Alias (optional):<input type=\"text\" name=\"alias\" size=\"15\" maxlength=\"1024\" value.bind=\"alias\"/><br/>\n            <span class=\"w3-tiny\">Alias is a unique name of the 'folder' under which the provider wil be 'mounted' and accessible.</span>\n            <button class=\"w3-btn w3-round-large\" type=\"submit\">Add</button>\n\n          </div>\n\n        </div>\n\n        <div show.bind=\"selectedFileSystem\">\n          Internal path to be linked:\n          <input type=\"text\" name=\"securetoken\" size=\"30\" maxlength=\"1024\" value.bind=\"filesystempath\"/><br/>\n          Alias (optional):<input type=\"text\" name=\"alias\" size=\"15\" maxlength=\"1024\" value.bind=\"alias\"/><br/>\n          <span class=\"w3-tiny\">Alias is a unique name of the 'folder' under which the provider wil be 'mounted' and accessible.</span>\n          <button class=\"w3-btn w3-round-large w3-right\" type=\"submit\">Add</button>\n        </div>\n\n        <div show.bind=\"selectedWebDav\">\n          <p>WEBDAV is standard protocol to access content via web technologies. If you have address (WebDAV url) of a\n            service, you can add it to West-life virtual folder directly.</p>\n          WebDAV URL:<input type=\"text\" name=\"accessurl\" size=\"15\" maxlength=\"1024\" value.bind=\"accessurl\"/><br/>\n          Username:<input type=\"text\" name=\"username\" size=\"15\" maxlength=\"1024\" value.bind=\"username\"/><br/>\n          Password:<input type=\"password\" name=\"securetoken\" size=\"30\" maxlength=\"1024\" value.bind=\"password\"/><br/>\n          Alias (optional):<input type=\"text\" name=\"alias\" size=\"15\" maxlength=\"1024\" value.bind=\"alias\"/><br/>\n          <span class=\"w3-tiny\">Alias is a unique name of the 'folder' under which the provider wil be 'mounted' and accessible.</span>\n          <button class=\"w3-btn w3-round-large w3-right\" type=\"submit\">Add</button>\n        </div>\n\n      </div>\n\n    </form>\n\n\n  </div>\n\n</template>\n"; });
define('text!filemanager/actions.html', ['module'], function(module) { module.exports = "<template>\n</template>"; });
define('text!filemanager/app.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"./filepanel\"></require>\n    <require from=\"./viewpanel\"></require>\n\n    <h4>${heading}</h4>\n    <div show.bind=\"showhelp\" class=\"w3-round-large w3-card w3-pale-blue\">\n        <p>This if VirtualFolder FileManager.</p>\n        <p>Use mouse to navigate the files.</p>\n        <p>Click on directory will change to the diarectory. Click on \"..\" will change to parent directory</p>\n        <p>Click on PDB file will visualize the PDB file in next panel.</p>\n    </div>\n    <div class=\"filepanel\">\n      <div class=\"w3-half\">\n\n      <filepanel show.bind=\"!viewpanel1\" tableid=\"filepanel1\" ></filepanel>\n        <button class=\"w3-button\" show.bind=\"viewpanel1\" click.trigger=\"close1()\">X</button>\n        <viewpanel if.bind=\"viewpanel1\" viewid=\"view1\" fileurl.two-way=\"fileurl\"> </viewpanel>\n        <!-- TODO investigate correct binding -->\n</div>\n      <div class=\"w3-half\">\n\n      <filepanel show.bind=\"!viewpanel2\" tableid=\"filepanel2\" ></filepanel>\n        <button class=\"w3-button\" show.bind=\"viewpanel2\" click.trigger=\"close2()\">X</button>\n        <viewpanel if.bind=\"viewpanel2\" viewid=\"view2\" fileurl.two-way=\"fileurl\"> </viewpanel>\n        </div>\n    </div>\n    <div class=\"buttonline\">\n        <div class=\"w3-round-large w3-col\">\n            <button class=\"w3-btn w3-round-large\" click.trigger=\"help()\">F1 Help</button>\n            <!--button class=\"w3-btn w3-ripple  w3-light-blue w3-hover-blue w3-border w3-border-green w3-round-large\">F2 Menu</button>\n            <button class=\"w3-btn w3-ripple  w3-light-blue w3-hover-blue w3-border w3-border-green w3-round-large\">F3 View</button>\n            <button class=\"w3-btn w3-ripple  w3-light-blue w3-hover-blue w3-border w3-border-green w3-round-large\">F4 Edit</button>\n            <button class=\"w3-btn w3-ripple  w3-light-blue w3-hover-blue w3-border w3-border-green w3-round-large\">F5 Copy</button>\n            <button class=\"w3-btn w3-ripple  w3-light-blue w3-hover-blue w3-border w3-border-green w3-round-large\">F6 Move</button>\n            <button class=\"w3-btn w3-ripple  w3-light-blue w3-hover-blue w3-border w3-border-green w3-round-large\">F7 Mkdir</button>\n            <button class=\"w3-btn w3-ripple  w3-light-blue w3-hover-blue w3-border w3-border-green w3-round-large\">F8 Delete</button-->\n        </div>\n    </div>\n</template>\n"; });
define('text!filemanager/filepanel.html', ['module'], function(module) { module.exports = "<template bindable=\"tableid\">\n    <div class=\"w3-card-2 w3-pale-blue w3-hoverable\">\n        <span>${path} contains ${filescount} items.<button click.delegate=\"refresh()\">refresh</button></span>\n        <table id=\"${tableid}\">\n            <thead>\n            <tr>\n                <th style=\"text-align:left\">name</th>\n                <th style=\"text-align:right\">size</th>\n                <th style=\"text-align:center\">date</th>\n            </tr>\n            </thead>\n        </table>\n    </div>\n</template>\n"; });
define('text!filemanager/filesettings.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"./actions\"></require>\n    <require from=\"./filepanel\"></require>\n\n    <h4>${heading}</h4>\n    <div class=\"filepanel\">\n    <settings></settings>\n    <filepanel tableid=\"filepanel2\"></filepanel>\n    </div>\n</template>"; });
define('text!filemanager/viewpanel.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"w3-half\">\n        <div class=\"w3-card w3-white \">\n          <span>${fileurl}</span>\n            <form fileurl.call=\"viewfile\">\n              Load another entry from:\n                <ul>\n                  <li>\n                    <input id=\"pdbid\" title=\"type PDB id and press enter\" placeholder=\"1r6a\"\n                       maxlength=\"4\" size=\"4\" value.bind=\"pdbentry\"\n                       change.trigger=\"loadpdbfile()\"\n                />\n                    PDB database\n                  </li>\n                  <li>\n                    <input id=\"pdbid2\" title=\"type PDB id and press enter\" placeholder=\"1r6a\"\n                           maxlength=\"4\" size=\"4\" value.bind=\"pdbentry2\"\n                           change.trigger=\"loadfromredo()\"\n                    />\n                    PDB-REDO database\n                  </li>\n                  </ul>\n                </form>\n            <div class=\"fileviewer\" style=\"height: 100%; width: 100%\">\n            </div>\n        </div>\n    </div>\n</template>\n"; });
define('text!filemanager2/app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../filepicker/filepanel\"></require>\n  <require from=\"./viewpanel\"></require>\n  <div class=\"w3-card-2 w3-sand w3-center\">\n    <h3>Virtual Folder - File manager</h3>\n  </div>\n  <div show.bind=\"showpanels\" class=\"w3-half\">\n    <filepanel panelid=\"left\"></filepanel>\n  </div>\n  <div show.bind=\"showpanels\" class=\"w3-half\">\n    <filepanel panelid=\"right\"></filepanel>\n  </div>\n  <div show.bind=\"!showpanels\">\n    <button click.trigger=\"closeviewer()\">X</button>\n    <viewpanel></viewpanel>\n  </div>\n  <div class=\"w3-clear w3-margin w3-padding\"></div>\n\n</template>\n"; });
define('text!filemanager2/viewpanel.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"w3-card w3-white \">\n    <span>${fileurl}</span>\n    <form fileurl.call=\"viewfile\">\n      Load another entry from:\n      <ul>\n        <li>\n          <input id=\"pdbid\" title=\"type PDB id and press enter\" placeholder=\"1r6a\"\n                 maxlength=\"4\" size=\"4\" value.bind=\"pdbentry\"\n                 change.trigger=\"loadpdbfile()\"\n          />\n          PDB database\n        </li>\n        <li>\n          <input id=\"pdbid2\" title=\"type PDB id and press enter\" placeholder=\"1r6a\"\n                 maxlength=\"4\" size=\"4\" value.bind=\"pdbentry2\"\n                 change.trigger=\"loadfromredo()\"\n          />\n          PDB-REDO database\n        </li>\n      </ul>\n    </form>\n    <div class=\"fileviewer\" style=\"height: 100%; width: 100%\">\n    </div>\n  </div>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map