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
define('autocomplete/vfAutocompleteSearch',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.VfAutocompleteSearch = undefined;

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

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _class2, _temp;

  var VfAutocompleteSearch = exports.VfAutocompleteSearch = (_dec = (0, _aureliaFramework.computedFrom)('resultGroups'), (_class = (_temp = _class2 = function () {
    function VfAutocompleteSearch(httpclient) {
      _classCallCheck(this, VfAutocompleteSearch);

      _initDefineProp(this, 'value', _descriptor, this);

      _initDefineProp(this, 'placeholder', _descriptor2, this);

      _initDefineProp(this, 'submit', _descriptor3, this);

      this.http = httpclient;
      this.config = {
        resultBoxAlign: 'left',
        redirectOnClick: false,
        searchUrl: '//www.ebi.ac.uk/pdbe/search/pdb-autocomplete/select',
        fields: 'value,num_pdb_entries,var_name',
        group: 'group=true&group.field=category',
        groupLimit: '25',
        sort: 'category+asc,num_pdb_entries+desc',
        additionalParams: 'rows=20000&json.nl=map&wt=json'
      };
    }

    VfAutocompleteSearch.prototype.hideSuggestions = function hideSuggestions() {
      this.showing = false;
    };

    VfAutocompleteSearch.prototype.blurSuggestions = function blurSuggestions(evt) {
      if (evt.relatedTarget && evt.relatedTarget.className.startsWith('result-card-item')) return;
      this.hideSuggestions();
    };

    VfAutocompleteSearch.prototype.showSuggestions = function showSuggestions() {
      this.showing = true;
    };

    VfAutocompleteSearch.prototype.focusSuggestions = function focusSuggestions() {
      this.value = "";
      this.showSuggestions();
    };

    VfAutocompleteSearch.prototype.search = function search() {
      var _this = this;

      var term = this.value;
      var config = this.config;
      var url = config.searchUrl + '?' + config.additionalParams + '&' + config.group + '&fl=' + config.fields + '&sort=' + config.sort + '&group.limit=' + config.groupLimit + '&q=value:' + term + '*~10';
      return this.http.fetch(url).then(function (response) {
        return response.json();
      }).then(function (data) {
        _this.resultGroups = data.grouped.category.groups;
      }).catch(function (err) {
        console.log('error search()');console.log(err);
      });
    };

    VfAutocompleteSearch.prototype.keypressed = function keypressed(evt) {
      var key = evt.keyCode;
      if (key === 13) {
        this.submit({ item: evt.originalTarget.value });
      } else if (key === 27) this.hideSuggestions();

      return true;
    };

    VfAutocompleteSearch.prototype.clicked = function clicked(clickvalue) {
      this.value = clickvalue;
      this.submit({ item: clickvalue });
      this.hideSuggestions();
    };

    VfAutocompleteSearch.prototype.valueChanged = function valueChanged(newValue, oldValue) {
      if (this.value && this.value.length > 0) {
        this.search();
      }
    };

    VfAutocompleteSearch.prototype.searchMore = function searchMore(filter) {
      var _this2 = this;

      var term = this.value;
      var fqVal = filter;
      var config = this.config;
      var url = config.searchUrl + '?' + config.additionalParams + '&' + config.group + '&fl=' + config.fields + '&sort=' + config.sort + '&group.limit=-1&q=value:' + term + '*~10&fq=var_name:' + fqVal;
      return this.http.fetch(url).then(function (response) {
        return response.json();
      }).then(function (data) {
        _this2.resultGroups = data.grouped.category.groups;
      }).catch(function (err) {
        console.log('error searchMore()');console.log(err);
      });
    };

    _createClass(VfAutocompleteSearch, [{
      key: 'resultGroupsEmpty',
      get: function get() {
        return this.showing && this.resultGroups && this.resultGroups.length == 0;
      }
    }]);

    return VfAutocompleteSearch;
  }(), _class2.inject = [_aureliaFetchClient.HttpClient], _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'value', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return "";
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'placeholder', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return "";
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'submit', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, 'resultGroupsEmpty', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'resultGroupsEmpty'), _class.prototype)), _class));
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
define('b2dropcontrol/dropboxcontrol',['exports', './acontrol', 'dropbox'], function (exports, _acontrol, _dropbox) {
    'use strict';

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
            console.log(_dropbox.Dropbox);
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

                var dbx = new _dropbox.Dropbox({ clientId: this.CLIENTID });
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
define('dataset/app',["exports"], function (exports) {
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
define('dataset/environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: false,
    testing: false
  };
});
define('dataset/main',['exports', './environment'], function (exports, _environment) {
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
define('editor/fileeditor',["exports", "codemirror", "aurelia-event-aggregator", "aurelia-http-client", "../filepicker/messages", "codemirror/mode/clike/clike", "codemirror/mode/htmlmixed/htmlmixed", "codemirror/mode/javascript/javascript"], function (exports, _codemirror, _aureliaEventAggregator, _aureliaHttpClient, _messages) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Fileeditor = undefined;

  var CodeMirror = _interopRequireWildcard(_codemirror);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class, _temp;

  var Fileeditor = exports.Fileeditor = (_temp = _class = function () {
    function Fileeditor(el, ea, httpclient) {
      var _this = this;

      _classCallCheck(this, Fileeditor);

      this.el = el;
      this.ea = ea;
      this.httpclient = httpclient;
      this.ea.subscribe(_messages.EditFile, function (msg) {
        return _this.selectFile(msg.file, msg.senderid);
      });
    }

    Fileeditor.prototype.attached = function attached() {
      var editor = this.el.querySelector(".Codemirror");

      if (editor == null) this.codemirror = CodeMirror.fromTextArea(this.cmTextarea, {
        lineNumbers: true,
        mode: "text/x-less",
        theme: "eclipse"
      });
    };

    Fileeditor.prototype.selectFile = function selectFile(file, senderid) {
      var _this2 = this;

      this.httpclient.get(file.webdavuri).then(function (data) {
        console.log("obtained data:");
        console.log(data);
        _this2.codemirror.setValue(data.response);
      }).catch(function (error) {
        alert('Error retrieving content from ' + file.webdavuri);
      });
    };

    return Fileeditor;
  }(), _class.inject = [Element, _aureliaEventAggregator.EventAggregator, _aureliaHttpClient.HttpClient], _temp);
});
define('filemanager2/app',['exports', 'aurelia-event-aggregator', '../filepicker/messages', 'aurelia-framework'], function (exports, _aureliaEventAggregator, _messages, _aureliaFramework) {
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
    }

    App.prototype.selectFile = function selectFile(file, senderid) {
      console.log("selectFile()");
      console.log(file);
      console.log(senderid);
    };

    App.prototype.closeviewer = function closeviewer() {};

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
define('filemanager2/panel',['exports', 'aurelia-event-aggregator', '../filepicker/messages', '../tabs/messages', 'aurelia-framework'], function (exports, _aureliaEventAggregator, _messages, _messages2, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Panel = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _class, _temp;

    var Panel = exports.Panel = (_temp = _class = function () {
        function Panel(ea) {
            var _this = this;

            _classCallCheck(this, Panel);

            this.ea = ea;

            this.ea.subscribe(_messages.SelectedFile, function (msg) {
                return _this.selectFile(msg.file, msg.senderid);
            });
            this.ea.subscribe(_messages2.SelectedTab, function (msg) {
                return _this.selectTab(msg.tabid);
            });

            this.uid = new Date().valueOf();
            this.ids = [this.uid + '.list', this.uid + '.view', this.uid + '.visual', this.uid + '.analyse', this.uid + '.dataset'];

            this.selectedTab = this.ids[0];
            this.paneltabs = [{ id: this.ids[0], label: 'File List' }, { id: this.ids[1], label: 'View/Edit' }, { id: this.ids[2], label: 'Visualize' }, { id: this.ids[3], label: 'Dataset' }];
            this.selectedView = this.selectedVisual = this.selectedDataset = false;
            this.selectedList = true;
        }

        Panel.prototype.selectTab = function selectTab(tabid) {
            if (tabid.startsWith(this.uid)) {
                this.selectedTab = tabid;
                this.selectedList = this.selectedTab == this.ids[0];
                this.selectedView = this.selectedTab == this.ids[1];
                this.selectedVisual = this.selectedTab == this.ids[2];
                this.selectedDataset = this.selectedTab == this.ids[3];
            }
        };

        Panel.prototype.selectFile = function selectFile(file, senderid) {
            if (senderid == this.uid) {
                if (file.webdavuri.endsWith('pdb')) {
                    this.selectTab(this.ids[2]);
                    this.ea.publish(new _messages.VisualizeFile(file, senderid));
                } else {
                    this.selectTab(this.ids[1]);
                    this.ea.publish(new _messages.EditFile(file, senderid));
                }
            }
        };

        return Panel;
    }(), _class.inject = [_aureliaEventAggregator.EventAggregator], _temp);
});
define('filemanager2/viewpanelpv',['exports', 'aurelia-event-aggregator', '../filepicker/messages', 'aurelia-http-client'], function (exports, _aureliaEventAggregator, _messages, _aureliaHttpClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Viewpanelpv = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class, _temp;

  var Viewpanelpv = exports.Viewpanelpv = (_temp = _class = function () {
    function Viewpanelpv(ea, httpclient) {
      var _this = this;

      _classCallCheck(this, Viewpanelpv);

      this.ea = ea;
      this.httpclient = httpclient;
      this.ea.subscribe(_messages.VisualizeFile, function (msg) {
        return _this.viewfile(msg.file);
      });
    }

    Viewpanelpv.prototype.attached = function attached() {
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

    Viewpanelpv.prototype.viewfile = function viewfile(file) {
      this.fileurl = file.webdavuri;
      console.log("viewfile()");
      console.log(file.webdavuri);
      this.loadfromurl(file.webdavuri);
    };

    Viewpanelpv.prototype.process = function process(pdb) {
      var structure = pv.io.pdb(pdb);
      this.viewer.cartoon('protein', structure, { color: color.ssSuccession() });
      this.viewer.centerOn(structure);
    };

    Viewpanelpv.prototype.loadlocalpdbfile = function loadlocalpdbfile() {};

    Viewpanelpv.prototype.loadpdbfile = function loadpdbfile() {
      var url = 'http://files.rcsb.org/view/' + this.pdbentry + '.pdb';

      this.loadfromurl(url);
    };

    Viewpanelpv.prototype.loadfromurl = function loadfromurl(url) {
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

    Viewpanelpv.prototype.loadfromredo = function loadfromredo() {
      this.loadfromurl('http://www.cmbi.ru.nl/pdb_redo/' + this.pdbentry2.substring(1, 3) + '/' + this.pdbentry2 + '/' + this.pdbentry2 + '_final.pdb');
    };

    return Viewpanelpv;
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
            this.lastpath = "";
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
            this.lastpath = this.path;
            var sepIndex = this.path.lastIndexOf('/');
            this.path = this.path.substring(0, sepIndex);
        };

        Filepanel.prototype.cddown = function cddown(subdir) {
            this.lastpath = this.path;
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
                    _this2.path = _this2.lastpath;
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

  var VisualizeFile = exports.VisualizeFile = function VisualizeFile(file, senderid) {
    _classCallCheck(this, VisualizeFile);

    this.file = file;
    this.senderid = senderid;
  };

  var EditFile = exports.EditFile = function EditFile(file, senderid) {
    _classCallCheck(this, EditFile);

    this.file = file;
    this.senderid = senderid;
  };
});
define('pdbcomponents/dataitem',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Dataitem = undefined;

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

  var Dataitem = exports.Dataitem = (_class = (_temp = _class2 = function () {
    function Dataitem(httpclient) {
      _classCallCheck(this, Dataitem);

      _initDefineProp(this, 'item', _descriptor, this);

      console.log('dataitem()');
      console.log(this.item);
      this.serviceurl = "http://www.ebi.ac.uk/pdbe/api/pdb/entry/molecules/";
      this.client = httpclient;

      this.entityids = [1];
      this.selectedid = this.entityids[0];
    }

    Dataitem.prototype.bind = function bind() {
      var _this = this;

      this.itemPDBEntry = this.isPDBEntry(this.item);
      this.showitem = this.itemPDBEntry;
      this.showuniprotitem = !this.itemPDBEntry;
      if (this.itemPDBEntry) {
        this.client.fetch(this.serviceurl + this.item).then(function (response) {
          return response.json();
        }).then(function (data) {

          console.log("ENTRY ID Fetch, data:");
          console.log(data);
          _this.entityids = [];
          for (var entryname in data) {
            for (var _iterator = data[entryname], _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
              var _ref;

              if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
              } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
              }

              var item = _ref;

              if (item.molecule_type.startsWith("polypeptide")) _this.entityids.push(item.entity_id);
            }
          }
          _this.selectedid = _this.entityids[0];
        }).catch(function (error) {

          console.log('Error');
          console.log(error);
        });
      }
    };

    Dataitem.prototype.attached = function attached() {
      if (this.itemPDBEntry) {
        this.stemel1 = this.el1.cloneNode();
        this.stemel2 = this.el2.cloneNode();
      }
    };

    Dataitem.prototype.selectedValueChanged = function selectedValueChanged() {
      var newel = this.stemel1.cloneNode();

      var parent = this.el1.parentNode;

      parent.removeChild(this.el1);

      newel.setAttribute("entity-id", this.selectedid);
      this.el1 = parent.appendChild(newel);
      angular.bootstrap(newel, ['pdb.component.library']);

      newel = this.stemel2.cloneNode();

      parent = this.el2.parentNode;

      parent.removeChild(this.el2);

      newel.setAttribute("entity-id", this.selectedid);

      this.el2 = parent.appendChild(newel);
      angular.bootstrap(newel, ['pdb.component.library']);
    };

    Dataitem.prototype.hideitem = function hideitem() {
      if (this.itemPDBEntry) {
        this.showitem = !this.showitem;
      } else {
        this.showuniprotitem = !this.showuniprotitem;
      }
    };

    Dataitem.prototype.isPDBEntry = function isPDBEntry(entry) {
      return (/^[0-9][A-Za-z0-9]{3}$/.test(entry)
      );
    };

    return Dataitem;
  }(), _class2.inject = [_aureliaFetchClient.HttpClient], _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'item', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return "";
    }
  })), _class);
});
define('pdbcomponents/dataset',["exports", "aurelia-http-client", "aurelia-framework"], function (exports, _aureliaHttpClient, _aureliaFramework) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Dataset = undefined;

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

  var _class, _temp;

  var Dataset = exports.Dataset = (_temp = _class = function () {
    function Dataset(httpclient) {
      _classCallCheck(this, Dataset);

      this.pdbdataset = [];
      this.pdbdataitem = "";
      this.pdblinkset = [];
      this.pdbdataitem = "";
      this.submitdisabled2 = true;
      var date = new Date();
      this.name = "dataset-" + date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate();
      this.client = httpclient;
      this.client.configure(function (config) {
        config.withHeader('Accept', 'application/json');
        config.withHeader('Content-Type', 'application/json');
      });
      this.showitem = true;
    }

    Dataset.prototype.additem = function additem(item) {
      console.log("additem()");
      this.pdbdataset.unshift(item);
    };

    Dataset.prototype.removeitem = function removeitem(itemtodelete) {
      this.pdbdataset = this.pdbdataset.filter(function (item) {
        return item !== itemtodelete;
      });
    };

    Dataset.prototype.hideitem = function hideitem() {
      this.showitem = !this.showitem;
    };

    Dataset.prototype.submit = function submit() {
      var _this = this;

      this.client.put("/metadataservice/dataset", JSON.stringify(this.pdbdataset)).then(function (data) {
        console.log("data response");
        console.log(data);9;
      }).catch(function (error) {
        console.log(error);
        alert('Sorry. Dataset not submitted  at ' + _this.serviceurl + ' error:' + error.response + " status:" + error.statusText);
      });
    };

    _createClass(Dataset, [{
      key: "canSubmit",
      get: function get() {
        if (this.pdbdataset.length > 0) return true;else return false;
      }
    }]);

    return Dataset;
  }(), _class.inject = [_aureliaHttpClient.HttpClient], _temp);
});
define('pdbcomponents/entry-id',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class, _temp;

  var EntryIdCustomAttribute = exports.EntryIdCustomAttribute = (_temp = _class = function () {
    function EntryIdCustomAttribute(element) {
      _classCallCheck(this, EntryIdCustomAttribute);

      this.element = element;
    }

    EntryIdCustomAttribute.prototype.valueChanged = function valueChanged(newValue, oldValue) {
      this.element.setAttribute('entry-id', this.value);
    };

    EntryIdCustomAttribute.prototype.attached = function attached() {
      angular.bootstrap(this.element, ['pdb.component.library']);
    };

    return EntryIdCustomAttribute;
  }(), _class.inject = [Element], _temp);
});
define('pdbcomponents/hideable',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Hideable = undefined;

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

  var _desc, _value, _class, _descriptor, _descriptor2;

  var Hideable = exports.Hideable = (_class = function () {
    function Hideable() {
      _classCallCheck(this, Hideable);

      _initDefineProp(this, 'title', _descriptor, this);

      _initDefineProp(this, 'defaulthide', _descriptor2, this);

      this.showit = true;
    }

    Hideable.prototype.bind = function bind() {
      if (this.defaulthide) {
        this.showit = false;
      }
    };

    Hideable.prototype.changeshowit = function changeshowit() {
      this.showit = !this.showit;
    };

    return Hideable;
  }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'title', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'defaulthide', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  })), _class);
});
define('pdbcomponents/pdb-id',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class, _temp;

  var PdbIdCustomAttribute = exports.PdbIdCustomAttribute = (_temp = _class = function () {
    function PdbIdCustomAttribute(element) {
      _classCallCheck(this, PdbIdCustomAttribute);

      this.element = element;
    }

    PdbIdCustomAttribute.prototype.valueChanged = function valueChanged(newValue, oldValue) {
      this.element.setAttribute('pdb-id', this.value);
    };

    PdbIdCustomAttribute.prototype.attached = function attached() {
      console.log('attached element with custom attribute pdb-id:');
      console.log(this.element.getAttribute('pdb-id'));
      angular.bootstrap(this.element, ['pdb.component.library']);
    };

    return PdbIdCustomAttribute;
  }(), _class.inject = [Element], _temp);
});
define('pdbcomponents/pdb-ids',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class, _temp;

  var PdbIdsCustomAttribute = exports.PdbIdsCustomAttribute = (_temp = _class = function () {
    function PdbIdsCustomAttribute(element) {
      _classCallCheck(this, PdbIdsCustomAttribute);

      this.element = element;
      this.bootstrapped = false;
    }

    PdbIdsCustomAttribute.prototype.valueChanged = function valueChanged(newValue, oldValue) {
      console.log('pdbids.valueChanged() element:' + this.element.tagName + " newvalue:" + newValue + ' this.value:' + this.value + ' current.attribute.pdb-ids:' + this.element.getAttribute('pdb-ids'));
      console.log(this.value);
      if (this.value.length > 0) {

        this.pdbids = this.value.split(',');

        this.pdbidsfilter = this.pdbids.filter(function (obj) {
          return (/^[0-9][A-Za-z0-9]{3}$/.test(obj)
          );
        });

        this.pdbidsjson = JSON.stringify(this.pdbidsfilter);

        if (this.pdbids.length > 0) {
          if (this.bootstrapped) {
            var myclone = this.elementclone.cloneNode();
            console.log('angular element');
            console.log(this.element);
            this.parent = this.element.parentNode;

            this.parent.removeChild(this.element);

            this.parent.appendChild(myclone);
            this.element = this.parent.children[0];
          } else {
            this.elementclone = this.element.cloneNode();
          }
          this.element.setAttribute('pdb-ids', this.pdbidsjson);
          angular.bootstrap(this.element, ['pdb.component.library']);
          this.bootstrapped = true;
        }
      }
    };

    return PdbIdsCustomAttribute;
  }(), _class.inject = [Element], _temp);
});
define('pdbcomponents/sasclient',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Sasclient = exports.Sasclient = function () {
    function Sasclient(httpclient) {
      _classCallCheck(this, Sasclient);

      this.httpclient = httpclient;
      this.config = {
        resultBoxAlign: 'left',
        redirectOnClick: false,
        searchUrl: '//www.ebi.ac.uk/pdbe/search/pdb-autocomplete/select',
        fields: 'value,num_pdb_entries,var_name',
        group: 'group=true&group.field=category',
        groupLimit: '25',
        sort: 'category+asc,num_pdb_entries+desc',
        searchParams: 'rows=20000&json.nl=map&wt=json'
      };
    }

    Sasclient.prototype.search = function search(term) {
      var url = this.config.searchUrl + "?" + this.config.searchParams + "&fl=" + this.config.fields + "&" + this.config.group + "&sort=" + this.config.sort + "&group.limit=" + this.config.groupLimit + "&q=value:" + term + "*~10";

      this.httpclient.get(url).then(function (data) {
        if (data.response) {

          return data.response.grouped.category.groups;
        }
      }).catch(function (error) {

        console.log('Error');
        console.log(error);
      });
    };

    Sasclient.prototype.searchMore = function searchMore(term) {};

    return Sasclient;
  }();
});
define('pdbcomponents/viewpanel',['exports', 'aurelia-event-aggregator', '../filepicker/messages', 'aurelia-http-client', 'aurelia-framework'], function (exports, _aureliaEventAggregator, _messages, _aureliaHttpClient, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Viewpanel = undefined;

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

  var Viewpanel = exports.Viewpanel = (_class = (_temp = _class2 = function () {
    function Viewpanel(el, ea, httpclient) {
      var _this = this;

      _classCallCheck(this, Viewpanel);

      _initDefineProp(this, 'panelid', _descriptor, this);

      this.element = el;
      this.ea = ea;
      this.httpclient = httpclient;
      this.ea.subscribe(_messages.VisualizeFile, function (msg) {
        return _this.viewfile(msg.file, msg.senderid);
      });

      this.sourceurl = "";
      this.sourceformat = "pdb";
      this.pdbentry = "1r6a";
    }

    Viewpanel.prototype.attached = function attached() {
      angular.bootstrap(this.element.querySelector('#pdbviewer'), ['pdb.component.library']);
    };

    Viewpanel.prototype.viewfile = function viewfile(file, senderid) {
      console.log("viewfile " + file.webdavuri);
      var pdblitemol = '<pdb-lite-mol load-ed-maps="true" source-url="' + file.webdavuri + '" pdb-id="\'\'" source-format="pdb"></pdb-lite-mol>';
      this.replacepdblitemol(pdblitemol);
    };

    Viewpanel.prototype.loadpdb = function loadpdb() {
      console.log("loadpdb " + this.pdbentry);
      var pdblitemol = '<pdb-lite-mol load-ed-maps="true" pdb-id="\'' + this.pdbentry + '\'"></pdb-lite-mol>';
      this.replacepdblitemol(pdblitemol);
    };

    Viewpanel.prototype.replacepdblitemol = function replacepdblitemol(pdblitemol) {
      var pdbviewer = this.element.querySelector('#pdbviewer');
      var parentnode = this.element.querySelector('#pdbwrapper');
      parentnode.removeChild(pdbviewer);

      parentnode.insertAdjacentHTML('afterbegin', '<div style="position:relative;height:400px;width:800px;" id="pdbviewer">' + pdblitemol + '</div>');

      angular.bootstrap(this.element.querySelector('#pdbviewer'), ['pdb.component.library']);
    };

    return Viewpanel;
  }(), _class2.inject = [Element, _aureliaEventAggregator.EventAggregator, _aureliaHttpClient.HttpClient], _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'panelid', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class);
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('tabs/messages',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var SelectedTab = exports.SelectedTab = function SelectedTab(tabid) {
    _classCallCheck(this, SelectedTab);

    this.tabid = tabid;
  };
});
define('tabs/tabs',['exports', 'aurelia-framework', 'aurelia-event-aggregator', './messages'], function (exports, _aureliaFramework, _aureliaEventAggregator, _messages) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Tabs = undefined;

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

    var Tabs = exports.Tabs = (_class = (_temp = _class2 = function () {
        function Tabs(el, ea) {
            _classCallCheck(this, Tabs);

            _initDefineProp(this, 'tabs', _descriptor, this);

            this.id = el.id;
            this.element = el;
            this.ea = ea;
        }

        Tabs.prototype.attached = function attached() {
            ;
        };

        Tabs.prototype.opentab = function opentab(tabid) {
            this.activeid = tabid.id;

            this.ea.publish(new _messages.SelectedTab(this.activeid));
        };

        return Tabs;
    }(), _class2.inject = [Element, _aureliaEventAggregator.EventAggregator], _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'tabs', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return null;
        }
    })), _class);
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
define('virtualfoldersetting/dropboxcontrol',['exports', './urlutils', 'aurelia-event-aggregator', './messages', 'dropbox', 'dropbox'], function (exports, _urlutils, _aureliaEventAggregator, _messages, _dropbox, Dropbox) {
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

      this.CLIENTIDENC = "o\"csb%'{{{ze'ya";

      console.log(Dropbox);
      var dbx = new Dropbox({ clientId: this.CLIENTIDENC.split('').map(function (c) {
          return String.fromCharCode(23 ^ c.charCodeAt());
        }).join("") });

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
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define('codemirror/mode/clike/clike',["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

function Context(indented, column, type, info, align, prev) {
  this.indented = indented;
  this.column = column;
  this.type = type;
  this.info = info;
  this.align = align;
  this.prev = prev;
}
function pushContext(state, col, type, info) {
  var indent = state.indented;
  if (state.context && state.context.type == "statement" && type != "statement")
    indent = state.context.indented;
  return state.context = new Context(indent, col, type, info, null, state.context);
}
function popContext(state) {
  var t = state.context.type;
  if (t == ")" || t == "]" || t == "}")
    state.indented = state.context.indented;
  return state.context = state.context.prev;
}

function typeBefore(stream, state, pos) {
  if (state.prevToken == "variable" || state.prevToken == "variable-3") return true;
  if (/\S(?:[^- ]>|[*\]])\s*$|\*$/.test(stream.string.slice(0, pos))) return true;
  if (state.typeAtEndOfLine && stream.column() == stream.indentation()) return true;
}

function isTopScope(context) {
  for (;;) {
    if (!context || context.type == "top") return true;
    if (context.type == "}" && context.prev.info != "namespace") return false;
    context = context.prev;
  }
}

CodeMirror.defineMode("clike", function(config, parserConfig) {
  var indentUnit = config.indentUnit,
      statementIndentUnit = parserConfig.statementIndentUnit || indentUnit,
      dontAlignCalls = parserConfig.dontAlignCalls,
      keywords = parserConfig.keywords || {},
      types = parserConfig.types || {},
      builtin = parserConfig.builtin || {},
      blockKeywords = parserConfig.blockKeywords || {},
      defKeywords = parserConfig.defKeywords || {},
      atoms = parserConfig.atoms || {},
      hooks = parserConfig.hooks || {},
      multiLineStrings = parserConfig.multiLineStrings,
      indentStatements = parserConfig.indentStatements !== false,
      indentSwitch = parserConfig.indentSwitch !== false,
      namespaceSeparator = parserConfig.namespaceSeparator,
      isPunctuationChar = parserConfig.isPunctuationChar || /[\[\]{}\(\),;\:\.]/,
      numberStart = parserConfig.numberStart || /[\d\.]/,
      number = parserConfig.number || /^(?:0x[a-f\d]+|0b[01]+|(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?)(u|ll?|l|f)?/i,
      isOperatorChar = parserConfig.isOperatorChar || /[+\-*&%=<>!?|\/]/;

  var curPunc, isDefKeyword;

  function tokenBase(stream, state) {
    var ch = stream.next();
    if (hooks[ch]) {
      var result = hooks[ch](stream, state);
      if (result !== false) return result;
    }
    if (ch == '"' || ch == "'") {
      state.tokenize = tokenString(ch);
      return state.tokenize(stream, state);
    }
    if (isPunctuationChar.test(ch)) {
      curPunc = ch;
      return null;
    }
    if (numberStart.test(ch)) {
      stream.backUp(1)
      if (stream.match(number)) return "number"
      stream.next()
    }
    if (ch == "/") {
      if (stream.eat("*")) {
        state.tokenize = tokenComment;
        return tokenComment(stream, state);
      }
      if (stream.eat("/")) {
        stream.skipToEnd();
        return "comment";
      }
    }
    if (isOperatorChar.test(ch)) {
      while (!stream.match(/^\/[\/*]/, false) && stream.eat(isOperatorChar)) {}
      return "operator";
    }
    stream.eatWhile(/[\w\$_\xa1-\uffff]/);
    if (namespaceSeparator) while (stream.match(namespaceSeparator))
      stream.eatWhile(/[\w\$_\xa1-\uffff]/);

    var cur = stream.current();
    if (contains(keywords, cur)) {
      if (contains(blockKeywords, cur)) curPunc = "newstatement";
      if (contains(defKeywords, cur)) isDefKeyword = true;
      return "keyword";
    }
    if (contains(types, cur)) return "variable-3";
    if (contains(builtin, cur)) {
      if (contains(blockKeywords, cur)) curPunc = "newstatement";
      return "builtin";
    }
    if (contains(atoms, cur)) return "atom";
    return "variable";
  }

  function tokenString(quote) {
    return function(stream, state) {
      var escaped = false, next, end = false;
      while ((next = stream.next()) != null) {
        if (next == quote && !escaped) {end = true; break;}
        escaped = !escaped && next == "\\";
      }
      if (end || !(escaped || multiLineStrings))
        state.tokenize = null;
      return "string";
    };
  }

  function tokenComment(stream, state) {
    var maybeEnd = false, ch;
    while (ch = stream.next()) {
      if (ch == "/" && maybeEnd) {
        state.tokenize = null;
        break;
      }
      maybeEnd = (ch == "*");
    }
    return "comment";
  }

  function maybeEOL(stream, state) {
    if (parserConfig.typeFirstDefinitions && stream.eol() && isTopScope(state.context))
      state.typeAtEndOfLine = typeBefore(stream, state, stream.pos)
  }

  // Interface

  return {
    startState: function(basecolumn) {
      return {
        tokenize: null,
        context: new Context((basecolumn || 0) - indentUnit, 0, "top", null, false),
        indented: 0,
        startOfLine: true,
        prevToken: null
      };
    },

    token: function(stream, state) {
      var ctx = state.context;
      if (stream.sol()) {
        if (ctx.align == null) ctx.align = false;
        state.indented = stream.indentation();
        state.startOfLine = true;
      }
      if (stream.eatSpace()) { maybeEOL(stream, state); return null; }
      curPunc = isDefKeyword = null;
      var style = (state.tokenize || tokenBase)(stream, state);
      if (style == "comment" || style == "meta") return style;
      if (ctx.align == null) ctx.align = true;

      if (curPunc == ";" || curPunc == ":" || (curPunc == "," && stream.match(/^\s*(?:\/\/.*)?$/, false)))
        while (state.context.type == "statement") popContext(state);
      else if (curPunc == "{") pushContext(state, stream.column(), "}");
      else if (curPunc == "[") pushContext(state, stream.column(), "]");
      else if (curPunc == "(") pushContext(state, stream.column(), ")");
      else if (curPunc == "}") {
        while (ctx.type == "statement") ctx = popContext(state);
        if (ctx.type == "}") ctx = popContext(state);
        while (ctx.type == "statement") ctx = popContext(state);
      }
      else if (curPunc == ctx.type) popContext(state);
      else if (indentStatements &&
               (((ctx.type == "}" || ctx.type == "top") && curPunc != ";") ||
                (ctx.type == "statement" && curPunc == "newstatement"))) {
        pushContext(state, stream.column(), "statement", stream.current());
      }

      if (style == "variable" &&
          ((state.prevToken == "def" ||
            (parserConfig.typeFirstDefinitions && typeBefore(stream, state, stream.start) &&
             isTopScope(state.context) && stream.match(/^\s*\(/, false)))))
        style = "def";

      if (hooks.token) {
        var result = hooks.token(stream, state, style);
        if (result !== undefined) style = result;
      }

      if (style == "def" && parserConfig.styleDefs === false) style = "variable";

      state.startOfLine = false;
      state.prevToken = isDefKeyword ? "def" : style || curPunc;
      maybeEOL(stream, state);
      return style;
    },

    indent: function(state, textAfter) {
      if (state.tokenize != tokenBase && state.tokenize != null || state.typeAtEndOfLine) return CodeMirror.Pass;
      var ctx = state.context, firstChar = textAfter && textAfter.charAt(0);
      if (ctx.type == "statement" && firstChar == "}") ctx = ctx.prev;
      if (parserConfig.dontIndentStatements)
        while (ctx.type == "statement" && parserConfig.dontIndentStatements.test(ctx.info))
          ctx = ctx.prev
      if (hooks.indent) {
        var hook = hooks.indent(state, ctx, textAfter);
        if (typeof hook == "number") return hook
      }
      var closing = firstChar == ctx.type;
      var switchBlock = ctx.prev && ctx.prev.info == "switch";
      if (parserConfig.allmanIndentation && /[{(]/.test(firstChar)) {
        while (ctx.type != "top" && ctx.type != "}") ctx = ctx.prev
        return ctx.indented
      }
      if (ctx.type == "statement")
        return ctx.indented + (firstChar == "{" ? 0 : statementIndentUnit);
      if (ctx.align && (!dontAlignCalls || ctx.type != ")"))
        return ctx.column + (closing ? 0 : 1);
      if (ctx.type == ")" && !closing)
        return ctx.indented + statementIndentUnit;

      return ctx.indented + (closing ? 0 : indentUnit) +
        (!closing && switchBlock && !/^(?:case|default)\b/.test(textAfter) ? indentUnit : 0);
    },

    electricInput: indentSwitch ? /^\s*(?:case .*?:|default:|\{\}?|\})$/ : /^\s*[{}]$/,
    blockCommentStart: "/*",
    blockCommentEnd: "*/",
    lineComment: "//",
    fold: "brace"
  };
});

  function words(str) {
    var obj = {}, words = str.split(" ");
    for (var i = 0; i < words.length; ++i) obj[words[i]] = true;
    return obj;
  }
  function contains(words, word) {
    if (typeof words === "function") {
      return words(word);
    } else {
      return words.propertyIsEnumerable(word);
    }
  }
  var cKeywords = "auto if break case register continue return default do sizeof " +
    "static else struct switch extern typedef union for goto while enum const volatile";
  var cTypes = "int long char short double float unsigned signed void size_t ptrdiff_t";

  function cppHook(stream, state) {
    if (!state.startOfLine) return false
    for (var ch, next = null; ch = stream.peek();) {
      if (ch == "\\" && stream.match(/^.$/)) {
        next = cppHook
        break
      } else if (ch == "/" && stream.match(/^\/[\/\*]/, false)) {
        break
      }
      stream.next()
    }
    state.tokenize = next
    return "meta"
  }

  function pointerHook(_stream, state) {
    if (state.prevToken == "variable-3") return "variable-3";
    return false;
  }

  function cpp14Literal(stream) {
    stream.eatWhile(/[\w\.']/);
    return "number";
  }

  function cpp11StringHook(stream, state) {
    stream.backUp(1);
    // Raw strings.
    if (stream.match(/(R|u8R|uR|UR|LR)/)) {
      var match = stream.match(/"([^\s\\()]{0,16})\(/);
      if (!match) {
        return false;
      }
      state.cpp11RawStringDelim = match[1];
      state.tokenize = tokenRawString;
      return tokenRawString(stream, state);
    }
    // Unicode strings/chars.
    if (stream.match(/(u8|u|U|L)/)) {
      if (stream.match(/["']/, /* eat */ false)) {
        return "string";
      }
      return false;
    }
    // Ignore this hook.
    stream.next();
    return false;
  }

  function cppLooksLikeConstructor(word) {
    var lastTwo = /(\w+)::(\w+)$/.exec(word);
    return lastTwo && lastTwo[1] == lastTwo[2];
  }

  // C#-style strings where "" escapes a quote.
  function tokenAtString(stream, state) {
    var next;
    while ((next = stream.next()) != null) {
      if (next == '"' && !stream.eat('"')) {
        state.tokenize = null;
        break;
      }
    }
    return "string";
  }

  // C++11 raw string literal is <prefix>"<delim>( anything )<delim>", where
  // <delim> can be a string up to 16 characters long.
  function tokenRawString(stream, state) {
    // Escape characters that have special regex meanings.
    var delim = state.cpp11RawStringDelim.replace(/[^\w\s]/g, '\\$&');
    var match = stream.match(new RegExp(".*?\\)" + delim + '"'));
    if (match)
      state.tokenize = null;
    else
      stream.skipToEnd();
    return "string";
  }

  function def(mimes, mode) {
    if (typeof mimes == "string") mimes = [mimes];
    var words = [];
    function add(obj) {
      if (obj) for (var prop in obj) if (obj.hasOwnProperty(prop))
        words.push(prop);
    }
    add(mode.keywords);
    add(mode.types);
    add(mode.builtin);
    add(mode.atoms);
    if (words.length) {
      mode.helperType = mimes[0];
      CodeMirror.registerHelper("hintWords", mimes[0], words);
    }

    for (var i = 0; i < mimes.length; ++i)
      CodeMirror.defineMIME(mimes[i], mode);
  }

  def(["text/x-csrc", "text/x-c", "text/x-chdr"], {
    name: "clike",
    keywords: words(cKeywords),
    types: words(cTypes + " bool _Complex _Bool float_t double_t intptr_t intmax_t " +
                 "int8_t int16_t int32_t int64_t uintptr_t uintmax_t uint8_t uint16_t " +
                 "uint32_t uint64_t"),
    blockKeywords: words("case do else for if switch while struct"),
    defKeywords: words("struct"),
    typeFirstDefinitions: true,
    atoms: words("null true false"),
    hooks: {"#": cppHook, "*": pointerHook},
    modeProps: {fold: ["brace", "include"]}
  });

  def(["text/x-c++src", "text/x-c++hdr"], {
    name: "clike",
    keywords: words(cKeywords + " asm dynamic_cast namespace reinterpret_cast try explicit new " +
                    "static_cast typeid catch operator template typename class friend private " +
                    "this using const_cast inline public throw virtual delete mutable protected " +
                    "alignas alignof constexpr decltype nullptr noexcept thread_local final " +
                    "static_assert override"),
    types: words(cTypes + " bool wchar_t"),
    blockKeywords: words("catch class do else finally for if struct switch try while"),
    defKeywords: words("class namespace struct enum union"),
    typeFirstDefinitions: true,
    atoms: words("true false null"),
    dontIndentStatements: /^template$/,
    hooks: {
      "#": cppHook,
      "*": pointerHook,
      "u": cpp11StringHook,
      "U": cpp11StringHook,
      "L": cpp11StringHook,
      "R": cpp11StringHook,
      "0": cpp14Literal,
      "1": cpp14Literal,
      "2": cpp14Literal,
      "3": cpp14Literal,
      "4": cpp14Literal,
      "5": cpp14Literal,
      "6": cpp14Literal,
      "7": cpp14Literal,
      "8": cpp14Literal,
      "9": cpp14Literal,
      token: function(stream, state, style) {
        if (style == "variable" && stream.peek() == "(" &&
            (state.prevToken == ";" || state.prevToken == null ||
             state.prevToken == "}") &&
            cppLooksLikeConstructor(stream.current()))
          return "def";
      }
    },
    namespaceSeparator: "::",
    modeProps: {fold: ["brace", "include"]}
  });

  def("text/x-java", {
    name: "clike",
    keywords: words("abstract assert break case catch class const continue default " +
                    "do else enum extends final finally float for goto if implements import " +
                    "instanceof interface native new package private protected public " +
                    "return static strictfp super switch synchronized this throw throws transient " +
                    "try volatile while @interface"),
    types: words("byte short int long float double boolean char void Boolean Byte Character Double Float " +
                 "Integer Long Number Object Short String StringBuffer StringBuilder Void"),
    blockKeywords: words("catch class do else finally for if switch try while"),
    defKeywords: words("class interface package enum @interface"),
    typeFirstDefinitions: true,
    atoms: words("true false null"),
    number: /^(?:0x[a-f\d_]+|0b[01_]+|(?:[\d_]+\.?\d*|\.\d+)(?:e[-+]?[\d_]+)?)(u|ll?|l|f)?/i,
    hooks: {
      "@": function(stream) {
        // Don't match the @interface keyword.
        if (stream.match('interface', false)) return false;

        stream.eatWhile(/[\w\$_]/);
        return "meta";
      }
    },
    modeProps: {fold: ["brace", "import"]}
  });

  def("text/x-csharp", {
    name: "clike",
    keywords: words("abstract as async await base break case catch checked class const continue" +
                    " default delegate do else enum event explicit extern finally fixed for" +
                    " foreach goto if implicit in interface internal is lock namespace new" +
                    " operator out override params private protected public readonly ref return sealed" +
                    " sizeof stackalloc static struct switch this throw try typeof unchecked" +
                    " unsafe using virtual void volatile while add alias ascending descending dynamic from get" +
                    " global group into join let orderby partial remove select set value var yield"),
    types: words("Action Boolean Byte Char DateTime DateTimeOffset Decimal Double Func" +
                 " Guid Int16 Int32 Int64 Object SByte Single String Task TimeSpan UInt16 UInt32" +
                 " UInt64 bool byte char decimal double short int long object"  +
                 " sbyte float string ushort uint ulong"),
    blockKeywords: words("catch class do else finally for foreach if struct switch try while"),
    defKeywords: words("class interface namespace struct var"),
    typeFirstDefinitions: true,
    atoms: words("true false null"),
    hooks: {
      "@": function(stream, state) {
        if (stream.eat('"')) {
          state.tokenize = tokenAtString;
          return tokenAtString(stream, state);
        }
        stream.eatWhile(/[\w\$_]/);
        return "meta";
      }
    }
  });

  function tokenTripleString(stream, state) {
    var escaped = false;
    while (!stream.eol()) {
      if (!escaped && stream.match('"""')) {
        state.tokenize = null;
        break;
      }
      escaped = stream.next() == "\\" && !escaped;
    }
    return "string";
  }

  def("text/x-scala", {
    name: "clike",
    keywords: words(

      /* scala */
      "abstract case catch class def do else extends final finally for forSome if " +
      "implicit import lazy match new null object override package private protected return " +
      "sealed super this throw trait try type val var while with yield _ " +

      /* package scala */
      "assert assume require print println printf readLine readBoolean readByte readShort " +
      "readChar readInt readLong readFloat readDouble"
    ),
    types: words(
      "AnyVal App Application Array BufferedIterator BigDecimal BigInt Char Console Either " +
      "Enumeration Equiv Error Exception Fractional Function IndexedSeq Int Integral Iterable " +
      "Iterator List Map Numeric Nil NotNull Option Ordered Ordering PartialFunction PartialOrdering " +
      "Product Proxy Range Responder Seq Serializable Set Specializable Stream StringBuilder " +
      "StringContext Symbol Throwable Traversable TraversableOnce Tuple Unit Vector " +

      /* package java.lang */
      "Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable " +
      "Compiler Double Exception Float Integer Long Math Number Object Package Pair Process " +
      "Runtime Runnable SecurityManager Short StackTraceElement StrictMath String " +
      "StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void"
    ),
    multiLineStrings: true,
    blockKeywords: words("catch class do else finally for forSome if match switch try while"),
    defKeywords: words("class def object package trait type val var"),
    atoms: words("true false null"),
    indentStatements: false,
    indentSwitch: false,
    isOperatorChar: /[+\-*&%=<>!?|\/#:@]/,
    hooks: {
      "@": function(stream) {
        stream.eatWhile(/[\w\$_]/);
        return "meta";
      },
      '"': function(stream, state) {
        if (!stream.match('""')) return false;
        state.tokenize = tokenTripleString;
        return state.tokenize(stream, state);
      },
      "'": function(stream) {
        stream.eatWhile(/[\w\$_\xa1-\uffff]/);
        return "atom";
      },
      "=": function(stream, state) {
        var cx = state.context
        if (cx.type == "}" && cx.align && stream.eat(">")) {
          state.context = new Context(cx.indented, cx.column, cx.type, cx.info, null, cx.prev)
          return "operator"
        } else {
          return false
        }
      }
    },
    modeProps: {closeBrackets: {triples: '"'}}
  });

  function tokenKotlinString(tripleString){
    return function (stream, state) {
      var escaped = false, next, end = false;
      while (!stream.eol()) {
        if (!tripleString && !escaped && stream.match('"') ) {end = true; break;}
        if (tripleString && stream.match('"""')) {end = true; break;}
        next = stream.next();
        if(!escaped && next == "$" && stream.match('{'))
          stream.skipTo("}");
        escaped = !escaped && next == "\\" && !tripleString;
      }
      if (end || !tripleString)
        state.tokenize = null;
      return "string";
    }
  }

  def("text/x-kotlin", {
    name: "clike",
    keywords: words(
      /*keywords*/
      "package as typealias class interface this super val " +
      "var fun for is in This throw return " +
      "break continue object if else while do try when !in !is as? " +

      /*soft keywords*/
      "file import where by get set abstract enum open inner override private public internal " +
      "protected catch finally out final vararg reified dynamic companion constructor init " +
      "sealed field property receiver param sparam lateinit data inline noinline tailrec " +
      "external annotation crossinline const operator infix suspend"
    ),
    types: words(
      /* package java.lang */
      "Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable " +
      "Compiler Double Exception Float Integer Long Math Number Object Package Pair Process " +
      "Runtime Runnable SecurityManager Short StackTraceElement StrictMath String " +
      "StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void"
    ),
    intendSwitch: false,
    indentStatements: false,
    multiLineStrings: true,
    number: /^(?:0x[a-f\d_]+|0b[01_]+|(?:[\d_]+\.?\d*|\.\d+)(?:e[-+]?[\d_]+)?)(u|ll?|l|f)?/i,
    blockKeywords: words("catch class do else finally for if where try while enum"),
    defKeywords: words("class val var object package interface fun"),
    atoms: words("true false null this"),
    hooks: {
      '"': function(stream, state) {
        state.tokenize = tokenKotlinString(stream.match('""'));
        return state.tokenize(stream, state);
      }
    },
    modeProps: {closeBrackets: {triples: '"'}}
  });

  def(["x-shader/x-vertex", "x-shader/x-fragment"], {
    name: "clike",
    keywords: words("sampler1D sampler2D sampler3D samplerCube " +
                    "sampler1DShadow sampler2DShadow " +
                    "const attribute uniform varying " +
                    "break continue discard return " +
                    "for while do if else struct " +
                    "in out inout"),
    types: words("float int bool void " +
                 "vec2 vec3 vec4 ivec2 ivec3 ivec4 bvec2 bvec3 bvec4 " +
                 "mat2 mat3 mat4"),
    blockKeywords: words("for while do if else struct"),
    builtin: words("radians degrees sin cos tan asin acos atan " +
                    "pow exp log exp2 sqrt inversesqrt " +
                    "abs sign floor ceil fract mod min max clamp mix step smoothstep " +
                    "length distance dot cross normalize ftransform faceforward " +
                    "reflect refract matrixCompMult " +
                    "lessThan lessThanEqual greaterThan greaterThanEqual " +
                    "equal notEqual any all not " +
                    "texture1D texture1DProj texture1DLod texture1DProjLod " +
                    "texture2D texture2DProj texture2DLod texture2DProjLod " +
                    "texture3D texture3DProj texture3DLod texture3DProjLod " +
                    "textureCube textureCubeLod " +
                    "shadow1D shadow2D shadow1DProj shadow2DProj " +
                    "shadow1DLod shadow2DLod shadow1DProjLod shadow2DProjLod " +
                    "dFdx dFdy fwidth " +
                    "noise1 noise2 noise3 noise4"),
    atoms: words("true false " +
                "gl_FragColor gl_SecondaryColor gl_Normal gl_Vertex " +
                "gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 gl_MultiTexCoord3 " +
                "gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 " +
                "gl_FogCoord gl_PointCoord " +
                "gl_Position gl_PointSize gl_ClipVertex " +
                "gl_FrontColor gl_BackColor gl_FrontSecondaryColor gl_BackSecondaryColor " +
                "gl_TexCoord gl_FogFragCoord " +
                "gl_FragCoord gl_FrontFacing " +
                "gl_FragData gl_FragDepth " +
                "gl_ModelViewMatrix gl_ProjectionMatrix gl_ModelViewProjectionMatrix " +
                "gl_TextureMatrix gl_NormalMatrix gl_ModelViewMatrixInverse " +
                "gl_ProjectionMatrixInverse gl_ModelViewProjectionMatrixInverse " +
                "gl_TexureMatrixTranspose gl_ModelViewMatrixInverseTranspose " +
                "gl_ProjectionMatrixInverseTranspose " +
                "gl_ModelViewProjectionMatrixInverseTranspose " +
                "gl_TextureMatrixInverseTranspose " +
                "gl_NormalScale gl_DepthRange gl_ClipPlane " +
                "gl_Point gl_FrontMaterial gl_BackMaterial gl_LightSource gl_LightModel " +
                "gl_FrontLightModelProduct gl_BackLightModelProduct " +
                "gl_TextureColor gl_EyePlaneS gl_EyePlaneT gl_EyePlaneR gl_EyePlaneQ " +
                "gl_FogParameters " +
                "gl_MaxLights gl_MaxClipPlanes gl_MaxTextureUnits gl_MaxTextureCoords " +
                "gl_MaxVertexAttribs gl_MaxVertexUniformComponents gl_MaxVaryingFloats " +
                "gl_MaxVertexTextureImageUnits gl_MaxTextureImageUnits " +
                "gl_MaxFragmentUniformComponents gl_MaxCombineTextureImageUnits " +
                "gl_MaxDrawBuffers"),
    indentSwitch: false,
    hooks: {"#": cppHook},
    modeProps: {fold: ["brace", "include"]}
  });

  def("text/x-nesc", {
    name: "clike",
    keywords: words(cKeywords + "as atomic async call command component components configuration event generic " +
                    "implementation includes interface module new norace nx_struct nx_union post provides " +
                    "signal task uses abstract extends"),
    types: words(cTypes),
    blockKeywords: words("case do else for if switch while struct"),
    atoms: words("null true false"),
    hooks: {"#": cppHook},
    modeProps: {fold: ["brace", "include"]}
  });

  def("text/x-objectivec", {
    name: "clike",
    keywords: words(cKeywords + "inline restrict _Bool _Complex _Imaginary BOOL Class bycopy byref id IMP in " +
                    "inout nil oneway out Protocol SEL self super atomic nonatomic retain copy readwrite readonly"),
    types: words(cTypes),
    atoms: words("YES NO NULL NILL ON OFF true false"),
    hooks: {
      "@": function(stream) {
        stream.eatWhile(/[\w\$]/);
        return "keyword";
      },
      "#": cppHook,
      indent: function(_state, ctx, textAfter) {
        if (ctx.type == "statement" && /^@\w/.test(textAfter)) return ctx.indented
      }
    },
    modeProps: {fold: "brace"}
  });

  def("text/x-squirrel", {
    name: "clike",
    keywords: words("base break clone continue const default delete enum extends function in class" +
                    " foreach local resume return this throw typeof yield constructor instanceof static"),
    types: words(cTypes),
    blockKeywords: words("case catch class else for foreach if switch try while"),
    defKeywords: words("function local class"),
    typeFirstDefinitions: true,
    atoms: words("true false null"),
    hooks: {"#": cppHook},
    modeProps: {fold: ["brace", "include"]}
  });

  // Ceylon Strings need to deal with interpolation
  var stringTokenizer = null;
  function tokenCeylonString(type) {
    return function(stream, state) {
      var escaped = false, next, end = false;
      while (!stream.eol()) {
        if (!escaped && stream.match('"') &&
              (type == "single" || stream.match('""'))) {
          end = true;
          break;
        }
        if (!escaped && stream.match('``')) {
          stringTokenizer = tokenCeylonString(type);
          end = true;
          break;
        }
        next = stream.next();
        escaped = type == "single" && !escaped && next == "\\";
      }
      if (end)
          state.tokenize = null;
      return "string";
    }
  }

  def("text/x-ceylon", {
    name: "clike",
    keywords: words("abstracts alias assembly assert assign break case catch class continue dynamic else" +
                    " exists extends finally for function given if import in interface is let module new" +
                    " nonempty object of out outer package return satisfies super switch then this throw" +
                    " try value void while"),
    types: function(word) {
        // In Ceylon all identifiers that start with an uppercase are types
        var first = word.charAt(0);
        return (first === first.toUpperCase() && first !== first.toLowerCase());
    },
    blockKeywords: words("case catch class dynamic else finally for function if interface module new object switch try while"),
    defKeywords: words("class dynamic function interface module object package value"),
    builtin: words("abstract actual aliased annotation by default deprecated doc final formal late license" +
                   " native optional sealed see serializable shared suppressWarnings tagged throws variable"),
    isPunctuationChar: /[\[\]{}\(\),;\:\.`]/,
    isOperatorChar: /[+\-*&%=<>!?|^~:\/]/,
    numberStart: /[\d#$]/,
    number: /^(?:#[\da-fA-F_]+|\$[01_]+|[\d_]+[kMGTPmunpf]?|[\d_]+\.[\d_]+(?:[eE][-+]?\d+|[kMGTPmunpf]|)|)/i,
    multiLineStrings: true,
    typeFirstDefinitions: true,
    atoms: words("true false null larger smaller equal empty finished"),
    indentSwitch: false,
    styleDefs: false,
    hooks: {
      "@": function(stream) {
        stream.eatWhile(/[\w\$_]/);
        return "meta";
      },
      '"': function(stream, state) {
          state.tokenize = tokenCeylonString(stream.match('""') ? "triple" : "single");
          return state.tokenize(stream, state);
        },
      '`': function(stream, state) {
          if (!stringTokenizer || !stream.match('`')) return false;
          state.tokenize = stringTokenizer;
          stringTokenizer = null;
          return state.tokenize(stream, state);
        },
      "'": function(stream) {
        stream.eatWhile(/[\w\$_\xa1-\uffff]/);
        return "atom";
      },
      token: function(_stream, state, style) {
          if ((style == "variable" || style == "variable-3") &&
              state.prevToken == ".") {
            return "variable-2";
          }
        }
    },
    modeProps: {
        fold: ["brace", "import"],
        closeBrackets: {triples: '"'}
    }
  });

});

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"), require("../xml/xml"), require("../javascript/javascript"), require("../css/css"));
  else if (typeof define == "function" && define.amd) // AMD
    define('codemirror/mode/htmlmixed/htmlmixed',["../../lib/codemirror", "../xml/xml", "../javascript/javascript", "../css/css"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  var defaultTags = {
    script: [
      ["lang", /(javascript|babel)/i, "javascript"],
      ["type", /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i, "javascript"],
      ["type", /./, "text/plain"],
      [null, null, "javascript"]
    ],
    style:  [
      ["lang", /^css$/i, "css"],
      ["type", /^(text\/)?(x-)?(stylesheet|css)$/i, "css"],
      ["type", /./, "text/plain"],
      [null, null, "css"]
    ]
  };

  function maybeBackup(stream, pat, style) {
    var cur = stream.current(), close = cur.search(pat);
    if (close > -1) {
      stream.backUp(cur.length - close);
    } else if (cur.match(/<\/?$/)) {
      stream.backUp(cur.length);
      if (!stream.match(pat, false)) stream.match(cur);
    }
    return style;
  }

  var attrRegexpCache = {};
  function getAttrRegexp(attr) {
    var regexp = attrRegexpCache[attr];
    if (regexp) return regexp;
    return attrRegexpCache[attr] = new RegExp("\\s+" + attr + "\\s*=\\s*('|\")?([^'\"]+)('|\")?\\s*");
  }

  function getAttrValue(text, attr) {
    var match = text.match(getAttrRegexp(attr))
    return match ? /^\s*(.*?)\s*$/.exec(match[2])[1] : ""
  }

  function getTagRegexp(tagName, anchored) {
    return new RegExp((anchored ? "^" : "") + "<\/\s*" + tagName + "\s*>", "i");
  }

  function addTags(from, to) {
    for (var tag in from) {
      var dest = to[tag] || (to[tag] = []);
      var source = from[tag];
      for (var i = source.length - 1; i >= 0; i--)
        dest.unshift(source[i])
    }
  }

  function findMatchingMode(tagInfo, tagText) {
    for (var i = 0; i < tagInfo.length; i++) {
      var spec = tagInfo[i];
      if (!spec[0] || spec[1].test(getAttrValue(tagText, spec[0]))) return spec[2];
    }
  }

  CodeMirror.defineMode("htmlmixed", function (config, parserConfig) {
    var htmlMode = CodeMirror.getMode(config, {
      name: "xml",
      htmlMode: true,
      multilineTagIndentFactor: parserConfig.multilineTagIndentFactor,
      multilineTagIndentPastTag: parserConfig.multilineTagIndentPastTag
    });

    var tags = {};
    var configTags = parserConfig && parserConfig.tags, configScript = parserConfig && parserConfig.scriptTypes;
    addTags(defaultTags, tags);
    if (configTags) addTags(configTags, tags);
    if (configScript) for (var i = configScript.length - 1; i >= 0; i--)
      tags.script.unshift(["type", configScript[i].matches, configScript[i].mode])

    function html(stream, state) {
      var style = htmlMode.token(stream, state.htmlState), tag = /\btag\b/.test(style), tagName
      if (tag && !/[<>\s\/]/.test(stream.current()) &&
          (tagName = state.htmlState.tagName && state.htmlState.tagName.toLowerCase()) &&
          tags.hasOwnProperty(tagName)) {
        state.inTag = tagName + " "
      } else if (state.inTag && tag && />$/.test(stream.current())) {
        var inTag = /^([\S]+) (.*)/.exec(state.inTag)
        state.inTag = null
        var modeSpec = stream.current() == ">" && findMatchingMode(tags[inTag[1]], inTag[2])
        var mode = CodeMirror.getMode(config, modeSpec)
        var endTagA = getTagRegexp(inTag[1], true), endTag = getTagRegexp(inTag[1], false);
        state.token = function (stream, state) {
          if (stream.match(endTagA, false)) {
            state.token = html;
            state.localState = state.localMode = null;
            return null;
          }
          return maybeBackup(stream, endTag, state.localMode.token(stream, state.localState));
        };
        state.localMode = mode;
        state.localState = CodeMirror.startState(mode, htmlMode.indent(state.htmlState, ""));
      } else if (state.inTag) {
        state.inTag += stream.current()
        if (stream.eol()) state.inTag += " "
      }
      return style;
    };

    return {
      startState: function () {
        var state = CodeMirror.startState(htmlMode);
        return {token: html, inTag: null, localMode: null, localState: null, htmlState: state};
      },

      copyState: function (state) {
        var local;
        if (state.localState) {
          local = CodeMirror.copyState(state.localMode, state.localState);
        }
        return {token: state.token, inTag: state.inTag,
                localMode: state.localMode, localState: local,
                htmlState: CodeMirror.copyState(htmlMode, state.htmlState)};
      },

      token: function (stream, state) {
        return state.token(stream, state);
      },

      indent: function (state, textAfter) {
        if (!state.localMode || /^\s*<\//.test(textAfter))
          return htmlMode.indent(state.htmlState, textAfter);
        else if (state.localMode.indent)
          return state.localMode.indent(state.localState, textAfter);
        else
          return CodeMirror.Pass;
      },

      innerMode: function (state) {
        return {state: state.localState || state.htmlState, mode: state.localMode || htmlMode};
      }
    };
  }, "xml", "javascript", "css");

  CodeMirror.defineMIME("text/html", "htmlmixed");
});

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define('codemirror/mode/xml/xml',["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

var htmlConfig = {
  autoSelfClosers: {'area': true, 'base': true, 'br': true, 'col': true, 'command': true,
                    'embed': true, 'frame': true, 'hr': true, 'img': true, 'input': true,
                    'keygen': true, 'link': true, 'meta': true, 'param': true, 'source': true,
                    'track': true, 'wbr': true, 'menuitem': true},
  implicitlyClosed: {'dd': true, 'li': true, 'optgroup': true, 'option': true, 'p': true,
                     'rp': true, 'rt': true, 'tbody': true, 'td': true, 'tfoot': true,
                     'th': true, 'tr': true},
  contextGrabbers: {
    'dd': {'dd': true, 'dt': true},
    'dt': {'dd': true, 'dt': true},
    'li': {'li': true},
    'option': {'option': true, 'optgroup': true},
    'optgroup': {'optgroup': true},
    'p': {'address': true, 'article': true, 'aside': true, 'blockquote': true, 'dir': true,
          'div': true, 'dl': true, 'fieldset': true, 'footer': true, 'form': true,
          'h1': true, 'h2': true, 'h3': true, 'h4': true, 'h5': true, 'h6': true,
          'header': true, 'hgroup': true, 'hr': true, 'menu': true, 'nav': true, 'ol': true,
          'p': true, 'pre': true, 'section': true, 'table': true, 'ul': true},
    'rp': {'rp': true, 'rt': true},
    'rt': {'rp': true, 'rt': true},
    'tbody': {'tbody': true, 'tfoot': true},
    'td': {'td': true, 'th': true},
    'tfoot': {'tbody': true},
    'th': {'td': true, 'th': true},
    'thead': {'tbody': true, 'tfoot': true},
    'tr': {'tr': true}
  },
  doNotIndent: {"pre": true},
  allowUnquoted: true,
  allowMissing: true,
  caseFold: true
}

var xmlConfig = {
  autoSelfClosers: {},
  implicitlyClosed: {},
  contextGrabbers: {},
  doNotIndent: {},
  allowUnquoted: false,
  allowMissing: false,
  caseFold: false
}

CodeMirror.defineMode("xml", function(editorConf, config_) {
  var indentUnit = editorConf.indentUnit
  var config = {}
  var defaults = config_.htmlMode ? htmlConfig : xmlConfig
  for (var prop in defaults) config[prop] = defaults[prop]
  for (var prop in config_) config[prop] = config_[prop]

  // Return variables for tokenizers
  var type, setStyle;

  function inText(stream, state) {
    function chain(parser) {
      state.tokenize = parser;
      return parser(stream, state);
    }

    var ch = stream.next();
    if (ch == "<") {
      if (stream.eat("!")) {
        if (stream.eat("[")) {
          if (stream.match("CDATA[")) return chain(inBlock("atom", "]]>"));
          else return null;
        } else if (stream.match("--")) {
          return chain(inBlock("comment", "-->"));
        } else if (stream.match("DOCTYPE", true, true)) {
          stream.eatWhile(/[\w\._\-]/);
          return chain(doctype(1));
        } else {
          return null;
        }
      } else if (stream.eat("?")) {
        stream.eatWhile(/[\w\._\-]/);
        state.tokenize = inBlock("meta", "?>");
        return "meta";
      } else {
        type = stream.eat("/") ? "closeTag" : "openTag";
        state.tokenize = inTag;
        return "tag bracket";
      }
    } else if (ch == "&") {
      var ok;
      if (stream.eat("#")) {
        if (stream.eat("x")) {
          ok = stream.eatWhile(/[a-fA-F\d]/) && stream.eat(";");
        } else {
          ok = stream.eatWhile(/[\d]/) && stream.eat(";");
        }
      } else {
        ok = stream.eatWhile(/[\w\.\-:]/) && stream.eat(";");
      }
      return ok ? "atom" : "error";
    } else {
      stream.eatWhile(/[^&<]/);
      return null;
    }
  }
  inText.isInText = true;

  function inTag(stream, state) {
    var ch = stream.next();
    if (ch == ">" || (ch == "/" && stream.eat(">"))) {
      state.tokenize = inText;
      type = ch == ">" ? "endTag" : "selfcloseTag";
      return "tag bracket";
    } else if (ch == "=") {
      type = "equals";
      return null;
    } else if (ch == "<") {
      state.tokenize = inText;
      state.state = baseState;
      state.tagName = state.tagStart = null;
      var next = state.tokenize(stream, state);
      return next ? next + " tag error" : "tag error";
    } else if (/[\'\"]/.test(ch)) {
      state.tokenize = inAttribute(ch);
      state.stringStartCol = stream.column();
      return state.tokenize(stream, state);
    } else {
      stream.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/);
      return "word";
    }
  }

  function inAttribute(quote) {
    var closure = function(stream, state) {
      while (!stream.eol()) {
        if (stream.next() == quote) {
          state.tokenize = inTag;
          break;
        }
      }
      return "string";
    };
    closure.isInAttribute = true;
    return closure;
  }

  function inBlock(style, terminator) {
    return function(stream, state) {
      while (!stream.eol()) {
        if (stream.match(terminator)) {
          state.tokenize = inText;
          break;
        }
        stream.next();
      }
      return style;
    };
  }
  function doctype(depth) {
    return function(stream, state) {
      var ch;
      while ((ch = stream.next()) != null) {
        if (ch == "<") {
          state.tokenize = doctype(depth + 1);
          return state.tokenize(stream, state);
        } else if (ch == ">") {
          if (depth == 1) {
            state.tokenize = inText;
            break;
          } else {
            state.tokenize = doctype(depth - 1);
            return state.tokenize(stream, state);
          }
        }
      }
      return "meta";
    };
  }

  function Context(state, tagName, startOfLine) {
    this.prev = state.context;
    this.tagName = tagName;
    this.indent = state.indented;
    this.startOfLine = startOfLine;
    if (config.doNotIndent.hasOwnProperty(tagName) || (state.context && state.context.noIndent))
      this.noIndent = true;
  }
  function popContext(state) {
    if (state.context) state.context = state.context.prev;
  }
  function maybePopContext(state, nextTagName) {
    var parentTagName;
    while (true) {
      if (!state.context) {
        return;
      }
      parentTagName = state.context.tagName;
      if (!config.contextGrabbers.hasOwnProperty(parentTagName) ||
          !config.contextGrabbers[parentTagName].hasOwnProperty(nextTagName)) {
        return;
      }
      popContext(state);
    }
  }

  function baseState(type, stream, state) {
    if (type == "openTag") {
      state.tagStart = stream.column();
      return tagNameState;
    } else if (type == "closeTag") {
      return closeTagNameState;
    } else {
      return baseState;
    }
  }
  function tagNameState(type, stream, state) {
    if (type == "word") {
      state.tagName = stream.current();
      setStyle = "tag";
      return attrState;
    } else {
      setStyle = "error";
      return tagNameState;
    }
  }
  function closeTagNameState(type, stream, state) {
    if (type == "word") {
      var tagName = stream.current();
      if (state.context && state.context.tagName != tagName &&
          config.implicitlyClosed.hasOwnProperty(state.context.tagName))
        popContext(state);
      if ((state.context && state.context.tagName == tagName) || config.matchClosing === false) {
        setStyle = "tag";
        return closeState;
      } else {
        setStyle = "tag error";
        return closeStateErr;
      }
    } else {
      setStyle = "error";
      return closeStateErr;
    }
  }

  function closeState(type, _stream, state) {
    if (type != "endTag") {
      setStyle = "error";
      return closeState;
    }
    popContext(state);
    return baseState;
  }
  function closeStateErr(type, stream, state) {
    setStyle = "error";
    return closeState(type, stream, state);
  }

  function attrState(type, _stream, state) {
    if (type == "word") {
      setStyle = "attribute";
      return attrEqState;
    } else if (type == "endTag" || type == "selfcloseTag") {
      var tagName = state.tagName, tagStart = state.tagStart;
      state.tagName = state.tagStart = null;
      if (type == "selfcloseTag" ||
          config.autoSelfClosers.hasOwnProperty(tagName)) {
        maybePopContext(state, tagName);
      } else {
        maybePopContext(state, tagName);
        state.context = new Context(state, tagName, tagStart == state.indented);
      }
      return baseState;
    }
    setStyle = "error";
    return attrState;
  }
  function attrEqState(type, stream, state) {
    if (type == "equals") return attrValueState;
    if (!config.allowMissing) setStyle = "error";
    return attrState(type, stream, state);
  }
  function attrValueState(type, stream, state) {
    if (type == "string") return attrContinuedState;
    if (type == "word" && config.allowUnquoted) {setStyle = "string"; return attrState;}
    setStyle = "error";
    return attrState(type, stream, state);
  }
  function attrContinuedState(type, stream, state) {
    if (type == "string") return attrContinuedState;
    return attrState(type, stream, state);
  }

  return {
    startState: function(baseIndent) {
      var state = {tokenize: inText,
                   state: baseState,
                   indented: baseIndent || 0,
                   tagName: null, tagStart: null,
                   context: null}
      if (baseIndent != null) state.baseIndent = baseIndent
      return state
    },

    token: function(stream, state) {
      if (!state.tagName && stream.sol())
        state.indented = stream.indentation();

      if (stream.eatSpace()) return null;
      type = null;
      var style = state.tokenize(stream, state);
      if ((style || type) && style != "comment") {
        setStyle = null;
        state.state = state.state(type || style, stream, state);
        if (setStyle)
          style = setStyle == "error" ? style + " error" : setStyle;
      }
      return style;
    },

    indent: function(state, textAfter, fullLine) {
      var context = state.context;
      // Indent multi-line strings (e.g. css).
      if (state.tokenize.isInAttribute) {
        if (state.tagStart == state.indented)
          return state.stringStartCol + 1;
        else
          return state.indented + indentUnit;
      }
      if (context && context.noIndent) return CodeMirror.Pass;
      if (state.tokenize != inTag && state.tokenize != inText)
        return fullLine ? fullLine.match(/^(\s*)/)[0].length : 0;
      // Indent the starts of attribute names.
      if (state.tagName) {
        if (config.multilineTagIndentPastTag !== false)
          return state.tagStart + state.tagName.length + 2;
        else
          return state.tagStart + indentUnit * (config.multilineTagIndentFactor || 1);
      }
      if (config.alignCDATA && /<!\[CDATA\[/.test(textAfter)) return 0;
      var tagAfter = textAfter && /^<(\/)?([\w_:\.-]*)/.exec(textAfter);
      if (tagAfter && tagAfter[1]) { // Closing tag spotted
        while (context) {
          if (context.tagName == tagAfter[2]) {
            context = context.prev;
            break;
          } else if (config.implicitlyClosed.hasOwnProperty(context.tagName)) {
            context = context.prev;
          } else {
            break;
          }
        }
      } else if (tagAfter) { // Opening tag spotted
        while (context) {
          var grabbers = config.contextGrabbers[context.tagName];
          if (grabbers && grabbers.hasOwnProperty(tagAfter[2]))
            context = context.prev;
          else
            break;
        }
      }
      while (context && context.prev && !context.startOfLine)
        context = context.prev;
      if (context) return context.indent + indentUnit;
      else return state.baseIndent || 0;
    },

    electricInput: /<\/[\s\w:]+>$/,
    blockCommentStart: "<!--",
    blockCommentEnd: "-->",

    configuration: config.htmlMode ? "html" : "xml",
    helperType: config.htmlMode ? "html" : "xml",

    skipAttribute: function(state) {
      if (state.state == attrValueState)
        state.state = attrState
    }
  };
});

CodeMirror.defineMIME("text/xml", "xml");
CodeMirror.defineMIME("application/xml", "xml");
if (!CodeMirror.mimeModes.hasOwnProperty("text/html"))
  CodeMirror.defineMIME("text/html", {name: "xml", htmlMode: true});

});

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define('codemirror/mode/javascript/javascript',["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

function expressionAllowed(stream, state, backUp) {
  return /^(?:operator|sof|keyword c|case|new|export|default|[\[{}\(,;:]|=>)$/.test(state.lastType) ||
    (state.lastType == "quasi" && /\{\s*$/.test(stream.string.slice(0, stream.pos - (backUp || 0))))
}

CodeMirror.defineMode("javascript", function(config, parserConfig) {
  var indentUnit = config.indentUnit;
  var statementIndent = parserConfig.statementIndent;
  var jsonldMode = parserConfig.jsonld;
  var jsonMode = parserConfig.json || jsonldMode;
  var isTS = parserConfig.typescript;
  var wordRE = parserConfig.wordCharacters || /[\w$\xa1-\uffff]/;

  // Tokenizer

  var keywords = function(){
    function kw(type) {return {type: type, style: "keyword"};}
    var A = kw("keyword a"), B = kw("keyword b"), C = kw("keyword c");
    var operator = kw("operator"), atom = {type: "atom", style: "atom"};

    var jsKeywords = {
      "if": kw("if"), "while": A, "with": A, "else": B, "do": B, "try": B, "finally": B,
      "return": C, "break": C, "continue": C, "new": kw("new"), "delete": C, "throw": C, "debugger": C,
      "var": kw("var"), "const": kw("var"), "let": kw("var"),
      "function": kw("function"), "catch": kw("catch"),
      "for": kw("for"), "switch": kw("switch"), "case": kw("case"), "default": kw("default"),
      "in": operator, "typeof": operator, "instanceof": operator,
      "true": atom, "false": atom, "null": atom, "undefined": atom, "NaN": atom, "Infinity": atom,
      "this": kw("this"), "class": kw("class"), "super": kw("atom"),
      "yield": C, "export": kw("export"), "import": kw("import"), "extends": C,
      "await": C, "async": kw("async")
    };

    // Extend the 'normal' keywords with the TypeScript language extensions
    if (isTS) {
      var type = {type: "variable", style: "variable-3"};
      var tsKeywords = {
        // object-like things
        "interface": kw("class"),
        "implements": C,
        "namespace": C,
        "module": kw("module"),
        "enum": kw("module"),
        "type": kw("type"),

        // scope modifiers
        "public": kw("modifier"),
        "private": kw("modifier"),
        "protected": kw("modifier"),
        "abstract": kw("modifier"),

        // operators
        "as": operator,

        // types
        "string": type, "number": type, "boolean": type, "any": type
      };

      for (var attr in tsKeywords) {
        jsKeywords[attr] = tsKeywords[attr];
      }
    }

    return jsKeywords;
  }();

  var isOperatorChar = /[+\-*&%=<>!?|~^]/;
  var isJsonldKeyword = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;

  function readRegexp(stream) {
    var escaped = false, next, inSet = false;
    while ((next = stream.next()) != null) {
      if (!escaped) {
        if (next == "/" && !inSet) return;
        if (next == "[") inSet = true;
        else if (inSet && next == "]") inSet = false;
      }
      escaped = !escaped && next == "\\";
    }
  }

  // Used as scratch variables to communicate multiple values without
  // consing up tons of objects.
  var type, content;
  function ret(tp, style, cont) {
    type = tp; content = cont;
    return style;
  }
  function tokenBase(stream, state) {
    var ch = stream.next();
    if (ch == '"' || ch == "'") {
      state.tokenize = tokenString(ch);
      return state.tokenize(stream, state);
    } else if (ch == "." && stream.match(/^\d+(?:[eE][+\-]?\d+)?/)) {
      return ret("number", "number");
    } else if (ch == "." && stream.match("..")) {
      return ret("spread", "meta");
    } else if (/[\[\]{}\(\),;\:\.]/.test(ch)) {
      return ret(ch);
    } else if (ch == "=" && stream.eat(">")) {
      return ret("=>", "operator");
    } else if (ch == "0" && stream.eat(/x/i)) {
      stream.eatWhile(/[\da-f]/i);
      return ret("number", "number");
    } else if (ch == "0" && stream.eat(/o/i)) {
      stream.eatWhile(/[0-7]/i);
      return ret("number", "number");
    } else if (ch == "0" && stream.eat(/b/i)) {
      stream.eatWhile(/[01]/i);
      return ret("number", "number");
    } else if (/\d/.test(ch)) {
      stream.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/);
      return ret("number", "number");
    } else if (ch == "/") {
      if (stream.eat("*")) {
        state.tokenize = tokenComment;
        return tokenComment(stream, state);
      } else if (stream.eat("/")) {
        stream.skipToEnd();
        return ret("comment", "comment");
      } else if (expressionAllowed(stream, state, 1)) {
        readRegexp(stream);
        stream.match(/^\b(([gimyu])(?![gimyu]*\2))+\b/);
        return ret("regexp", "string-2");
      } else {
        stream.eatWhile(isOperatorChar);
        return ret("operator", "operator", stream.current());
      }
    } else if (ch == "`") {
      state.tokenize = tokenQuasi;
      return tokenQuasi(stream, state);
    } else if (ch == "#") {
      stream.skipToEnd();
      return ret("error", "error");
    } else if (isOperatorChar.test(ch)) {
      if (ch != ">" || !state.lexical || state.lexical.type != ">")
        stream.eatWhile(isOperatorChar);
      return ret("operator", "operator", stream.current());
    } else if (wordRE.test(ch)) {
      stream.eatWhile(wordRE);
      var word = stream.current(), known = keywords.propertyIsEnumerable(word) && keywords[word];
      return (known && state.lastType != ".") ? ret(known.type, known.style, word) :
                     ret("variable", "variable", word);
    }
  }

  function tokenString(quote) {
    return function(stream, state) {
      var escaped = false, next;
      if (jsonldMode && stream.peek() == "@" && stream.match(isJsonldKeyword)){
        state.tokenize = tokenBase;
        return ret("jsonld-keyword", "meta");
      }
      while ((next = stream.next()) != null) {
        if (next == quote && !escaped) break;
        escaped = !escaped && next == "\\";
      }
      if (!escaped) state.tokenize = tokenBase;
      return ret("string", "string");
    };
  }

  function tokenComment(stream, state) {
    var maybeEnd = false, ch;
    while (ch = stream.next()) {
      if (ch == "/" && maybeEnd) {
        state.tokenize = tokenBase;
        break;
      }
      maybeEnd = (ch == "*");
    }
    return ret("comment", "comment");
  }

  function tokenQuasi(stream, state) {
    var escaped = false, next;
    while ((next = stream.next()) != null) {
      if (!escaped && (next == "`" || next == "$" && stream.eat("{"))) {
        state.tokenize = tokenBase;
        break;
      }
      escaped = !escaped && next == "\\";
    }
    return ret("quasi", "string-2", stream.current());
  }

  var brackets = "([{}])";
  // This is a crude lookahead trick to try and notice that we're
  // parsing the argument patterns for a fat-arrow function before we
  // actually hit the arrow token. It only works if the arrow is on
  // the same line as the arguments and there's no strange noise
  // (comments) in between. Fallback is to only notice when we hit the
  // arrow, and not declare the arguments as locals for the arrow
  // body.
  function findFatArrow(stream, state) {
    if (state.fatArrowAt) state.fatArrowAt = null;
    var arrow = stream.string.indexOf("=>", stream.start);
    if (arrow < 0) return;

    if (isTS) { // Try to skip TypeScript return type declarations after the arguments
      var m = /:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(stream.string.slice(stream.start, arrow))
      if (m) arrow = m.index
    }

    var depth = 0, sawSomething = false;
    for (var pos = arrow - 1; pos >= 0; --pos) {
      var ch = stream.string.charAt(pos);
      var bracket = brackets.indexOf(ch);
      if (bracket >= 0 && bracket < 3) {
        if (!depth) { ++pos; break; }
        if (--depth == 0) { if (ch == "(") sawSomething = true; break; }
      } else if (bracket >= 3 && bracket < 6) {
        ++depth;
      } else if (wordRE.test(ch)) {
        sawSomething = true;
      } else if (/["'\/]/.test(ch)) {
        return;
      } else if (sawSomething && !depth) {
        ++pos;
        break;
      }
    }
    if (sawSomething && !depth) state.fatArrowAt = pos;
  }

  // Parser

  var atomicTypes = {"atom": true, "number": true, "variable": true, "string": true, "regexp": true, "this": true, "jsonld-keyword": true};

  function JSLexical(indented, column, type, align, prev, info) {
    this.indented = indented;
    this.column = column;
    this.type = type;
    this.prev = prev;
    this.info = info;
    if (align != null) this.align = align;
  }

  function inScope(state, varname) {
    for (var v = state.localVars; v; v = v.next)
      if (v.name == varname) return true;
    for (var cx = state.context; cx; cx = cx.prev) {
      for (var v = cx.vars; v; v = v.next)
        if (v.name == varname) return true;
    }
  }

  function parseJS(state, style, type, content, stream) {
    var cc = state.cc;
    // Communicate our context to the combinators.
    // (Less wasteful than consing up a hundred closures on every call.)
    cx.state = state; cx.stream = stream; cx.marked = null, cx.cc = cc; cx.style = style;

    if (!state.lexical.hasOwnProperty("align"))
      state.lexical.align = true;

    while(true) {
      var combinator = cc.length ? cc.pop() : jsonMode ? expression : statement;
      if (combinator(type, content)) {
        while(cc.length && cc[cc.length - 1].lex)
          cc.pop()();
        if (cx.marked) return cx.marked;
        if (type == "variable" && inScope(state, content)) return "variable-2";
        return style;
      }
    }
  }

  // Combinator utils

  var cx = {state: null, column: null, marked: null, cc: null};
  function pass() {
    for (var i = arguments.length - 1; i >= 0; i--) cx.cc.push(arguments[i]);
  }
  function cont() {
    pass.apply(null, arguments);
    return true;
  }
  function register(varname) {
    function inList(list) {
      for (var v = list; v; v = v.next)
        if (v.name == varname) return true;
      return false;
    }
    var state = cx.state;
    cx.marked = "def";
    if (state.context) {
      if (inList(state.localVars)) return;
      state.localVars = {name: varname, next: state.localVars};
    } else {
      if (inList(state.globalVars)) return;
      if (parserConfig.globalVars)
        state.globalVars = {name: varname, next: state.globalVars};
    }
  }

  // Combinators

  var defaultVars = {name: "this", next: {name: "arguments"}};
  function pushcontext() {
    cx.state.context = {prev: cx.state.context, vars: cx.state.localVars};
    cx.state.localVars = defaultVars;
  }
  function popcontext() {
    cx.state.localVars = cx.state.context.vars;
    cx.state.context = cx.state.context.prev;
  }
  function pushlex(type, info) {
    var result = function() {
      var state = cx.state, indent = state.indented;
      if (state.lexical.type == "stat") indent = state.lexical.indented;
      else for (var outer = state.lexical; outer && outer.type == ")" && outer.align; outer = outer.prev)
        indent = outer.indented;
      state.lexical = new JSLexical(indent, cx.stream.column(), type, null, state.lexical, info);
    };
    result.lex = true;
    return result;
  }
  function poplex() {
    var state = cx.state;
    if (state.lexical.prev) {
      if (state.lexical.type == ")")
        state.indented = state.lexical.indented;
      state.lexical = state.lexical.prev;
    }
  }
  poplex.lex = true;

  function expect(wanted) {
    function exp(type) {
      if (type == wanted) return cont();
      else if (wanted == ";") return pass();
      else return cont(exp);
    };
    return exp;
  }

  function statement(type, value) {
    if (type == "var") return cont(pushlex("vardef", value.length), vardef, expect(";"), poplex);
    if (type == "keyword a") return cont(pushlex("form"), parenExpr, statement, poplex);
    if (type == "keyword b") return cont(pushlex("form"), statement, poplex);
    if (type == "{") return cont(pushlex("}"), block, poplex);
    if (type == ";") return cont();
    if (type == "if") {
      if (cx.state.lexical.info == "else" && cx.state.cc[cx.state.cc.length - 1] == poplex)
        cx.state.cc.pop()();
      return cont(pushlex("form"), parenExpr, statement, poplex, maybeelse);
    }
    if (type == "function") return cont(functiondef);
    if (type == "for") return cont(pushlex("form"), forspec, statement, poplex);
    if (type == "variable") return cont(pushlex("stat"), maybelabel);
    if (type == "switch") return cont(pushlex("form"), parenExpr, pushlex("}", "switch"), expect("{"),
                                      block, poplex, poplex);
    if (type == "case") return cont(expression, expect(":"));
    if (type == "default") return cont(expect(":"));
    if (type == "catch") return cont(pushlex("form"), pushcontext, expect("("), funarg, expect(")"),
                                     statement, poplex, popcontext);
    if (type == "class") return cont(pushlex("form"), className, poplex);
    if (type == "export") return cont(pushlex("stat"), afterExport, poplex);
    if (type == "import") return cont(pushlex("stat"), afterImport, poplex);
    if (type == "module") return cont(pushlex("form"), pattern, pushlex("}"), expect("{"), block, poplex, poplex)
    if (type == "type") return cont(typeexpr, expect("operator"), typeexpr, expect(";"));
    if (type == "async") return cont(statement)
    return pass(pushlex("stat"), expression, expect(";"), poplex);
  }
  function expression(type) {
    return expressionInner(type, false);
  }
  function expressionNoComma(type) {
    return expressionInner(type, true);
  }
  function parenExpr(type) {
    if (type != "(") return pass()
    return cont(pushlex(")"), expression, expect(")"), poplex)
  }
  function expressionInner(type, noComma) {
    if (cx.state.fatArrowAt == cx.stream.start) {
      var body = noComma ? arrowBodyNoComma : arrowBody;
      if (type == "(") return cont(pushcontext, pushlex(")"), commasep(pattern, ")"), poplex, expect("=>"), body, popcontext);
      else if (type == "variable") return pass(pushcontext, pattern, expect("=>"), body, popcontext);
    }

    var maybeop = noComma ? maybeoperatorNoComma : maybeoperatorComma;
    if (atomicTypes.hasOwnProperty(type)) return cont(maybeop);
    if (type == "function") return cont(functiondef, maybeop);
    if (type == "class") return cont(pushlex("form"), classExpression, poplex);
    if (type == "keyword c" || type == "async") return cont(noComma ? maybeexpressionNoComma : maybeexpression);
    if (type == "(") return cont(pushlex(")"), maybeexpression, expect(")"), poplex, maybeop);
    if (type == "operator" || type == "spread") return cont(noComma ? expressionNoComma : expression);
    if (type == "[") return cont(pushlex("]"), arrayLiteral, poplex, maybeop);
    if (type == "{") return contCommasep(objprop, "}", null, maybeop);
    if (type == "quasi") return pass(quasi, maybeop);
    if (type == "new") return cont(maybeTarget(noComma));
    return cont();
  }
  function maybeexpression(type) {
    if (type.match(/[;\}\)\],]/)) return pass();
    return pass(expression);
  }
  function maybeexpressionNoComma(type) {
    if (type.match(/[;\}\)\],]/)) return pass();
    return pass(expressionNoComma);
  }

  function maybeoperatorComma(type, value) {
    if (type == ",") return cont(expression);
    return maybeoperatorNoComma(type, value, false);
  }
  function maybeoperatorNoComma(type, value, noComma) {
    var me = noComma == false ? maybeoperatorComma : maybeoperatorNoComma;
    var expr = noComma == false ? expression : expressionNoComma;
    if (type == "=>") return cont(pushcontext, noComma ? arrowBodyNoComma : arrowBody, popcontext);
    if (type == "operator") {
      if (/\+\+|--/.test(value)) return cont(me);
      if (value == "?") return cont(expression, expect(":"), expr);
      return cont(expr);
    }
    if (type == "quasi") { return pass(quasi, me); }
    if (type == ";") return;
    if (type == "(") return contCommasep(expressionNoComma, ")", "call", me);
    if (type == ".") return cont(property, me);
    if (type == "[") return cont(pushlex("]"), maybeexpression, expect("]"), poplex, me);
  }
  function quasi(type, value) {
    if (type != "quasi") return pass();
    if (value.slice(value.length - 2) != "${") return cont(quasi);
    return cont(expression, continueQuasi);
  }
  function continueQuasi(type) {
    if (type == "}") {
      cx.marked = "string-2";
      cx.state.tokenize = tokenQuasi;
      return cont(quasi);
    }
  }
  function arrowBody(type) {
    findFatArrow(cx.stream, cx.state);
    return pass(type == "{" ? statement : expression);
  }
  function arrowBodyNoComma(type) {
    findFatArrow(cx.stream, cx.state);
    return pass(type == "{" ? statement : expressionNoComma);
  }
  function maybeTarget(noComma) {
    return function(type) {
      if (type == ".") return cont(noComma ? targetNoComma : target);
      else return pass(noComma ? expressionNoComma : expression);
    };
  }
  function target(_, value) {
    if (value == "target") { cx.marked = "keyword"; return cont(maybeoperatorComma); }
  }
  function targetNoComma(_, value) {
    if (value == "target") { cx.marked = "keyword"; return cont(maybeoperatorNoComma); }
  }
  function maybelabel(type) {
    if (type == ":") return cont(poplex, statement);
    return pass(maybeoperatorComma, expect(";"), poplex);
  }
  function property(type) {
    if (type == "variable") {cx.marked = "property"; return cont();}
  }
  function objprop(type, value) {
    if (type == "async") {
      cx.marked = "property";
      return cont(objprop);
    } else if (type == "variable" || cx.style == "keyword") {
      cx.marked = "property";
      if (value == "get" || value == "set") return cont(getterSetter);
      return cont(afterprop);
    } else if (type == "number" || type == "string") {
      cx.marked = jsonldMode ? "property" : (cx.style + " property");
      return cont(afterprop);
    } else if (type == "jsonld-keyword") {
      return cont(afterprop);
    } else if (type == "modifier") {
      return cont(objprop)
    } else if (type == "[") {
      return cont(expression, expect("]"), afterprop);
    } else if (type == "spread") {
      return cont(expression);
    } else if (type == ":") {
      return pass(afterprop)
    }
  }
  function getterSetter(type) {
    if (type != "variable") return pass(afterprop);
    cx.marked = "property";
    return cont(functiondef);
  }
  function afterprop(type) {
    if (type == ":") return cont(expressionNoComma);
    if (type == "(") return pass(functiondef);
  }
  function commasep(what, end, sep) {
    function proceed(type, value) {
      if (sep ? sep.indexOf(type) > -1 : type == ",") {
        var lex = cx.state.lexical;
        if (lex.info == "call") lex.pos = (lex.pos || 0) + 1;
        return cont(function(type, value) {
          if (type == end || value == end) return pass()
          return pass(what)
        }, proceed);
      }
      if (type == end || value == end) return cont();
      return cont(expect(end));
    }
    return function(type, value) {
      if (type == end || value == end) return cont();
      return pass(what, proceed);
    };
  }
  function contCommasep(what, end, info) {
    for (var i = 3; i < arguments.length; i++)
      cx.cc.push(arguments[i]);
    return cont(pushlex(end, info), commasep(what, end), poplex);
  }
  function block(type) {
    if (type == "}") return cont();
    return pass(statement, block);
  }
  function maybetype(type, value) {
    if (isTS) {
      if (type == ":") return cont(typeexpr);
      if (value == "?") return cont(maybetype);
    }
  }
  function typeexpr(type) {
    if (type == "variable") {cx.marked = "variable-3"; return cont(afterType);}
    if (type == "string" || type == "number" || type == "atom") return cont(afterType);
    if (type == "{") return cont(pushlex("}"), commasep(typeprop, "}", ",;"), poplex)
    if (type == "(") return cont(commasep(typearg, ")"), maybeReturnType)
  }
  function maybeReturnType(type) {
    if (type == "=>") return cont(typeexpr)
  }
  function typeprop(type, value) {
    if (type == "variable" || cx.style == "keyword") {
      cx.marked = "property"
      return cont(typeprop)
    } else if (value == "?") {
      return cont(typeprop)
    } else if (type == ":") {
      return cont(typeexpr)
    }
  }
  function typearg(type) {
    if (type == "variable") return cont(typearg)
    else if (type == ":") return cont(typeexpr)
  }
  function afterType(type, value) {
    if (value == "<") return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, afterType)
    if (value == "|" || type == ".") return cont(typeexpr)
    if (type == "[") return cont(expect("]"), afterType)
  }
  function vardef() {
    return pass(pattern, maybetype, maybeAssign, vardefCont);
  }
  function pattern(type, value) {
    if (type == "modifier") return cont(pattern)
    if (type == "variable") { register(value); return cont(); }
    if (type == "spread") return cont(pattern);
    if (type == "[") return contCommasep(pattern, "]");
    if (type == "{") return contCommasep(proppattern, "}");
  }
  function proppattern(type, value) {
    if (type == "variable" && !cx.stream.match(/^\s*:/, false)) {
      register(value);
      return cont(maybeAssign);
    }
    if (type == "variable") cx.marked = "property";
    if (type == "spread") return cont(pattern);
    if (type == "}") return pass();
    return cont(expect(":"), pattern, maybeAssign);
  }
  function maybeAssign(_type, value) {
    if (value == "=") return cont(expressionNoComma);
  }
  function vardefCont(type) {
    if (type == ",") return cont(vardef);
  }
  function maybeelse(type, value) {
    if (type == "keyword b" && value == "else") return cont(pushlex("form", "else"), statement, poplex);
  }
  function forspec(type) {
    if (type == "(") return cont(pushlex(")"), forspec1, expect(")"), poplex);
  }
  function forspec1(type) {
    if (type == "var") return cont(vardef, expect(";"), forspec2);
    if (type == ";") return cont(forspec2);
    if (type == "variable") return cont(formaybeinof);
    return pass(expression, expect(";"), forspec2);
  }
  function formaybeinof(_type, value) {
    if (value == "in" || value == "of") { cx.marked = "keyword"; return cont(expression); }
    return cont(maybeoperatorComma, forspec2);
  }
  function forspec2(type, value) {
    if (type == ";") return cont(forspec3);
    if (value == "in" || value == "of") { cx.marked = "keyword"; return cont(expression); }
    return pass(expression, expect(";"), forspec3);
  }
  function forspec3(type) {
    if (type != ")") cont(expression);
  }
  function functiondef(type, value) {
    if (value == "*") {cx.marked = "keyword"; return cont(functiondef);}
    if (type == "variable") {register(value); return cont(functiondef);}
    if (type == "(") return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, maybetype, statement, popcontext);
  }
  function funarg(type) {
    if (type == "spread") return cont(funarg);
    return pass(pattern, maybetype, maybeAssign);
  }
  function classExpression(type, value) {
    // Class expressions may have an optional name.
    if (type == "variable") return className(type, value);
    return classNameAfter(type, value);
  }
  function className(type, value) {
    if (type == "variable") {register(value); return cont(classNameAfter);}
  }
  function classNameAfter(type, value) {
    if (value == "<") return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, classNameAfter)
    if (value == "extends" || value == "implements" || (isTS && type == ","))
      return cont(isTS ? typeexpr : expression, classNameAfter);
    if (type == "{") return cont(pushlex("}"), classBody, poplex);
  }
  function classBody(type, value) {
    if (type == "variable" || cx.style == "keyword") {
      if ((value == "async" || value == "static" || value == "get" || value == "set" ||
           (isTS && (value == "public" || value == "private" || value == "protected" || value == "readonly" || value == "abstract"))) &&
          cx.stream.match(/^\s+[\w$\xa1-\uffff]/, false)) {
        cx.marked = "keyword";
        return cont(classBody);
      }
      cx.marked = "property";
      return cont(isTS ? classfield : functiondef, classBody);
    }
    if (type == "[")
      return cont(expression, expect("]"), isTS ? classfield : functiondef, classBody)
    if (value == "*") {
      cx.marked = "keyword";
      return cont(classBody);
    }
    if (type == ";") return cont(classBody);
    if (type == "}") return cont();
  }
  function classfield(type, value) {
    if (value == "?") return cont(classfield)
    if (type == ":") return cont(typeexpr, maybeAssign)
    if (value == "=") return cont(expressionNoComma)
    return pass(functiondef)
  }
  function afterExport(type, value) {
    if (value == "*") { cx.marked = "keyword"; return cont(maybeFrom, expect(";")); }
    if (value == "default") { cx.marked = "keyword"; return cont(expression, expect(";")); }
    if (type == "{") return cont(commasep(exportField, "}"), maybeFrom, expect(";"));
    return pass(statement);
  }
  function exportField(type, value) {
    if (value == "as") { cx.marked = "keyword"; return cont(expect("variable")); }
    if (type == "variable") return pass(expressionNoComma, exportField);
  }
  function afterImport(type) {
    if (type == "string") return cont();
    return pass(importSpec, maybeMoreImports, maybeFrom);
  }
  function importSpec(type, value) {
    if (type == "{") return contCommasep(importSpec, "}");
    if (type == "variable") register(value);
    if (value == "*") cx.marked = "keyword";
    return cont(maybeAs);
  }
  function maybeMoreImports(type) {
    if (type == ",") return cont(importSpec, maybeMoreImports)
  }
  function maybeAs(_type, value) {
    if (value == "as") { cx.marked = "keyword"; return cont(importSpec); }
  }
  function maybeFrom(_type, value) {
    if (value == "from") { cx.marked = "keyword"; return cont(expression); }
  }
  function arrayLiteral(type) {
    if (type == "]") return cont();
    return pass(commasep(expressionNoComma, "]"));
  }

  function isContinuedStatement(state, textAfter) {
    return state.lastType == "operator" || state.lastType == "," ||
      isOperatorChar.test(textAfter.charAt(0)) ||
      /[,.]/.test(textAfter.charAt(0));
  }

  // Interface

  return {
    startState: function(basecolumn) {
      var state = {
        tokenize: tokenBase,
        lastType: "sof",
        cc: [],
        lexical: new JSLexical((basecolumn || 0) - indentUnit, 0, "block", false),
        localVars: parserConfig.localVars,
        context: parserConfig.localVars && {vars: parserConfig.localVars},
        indented: basecolumn || 0
      };
      if (parserConfig.globalVars && typeof parserConfig.globalVars == "object")
        state.globalVars = parserConfig.globalVars;
      return state;
    },

    token: function(stream, state) {
      if (stream.sol()) {
        if (!state.lexical.hasOwnProperty("align"))
          state.lexical.align = false;
        state.indented = stream.indentation();
        findFatArrow(stream, state);
      }
      if (state.tokenize != tokenComment && stream.eatSpace()) return null;
      var style = state.tokenize(stream, state);
      if (type == "comment") return style;
      state.lastType = type == "operator" && (content == "++" || content == "--") ? "incdec" : type;
      return parseJS(state, style, type, content, stream);
    },

    indent: function(state, textAfter) {
      if (state.tokenize == tokenComment) return CodeMirror.Pass;
      if (state.tokenize != tokenBase) return 0;
      var firstChar = textAfter && textAfter.charAt(0), lexical = state.lexical, top
      // Kludge to prevent 'maybelse' from blocking lexical scope pops
      if (!/^\s*else\b/.test(textAfter)) for (var i = state.cc.length - 1; i >= 0; --i) {
        var c = state.cc[i];
        if (c == poplex) lexical = lexical.prev;
        else if (c != maybeelse) break;
      }
      while ((lexical.type == "stat" || lexical.type == "form") &&
             (firstChar == "}" || ((top = state.cc[state.cc.length - 1]) &&
                                   (top == maybeoperatorComma || top == maybeoperatorNoComma) &&
                                   !/^[,\.=+\-*:?[\(]/.test(textAfter))))
        lexical = lexical.prev;
      if (statementIndent && lexical.type == ")" && lexical.prev.type == "stat")
        lexical = lexical.prev;
      var type = lexical.type, closing = firstChar == type;

      if (type == "vardef") return lexical.indented + (state.lastType == "operator" || state.lastType == "," ? lexical.info + 1 : 0);
      else if (type == "form" && firstChar == "{") return lexical.indented;
      else if (type == "form") return lexical.indented + indentUnit;
      else if (type == "stat")
        return lexical.indented + (isContinuedStatement(state, textAfter) ? statementIndent || indentUnit : 0);
      else if (lexical.info == "switch" && !closing && parserConfig.doubleIndentSwitch != false)
        return lexical.indented + (/^(?:case|default)\b/.test(textAfter) ? indentUnit : 2 * indentUnit);
      else if (lexical.align) return lexical.column + (closing ? 0 : 1);
      else return lexical.indented + (closing ? 0 : indentUnit);
    },

    electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
    blockCommentStart: jsonMode ? null : "/*",
    blockCommentEnd: jsonMode ? null : "*/",
    lineComment: jsonMode ? null : "//",
    fold: "brace",
    closeBrackets: "()[]{}''\"\"``",

    helperType: jsonMode ? "json" : "javascript",
    jsonldMode: jsonldMode,
    jsonMode: jsonMode,

    expressionAllowed: expressionAllowed,
    skipExpression: function(state) {
      var top = state.cc[state.cc.length - 1]
      if (top == expression || top == expressionNoComma) state.cc.pop()
    }
  };
});

CodeMirror.registerHelper("wordChars", "javascript", /[\w$]/);

CodeMirror.defineMIME("text/javascript", "javascript");
CodeMirror.defineMIME("text/ecmascript", "javascript");
CodeMirror.defineMIME("application/javascript", "javascript");
CodeMirror.defineMIME("application/x-javascript", "javascript");
CodeMirror.defineMIME("application/ecmascript", "javascript");
CodeMirror.defineMIME("application/json", {name: "javascript", json: true});
CodeMirror.defineMIME("application/x-json", {name: "javascript", json: true});
CodeMirror.defineMIME("application/ld+json", {name: "javascript", jsonld: true});
CodeMirror.defineMIME("text/typescript", { name: "javascript", typescript: true });
CodeMirror.defineMIME("application/typescript", { name: "javascript", typescript: true });

});

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define('codemirror/mode/css/css',["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.defineMode("css", function(config, parserConfig) {
  var inline = parserConfig.inline
  if (!parserConfig.propertyKeywords) parserConfig = CodeMirror.resolveMode("text/css");

  var indentUnit = config.indentUnit,
      tokenHooks = parserConfig.tokenHooks,
      documentTypes = parserConfig.documentTypes || {},
      mediaTypes = parserConfig.mediaTypes || {},
      mediaFeatures = parserConfig.mediaFeatures || {},
      mediaValueKeywords = parserConfig.mediaValueKeywords || {},
      propertyKeywords = parserConfig.propertyKeywords || {},
      nonStandardPropertyKeywords = parserConfig.nonStandardPropertyKeywords || {},
      fontProperties = parserConfig.fontProperties || {},
      counterDescriptors = parserConfig.counterDescriptors || {},
      colorKeywords = parserConfig.colorKeywords || {},
      valueKeywords = parserConfig.valueKeywords || {},
      allowNested = parserConfig.allowNested,
      lineComment = parserConfig.lineComment,
      supportsAtComponent = parserConfig.supportsAtComponent === true;

  var type, override;
  function ret(style, tp) { type = tp; return style; }

  // Tokenizers

  function tokenBase(stream, state) {
    var ch = stream.next();
    if (tokenHooks[ch]) {
      var result = tokenHooks[ch](stream, state);
      if (result !== false) return result;
    }
    if (ch == "@") {
      stream.eatWhile(/[\w\\\-]/);
      return ret("def", stream.current());
    } else if (ch == "=" || (ch == "~" || ch == "|") && stream.eat("=")) {
      return ret(null, "compare");
    } else if (ch == "\"" || ch == "'") {
      state.tokenize = tokenString(ch);
      return state.tokenize(stream, state);
    } else if (ch == "#") {
      stream.eatWhile(/[\w\\\-]/);
      return ret("atom", "hash");
    } else if (ch == "!") {
      stream.match(/^\s*\w*/);
      return ret("keyword", "important");
    } else if (/\d/.test(ch) || ch == "." && stream.eat(/\d/)) {
      stream.eatWhile(/[\w.%]/);
      return ret("number", "unit");
    } else if (ch === "-") {
      if (/[\d.]/.test(stream.peek())) {
        stream.eatWhile(/[\w.%]/);
        return ret("number", "unit");
      } else if (stream.match(/^-[\w\\\-]+/)) {
        stream.eatWhile(/[\w\\\-]/);
        if (stream.match(/^\s*:/, false))
          return ret("variable-2", "variable-definition");
        return ret("variable-2", "variable");
      } else if (stream.match(/^\w+-/)) {
        return ret("meta", "meta");
      }
    } else if (/[,+>*\/]/.test(ch)) {
      return ret(null, "select-op");
    } else if (ch == "." && stream.match(/^-?[_a-z][_a-z0-9-]*/i)) {
      return ret("qualifier", "qualifier");
    } else if (/[:;{}\[\]\(\)]/.test(ch)) {
      return ret(null, ch);
    } else if ((ch == "u" && stream.match(/rl(-prefix)?\(/)) ||
               (ch == "d" && stream.match("omain(")) ||
               (ch == "r" && stream.match("egexp("))) {
      stream.backUp(1);
      state.tokenize = tokenParenthesized;
      return ret("property", "word");
    } else if (/[\w\\\-]/.test(ch)) {
      stream.eatWhile(/[\w\\\-]/);
      return ret("property", "word");
    } else {
      return ret(null, null);
    }
  }

  function tokenString(quote) {
    return function(stream, state) {
      var escaped = false, ch;
      while ((ch = stream.next()) != null) {
        if (ch == quote && !escaped) {
          if (quote == ")") stream.backUp(1);
          break;
        }
        escaped = !escaped && ch == "\\";
      }
      if (ch == quote || !escaped && quote != ")") state.tokenize = null;
      return ret("string", "string");
    };
  }

  function tokenParenthesized(stream, state) {
    stream.next(); // Must be '('
    if (!stream.match(/\s*[\"\')]/, false))
      state.tokenize = tokenString(")");
    else
      state.tokenize = null;
    return ret(null, "(");
  }

  // Context management

  function Context(type, indent, prev) {
    this.type = type;
    this.indent = indent;
    this.prev = prev;
  }

  function pushContext(state, stream, type, indent) {
    state.context = new Context(type, stream.indentation() + (indent === false ? 0 : indentUnit), state.context);
    return type;
  }

  function popContext(state) {
    if (state.context.prev)
      state.context = state.context.prev;
    return state.context.type;
  }

  function pass(type, stream, state) {
    return states[state.context.type](type, stream, state);
  }
  function popAndPass(type, stream, state, n) {
    for (var i = n || 1; i > 0; i--)
      state.context = state.context.prev;
    return pass(type, stream, state);
  }

  // Parser

  function wordAsValue(stream) {
    var word = stream.current().toLowerCase();
    if (valueKeywords.hasOwnProperty(word))
      override = "atom";
    else if (colorKeywords.hasOwnProperty(word))
      override = "keyword";
    else
      override = "variable";
  }

  var states = {};

  states.top = function(type, stream, state) {
    if (type == "{") {
      return pushContext(state, stream, "block");
    } else if (type == "}" && state.context.prev) {
      return popContext(state);
    } else if (supportsAtComponent && /@component/.test(type)) {
      return pushContext(state, stream, "atComponentBlock");
    } else if (/^@(-moz-)?document$/.test(type)) {
      return pushContext(state, stream, "documentTypes");
    } else if (/^@(media|supports|(-moz-)?document|import)$/.test(type)) {
      return pushContext(state, stream, "atBlock");
    } else if (/^@(font-face|counter-style)/.test(type)) {
      state.stateArg = type;
      return "restricted_atBlock_before";
    } else if (/^@(-(moz|ms|o|webkit)-)?keyframes$/.test(type)) {
      return "keyframes";
    } else if (type && type.charAt(0) == "@") {
      return pushContext(state, stream, "at");
    } else if (type == "hash") {
      override = "builtin";
    } else if (type == "word") {
      override = "tag";
    } else if (type == "variable-definition") {
      return "maybeprop";
    } else if (type == "interpolation") {
      return pushContext(state, stream, "interpolation");
    } else if (type == ":") {
      return "pseudo";
    } else if (allowNested && type == "(") {
      return pushContext(state, stream, "parens");
    }
    return state.context.type;
  };

  states.block = function(type, stream, state) {
    if (type == "word") {
      var word = stream.current().toLowerCase();
      if (propertyKeywords.hasOwnProperty(word)) {
        override = "property";
        return "maybeprop";
      } else if (nonStandardPropertyKeywords.hasOwnProperty(word)) {
        override = "string-2";
        return "maybeprop";
      } else if (allowNested) {
        override = stream.match(/^\s*:(?:\s|$)/, false) ? "property" : "tag";
        return "block";
      } else {
        override += " error";
        return "maybeprop";
      }
    } else if (type == "meta") {
      return "block";
    } else if (!allowNested && (type == "hash" || type == "qualifier")) {
      override = "error";
      return "block";
    } else {
      return states.top(type, stream, state);
    }
  };

  states.maybeprop = function(type, stream, state) {
    if (type == ":") return pushContext(state, stream, "prop");
    return pass(type, stream, state);
  };

  states.prop = function(type, stream, state) {
    if (type == ";") return popContext(state);
    if (type == "{" && allowNested) return pushContext(state, stream, "propBlock");
    if (type == "}" || type == "{") return popAndPass(type, stream, state);
    if (type == "(") return pushContext(state, stream, "parens");

    if (type == "hash" && !/^#([0-9a-fA-f]{3,4}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/.test(stream.current())) {
      override += " error";
    } else if (type == "word") {
      wordAsValue(stream);
    } else if (type == "interpolation") {
      return pushContext(state, stream, "interpolation");
    }
    return "prop";
  };

  states.propBlock = function(type, _stream, state) {
    if (type == "}") return popContext(state);
    if (type == "word") { override = "property"; return "maybeprop"; }
    return state.context.type;
  };

  states.parens = function(type, stream, state) {
    if (type == "{" || type == "}") return popAndPass(type, stream, state);
    if (type == ")") return popContext(state);
    if (type == "(") return pushContext(state, stream, "parens");
    if (type == "interpolation") return pushContext(state, stream, "interpolation");
    if (type == "word") wordAsValue(stream);
    return "parens";
  };

  states.pseudo = function(type, stream, state) {
    if (type == "meta") return "pseudo";

    if (type == "word") {
      override = "variable-3";
      return state.context.type;
    }
    return pass(type, stream, state);
  };

  states.documentTypes = function(type, stream, state) {
    if (type == "word" && documentTypes.hasOwnProperty(stream.current())) {
      override = "tag";
      return state.context.type;
    } else {
      return states.atBlock(type, stream, state);
    }
  };

  states.atBlock = function(type, stream, state) {
    if (type == "(") return pushContext(state, stream, "atBlock_parens");
    if (type == "}" || type == ";") return popAndPass(type, stream, state);
    if (type == "{") return popContext(state) && pushContext(state, stream, allowNested ? "block" : "top");

    if (type == "interpolation") return pushContext(state, stream, "interpolation");

    if (type == "word") {
      var word = stream.current().toLowerCase();
      if (word == "only" || word == "not" || word == "and" || word == "or")
        override = "keyword";
      else if (mediaTypes.hasOwnProperty(word))
        override = "attribute";
      else if (mediaFeatures.hasOwnProperty(word))
        override = "property";
      else if (mediaValueKeywords.hasOwnProperty(word))
        override = "keyword";
      else if (propertyKeywords.hasOwnProperty(word))
        override = "property";
      else if (nonStandardPropertyKeywords.hasOwnProperty(word))
        override = "string-2";
      else if (valueKeywords.hasOwnProperty(word))
        override = "atom";
      else if (colorKeywords.hasOwnProperty(word))
        override = "keyword";
      else
        override = "error";
    }
    return state.context.type;
  };

  states.atComponentBlock = function(type, stream, state) {
    if (type == "}")
      return popAndPass(type, stream, state);
    if (type == "{")
      return popContext(state) && pushContext(state, stream, allowNested ? "block" : "top", false);
    if (type == "word")
      override = "error";
    return state.context.type;
  };

  states.atBlock_parens = function(type, stream, state) {
    if (type == ")") return popContext(state);
    if (type == "{" || type == "}") return popAndPass(type, stream, state, 2);
    return states.atBlock(type, stream, state);
  };

  states.restricted_atBlock_before = function(type, stream, state) {
    if (type == "{")
      return pushContext(state, stream, "restricted_atBlock");
    if (type == "word" && state.stateArg == "@counter-style") {
      override = "variable";
      return "restricted_atBlock_before";
    }
    return pass(type, stream, state);
  };

  states.restricted_atBlock = function(type, stream, state) {
    if (type == "}") {
      state.stateArg = null;
      return popContext(state);
    }
    if (type == "word") {
      if ((state.stateArg == "@font-face" && !fontProperties.hasOwnProperty(stream.current().toLowerCase())) ||
          (state.stateArg == "@counter-style" && !counterDescriptors.hasOwnProperty(stream.current().toLowerCase())))
        override = "error";
      else
        override = "property";
      return "maybeprop";
    }
    return "restricted_atBlock";
  };

  states.keyframes = function(type, stream, state) {
    if (type == "word") { override = "variable"; return "keyframes"; }
    if (type == "{") return pushContext(state, stream, "top");
    return pass(type, stream, state);
  };

  states.at = function(type, stream, state) {
    if (type == ";") return popContext(state);
    if (type == "{" || type == "}") return popAndPass(type, stream, state);
    if (type == "word") override = "tag";
    else if (type == "hash") override = "builtin";
    return "at";
  };

  states.interpolation = function(type, stream, state) {
    if (type == "}") return popContext(state);
    if (type == "{" || type == ";") return popAndPass(type, stream, state);
    if (type == "word") override = "variable";
    else if (type != "variable" && type != "(" && type != ")") override = "error";
    return "interpolation";
  };

  return {
    startState: function(base) {
      return {tokenize: null,
              state: inline ? "block" : "top",
              stateArg: null,
              context: new Context(inline ? "block" : "top", base || 0, null)};
    },

    token: function(stream, state) {
      if (!state.tokenize && stream.eatSpace()) return null;
      var style = (state.tokenize || tokenBase)(stream, state);
      if (style && typeof style == "object") {
        type = style[1];
        style = style[0];
      }
      override = style;
      state.state = states[state.state](type, stream, state);
      return override;
    },

    indent: function(state, textAfter) {
      var cx = state.context, ch = textAfter && textAfter.charAt(0);
      var indent = cx.indent;
      if (cx.type == "prop" && (ch == "}" || ch == ")")) cx = cx.prev;
      if (cx.prev) {
        if (ch == "}" && (cx.type == "block" || cx.type == "top" ||
                          cx.type == "interpolation" || cx.type == "restricted_atBlock")) {
          // Resume indentation from parent context.
          cx = cx.prev;
          indent = cx.indent;
        } else if (ch == ")" && (cx.type == "parens" || cx.type == "atBlock_parens") ||
            ch == "{" && (cx.type == "at" || cx.type == "atBlock")) {
          // Dedent relative to current context.
          indent = Math.max(0, cx.indent - indentUnit);
          cx = cx.prev;
        }
      }
      return indent;
    },

    electricChars: "}",
    blockCommentStart: "/*",
    blockCommentEnd: "*/",
    lineComment: lineComment,
    fold: "brace"
  };
});

  function keySet(array) {
    var keys = {};
    for (var i = 0; i < array.length; ++i) {
      keys[array[i].toLowerCase()] = true;
    }
    return keys;
  }

  var documentTypes_ = [
    "domain", "regexp", "url", "url-prefix"
  ], documentTypes = keySet(documentTypes_);

  var mediaTypes_ = [
    "all", "aural", "braille", "handheld", "print", "projection", "screen",
    "tty", "tv", "embossed"
  ], mediaTypes = keySet(mediaTypes_);

  var mediaFeatures_ = [
    "width", "min-width", "max-width", "height", "min-height", "max-height",
    "device-width", "min-device-width", "max-device-width", "device-height",
    "min-device-height", "max-device-height", "aspect-ratio",
    "min-aspect-ratio", "max-aspect-ratio", "device-aspect-ratio",
    "min-device-aspect-ratio", "max-device-aspect-ratio", "color", "min-color",
    "max-color", "color-index", "min-color-index", "max-color-index",
    "monochrome", "min-monochrome", "max-monochrome", "resolution",
    "min-resolution", "max-resolution", "scan", "grid", "orientation",
    "device-pixel-ratio", "min-device-pixel-ratio", "max-device-pixel-ratio",
    "pointer", "any-pointer", "hover", "any-hover"
  ], mediaFeatures = keySet(mediaFeatures_);

  var mediaValueKeywords_ = [
    "landscape", "portrait", "none", "coarse", "fine", "on-demand", "hover",
    "interlace", "progressive"
  ], mediaValueKeywords = keySet(mediaValueKeywords_);

  var propertyKeywords_ = [
    "align-content", "align-items", "align-self", "alignment-adjust",
    "alignment-baseline", "anchor-point", "animation", "animation-delay",
    "animation-direction", "animation-duration", "animation-fill-mode",
    "animation-iteration-count", "animation-name", "animation-play-state",
    "animation-timing-function", "appearance", "azimuth", "backface-visibility",
    "background", "background-attachment", "background-blend-mode", "background-clip",
    "background-color", "background-image", "background-origin", "background-position",
    "background-repeat", "background-size", "baseline-shift", "binding",
    "bleed", "bookmark-label", "bookmark-level", "bookmark-state",
    "bookmark-target", "border", "border-bottom", "border-bottom-color",
    "border-bottom-left-radius", "border-bottom-right-radius",
    "border-bottom-style", "border-bottom-width", "border-collapse",
    "border-color", "border-image", "border-image-outset",
    "border-image-repeat", "border-image-slice", "border-image-source",
    "border-image-width", "border-left", "border-left-color",
    "border-left-style", "border-left-width", "border-radius", "border-right",
    "border-right-color", "border-right-style", "border-right-width",
    "border-spacing", "border-style", "border-top", "border-top-color",
    "border-top-left-radius", "border-top-right-radius", "border-top-style",
    "border-top-width", "border-width", "bottom", "box-decoration-break",
    "box-shadow", "box-sizing", "break-after", "break-before", "break-inside",
    "caption-side", "clear", "clip", "color", "color-profile", "column-count",
    "column-fill", "column-gap", "column-rule", "column-rule-color",
    "column-rule-style", "column-rule-width", "column-span", "column-width",
    "columns", "content", "counter-increment", "counter-reset", "crop", "cue",
    "cue-after", "cue-before", "cursor", "direction", "display",
    "dominant-baseline", "drop-initial-after-adjust",
    "drop-initial-after-align", "drop-initial-before-adjust",
    "drop-initial-before-align", "drop-initial-size", "drop-initial-value",
    "elevation", "empty-cells", "fit", "fit-position", "flex", "flex-basis",
    "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap",
    "float", "float-offset", "flow-from", "flow-into", "font", "font-feature-settings",
    "font-family", "font-kerning", "font-language-override", "font-size", "font-size-adjust",
    "font-stretch", "font-style", "font-synthesis", "font-variant",
    "font-variant-alternates", "font-variant-caps", "font-variant-east-asian",
    "font-variant-ligatures", "font-variant-numeric", "font-variant-position",
    "font-weight", "grid", "grid-area", "grid-auto-columns", "grid-auto-flow",
    "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-gap",
    "grid-column-start", "grid-gap", "grid-row", "grid-row-end", "grid-row-gap",
    "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns",
    "grid-template-rows", "hanging-punctuation", "height", "hyphens",
    "icon", "image-orientation", "image-rendering", "image-resolution",
    "inline-box-align", "justify-content", "left", "letter-spacing",
    "line-break", "line-height", "line-stacking", "line-stacking-ruby",
    "line-stacking-shift", "line-stacking-strategy", "list-style",
    "list-style-image", "list-style-position", "list-style-type", "margin",
    "margin-bottom", "margin-left", "margin-right", "margin-top",
    "marks", "marquee-direction", "marquee-loop",
    "marquee-play-count", "marquee-speed", "marquee-style", "max-height",
    "max-width", "min-height", "min-width", "move-to", "nav-down", "nav-index",
    "nav-left", "nav-right", "nav-up", "object-fit", "object-position",
    "opacity", "order", "orphans", "outline",
    "outline-color", "outline-offset", "outline-style", "outline-width",
    "overflow", "overflow-style", "overflow-wrap", "overflow-x", "overflow-y",
    "padding", "padding-bottom", "padding-left", "padding-right", "padding-top",
    "page", "page-break-after", "page-break-before", "page-break-inside",
    "page-policy", "pause", "pause-after", "pause-before", "perspective",
    "perspective-origin", "pitch", "pitch-range", "play-during", "position",
    "presentation-level", "punctuation-trim", "quotes", "region-break-after",
    "region-break-before", "region-break-inside", "region-fragment",
    "rendering-intent", "resize", "rest", "rest-after", "rest-before", "richness",
    "right", "rotation", "rotation-point", "ruby-align", "ruby-overhang",
    "ruby-position", "ruby-span", "shape-image-threshold", "shape-inside", "shape-margin",
    "shape-outside", "size", "speak", "speak-as", "speak-header",
    "speak-numeral", "speak-punctuation", "speech-rate", "stress", "string-set",
    "tab-size", "table-layout", "target", "target-name", "target-new",
    "target-position", "text-align", "text-align-last", "text-decoration",
    "text-decoration-color", "text-decoration-line", "text-decoration-skip",
    "text-decoration-style", "text-emphasis", "text-emphasis-color",
    "text-emphasis-position", "text-emphasis-style", "text-height",
    "text-indent", "text-justify", "text-outline", "text-overflow", "text-shadow",
    "text-size-adjust", "text-space-collapse", "text-transform", "text-underline-position",
    "text-wrap", "top", "transform", "transform-origin", "transform-style",
    "transition", "transition-delay", "transition-duration",
    "transition-property", "transition-timing-function", "unicode-bidi",
    "user-select", "vertical-align", "visibility", "voice-balance", "voice-duration",
    "voice-family", "voice-pitch", "voice-range", "voice-rate", "voice-stress",
    "voice-volume", "volume", "white-space", "widows", "width", "will-change", "word-break",
    "word-spacing", "word-wrap", "z-index",
    // SVG-specific
    "clip-path", "clip-rule", "mask", "enable-background", "filter", "flood-color",
    "flood-opacity", "lighting-color", "stop-color", "stop-opacity", "pointer-events",
    "color-interpolation", "color-interpolation-filters",
    "color-rendering", "fill", "fill-opacity", "fill-rule", "image-rendering",
    "marker", "marker-end", "marker-mid", "marker-start", "shape-rendering", "stroke",
    "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin",
    "stroke-miterlimit", "stroke-opacity", "stroke-width", "text-rendering",
    "baseline-shift", "dominant-baseline", "glyph-orientation-horizontal",
    "glyph-orientation-vertical", "text-anchor", "writing-mode"
  ], propertyKeywords = keySet(propertyKeywords_);

  var nonStandardPropertyKeywords_ = [
    "scrollbar-arrow-color", "scrollbar-base-color", "scrollbar-dark-shadow-color",
    "scrollbar-face-color", "scrollbar-highlight-color", "scrollbar-shadow-color",
    "scrollbar-3d-light-color", "scrollbar-track-color", "shape-inside",
    "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button",
    "searchfield-results-decoration", "zoom"
  ], nonStandardPropertyKeywords = keySet(nonStandardPropertyKeywords_);

  var fontProperties_ = [
    "font-family", "src", "unicode-range", "font-variant", "font-feature-settings",
    "font-stretch", "font-weight", "font-style"
  ], fontProperties = keySet(fontProperties_);

  var counterDescriptors_ = [
    "additive-symbols", "fallback", "negative", "pad", "prefix", "range",
    "speak-as", "suffix", "symbols", "system"
  ], counterDescriptors = keySet(counterDescriptors_);

  var colorKeywords_ = [
    "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige",
    "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown",
    "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue",
    "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod",
    "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen",
    "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen",
    "darkslateblue", "darkslategray", "darkturquoise", "darkviolet",
    "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick",
    "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite",
    "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew",
    "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender",
    "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral",
    "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightpink",
    "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray",
    "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta",
    "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple",
    "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise",
    "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin",
    "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered",
    "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred",
    "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue",
    "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown",
    "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue",
    "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan",
    "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white",
    "whitesmoke", "yellow", "yellowgreen"
  ], colorKeywords = keySet(colorKeywords_);

  var valueKeywords_ = [
    "above", "absolute", "activeborder", "additive", "activecaption", "afar",
    "after-white-space", "ahead", "alias", "all", "all-scroll", "alphabetic", "alternate",
    "always", "amharic", "amharic-abegede", "antialiased", "appworkspace",
    "arabic-indic", "armenian", "asterisks", "attr", "auto", "auto-flow", "avoid", "avoid-column", "avoid-page",
    "avoid-region", "background", "backwards", "baseline", "below", "bidi-override", "binary",
    "bengali", "blink", "block", "block-axis", "bold", "bolder", "border", "border-box",
    "both", "bottom", "break", "break-all", "break-word", "bullets", "button", "button-bevel",
    "buttonface", "buttonhighlight", "buttonshadow", "buttontext", "calc", "cambodian",
    "capitalize", "caps-lock-indicator", "caption", "captiontext", "caret",
    "cell", "center", "checkbox", "circle", "cjk-decimal", "cjk-earthly-branch",
    "cjk-heavenly-stem", "cjk-ideographic", "clear", "clip", "close-quote",
    "col-resize", "collapse", "color", "color-burn", "color-dodge", "column", "column-reverse",
    "compact", "condensed", "contain", "content", "contents",
    "content-box", "context-menu", "continuous", "copy", "counter", "counters", "cover", "crop",
    "cross", "crosshair", "currentcolor", "cursive", "cyclic", "darken", "dashed", "decimal",
    "decimal-leading-zero", "default", "default-button", "dense", "destination-atop",
    "destination-in", "destination-out", "destination-over", "devanagari", "difference",
    "disc", "discard", "disclosure-closed", "disclosure-open", "document",
    "dot-dash", "dot-dot-dash",
    "dotted", "double", "down", "e-resize", "ease", "ease-in", "ease-in-out", "ease-out",
    "element", "ellipse", "ellipsis", "embed", "end", "ethiopic", "ethiopic-abegede",
    "ethiopic-abegede-am-et", "ethiopic-abegede-gez", "ethiopic-abegede-ti-er",
    "ethiopic-abegede-ti-et", "ethiopic-halehame-aa-er",
    "ethiopic-halehame-aa-et", "ethiopic-halehame-am-et",
    "ethiopic-halehame-gez", "ethiopic-halehame-om-et",
    "ethiopic-halehame-sid-et", "ethiopic-halehame-so-et",
    "ethiopic-halehame-ti-er", "ethiopic-halehame-ti-et", "ethiopic-halehame-tig",
    "ethiopic-numeric", "ew-resize", "exclusion", "expanded", "extends", "extra-condensed",
    "extra-expanded", "fantasy", "fast", "fill", "fixed", "flat", "flex", "flex-end", "flex-start", "footnotes",
    "forwards", "from", "geometricPrecision", "georgian", "graytext", "grid", "groove",
    "gujarati", "gurmukhi", "hand", "hangul", "hangul-consonant", "hard-light", "hebrew",
    "help", "hidden", "hide", "higher", "highlight", "highlighttext",
    "hiragana", "hiragana-iroha", "horizontal", "hsl", "hsla", "hue", "icon", "ignore",
    "inactiveborder", "inactivecaption", "inactivecaptiontext", "infinite",
    "infobackground", "infotext", "inherit", "initial", "inline", "inline-axis",
    "inline-block", "inline-flex", "inline-grid", "inline-table", "inset", "inside", "intrinsic", "invert",
    "italic", "japanese-formal", "japanese-informal", "justify", "kannada",
    "katakana", "katakana-iroha", "keep-all", "khmer",
    "korean-hangul-formal", "korean-hanja-formal", "korean-hanja-informal",
    "landscape", "lao", "large", "larger", "left", "level", "lighter", "lighten",
    "line-through", "linear", "linear-gradient", "lines", "list-item", "listbox", "listitem",
    "local", "logical", "loud", "lower", "lower-alpha", "lower-armenian",
    "lower-greek", "lower-hexadecimal", "lower-latin", "lower-norwegian",
    "lower-roman", "lowercase", "ltr", "luminosity", "malayalam", "match", "matrix", "matrix3d",
    "media-controls-background", "media-current-time-display",
    "media-fullscreen-button", "media-mute-button", "media-play-button",
    "media-return-to-realtime-button", "media-rewind-button",
    "media-seek-back-button", "media-seek-forward-button", "media-slider",
    "media-sliderthumb", "media-time-remaining-display", "media-volume-slider",
    "media-volume-slider-container", "media-volume-sliderthumb", "medium",
    "menu", "menulist", "menulist-button", "menulist-text",
    "menulist-textfield", "menutext", "message-box", "middle", "min-intrinsic",
    "mix", "mongolian", "monospace", "move", "multiple", "multiply", "myanmar", "n-resize",
    "narrower", "ne-resize", "nesw-resize", "no-close-quote", "no-drop",
    "no-open-quote", "no-repeat", "none", "normal", "not-allowed", "nowrap",
    "ns-resize", "numbers", "numeric", "nw-resize", "nwse-resize", "oblique", "octal", "opacity", "open-quote",
    "optimizeLegibility", "optimizeSpeed", "oriya", "oromo", "outset",
    "outside", "outside-shape", "overlay", "overline", "padding", "padding-box",
    "painted", "page", "paused", "persian", "perspective", "plus-darker", "plus-lighter",
    "pointer", "polygon", "portrait", "pre", "pre-line", "pre-wrap", "preserve-3d",
    "progress", "push-button", "radial-gradient", "radio", "read-only",
    "read-write", "read-write-plaintext-only", "rectangle", "region",
    "relative", "repeat", "repeating-linear-gradient",
    "repeating-radial-gradient", "repeat-x", "repeat-y", "reset", "reverse",
    "rgb", "rgba", "ridge", "right", "rotate", "rotate3d", "rotateX", "rotateY",
    "rotateZ", "round", "row", "row-resize", "row-reverse", "rtl", "run-in", "running",
    "s-resize", "sans-serif", "saturation", "scale", "scale3d", "scaleX", "scaleY", "scaleZ", "screen",
    "scroll", "scrollbar", "scroll-position", "se-resize", "searchfield",
    "searchfield-cancel-button", "searchfield-decoration",
    "searchfield-results-button", "searchfield-results-decoration",
    "semi-condensed", "semi-expanded", "separate", "serif", "show", "sidama",
    "simp-chinese-formal", "simp-chinese-informal", "single",
    "skew", "skewX", "skewY", "skip-white-space", "slide", "slider-horizontal",
    "slider-vertical", "sliderthumb-horizontal", "sliderthumb-vertical", "slow",
    "small", "small-caps", "small-caption", "smaller", "soft-light", "solid", "somali",
    "source-atop", "source-in", "source-out", "source-over", "space", "space-around", "space-between", "spell-out", "square",
    "square-button", "start", "static", "status-bar", "stretch", "stroke", "sub",
    "subpixel-antialiased", "super", "sw-resize", "symbolic", "symbols", "system-ui", "table",
    "table-caption", "table-cell", "table-column", "table-column-group",
    "table-footer-group", "table-header-group", "table-row", "table-row-group",
    "tamil",
    "telugu", "text", "text-bottom", "text-top", "textarea", "textfield", "thai",
    "thick", "thin", "threeddarkshadow", "threedface", "threedhighlight",
    "threedlightshadow", "threedshadow", "tibetan", "tigre", "tigrinya-er",
    "tigrinya-er-abegede", "tigrinya-et", "tigrinya-et-abegede", "to", "top",
    "trad-chinese-formal", "trad-chinese-informal", "transform",
    "translate", "translate3d", "translateX", "translateY", "translateZ",
    "transparent", "ultra-condensed", "ultra-expanded", "underline", "unset", "up",
    "upper-alpha", "upper-armenian", "upper-greek", "upper-hexadecimal",
    "upper-latin", "upper-norwegian", "upper-roman", "uppercase", "urdu", "url",
    "var", "vertical", "vertical-text", "visible", "visibleFill", "visiblePainted",
    "visibleStroke", "visual", "w-resize", "wait", "wave", "wider",
    "window", "windowframe", "windowtext", "words", "wrap", "wrap-reverse", "x-large", "x-small", "xor",
    "xx-large", "xx-small"
  ], valueKeywords = keySet(valueKeywords_);

  var allWords = documentTypes_.concat(mediaTypes_).concat(mediaFeatures_).concat(mediaValueKeywords_)
    .concat(propertyKeywords_).concat(nonStandardPropertyKeywords_).concat(colorKeywords_)
    .concat(valueKeywords_);
  CodeMirror.registerHelper("hintWords", "css", allWords);

  function tokenCComment(stream, state) {
    var maybeEnd = false, ch;
    while ((ch = stream.next()) != null) {
      if (maybeEnd && ch == "/") {
        state.tokenize = null;
        break;
      }
      maybeEnd = (ch == "*");
    }
    return ["comment", "comment"];
  }

  CodeMirror.defineMIME("text/css", {
    documentTypes: documentTypes,
    mediaTypes: mediaTypes,
    mediaFeatures: mediaFeatures,
    mediaValueKeywords: mediaValueKeywords,
    propertyKeywords: propertyKeywords,
    nonStandardPropertyKeywords: nonStandardPropertyKeywords,
    fontProperties: fontProperties,
    counterDescriptors: counterDescriptors,
    colorKeywords: colorKeywords,
    valueKeywords: valueKeywords,
    tokenHooks: {
      "/": function(stream, state) {
        if (!stream.eat("*")) return false;
        state.tokenize = tokenCComment;
        return tokenCComment(stream, state);
      }
    },
    name: "css"
  });

  CodeMirror.defineMIME("text/x-scss", {
    mediaTypes: mediaTypes,
    mediaFeatures: mediaFeatures,
    mediaValueKeywords: mediaValueKeywords,
    propertyKeywords: propertyKeywords,
    nonStandardPropertyKeywords: nonStandardPropertyKeywords,
    colorKeywords: colorKeywords,
    valueKeywords: valueKeywords,
    fontProperties: fontProperties,
    allowNested: true,
    lineComment: "//",
    tokenHooks: {
      "/": function(stream, state) {
        if (stream.eat("/")) {
          stream.skipToEnd();
          return ["comment", "comment"];
        } else if (stream.eat("*")) {
          state.tokenize = tokenCComment;
          return tokenCComment(stream, state);
        } else {
          return ["operator", "operator"];
        }
      },
      ":": function(stream) {
        if (stream.match(/\s*\{/))
          return [null, "{"];
        return false;
      },
      "$": function(stream) {
        stream.match(/^[\w-]+/);
        if (stream.match(/^\s*:/, false))
          return ["variable-2", "variable-definition"];
        return ["variable-2", "variable"];
      },
      "#": function(stream) {
        if (!stream.eat("{")) return false;
        return [null, "interpolation"];
      }
    },
    name: "css",
    helperType: "scss"
  });

  CodeMirror.defineMIME("text/x-less", {
    mediaTypes: mediaTypes,
    mediaFeatures: mediaFeatures,
    mediaValueKeywords: mediaValueKeywords,
    propertyKeywords: propertyKeywords,
    nonStandardPropertyKeywords: nonStandardPropertyKeywords,
    colorKeywords: colorKeywords,
    valueKeywords: valueKeywords,
    fontProperties: fontProperties,
    allowNested: true,
    lineComment: "//",
    tokenHooks: {
      "/": function(stream, state) {
        if (stream.eat("/")) {
          stream.skipToEnd();
          return ["comment", "comment"];
        } else if (stream.eat("*")) {
          state.tokenize = tokenCComment;
          return tokenCComment(stream, state);
        } else {
          return ["operator", "operator"];
        }
      },
      "@": function(stream) {
        if (stream.eat("{")) return [null, "interpolation"];
        if (stream.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/, false)) return false;
        stream.eatWhile(/[\w\\\-]/);
        if (stream.match(/^\s*:/, false))
          return ["variable-2", "variable-definition"];
        return ["variable-2", "variable"];
      },
      "&": function() {
        return ["atom", "atom"];
      }
    },
    name: "css",
    helperType: "less"
  });

  CodeMirror.defineMIME("text/x-gss", {
    documentTypes: documentTypes,
    mediaTypes: mediaTypes,
    mediaFeatures: mediaFeatures,
    propertyKeywords: propertyKeywords,
    nonStandardPropertyKeywords: nonStandardPropertyKeywords,
    fontProperties: fontProperties,
    counterDescriptors: counterDescriptors,
    colorKeywords: colorKeywords,
    valueKeywords: valueKeywords,
    supportsAtComponent: true,
    tokenHooks: {
      "/": function(stream, state) {
        if (!stream.eat("*")) return false;
        state.tokenize = tokenCComment;
        return tokenCComment(stream, state);
      }
    },
    name: "css",
    helperType: "gss"
  });

});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"w3-css/w3.css\"></require>\n  <div class=\"w3-card-2 w3-sand w3-center\">\n    <h3>Virtual Folder</h3>\n  </div>\n  <div if.bind=\"firsttime\">\n    <intro></intro>\n    <setting></setting>\n  </div>\n  <div if.bind=\"!firsttime\">\n    <filemanager></filemanager>\n  </div>\n</template>\n<!--\n{\n            \"name\":\"w3-css\",\n            \"path\": \"../node_modules/w3-css\",\n            \"main\": \"\",\n            \"resources\": [\n              \"w3.css\"\n            ]\n          },\n          {\n            \"name\": \"font-awesome\",\n            \"path\": \"../node_modules/font-awesome/css\",\n            \"main\": \"font-awesome.min.css\"\n          },\n-->\n"; });
define('text!autocomplete/vfAutocompleteSearch.css', ['module'], function(module) { module.exports = ".result-container{\n  font-family: 'helvetica neue', arial, sans-serif;\n  width: auto;\n  /*border: solid 1px #b6b6b6;*/\n  position: fixed;\n  display: inline-block;\n  background: #fff;\n  z-index: 999;\n  box-shadow: 0px -5px 21px -12px rgba(0, 0, 0, 0.2), 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);\n  margin-top: 2px;\n  margin-bottom: 20px;\n  overflow-y: auto;\n}\n\n.result-card{\n  margin: 5px;\n  padding: 5px;\n  border: solid 1px rgba(115, 179, 96, 5);\n  width:250px;\n  max-height: 370px;\n  overflow-y: scroll; /*tomas changed */\n  box-sizing: content-box !important;\n  float:left;\n}\n\n.result-card-heading{\n  box-sizing: content-box !important;\n  border: 1px solid rgb(115, 179, 96);\n  background: rgba(115, 179, 96, 1);\n  color: #fff;\n  height:20px;\n  padding: 5px 10px;\n  line-height:20px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  text-align: left;\n  flex-basis: auto !important;\n}\n\n.result-card-footer{\n  height:20px;\n  padding: 5px 10px;\n  line-height:20px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  border-top: 1px dotted #999;\n  text-align: right;\n  font-size: 12px;\n  font-weight: bold;\n}\n\n.result-card-item, .result-card-item:visited{\n  font-size: 11.5px;\n  border-bottom: 1px dotted #999;\n  cursor: pointer;\n  text-decoration: none;\n  color: #232323;\n}\n\n.result-card-item:hover{\n  text-decoration: none;\n  background: rgba(115, 179, 96, 0.2);\n}\n\n.result-card-item:last-child{\n  border-bottom: none !important;\n}\n\n.result-card-item:first-child{\n  margin-top:5px;\n}\n\n.result-card-item-label{\n  float:left;\n  width: 75%;\n  text-align: left;\n  height: 20px;\n  line-height: 20px;\n/*  padding: 5px 0px 5px 10px;*/\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.result-card-item-count{\n  width: 25%;\n  text-align: right;\n  height: 20px;\n  line-height: 20px;\n  padding: 5px 5px 5px 0px;\n}\n\n.show-more-link, .show-more-link:visited{\n  text-decoration: none;\n  color:#000;\n}\n\n.show-more-link:hover{\n  text-decoration: none;\n  color: rgba(115, 179, 96, 1);\n}\n\n.result-card-item-count-heading{\n  font-size: 12px;\n  display: inline-block;\n  float: right;\n}\n\na.result-card-item-count-heading, a.result-card-item-count-heading:hover,\na.result-card-item-count-heading:active, a.result-card-item-count-heading:visited {\n  color: #fff;\n  cursor: pointer;\n  text-decoration: none;\n  font-size: 14px;\n}\n\n.norecords-result-card{\n  margin: 0 5px;\n  padding: 5px;\n  font-size: 14px;\n  color: #666;\n  width:250px;\n}\n\n.scrollbar-element{\n  max-height:inherit;\n}\n\n.ps-container:hover>.ps-scrollbar-x-rail, .ps-container:hover>.ps-scrollbar-y-rail {\n  opacity: 1 !important;\n}\n"; });
define('text!autocomplete/vfAutocompleteSearch.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./vfAutocompleteSearch.css\"></require>\n  <require from=\"\"\n\n  <input ref=\"input\" autocomplete=\"off\" value.bind=\"value & debounce:750\"\n         blur.trigger=\"blurSuggestions($event)\"\n         keydown.delegate=\"keypressed($event)\"\n         placeholder.bind=\"placeholder\" focus.trigger=\"focusSuggestions()\">\n\n  <div ref=\"results\" show.bind=\"showing\" class=\"result-container\">\n    <div repeat.for=\"resultGroup of resultGroups\" class=\"result-card\">\n\n        <header class=\"result-card-heading\">${resultGroup.groupValue} (${resultGroup.doclist.numFound})</header>\n        <div class=\"result-card-body\">\n          <span repeat.for=\"doclistRec of resultGroup.doclist.docs\">\n\n            <div class=\"result-card-item\"><button class=\"result-card-item-label w3-button w3-padding-0\" click.trigger=\"clicked(doclistRec.value)\" >${doclistRec.value}</button> <span class=\"result-card-item-count\">(${doclistRec.num_pdb_entries})</span></div>\n          </span>\n\n        </div>\n        <footer class=\"result-card-footer\">\n\n          <a class=\"result-card-item-label\" href=\"#\" click.delegate=\"searchMore(resultGroup.doclist.docs[0].var_name)\">More...</a>\n        </footer>\n\n    </div>\n    <div show.bind=\"resultGroupsEmpty\">No hints.</div>\n  </div>\n</div>\n\n</template>\n"; });
define('text!b2dropcontrol/app.html', ['module'], function(module) { module.exports = "<template>\n\n    <require from=\"./b2dropcontrol\"></require>\n    <require from=\"./dropboxcontrol\"></require>\n    <require from=\"./onedrivecontrol\"></require>\n\n\n    <b2dropcontrol></b2dropcontrol>\n    <dropboxcontrol></dropboxcontrol>\n    <onedrivecontrol></onedrivecontrol>\n  <div class=\"w3-clear\"></div>\n\n</template>\n"; });
define('text!b2dropcontrol/b2dropcontrol.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"w3-third\">\n        <div class=\"w3-card-2 w3-sand w3-hover-shadow w3-round-large\">\n            <h3>${heading}</h3>\n            <p>B2DROP is academic secure and trusted data exchange service provided by EUDAT.\n                West-life portal uses B2DROP TO store, upload and download AND share the data files. </p>\n            <!-- form is showed only if the b2drop is not connected -->\n            <form show.bind=\"dialogstateentry\" submit.trigger=\"addservice('b2dropconnector')\">\n                <p>You need to create B2DROP account first at <a href=\"https://b2drop.eudat.eu/pwm/public/NewUser?\">b2drop.eudat.eu/pwm/public/NewUser?</a>\n                    Then ,if you have an existing account, fill in the B2DROP username and password here:</p>\n\n                <input type=\"text\" value.bind=\"username\">\n                <input type=\"password\" value.bind=\"usertoken\">\n                <button class=\"w3-btn w3-round-large\" type=\"submit\">Connect to B2DROP</button>\n                Status: <span>${status}</span>\n            </form>\n            <!-- if it is connected, then status info is showed and option to reconnect is showed-->\n            <form show.bind=\"dialogstateconnected\" submit.trigger=\"reconnect()\">\n                <span>B2Drop service connected.</span>\n                <button class=\"w3-btn w3-round-large\" type=\"submit\">reconnect</button>\n            </form>\n\n            <div show.bind=\"dialogstateconnecting\">\n                <span>B2Drop connecting ...</span>\n            </div>\n        </div>\n    </div>\n</template>\n"; });
define('text!b2dropcontrol/dropboxcontrol.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"w3-third\">\n    <div class=\"w3-card-2 w3-sand w3-hover-shadow w3-round-large\">\n        <h3>${heading}</h3>\n        <p>DROPBOX is a commercial data store and exchange service.\n            West-life portal can use your DROPBOX account to access and download your data files. </p>            <!-- form is showed only if the b2drop is not connected -->\n        <form show.bind=\"dialogstateentry\">\n            <p>You need to have existing DROPBOX account. </p>\n            <a show.bind=\"showdropboxbutton\" class=\"w3-btn w3-round-large\" href=\"${dropBoxAuthUrl}\" id=\"authlink\">Connect to DROPBOX</a>\n            <hr/>Status: <span>${status}</span>\n        </form>\n        <!-- if it is connected, then status info is showed and option to reconnect is showed-->\n        <form show.bind=\"dialogstateconnected\" submit.trigger=\"reconnect()\">\n            <span>DROPBOX service connected.</span>\n            <button class=\"w3-btn w3-round-large\" type=\"submit\">reconnect</button>\n        </form>\n\n        <div show.bind=\"dialogstateconnecting\">\n            <span>DROPBOX connecting ...</span>\n        </div>\n    </div>\n</div>\n</template>\n"; });
define('text!b2dropcontrol/onedrivecontrol.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"w3-third\">\n    <div class=\"w3-card-2 w3-sand w3-hover-shadow w3-round-large\">\n      <h3>${heading}</h3>\n      <p>ONEDRIVE is a commercial data store and exchange service.\n        West-life portal can use your ONEDRIVE account to access and download your data files. </p>            <!-- form is showed only if the b2drop is not connected -->\n      <form show.bind=\"dialogstateentry\">\n        <p>You need to have existing ONEDRIVE account. </p>\n        <a show.bind=\"showonedrivebutton\" class=\"w3-btn w3-round-large\" href=\"${oneDriveAuthUrl}\" id=\"authlink\">Connect to ONEDRIVE</a>\n        <hr/>Status: <span>${status}</span>\n      </form>\n      <!-- if it is connected, then status info is showed and option to reconnect is showed-->\n      <form show.bind=\"dialogstateconnected\" submit.trigger=\"reconnect()\">\n        <span>ONEDRIVE service connected.</span>\n        <button class=\"w3-btn w3-round-large\" type=\"submit\">reconnect</button>\n      </form>\n\n      <div show.bind=\"dialogstateconnecting\">\n        <span>ONEDRIVE connecting ...</span>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('text!dataset/app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../pdbcomponents/dataset\"></require>\n  <dataset></dataset>\n</template>\n"; });
define('text!editor/fileeditor.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"codemirror/lib/codemirror.css\" as=\"scoped\"></require>\n  <require from=\"codemirror/theme/eclipse.css\" as=\"scoped\"></require>\n  <div class=\"w3-card w3-pale-blue\">\n  <textarea ref=\"cmTextarea\">\n\n  </textarea>\n  </div>\n</template>\n"; });
define('text!filemanager2/app.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"./panel\"></require>\n\n    <div class=\"w3-card-2 w3-sand w3-center\">\n        <h3>Virtual Folder - File manager</h3>\n    </div>\n\n    <div class=\"w3-half\">\n        <panel></panel>\n    </div>\n\n    <div class=\"w3-half\">\n        <panel></panel>\n    </div>\n    <!--div class=\"w3-half\">\n        <tabs tabs.bind=\"paneltabs2\"></tabs>\n\n        <div show.one-way=\"paneltabslist2\">\n            <filepanel panelid=\"right\"></filepanel>\n        </div>\n        <div show.one-way=\"paneltabsview2\">\n            View file not implemented\n        </div>\n        <div show.one-way=\"paneltabsvisual2\">\n            Visualize file not implemented\n        </div>\n    </div-->\n\n  <div class=\"w3-clear w3-margin w3-padding\"></div>\n</template>\n"; });
define('text!filemanager2/panel.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"../filepicker/filepanel\"></require>\n    <require from=\"../pdbcomponents/viewpanel\"></require>\n    <require from=\"../pdbcomponents/dataset\"></require>\n    <require from=\"../tabs/tabs\"></require>\n    <require from='../editor/fileeditor'></require>\n\n  <tabs tabs.bind=\"paneltabs\"></tabs>\n    <div show.bind=\"selectedList\">\n        <filepanel panelid.bind=\"uid\"></filepanel>\n    </div>\n\n    <div if.bind=\"selectedView\">\n        <fileeditor></fileeditor>\n    </div>\n\n    <div show.bind=\"selectedVisual\">\n        <viewpanel panelid.bind=\"uid\"></viewpanel>\n    </div>\n\n\n  <div show.bind=\"selectedDataset\">\n    <dataset></dataset>\n  </div>\n\n\n</template>\n"; });
define('text!filemanager2/viewpanelpv.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"w3-card w3-white \">\n    <span>${fileurl}</span>\n    <form fileurl.call=\"viewfile\">\n      Load another entry from:\n      <ul>\n        <li>\n          <input id=\"pdbid\" title=\"type PDB id and press enter\" placeholder=\"1r6a\"\n                 maxlength=\"4\" size=\"4\" value.bind=\"pdbentry\"\n                 change.trigger=\"loadpdbfile()\"\n          />\n          PDB database\n        </li>\n        <li>\n          <input id=\"pdbid2\" title=\"type PDB id and press enter\" placeholder=\"1r6a\"\n                 maxlength=\"4\" size=\"4\" value.bind=\"pdbentry2\"\n                 change.trigger=\"loadfromredo()\"\n          />\n          PDB-REDO database\n        </li>\n      </ul>\n    </form>\n    <div class=\"fileviewer\" style=\"height: 100%; width: 100%\">\n    </div>\n  </div>\n</template>\n"; });
define('text!filepicker/app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./filepanel\"></require>\n  <div class=\"w3-card-2 w3-sand w3-center\">\n    <h3>Virtual Folder - File Picker</h3>\n  </div>\n<div class=\"w3-margin w3-padding w3-card w3-sand\">\n  <filepanel></filepanel>\n</div>\n</template>\n"; });
define('text!filepicker/filepanel.html', ['module'], function(module) { module.exports = "<template bindable=\"panelid\">\n    <div class=\"w3-card-2 w3-pale-blue w3-hoverable w3-padding w3-margin-right\">\n        <span>${path} contains ${filescount} items.<button click.delegate=\"refresh()\">refresh</button></span>\n        <table id=\"${panelid}\">\n            <thead>\n            <tr>\n                <th style=\"text-align:left\">name</th>\n                <th style=\"text-align:right\">size</th>\n                <th style=\"text-align:center\">date</th>\n            </tr>\n            </thead>\n            <tbody>\n            <tr class=\"w3-hover-green\" repeat.for=\"file of files\" click.trigger=\"selectFile(file)\">\n              <td>${file.name}</td><td>${file.size}</td><td align=\"center\">${file.date}</td>\n            </tr>\n            </tbody>\n        </table>\n    </div>\n</template>\n"; });
define('text!pdbcomponents/dataitem.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./pdb-id\"></require>\n  <require from=\"./pdb-ids\"></require>\n  <require from=\"./entry-id\"></require>\n  <require from=\"./hideable\"></require>\n  <i class=\"fa fa-window-minimize\" click.delegate=\"hideitem()\"></i>\n\n  <span class=\"w3-right\" show.bind=\"itemPDBEntry\">recognized as PDB entry</span>\n  <span class=\"w3-right\" show.bind=\"! itemPDBEntry\">recognized as UniProt entry</span>\n  <br/><span if.bind=\"itemPDBEntry\">PDB Links:<a href='javascript:void(0);' class='pdb-links' pdb-id=\"${item}\">${item}</a></span>\n  <span if.bind=\"! itemPDBEntry\">UniProt Link <a href=\"http://www.uniprot.org/uniprot/${item}\">${item}</a></span>\n  <div id=\"pdblinks-${item}\" if.bind=\"showitem\">\n    <hideable defaulthide=true title=\"PDB Litemol Viewer\"><div style=\"position:relative;height:400px;width:600px;\"><pdb-lite-mol pdb-id=\"'${item}'\" hide-controls=\"true\" load-ed-maps=\"true\"></pdb-lite-mol></div></hideable>\n    <hideable title=\"PDB Redo\"><pdb-redo pdb-id=\"${item}\"></pdb-redo></hideable>\n    <hideable title=\"PDB Residue interaction\"><pdb-residue-interactions pdb-id=\"${item}\"></pdb-residue-interactions></hideable>\n    <hideable title=\"PDB 3D complex\">\n      <pdb-3d-complex pdb-id=\"${item}\" assembly-id=\"1\"></pdb-3d-complex>\n    </hideable>\n    <hr/>\n    Showing entity-id:<select name=\"entityids\" value.bind=\"selectedid\" change.delegate=\"selectedValueChanged()\"><option repeat.for=\"entityid of entityids\" value=\"${entityid}\">${entityid}</option></select>\n    <hideable title=\"PDB Topology Viewer\"><pdb-topology-viewer ref=\"el1\" entry-id=\"${item}\" entity-id=\"1\"></pdb-topology-viewer></hideable>\n    <hideable title=\"PDB Sequence Viewer\"><pdb-seq-viewer ref=\"el2\" entry-id=\"${item}\" entity-id=\"1\" height=\"370\"></pdb-seq-viewer></hideable>\n  </div>\n\n  <div id=\"uniprot-${item}\" if.bind=\"showuniprotitem\">\n    <hideable title=\"PDB UniProt Viewer\"><pdb-uniprot-viewer entry-id=\"${item}\" height=\"320\"></pdb-uniprot-viewer></hideable>\n  </div>\n\n</template>\n"; });
define('text!pdbcomponents/dataset.html', ['module'], function(module) { module.exports = "<template>\n\n  <require from=\"./pdb-id\"></require>\n  <require from=\"./pdb-ids\"></require>\n  <require from=\"./entry-id\"></require>\n  <require from=\"./dataitem\"></require>\n  <require from=\"./hideable\"></require>\n  <require from=\"../autocomplete/vfAutocompleteSearch\"></require>\n\n<div class=\"w3-card w3-pale-blue\">\n\n  <h1>Dataset demo</h1>\n  <form>\n    PDB or related item to add:\n    <vf-autocomplete-search submit.call=\"additem(item)\"></vf-autocomplete-search>\n  </form>\n\n\n\n<hr/>\n  <hideable title=\"PDB Prints\"><pdb-prints pdb-ids='${pdbdataset}' settings='{\"size\": 24 }'></pdb-prints></hideable>\n<br/>\n  <ul>\n    <li repeat.for=\"item of pdbdataset\"><span class=\"w3-black w3-center\">${item}</span>\n      <i class=\"fa fa-remove\" click.delegate=\"removeitem(item)\"></i>\n      <dataitem item=\"${item}\"></dataitem>\n    </li>\n  </ul>\n\n  dataset name:\n  <input value.bind=\"name\" change.trigger=\"changename()\"/>\n  <br/>\n  <button click.delegate=\"submit()\" disabled.bind=\"!canSubmit\">Publish dataset</button>\n\n</div>\n</template>\n"; });
define('text!pdbcomponents/hideable.html', ['module'], function(module) { module.exports = "<template>\n    <button class=\"w3-button w3-block w3-padding-0 w3-border\" click.delegate=\"changeshowit()\">${title}</button>\n    <span show.bind=\"showit\">\n      <slot></slot>\n    </span>\n</template>\n"; });
define('text!pdbcomponents/viewpanel.html', ['module'], function(module) { module.exports = "<template bindable=\"panelid\">\n\n    <p><b>EMBL EBI PDB Viewer: </b><span id=\"pdbid\"></span></p>\n    <input id=\"pdbid\" title=\"type PDB id and press enter\" placeholder=\"1r6a\"\n           maxlength=\"4\" size=\"4\" value.bind=\"pdbentry\"\n           change.delegate='loadpdb()'/>from PDB database</input>\n    <div id=\"pdbwrapper\">\n        <div style=\"position:relative;height:600px;width:800px;\" id=\"pdbviewer\">\n            <pdb-lite-mol pdb-id=\"'4ika'\" load-ed-maps=\"true\"></pdb-lite-mol>\n        </div>\n    </div>\n\n</template>\n"; });
define('text!tabs/tabs.html', ['module'], function(module) { module.exports = "<template>\n    <ul class=\"w3-navbar\">\n        <li repeat.for=\"tab of tabs\">\n            <a class=\"w3-padding-tiny w3-small w3-light-grey w3-hover-blue\" href=\"javascript:void(0)\" click.delegate=\"opentab(tab)\">${tab.label}</a>\n        </li>\n    </ul>\n</template>"; });
define('text!virtualfoldermodules/app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./modulesetting\"></require>\n\n  <modulesetting></modulesetting>\n\n</template>\n"; });
define('text!virtualfoldermodules/ccp4control.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"w3-css/w3.css\"></require>\n  <div class=\"w3-third w3-card-4 w3-sand w3-padding\">\n\n    <h4>CCP4 suite</h4>\n    <p>The CCP4 (Collaborative Computational Project, Number 4)\n      software suite is a collection of programs and associated data\n      and software libraries which can be used for macromolecular\n      structure determination by X-ray crystallography.</p>\n    <p>West-life portal allows access to CCP4 software tools without need to install them separatately. </p>\n    <p show.bind=\"!enabled\">To enable local copy of CCP4 suite you agree that you have Academic or Commercial License. If not, please obtain a license first at <a href=\"http://www.ccp4.ac.uk/ccp4license.php\">CCP4License</a>.</p>\n    <button show.bind=\"!enabled\" class=\"w3-btn w3-round-large\" click.trigger=\"enable()\">Agree & Enable CCP4</button>\n\n</div>\n</template>\n"; });
define('text!virtualfoldermodules/modulesetting.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./scipioncontrol\"></require>\n  <require from=\"./virtuosocontrol\"></require>\n  <require from=\"./ccp4control\"></require>\n\n  <div class=\"w3-card-2 w3-sand\">\n    <h3 align=\"center\">Virtual Folder Modules</h3>\n  </div>\n  <scipioncontrol></scipioncontrol>\n  <virtuosocontrol></virtuosocontrol>\n  <ccp4control></ccp4control>\n  <div class=\"w3-padding w3-margin w3-clear\"></div>\n</template>\n"; });
define('text!virtualfoldermodules/scipioncontrol.html', ['module'], function(module) { module.exports = "<template>\n\n<div class=\"w3-third w3-card-4 w3-sand w3-padding\">\n\n    <h4>Scipion</h4>\n    <p>Scipion is an image processing framework to obtain 3D models\n      of macromolecular complexes using Electron Microscopy.</p>\n    <p>West-life portal allows access to Scipion software tools without need to install them separatately. </p>\n    <p show.bind=\"!enabled\">To enable and start local copy of Scipion Webtools, please click the Enable button.</p>\n    <button show.bind=\"!enabled\" class=\"w3-btn w3-round-large\" click.trigger=\"enable()\">Enable Scipion</button>\n    <p show.bind=\"enabled\">\n      Access Scipion Services:<a href=\"http://localhost:8001/\">local Scipion webtool</a>\n    </p>\n</div>\n</template>\n"; });
define('text!virtualfoldermodules/virtuosocontrol.html', ['module'], function(module) { module.exports = "<template>\n\n  <div class=\"w3-third\">\n    <div class=\"w3-card-4 w3-sand w3-padding w3-margin-left w3-margin-right\">\n    <h4>Virtuoso</h4>\n    <p>Virtuoso-opensource is Virtuoso is a scalable cross-platform server that combines Relational, Graph, and Document Data Management with Web Application Server and Web Services Platform functionality.\n    </p>\n    <p>To enable and start local instance of Virtuoso, please click the Enable button.</p>\n    <button class=\"w3-btn w3-round-large\" onclick=\"$.post('/metadataservice/sbservice/virtuoso'); this.disabled=true\">Enable Virtuoso</button>\n    <p>\n      Access Virtuoso Services:<a href=\"/virtuoso\">local Virtuoso webtool</a>\n    </p>\n    </div>\n</div>\n</template>\n"; });
define('text!virtualfoldersetting/aliastable.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"w3-half w3-sand w3-padding\">\n\n\n      <table class=\"w3-sand \">\n        <thead>\n        <tr><th colspan=\"3\">List of connected providers</th> </tr>\n        <tr>\n          <th align=\"left\">Alias</th>\n          <th align=\"left\">Type</th>\n          <th></th>\n        </tr>\n        </thead>\n        <tbody>\n        <tr class=\"w3-hover-green\" repeat.for=\"provider of providers\">\n          <td>${provider.alias}</td><td>${provider.type}</td><td><a href=\"filemanager.html\"class=\"w3-button\">Browse content</a></td><td align=\"center\"><i show.bind=\"!provider.temporary\" class=\"fa fa-remove\" click.delegate=\"removeProvider(provider)\"></i></td>\n        </tr>\n        </tbody>\n        <tfoot>\n        <tr>\n          <td colspan=\"3\"><button  class=\"w3-btn w3-round-large w3-blue\" type=\"submit\" class=\"w3-buttons\">Add new file provider</button></td>\n        </tr>\n        </tfoot>\n      </table>\n\n  </div>\n</template>\n"; });
define('text!virtualfoldersetting/app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./genericcontrol\"></require>\n  <require from=\"./aliastable\"></require>\n  <require from=\"w3-css/w3.css\"></require>\n  <div class=\"w3-card-2 w3-sand w3-center\">\n    <h3>Virtual Folder - Settings</h3>\n  </div>\n\n\n     <form submit.trigger=\"newProvider()\">\n    <aliastable></aliastable>\n    </form>\n\n    <genericcontrol show.bind=\"showprovider\"></genericcontrol>\n\n\n</template>\n"; });
define('text!virtualfoldersetting/genericcontrol.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"w3-css/w3.css\"></require>\n  <div class=\"w3-half w3-sand w3-padding\">\n\n    <form submit.trigger=\"addProvider()\">\n\n\n      <select class=\"w3-select\" name=\"option\" value.bind=\"selectedProvider\">\n        <option value=\"\" disabled selected>Choose provider</option>\n        <option repeat.for=\"provider of providers\" value.bind=\"provider\">${provider}</option>\n      </select>\n\n      <div show.bind=\"selectedProvider\">\n\n        <div show.bind=\"selectedB2Drop\">\n          <p>B2DROP is academic secure and trusted data exchange service provided by EUDAT.\n            West-life portal uses B2DROP TO store, upload and download AND share the data files.</p>\n          <p>You need to create B2DROP account first at <a href=\"https://b2drop.eudat.eu/pwm/public/NewUser?\">b2drop.eudat.eu/pwm/public/NewUser?</a>\n            Fill in the existing B2DROP username and password here:</p>\n          Username:<input type=\"text\" name=\"username\" size=\"15\" maxlength=\"1024\" value.bind=\"username\"/><br/>\n          Password:<input type=\"password\" name=\"securetoken\" size=\"30\" maxlength=\"1024\" value.bind=\"password\"/><br/>\n          Alias (optional):<input type=\"text\" name=\"alias\" size=\"15\" maxlength=\"1024\" value.bind=\"alias\"/><br/>\n          <span class=\"w3-tiny\">Alias is a unique name of the 'folder' under which the provider wil be 'mounted' and accessible.</span>\n          <button class=\"w3-btn w3-round-large w3-right\" type=\"submit\">Add</button>\n        </div>\n\n        <div show.bind=\"selectedDropbox\">\n          <p>DROPBOX is a commercial data store and exchange service.\n            West-life portal can use your DROPBOX account to access and download your data files. </p>\n\n          <input type=\"checkbox\" ref=\"knownSecureToken\"/><span class=\"w3-tiny\">I know secure token </span>\n          <div show.bind=\"!knowntoken\">\n            <p>You need to have existing DROPBOX account. </p>\n            <a class=\"w3-btn w3-round-large\" href=\"${dropboxauthurl}\" id=\"authlink\">Connect to DROPBOX</a>\n          </div>\n          <div show.bind=\"knowntoken\">Secure token:\n            <input type=\"text\" name=\"securetoken\" size=\"30\" maxlength=\"1024\" value.bind=\"securetoken\"\n                   readonly.bind=\"!editing\"/><br/>\n            Alias (optional):<input type=\"text\" name=\"alias\" size=\"15\" maxlength=\"1024\" value.bind=\"alias\"/><br/>\n            <span class=\"w3-tiny\">Alias is a unique name of the 'folder' under which the provider wil be 'mounted' and accessible.</span>\n            <button class=\"w3-btn w3-round-large\" type=\"submit\">Add</button>\n\n          </div>\n\n        </div>\n\n        <div show.bind=\"selectedFileSystem\">\n          Internal path to be linked:\n          <input type=\"text\" name=\"securetoken\" size=\"30\" maxlength=\"1024\" value.bind=\"filesystempath\"/><br/>\n          Alias (optional):<input type=\"text\" name=\"alias\" size=\"15\" maxlength=\"1024\" value.bind=\"alias\"/><br/>\n          <span class=\"w3-tiny\">Alias is a unique name of the 'folder' under which the provider wil be 'mounted' and accessible.</span>\n          <button class=\"w3-btn w3-round-large w3-right\" type=\"submit\">Add</button>\n        </div>\n\n        <div show.bind=\"selectedWebDav\">\n          <p>WEBDAV is standard protocol to access content via web technologies. If you have address (WebDAV url) of a\n            service, you can add it to West-life virtual folder directly.</p>\n          WebDAV URL:<input type=\"text\" name=\"accessurl\" size=\"15\" maxlength=\"1024\" value.bind=\"accessurl\"/><br/>\n          Username:<input type=\"text\" name=\"username\" size=\"15\" maxlength=\"1024\" value.bind=\"username\"/><br/>\n          Password:<input type=\"password\" name=\"securetoken\" size=\"30\" maxlength=\"1024\" value.bind=\"password\"/><br/>\n          Alias (optional):<input type=\"text\" name=\"alias\" size=\"15\" maxlength=\"1024\" value.bind=\"alias\"/><br/>\n          <span class=\"w3-tiny\">Alias is a unique name of the 'folder' under which the provider wil be 'mounted' and accessible.</span>\n          <button class=\"w3-btn w3-round-large w3-right\" type=\"submit\">Add</button>\n        </div>\n\n      </div>\n\n    </form>\n\n\n  </div>\n\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map