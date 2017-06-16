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

  var _dec, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class2, _temp;

  var VfAutocompleteSearch = exports.VfAutocompleteSearch = (_dec = (0, _aureliaFramework.computedFrom)('resultGroups'), (_class = (_temp = _class2 = function () {
    function VfAutocompleteSearch(httpclient) {
      _classCallCheck(this, VfAutocompleteSearch);

      _initDefineProp(this, 'value', _descriptor, this);

      _initDefineProp(this, 'placeholder', _descriptor2, this);

      _initDefineProp(this, 'size', _descriptor3, this);

      _initDefineProp(this, 'submit', _descriptor4, this);

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
        console.log("keypressed(): submitting()");

        if (evt.originalTarget) this.submit({ item: evt.originalTarget.value });else if (evt.target) this.submit({ item: evt.target.value });
        this.hideSuggestions();
      } else if (key === 27) this.hideSuggestions();else this.showSuggestions();

      return true;
    };

    VfAutocompleteSearch.prototype.clicked = function clicked(clickvalue) {
      console.log("clicked(): submitting()");
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
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'size', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return "40";
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'submit', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, 'resultGroupsEmpty', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'resultGroupsEmpty'), _class.prototype)), _class));
});
define('b2dropcontrol/onedrivecontrol',["exports", "aurelia-http-client"], function (exports, _aureliaHttpClient) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Onedrivecontrol = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var client = new _aureliaHttpClient.HttpClient();

  var Onedrivecontrol = exports.Onedrivecontrol = function Onedrivecontrol() {
    _classCallCheck(this, Onedrivecontrol);

    this.heading = "ONEDRIVE connector";
    this.clientid = "xUfizTokQv6mAiZ9sgzQnm0";
    this.servicecontext = "onedriveconnector";
  };
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
define('editor/fileeditor',["exports", "codemirror", "aurelia-event-aggregator", "aurelia-http-client", "../filepicker/messages", "aurelia-framework", "codemirror/mode/clike/clike", "codemirror/mode/htmlmixed/htmlmixed", "codemirror/mode/javascript/javascript"], function (exports, _codemirror, _aureliaEventAggregator, _aureliaHttpClient, _messages, _aureliaFramework) {
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
        lineWrapping: true,
        theme: "eclipse"
      });
    };

    Fileeditor.prototype.selectFile = function selectFile(file, senderid) {
      var _this2 = this;

      this.httpclient.get(file.webdavuri).then(function (data) {
        console.log("obtained data:");

        _this2.codemirror.setValue(data.response);
      }).catch(function (error) {
        alert('Error retrieving content from ' + file.webdavuri);
      });
    };

    return Fileeditor;
  }(), _class.inject = [Element, _aureliaEventAggregator.EventAggregator, _aureliaHttpClient.HttpClient], _temp);
});
define('filemanager2/app',['exports', 'aurelia-event-aggregator', '../filepicker/messages', 'aurelia-framework', 'aurelia-dialog', './fmsettings'], function (exports, _aureliaEventAggregator, _messages, _aureliaFramework, _aureliaDialog, _fmsettings) {
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
    function App(ea, dialogService) {
      var _this = this;

      _classCallCheck(this, App);

      this.ea = ea;
      this.ea.subscribe(_messages.SelectedFile, function (msg) {
        return _this.selectFile(msg.file, msg.senderid);
      });
      this.dialogService = dialogService;
    }

    App.prototype.selectFile = function selectFile(file, senderid) {
      console.log("selectFile()");
      console.log(file);
      console.log(senderid);
    };

    App.prototype.closeviewer = function closeviewer() {};

    App.prototype.setupFileManager = function setupFileManager() {
      this.dialogService.open({ viewModel: _fmsettings.Prompt, model: 'File Manager Settings' }).then(function (response) {

        if (!response.wasCancelled) {
          console.log('dialog OK');
        } else {
          console.log('dialog cancelled');
        }
      });
    };

    return App;
  }(), _class.inject = [_aureliaEventAggregator.EventAggregator, _aureliaDialog.DialogService], _temp);
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
define('filemanager2/fmsettings',['exports', 'aurelia-framework', 'aurelia-dialog'], function (exports, _aureliaFramework, _aureliaDialog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Prompt = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Prompt = exports.Prompt = (_dec = (0, _aureliaFramework.inject)(_aureliaDialog.DialogController), _dec(_class = function () {
    function Prompt(controller) {
      _classCallCheck(this, Prompt);

      this.controller = controller;
      this.answer = null;
      this.visualizepdb = typeof Storage !== "undefined" ? localStorage.getItem("visualizepdb") ? localStorage.getItem("visualizepdb") === "true" : true : true;
      console.log("constructor visualizepdb:" + this.visualizepdb);
      controller.settings.centerHorizontalOnly = true;
    }

    Prompt.prototype.activate = function activate(message) {
      this.visualizepdb = typeof Storage !== "undefined" ? localStorage.getItem("visualizepdb") ? localStorage.getItem("visualizepdb") === "true" : true : true;
      console.log("active visualizepdb:" + this.visualizepdb);
      this.message = message;
    };

    Prompt.prototype.close = function close() {

      if (typeof Storage !== "undefined") {
        localStorage.setItem("visualizepdb", this.visualizepdb);
      }
      console.log(this.visualizepdb);
      console.log(localStorage.getItem("visualizepdb"));
      this.controller.ok();
    };

    return Prompt;
  }()) || _class);
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
    aurelia.use.standardConfiguration().plugin('aurelia-dialog').feature('resources');

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

  var Panel = exports.Panel = (_class = (_temp = _class2 = function () {
    function Panel(ea) {
      var _this = this;

      _classCallCheck(this, Panel);

      _initDefineProp(this, 'pid', _descriptor, this);

      this.ea = ea;

      this.ea.subscribe(_messages.SelectedFile, function (msg) {
        return _this.selectFile(msg.file, msg.senderid);
      });
      this.ea.subscribe(_messages2.SelectedTab, function (msg) {
        return _this.selectTab(msg.tabid);
      });

      this.selectedView = this.selectedVisual = this.selectedDataset = false;
      this.selectedList = true;
    }

    Panel.prototype.bind = function bind() {
      this.ids = [this.pid + '.list', this.pid + '.view', this.pid + '.visual', this.pid + '.analyse', this.pid + '.dataset'];

      this.selectedTab = this.ids[0];
      this.paneltabs = [{ id: this.ids[0], label: 'File List' }, { id: this.ids[1], label: 'View/Edit' }, { id: this.ids[2], label: 'Visualize' }, { id: this.ids[3], label: 'Dataset' }];
    };

    Panel.prototype.selectTab = function selectTab(tabid) {
      if (tabid.startsWith(this.pid)) {
        this.selectedTab = tabid;
        this.selectedList = this.selectedTab == this.ids[0];
        this.selectedView = this.selectedTab == this.ids[1];
        this.selectedVisual = this.selectedTab == this.ids[2];
        this.selectedDataset = this.selectedTab == this.ids[3];
      }
    };

    Panel.prototype.selectFile = function selectFile(file, senderid) {
      var showpdb = file.webdavuri.endsWith('pdb') ? typeof Storage !== "undefined" ? localStorage.getItem("visualizepdb") ? localStorage.getItem("visualizepdb") === "true" : true : true : false;
      if (senderid != this.pid) {
        if (showpdb) {
          this.selectTab(this.ids[2]);
          this.ea.publish(new _messages.VisualizeFile(file, senderid));
        } else {
          this.selectTab(this.ids[1]);
          this.ea.publish(new _messages.EditFile(file, senderid));
        }
      }
    };

    return Panel;
  }(), _class2.inject = [_aureliaEventAggregator.EventAggregator], _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'pid', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class);
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
      window.opener.postMessage(window.location.protocol + "//" + window.location.hostname + file.publicwebdavuri, "*");

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
define('filepicker/filepanel',['exports', 'aurelia-http-client', 'aurelia-event-aggregator', './messages', 'aurelia-framework', 'whatwg-fetch'], function (exports, _aureliaHttpClient, _aureliaEventAggregator, _messages, _aureliaFramework) {
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
            this.getpublicwebdavurl = "/api/authproxy/get_signed_url/";
        }

        Filepanel.prototype.attached = function attached() {
            var _this = this;

            this.client.get(this.serviceurl).then(function (data) {
                if (data.response) {
                    _this.populateFiles(data.response);
                }
            }).catch(function (error) {
                if (error.statusCode == 403) {
                    console.log("redirecting");
                    window.location = "/login?next=" + window.location.pathname;
                } else {
                    console.log('Error');
                    console.log(error);
                }
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
            this.files.forEach(function (item, index, arr) {
                if (!arr[index].name && arr[index].alias) {
                    arr[index].name = arr[index].alias;
                    arr[index].attributes = 16;
                    arr[index].date = "";
                }
                if (arr[index].attributes & 16) arr[index].size = "DIR";else arr[index].size = ~~(arr[index].size / 1000000000) > 0 ? ~~(arr[index].size / 1000000000) + "GB" : ~~(arr[index].size / 1000000) > 0 ? ~~(arr[index].size / 1000000) + "MB" : ~~(arr[index].size / 1000) > 0 ? ~~(arr[index].size / 1000) + "kB" : arr[index].size + " b";
            });
            if (this.path.length > 0) {
                this.files.unshift({ name: "..", size: "UP DIR", date: "" });
            }
        };

        Filepanel.prototype.selectFile = function selectFile(file) {
            var _this3 = this;

            console.log("selectFile(" + file + ") panelid:" + this.panelid);
            if (file.size.endsWith && file.size.endsWith('DIR')) this.changefolder(file.name);else {
                var fileurl = this.serviceurl + this.path + '/' + file.name;
                this.client.head(fileurl).then(function (response) {
                    console.log('file head' + fileurl);
                    console.log(response);
                });

                this.client.get(this.getpublicwebdavurl).then(function (data) {
                    if (data.response) {
                        var mypath2 = JSON.parse(data.response);
                        var mypath = mypath2.signed_url;
                        mypath += _this3.path.startsWith('/') ? _this3.path.slice(1) : _this3.path;
                        file.publicwebdavuri = mypath + "/" + file.name;
                        _this3.ea.publish(new _messages.SelectedFile(file, _this3.panelid));
                    }
                });
            }
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
define('pdbcomponents/checkurl',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Checkurl = undefined;

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

  var _desc, _value, _class, _descriptor, _descriptor2, _class2, _temp;

  var Checkurl = exports.Checkurl = (_class = (_temp = _class2 = function () {
    function Checkurl(httpclient) {
      _classCallCheck(this, Checkurl);

      _initDefineProp(this, 'failmessage', _descriptor, this);

      _initDefineProp(this, 'url', _descriptor2, this);

      this.client = httpclient;
      this.showit = false;
    }

    Checkurl.prototype.attached = function attached() {
      var _this = this;

      console.log("Checkurl component:" + this.url + " message:" + this.failmessage);

      this.client.fetch(this.url, { method: 'HEAD' }).then(function (response) {
        console.log("checkurl response:");
        console.log(response);
        if (response.status == 200) _this.showit = true;
      }).catch(function (error) {
        _this.showit = false;
        console.log('checkurl error:' + error);
      });
    };

    return Checkurl;
  }(), _class2.inject = [_aureliaFetchClient.HttpClient], _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'failmessage', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return "No data available for this structure.";
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'url', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class);
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

      this.serviceurl = "//www.ebi.ac.uk/pdbe/api/pdb/entry/molecules/";
      this.client = httpclient;

      this.entityids = [1];
      this.selectedid = this.entityids[0];
      this.showitem = false;
      var location = window.location.protocol;
      this.pdbred = "cc";
    }

    Dataitem.prototype.bind = function bind() {
      var _this = this;

      this.itemPDBEntry = this.isPDBEntry(this.item);
      this.pdbredo = this.item[1] + this.item[2];
      console.log(this.pdbredo);

      this.itemUniprotEntry = this.isUniprotEntry(this.item);
      if (this.itemPDBEntry) {

        this.client.fetch(this.serviceurl + this.item).then(function (response) {
          return response.json();
        }).then(function (data) {
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

          console.log('Error dataitem().fetch() of "' + _this.serviceurl + _this.item + '"');
          console.log(error);
        });
      }
    };

    Dataitem.prototype.attached = function attached() {};

    Dataitem.prototype.selectedValueChanged = function selectedValueChanged() {
      if (!this.stemel1 && this.itemPDBEntry) {
        this.stemel1 = this.el1.cloneNode();
        this.stemel2 = this.el2.cloneNode();
      }

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
      this.showitem = !this.showitem;
    };

    Dataitem.prototype.isPDBEntry = function isPDBEntry(entry) {
      return (/^[0-9][A-Za-z0-9]{3}$/.test(entry)
      );
    };

    Dataitem.prototype.isUniprotEntry = function isUniprotEntry(entry) {
      return (/^[A-Z][0-9][A-Z0-9]{4}[A-Z0-9]*$/.test(entry)
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
define('pdbcomponents/dataset',['exports', 'aurelia-http-client', 'aurelia-framework', 'whatwg-fetch'], function (exports, _aureliaHttpClient, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Dataset = undefined;

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

  var _desc, _value, _class, _descriptor, _class2, _temp;

  var Dataset = exports.Dataset = (_class = (_temp = _class2 = function () {
    function Dataset(httpclient) {
      _classCallCheck(this, Dataset);

      _initDefineProp(this, 'panelid', _descriptor, this);

      this.dataseturl = "/metadataservice/dataset";

      this.client = httpclient;
      this.client.configure(function (config) {
        config.withHeader('Accept', 'application/json');
        config.withHeader('Content-Type', 'application/json');
      });
      this.showitem = true;
      this.showlist = true;
      this.pdbdataset = [];
      this.pdbdataitem = "";
      this.pdblinkset = [];
      this.pdbdataitem = "";
      this.submitdisabled2 = true;
      this.id = 0;
    }

    Dataset.prototype.createnewdataset = function createnewdataset() {
      this.pdbdataset = [];
      this.pdbdataitem = "";
      this.pdblinkset = [];
      this.pdbdataitem = "";
      this.submitdisabled2 = true;
      var date = new Date();
      this.name = "dataset-" + date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate();
      this.id = 0;
      this.showlist = false;
    };

    Dataset.prototype.attached = function attached() {
      var _this = this;

      this.client.get(this.dataseturl).then(function (data) {
        console.log("dataset.attached(), data:");
        console.log(data);
        _this.datasetlist = JSON.parse(data.response);
        console.log(_this.datasetlist);
      });
    };

    Dataset.prototype.unselectdataset = function unselectdataset(item) {
      this.showlist = true;
    };

    Dataset.prototype.selectdataset = function selectdataset(item) {
      var _this2 = this;

      console.log("selectdataset()");
      console.log(item);
      this.client.get(this.dataseturl + "/" + item.Id).then(function (data) {
        console.log("selecteddataset(), data:");
        console.log(data);
        _this2.submitdataset = JSON.parse(data.response);
        console.log(_this2.submitdataset);
        _this2.pdbdataset = _this2.submitdataset.Entries;
        _this2.name = _this2.submitdataset.Name;
        _this2.id = _this2.submitdataset.Id;
        _this2.showlist = false;
      });
    };

    Dataset.prototype.removedataset = function removedataset(item) {
      console.log("removedataset()");
      console.log(item);
    };

    Dataset.prototype.additem = function additem(item) {
      console.log("additem()");
      console.log(item);
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
      var _this3 = this;

      console.log("submitting data:");
      this.submitdataset = {};
      this.submitdataset.Id = this.id;
      this.submitdataset.Name = this.name;
      this.submitdataset.Entries = this.pdbdataset;

      console.log(this.submitdataset);
      console.log(JSON.stringify(this.submitdataset));

      if (this.id > 0) this.client.put(this.dataseturl + "/" + this.id, JSON.stringify(this.submitdataset)).then(function (data) {
        console.log("data response");
        console.log(data);
        var myitem = JSON.parse(data.response);

        _this3.showlist = true;
      }).catch(function (error) {
        console.log(error);
        alert('Sorry. Dataset not submitted  at ' + _this3.serviceurl + ' error:' + error.response + " status:" + error.statusText);
      });else this.client.post(this.dataseturl, JSON.stringify(this.submitdataset)).then(function (data) {
        console.log("data response");
        console.log(data);
        var myitem = JSON.parse(data.response);
        _this3.datasetlist.push({ Id: myitem.Id, Name: myitem.Name });
        _this3.showlist = true;
      }).catch(function (error) {
        console.log(error);
        alert('Sorry. Dataset not submitted  at ' + _this3.serviceurl + ' error:' + error.response + " status:" + error.statusText);
      });
    };

    _createClass(Dataset, [{
      key: 'canSubmit',
      get: function get() {
        if (this.pdbdataset.length > 0) return true;else return false;
      }
    }]);

    return Dataset;
  }(), _class2.inject = [_aureliaHttpClient.HttpClient], _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'panelid', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class);
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

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class, _temp;

  var Viewpanel = exports.Viewpanel = (_temp = _class = function () {
    function Viewpanel(el, ea, httpclient) {
      var _this = this;

      _classCallCheck(this, Viewpanel);

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
  }(), _class.inject = [Element, _aureliaEventAggregator.EventAggregator, _aureliaHttpClient.HttpClient], _temp);
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
define('uploaddirpicker/app',['exports', 'aurelia-event-aggregator', '../filepicker/messages'], function (exports, _aureliaEventAggregator, _messages) {
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
define('uploaddirpicker/main',['exports', '../environment'], function (exports, _environment) {
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
define('uploaddirpicker/uploaddirpanel',['exports', 'aurelia-http-client', 'aurelia-event-aggregator', '../filepicker/messages', 'aurelia-framework', '../filepicker/filepanel'], function (exports, _aureliaHttpClient, _aureliaEventAggregator, _messages, _aureliaFramework, _filepanel) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Uploaddirpanel = undefined;

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

  var Uploaddirpanel = exports.Uploaddirpanel = (_class = (_temp = _class2 = function (_Filepanel) {
    _inherits(Uploaddirpanel, _Filepanel);

    function Uploaddirpanel(ea, httpclient) {
      _classCallCheck(this, Uploaddirpanel);

      var _this = _possibleConstructorReturn(this, _Filepanel.call(this, ea, httpclient));

      _initDefineProp(_this, 'panelid', _descriptor, _this);

      return _this;
    }

    Uploaddirpanel.prototype.selectFile = function selectFile(file) {
      console.log("filepanel tableid:" + this.panelid);
      if (file.size.endsWith && file.size.endsWith('DIR')) this.changefolder(file.name);
    };

    Uploaddirpanel.prototype.selectThisDir = function selectThisDir() {
      var _this2 = this;

      console.log("selected:" + this.path);
      var myfile = {};
      myfile.name = this.path;
      this.client.get(this.getpublicwebdavurl).then(function (data) {
        if (data.response) {
          var mypath2 = JSON.parse(data.response);
          var mypath = mypath2.signed_url;
          mypath += _this2.path.startsWith('/') ? _this2.path.slice(1) : _this2.path;
          var mydir = {};
          mydir.webdavuri = mypath;
          _this2.ea.publish(new _messages.SelectedFile(mydir, _this2.panelid));
        }
      });
    };

    return Uploaddirpanel;
  }(_filepanel.Filepanel), _class2.inject = [_aureliaEventAggregator.EventAggregator, _aureliaHttpClient.HttpClient], _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'panelid', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
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
define('virtualfoldermodules/ccp4control',["exports", "./modulecontrol", "aurelia-framework"], function (exports, _modulecontrol, _aureliaFramework) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Ccp4control = undefined;

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

  var _desc, _value, _class, _descriptor;

  var Ccp4control = exports.Ccp4control = (_class = function (_Modulecontrol) {
    _inherits(Ccp4control, _Modulecontrol);

    function Ccp4control() {
      _classCallCheck(this, Ccp4control);

      var _this = _possibleConstructorReturn(this, _Modulecontrol.call(this));

      _initDefineProp(_this, "classin", _descriptor, _this);

      _this.posturl = "/metadataservice/sbservice/ccp4suite";
      _this.url = "/metadataservice/sbservice/ccp4suite";
      return _this;
    }

    return Ccp4control;
  }(_modulecontrol.Modulecontrol), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "classin", [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return "w3-card-4 w3-sand w3-padding w3-margin w3-round";
    }
  })), _class);
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
define('virtualfoldermodules/scipioncontrol',["exports", "./modulecontrol", "aurelia-framework"], function (exports, _modulecontrol, _aureliaFramework) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Scipioncontrol = undefined;

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

  var _desc, _value, _class, _descriptor;

  var Scipioncontrol = exports.Scipioncontrol = (_class = function (_Modulecontrol) {
    _inherits(Scipioncontrol, _Modulecontrol);

    function Scipioncontrol() {
      _classCallCheck(this, Scipioncontrol);

      var _this = _possibleConstructorReturn(this, _Modulecontrol.call(this));

      _initDefineProp(_this, "classin", _descriptor, _this);

      _this.url = "/metadataservice/sbservice/scipion";
      _this.posturl = "/metadataservice/sbservice/scipion";
      return _this;
    }

    return Scipioncontrol;
  }(_modulecontrol.Modulecontrol), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "classin", [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return "w3-card-4 w3-sand w3-padding w3-margin w3-round";
    }
  })), _class);
});
define('virtualfoldermodules/virtuosocontrol',["exports", "./modulecontrol", "aurelia-framework"], function (exports, _modulecontrol, _aureliaFramework) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Virtuosocontrol = undefined;

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

  var _desc, _value, _class, _descriptor;

  var Virtuosocontrol = exports.Virtuosocontrol = (_class = function (_Modulecontrol) {
    _inherits(Virtuosocontrol, _Modulecontrol);

    function Virtuosocontrol() {
      _classCallCheck(this, Virtuosocontrol);

      var _this = _possibleConstructorReturn(this, _Modulecontrol.call(this));

      _initDefineProp(_this, "classin", _descriptor, _this);

      _this.url = "/metadataservice/sbservice/virtuoso";
      return _this;
    }

    return Virtuosocontrol;
  }(_modulecontrol.Modulecontrol), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "classin", [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return "w3-card-4 w3-sand w3-padding w3-margin w3-round";
    }
  })), _class);
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
        console.log("aliastable.attached() error:");
        console.log(error);

        if (error.statusCode == 403) {
          console.log("redirecting");
          window.location = "/login?next=" + window.location.pathname;
        } else alert('Sorry, error when connecting backend web service at ' + _this2.serviceurl + ' error:' + error.response + " status:" + error.statusText);
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
define('virtualfoldersetting/app',['exports'], function (exports) {
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

    var location = window.location.protocol;
    this.islocalhost = location.startsWith('http:');
  };
});
define('virtualfoldersetting/clouddeployment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Clouddeployment = exports.Clouddeployment = function Clouddeployment() {
    _classCallCheck(this, Clouddeployment);
  };
});
define('virtualfoldersetting/dropboxcontrol',['exports', './urlutils', 'aurelia-event-aggregator', './messages', "dropbox"], function (exports, _urlutils, _aureliaEventAggregator, _messages, Dropbox) {
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
      try {
        var dbx = new Dropbox({
          clientId: this.CLIENTIDENC.split('').map(function (c) {
            return String.fromCharCode(23 ^ c.charCodeAt());
          }).join("")
        });
        var currentUrl = window.location.href;

        this.authurl = dbx.getAuthenticationUrl(currentUrl);
      } catch (e) {
        console.log("exception:");
        console.log(e);
      }

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
      }).catch(function (error) {
        if (error.statusCode == 403) {
          console.log("redirecting");
          window.location = "/login?next=" + window.location.pathname;
        } else {
          console.log('Error');
          console.log(error);
        }
      });;
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
define('virtualfoldersetting/storageprovider',['exports', 'aurelia-event-aggregator', './messages'], function (exports, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Storageprovider = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class, _temp;

  var Storageprovider = exports.Storageprovider = (_temp = _class = function () {
    function Storageprovider(ea) {
      var _this = this;

      _classCallCheck(this, Storageprovider);

      this.showprovider = false;
      ea.subscribe(_messages.SettingsSubmitted, function (msg) {
        return _this.submitSettings(msg.settings);
      });
      ea.subscribe(_messages.SettingsSelected, function (msg) {
        return _this.selectSettings(msg.settings);
      });
    }

    Storageprovider.prototype.newProvider = function newProvider() {
      this.showprovider = true;
    };

    Storageprovider.prototype.submitSettings = function submitSettings(settings) {
      this.showprovider = false;
    };

    Storageprovider.prototype.selectSettings = function selectSettings(settings) {
      this.showprovider = true;
    };

    return Storageprovider;
  }(), _class.inject = [_aureliaEventAggregator.EventAggregator], _temp);
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

define('aurelia-dialog/dialog-configuration',["require", "exports", "./renderer", "./dialog-settings", "./dialog-renderer", "aurelia-pal"], function (require, exports, renderer_1, dialog_settings_1, dialog_renderer_1, aurelia_pal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var defaultRenderer = dialog_renderer_1.DialogRenderer;
    var resources = {
        'ux-dialog': aurelia_pal_1.PLATFORM.moduleName('./ux-dialog'),
        'ux-dialog-header': aurelia_pal_1.PLATFORM.moduleName('./ux-dialog-header'),
        'ux-dialog-body': aurelia_pal_1.PLATFORM.moduleName('./ux-dialog-body'),
        'ux-dialog-footer': aurelia_pal_1.PLATFORM.moduleName('./ux-dialog-footer'),
        'attach-focus': aurelia_pal_1.PLATFORM.moduleName('./attach-focus')
    };
    // tslint:disable-next-line:max-line-length
    var defaultCSSText = "ux-dialog-container,ux-dialog-overlay{position:fixed;top:0;right:0;bottom:0;left:0}ux-dialog-overlay{opacity:0}ux-dialog-overlay.active{opacity:1}ux-dialog-container{display:block;transition:opacity .2s linear;opacity:0;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch}ux-dialog-container.active{opacity:1}ux-dialog-container>div{padding:30px}ux-dialog-container>div>div{display:block;min-width:300px;width:-moz-fit-content;width:-webkit-fit-content;width:fit-content;height:-moz-fit-content;height:-webkit-fit-content;height:fit-content;margin:auto}ux-dialog-container,ux-dialog-container>div,ux-dialog-container>div>div{outline:0}ux-dialog{display:table;box-shadow:0 5px 15px rgba(0,0,0,.5);border:1px solid rgba(0,0,0,.2);border-radius:5px;padding:3px;min-width:300px;width:-moz-fit-content;width:-webkit-fit-content;width:fit-content;height:-moz-fit-content;height:-webkit-fit-content;height:fit-content;margin:auto;border-image-source:initial;border-image-slice:initial;border-image-width:initial;border-image-outset:initial;border-image-repeat:initial;background:#fff}ux-dialog>ux-dialog-header{display:block;padding:16px;border-bottom:1px solid #e5e5e5}ux-dialog>ux-dialog-header>button{float:right;border:none;display:block;width:32px;height:32px;background:0 0;font-size:22px;line-height:16px;margin:-14px -16px 0 0;padding:0;cursor:pointer}ux-dialog>ux-dialog-body{display:block;padding:16px}ux-dialog>ux-dialog-footer{display:block;padding:6px;border-top:1px solid #e5e5e5;text-align:right}ux-dialog>ux-dialog-footer button{color:#333;background-color:#fff;padding:6px 12px;font-size:14px;text-align:center;white-space:nowrap;vertical-align:middle;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;background-image:none;border:1px solid #ccc;border-radius:4px;margin:5px 0 5px 5px}ux-dialog>ux-dialog-footer button:disabled{cursor:default;opacity:.45}ux-dialog>ux-dialog-footer button:hover:enabled{color:#333;background-color:#e6e6e6;border-color:#adadad}.ux-dialog-open{overflow:hidden}";
    /**
     * A configuration builder for the dialog plugin.
     */
    var DialogConfiguration = (function () {
        function DialogConfiguration(frameworkConfiguration, applySetter) {
            var _this = this;
            this.resources = [];
            this.fwConfig = frameworkConfiguration;
            this.settings = this.fwConfig.container.get(dialog_settings_1.DefaultDialogSettings);
            applySetter(function () { return _this._apply(); });
        }
        DialogConfiguration.prototype._apply = function () {
            var _this = this;
            this.fwConfig.transient(renderer_1.Renderer, this.renderer);
            this.resources.forEach(function (resourceName) { return _this.fwConfig.globalResources(resources[resourceName]); });
            if (this.cssText) {
                aurelia_pal_1.DOM.injectStyles(this.cssText);
            }
        };
        /**
         * Selects the Aurelia conventional defaults for the dialog plugin.
         * @return This instance.
         */
        DialogConfiguration.prototype.useDefaults = function () {
            return this.useRenderer(defaultRenderer)
                .useCSS(defaultCSSText)
                .useStandardResources();
        };
        /**
         * Exports the standard set of dialog behaviors to Aurelia's global resources.
         * @return This instance.
         */
        DialogConfiguration.prototype.useStandardResources = function () {
            return this.useResource('ux-dialog')
                .useResource('ux-dialog-header')
                .useResource('ux-dialog-body')
                .useResource('ux-dialog-footer')
                .useResource('attach-focus');
        };
        /**
         * Exports the chosen dialog element or view to Aurelia's global resources.
         * @param resourceName The name of the dialog resource to export.
         * @return This instance.
         */
        DialogConfiguration.prototype.useResource = function (resourceName) {
            this.resources.push(resourceName);
            return this;
        };
        /**
         * Configures the plugin to use a specific dialog renderer.
         * @param renderer A type that implements the Renderer interface.
         * @param settings Global settings for the renderer.
         * @return This instance.
         */
        DialogConfiguration.prototype.useRenderer = function (renderer, settings) {
            this.renderer = renderer;
            if (settings) {
                Object.assign(this.settings, settings);
            }
            return this;
        };
        /**
         * Configures the plugin to use specific css.
         * @param cssText The css to use in place of the default styles.
         * @return This instance.
         */
        DialogConfiguration.prototype.useCSS = function (cssText) {
            this.cssText = cssText;
            return this;
        };
        return DialogConfiguration;
    }());
    exports.DialogConfiguration = DialogConfiguration;
});

define('aurelia-dialog/renderer',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * An abstract base class for implementors of the basic Renderer API.
     */
    var Renderer = (function () {
        function Renderer() {
        }
        /**
         * Gets an anchor for the ViewSlot to insert a view into.
         * @returns A DOM element.
         */
        Renderer.prototype.getDialogContainer = function () {
            throw new Error('DialogRenderer must implement getDialogContainer().');
        };
        /**
         * Displays the dialog.
         * @returns Promise A promise that resolves when the dialog has been displayed.
         */
        Renderer.prototype.showDialog = function (dialogController) {
            throw new Error('DialogRenderer must implement showDialog().');
        };
        /**
         * Hides the dialog.
         * @returns Promise A promise that resolves when the dialog has been hidden.
         */
        Renderer.prototype.hideDialog = function (dialogController) {
            throw new Error('DialogRenderer must implement hideDialog().');
        };
        return Renderer;
    }());
    exports.Renderer = Renderer;
});

define('aurelia-dialog/dialog-settings',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @internal
     */
    var DefaultDialogSettings = (function () {
        function DefaultDialogSettings() {
            this.lock = true;
            this.startingZIndex = 1000;
            this.centerHorizontalOnly = false;
            this.rejectOnCancel = false;
            this.ignoreTransitions = false;
        }
        return DefaultDialogSettings;
    }());
    exports.DefaultDialogSettings = DefaultDialogSettings;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('aurelia-dialog/dialog-renderer',["require", "exports", "aurelia-pal", "aurelia-dependency-injection"], function (require, exports, aurelia_pal_1, aurelia_dependency_injection_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var containerTagName = 'ux-dialog-container';
    var overlayTagName = 'ux-dialog-overlay';
    exports.transitionEvent = (function () {
        var transition;
        return function () {
            if (transition) {
                return transition;
            }
            var el = aurelia_pal_1.DOM.createElement('fakeelement');
            var transitions = {
                transition: 'transitionend',
                OTransition: 'oTransitionEnd',
                MozTransition: 'transitionend',
                WebkitTransition: 'webkitTransitionEnd'
            };
            for (var t in transitions) {
                if (el.style[t] !== undefined) {
                    transition = transitions[t];
                    return transition;
                }
            }
            return '';
        };
    })();
    exports.hasTransition = (function () {
        var unprefixedName = 'transitionDuration';
        var el = aurelia_pal_1.DOM.createElement('fakeelement');
        var prefixedNames = ['webkitTransitionDuration', 'oTransitionDuration'];
        var transitionDurationName;
        if (unprefixedName in el.style) {
            transitionDurationName = unprefixedName;
        }
        else {
            transitionDurationName = prefixedNames.find(function (prefixed) { return (prefixed in el.style); });
        }
        return function (element) {
            return !!transitionDurationName && !!(aurelia_pal_1.DOM.getComputedStyle(element)[transitionDurationName]
                .split(',')
                .find(function (duration) { return !!parseFloat(duration); }));
        };
    })();
    var body = aurelia_pal_1.DOM.querySelectorAll('body')[0];
    function getActionKey(e) {
        if ((e.code || e.key) === 'Escape' || e.keyCode === 27) {
            return 'Escape';
        }
        if ((e.code || e.key) === 'Enter' || e.keyCode === 13) {
            return 'Enter';
        }
        return undefined;
    }
    var DialogRenderer = DialogRenderer_1 = (function () {
        function DialogRenderer() {
        }
        DialogRenderer.keyboardEventHandler = function (e) {
            var key = getActionKey(e);
            if (!key) {
                return;
            }
            var top = DialogRenderer_1.dialogControllers[DialogRenderer_1.dialogControllers.length - 1];
            if (!top || !top.settings.keyboard) {
                return;
            }
            var keyboard = top.settings.keyboard;
            if (key === 'Escape'
                && (keyboard === true || keyboard === key || (Array.isArray(keyboard) && keyboard.indexOf(key) > -1))) {
                top.cancel();
            }
            else if (key === 'Enter' && (keyboard === key || (Array.isArray(keyboard) && keyboard.indexOf(key) > -1))) {
                top.ok();
            }
        };
        DialogRenderer.trackController = function (dialogController) {
            if (!DialogRenderer_1.dialogControllers.length) {
                aurelia_pal_1.DOM.addEventListener('keyup', DialogRenderer_1.keyboardEventHandler, false);
            }
            DialogRenderer_1.dialogControllers.push(dialogController);
        };
        DialogRenderer.untrackController = function (dialogController) {
            var i = DialogRenderer_1.dialogControllers.indexOf(dialogController);
            if (i !== -1) {
                DialogRenderer_1.dialogControllers.splice(i, 1);
            }
            if (!DialogRenderer_1.dialogControllers.length) {
                aurelia_pal_1.DOM.removeEventListener('keyup', DialogRenderer_1.keyboardEventHandler, false);
            }
        };
        DialogRenderer.prototype.getOwnElements = function (parent, selector) {
            var elements = parent.querySelectorAll(selector);
            var own = [];
            for (var i = 0; i < elements.length; i++) {
                if (elements[i].parentElement === parent) {
                    own.push(elements[i]);
                }
            }
            return own;
        };
        DialogRenderer.prototype.attach = function (dialogController) {
            var spacingWrapper = aurelia_pal_1.DOM.createElement('div'); // TODO: check if redundant
            spacingWrapper.appendChild(this.anchor);
            this.dialogContainer = aurelia_pal_1.DOM.createElement(containerTagName);
            this.dialogContainer.appendChild(spacingWrapper);
            this.dialogOverlay = aurelia_pal_1.DOM.createElement(overlayTagName);
            var zIndex = typeof dialogController.settings.startingZIndex === 'number'
                ? dialogController.settings.startingZIndex + ''
                : null;
            this.dialogOverlay.style.zIndex = zIndex;
            this.dialogContainer.style.zIndex = zIndex;
            var lastContainer = this.getOwnElements(this.host, containerTagName).pop();
            if (lastContainer && lastContainer.parentElement) {
                this.host.insertBefore(this.dialogContainer, lastContainer.nextSibling);
                this.host.insertBefore(this.dialogOverlay, lastContainer.nextSibling);
            }
            else {
                this.host.insertBefore(this.dialogContainer, this.host.firstChild);
                this.host.insertBefore(this.dialogOverlay, this.host.firstChild);
            }
            dialogController.controller.attached();
            this.host.classList.add('ux-dialog-open');
        };
        DialogRenderer.prototype.detach = function (dialogController) {
            this.host.removeChild(this.dialogOverlay);
            this.host.removeChild(this.dialogContainer);
            dialogController.controller.detached();
            if (!DialogRenderer_1.dialogControllers.length) {
                this.host.classList.remove('ux-dialog-open');
            }
        };
        DialogRenderer.prototype.setAsActive = function () {
            this.dialogOverlay.classList.add('active');
            this.dialogContainer.classList.add('active');
        };
        DialogRenderer.prototype.setAsInactive = function () {
            this.dialogOverlay.classList.remove('active');
            this.dialogContainer.classList.remove('active');
        };
        DialogRenderer.prototype.setupClickHandling = function (dialogController) {
            this.stopPropagation = function (e) { e._aureliaDialogHostClicked = true; };
            this.closeDialogClick = function (e) {
                if (dialogController.settings.overlayDismiss && !e._aureliaDialogHostClicked) {
                    dialogController.cancel();
                }
            };
            this.dialogContainer.addEventListener('click', this.closeDialogClick);
            this.anchor.addEventListener('click', this.stopPropagation);
        };
        DialogRenderer.prototype.clearClickHandling = function () {
            this.dialogContainer.removeEventListener('click', this.closeDialogClick);
            this.anchor.removeEventListener('click', this.stopPropagation);
        };
        DialogRenderer.prototype.centerDialog = function () {
            var child = this.dialogContainer.children[0];
            var vh = Math.max(aurelia_pal_1.DOM.querySelectorAll('html')[0].clientHeight, window.innerHeight || 0);
            child.style.marginTop = Math.max((vh - child.offsetHeight) / 2, 30) + 'px';
            child.style.marginBottom = Math.max((vh - child.offsetHeight) / 2, 30) + 'px';
        };
        DialogRenderer.prototype.awaitTransition = function (setActiveInactive, ignore) {
            var _this = this;
            return new Promise(function (resolve) {
                var renderer = _this;
                var eventName = exports.transitionEvent();
                function onTransitionEnd(e) {
                    if (e.target !== renderer.dialogContainer) {
                        return;
                    }
                    renderer.dialogContainer.removeEventListener(eventName, onTransitionEnd);
                    resolve();
                }
                if (ignore || !exports.hasTransition(_this.dialogContainer)) {
                    resolve();
                }
                else {
                    _this.dialogContainer.addEventListener(eventName, onTransitionEnd);
                }
                setActiveInactive();
            });
        };
        DialogRenderer.prototype.getDialogContainer = function () {
            return this.anchor || (this.anchor = aurelia_pal_1.DOM.createElement('div'));
        };
        DialogRenderer.prototype.showDialog = function (dialogController) {
            var _this = this;
            if (dialogController.settings.host) {
                this.host = dialogController.settings.host;
            }
            else {
                this.host = body;
            }
            var settings = dialogController.settings;
            this.attach(dialogController);
            if (typeof settings.position === 'function') {
                settings.position(this.dialogContainer, this.dialogOverlay);
            }
            else if (!settings.centerHorizontalOnly) {
                this.centerDialog();
            }
            DialogRenderer_1.trackController(dialogController);
            this.setupClickHandling(dialogController);
            return this.awaitTransition(function () { return _this.setAsActive(); }, dialogController.settings.ignoreTransitions);
        };
        DialogRenderer.prototype.hideDialog = function (dialogController) {
            var _this = this;
            this.clearClickHandling();
            DialogRenderer_1.untrackController(dialogController);
            return this.awaitTransition(function () { return _this.setAsInactive(); }, dialogController.settings.ignoreTransitions)
                .then(function () { _this.detach(dialogController); });
        };
        return DialogRenderer;
    }());
    DialogRenderer.dialogControllers = [];
    DialogRenderer = DialogRenderer_1 = __decorate([
        aurelia_dependency_injection_1.transient()
    ], DialogRenderer);
    exports.DialogRenderer = DialogRenderer;
    var DialogRenderer_1;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('aurelia-dialog/ux-dialog',["require", "exports", "aurelia-templating"], function (require, exports, aurelia_templating_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UxDialog = (function () {
        function UxDialog() {
        }
        return UxDialog;
    }());
    UxDialog = __decorate([
        aurelia_templating_1.customElement('ux-dialog'),
        aurelia_templating_1.inlineView("\n  <template>\n    <slot></slot>\n  </template>\n")
    ], UxDialog);
    exports.UxDialog = UxDialog;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('aurelia-dialog/ux-dialog-header',["require", "exports", "aurelia-templating", "./dialog-controller"], function (require, exports, aurelia_templating_1, dialog_controller_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UxDialogHeader = (function () {
        function UxDialogHeader(controller) {
            this.controller = controller;
        }
        UxDialogHeader.prototype.bind = function () {
            if (typeof this.showCloseButton !== 'boolean') {
                this.showCloseButton = !this.controller.settings.lock;
            }
        };
        return UxDialogHeader;
    }());
    /**
     * @internal
     */
    UxDialogHeader.inject = [dialog_controller_1.DialogController];
    __decorate([
        aurelia_templating_1.bindable()
    ], UxDialogHeader.prototype, "showCloseButton", void 0);
    UxDialogHeader = __decorate([
        aurelia_templating_1.customElement('ux-dialog-header'),
        aurelia_templating_1.inlineView("\n  <template>\n    <button\n      type=\"button\"\n      class=\"dialog-close\"\n      aria-label=\"Close\"\n      if.bind=\"showCloseButton\"\n      click.trigger=\"controller.cancel()\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n\n    <div class=\"dialog-header-content\">\n      <slot></slot>\n    </div>\n  </template>\n")
    ], UxDialogHeader);
    exports.UxDialogHeader = UxDialogHeader;
});

define('aurelia-dialog/dialog-controller',["require", "exports", "./renderer", "./lifecycle", "./dialog-cancel-error"], function (require, exports, renderer_1, lifecycle_1, dialog_cancel_error_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * A controller object for a Dialog instance.
     */
    var DialogController = (function () {
        /**
         * Creates an instance of DialogController.
         */
        function DialogController(renderer, settings, resolve, reject) {
            this.resolve = resolve;
            this.reject = reject;
            this.settings = settings;
            this.renderer = renderer;
        }
        /**
         * @internal
         */
        DialogController.prototype.releaseResources = function () {
            var _this = this;
            return lifecycle_1.invokeLifecycle(this.controller.viewModel || {}, 'deactivate')
                .then(function () { return _this.renderer.hideDialog(_this); })
                .then(function () { _this.controller.unbind(); });
        };
        /**
         * @internal
         */
        DialogController.prototype.cancelOperation = function () {
            if (!this.settings.rejectOnCancel) {
                return { wasCancelled: true };
            }
            throw dialog_cancel_error_1.createDialogCancelError();
        };
        /**
         * Closes the dialog with a successful output.
         * @param output The returned success output.
         */
        DialogController.prototype.ok = function (output) {
            return this.close(true, output);
        };
        /**
         * Closes the dialog with a cancel output.
         * @param output The returned cancel output.
         */
        DialogController.prototype.cancel = function (output) {
            return this.close(false, output);
        };
        /**
         * Closes the dialog with an error result.
         * @param message An error message.
         * @returns Promise An empty promise object.
         */
        DialogController.prototype.error = function (message) {
            var _this = this;
            return this.releaseResources().then(function () { _this.reject(message); });
        };
        /**
         * Closes the dialog.
         * @param ok Whether or not the user input signified success.
         * @param output The specified output.
         * @returns Promise An empty promise object.
         */
        DialogController.prototype.close = function (ok, output) {
            var _this = this;
            if (this.closePromise) {
                return this.closePromise;
            }
            return this.closePromise = lifecycle_1.invokeLifecycle(this.controller.viewModel || {}, 'canDeactivate').catch(function (reason) {
                _this.closePromise = undefined;
                return Promise.reject(reason);
            }).then(function (canDeactivate) {
                if (!canDeactivate) {
                    _this.closePromise = undefined; // we are done, do not block consecutive calls
                    return _this.cancelOperation();
                }
                return _this.releaseResources().then(function () {
                    if (!_this.settings.rejectOnCancel || ok) {
                        _this.resolve({ wasCancelled: !ok, output: output });
                    }
                    else {
                        _this.reject(dialog_cancel_error_1.createDialogCancelError(output));
                    }
                    return { wasCancelled: false };
                }).catch(function (reason) {
                    _this.closePromise = undefined;
                    return Promise.reject(reason);
                });
            });
        };
        return DialogController;
    }());
    /**
     * @internal
     */
    DialogController.inject = [renderer_1.Renderer];
    exports.DialogController = DialogController;
});

define('aurelia-dialog/lifecycle',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Call a lifecycle method on a viewModel if it exists.
     * @function
     * @param instance The viewModel instance.
     * @param name The lifecycle method name.
     * @param model The model to pass to the lifecycle method.
     * @returns Promise The result of the lifecycle method.
     */
    function invokeLifecycle(instance, name, model) {
        if (typeof instance[name] === 'function') {
            return new Promise(function (resolve) {
                resolve(instance[name](model));
            }).then(function (result) {
                if (result !== null && result !== undefined) {
                    return result;
                }
                return true;
            });
        }
        return Promise.resolve(true);
    }
    exports.invokeLifecycle = invokeLifecycle;
});

define('aurelia-dialog/dialog-cancel-error',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @internal
     */
    function createDialogCancelError(output) {
        var error = new Error('Operation cancelled.');
        error.wasCancelled = true;
        error.output = output;
        return error;
    }
    exports.createDialogCancelError = createDialogCancelError;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('aurelia-dialog/ux-dialog-body',["require", "exports", "aurelia-templating"], function (require, exports, aurelia_templating_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UxDialogBody = (function () {
        function UxDialogBody() {
        }
        return UxDialogBody;
    }());
    UxDialogBody = __decorate([
        aurelia_templating_1.customElement('ux-dialog-body'),
        aurelia_templating_1.inlineView("\n  <template>\n    <slot></slot>\n  </template>\n")
    ], UxDialogBody);
    exports.UxDialogBody = UxDialogBody;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('aurelia-dialog/ux-dialog-footer',["require", "exports", "aurelia-templating", "./dialog-controller"], function (require, exports, aurelia_templating_1, dialog_controller_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * View-model for footer of Dialog.
     */
    var UxDialogFooter = UxDialogFooter_1 = (function () {
        function UxDialogFooter(controller) {
            this.controller = controller;
            this.buttons = [];
            this.useDefaultButtons = false;
        }
        UxDialogFooter.isCancelButton = function (value) {
            return value === 'Cancel';
        };
        UxDialogFooter.prototype.close = function (buttonValue) {
            if (UxDialogFooter_1.isCancelButton(buttonValue)) {
                this.controller.cancel(buttonValue);
            }
            else {
                this.controller.ok(buttonValue);
            }
        };
        UxDialogFooter.prototype.useDefaultButtonsChanged = function (newValue) {
            if (newValue) {
                this.buttons = ['Cancel', 'Ok'];
            }
        };
        return UxDialogFooter;
    }());
    /**
     * @internal
     */
    UxDialogFooter.inject = [dialog_controller_1.DialogController];
    __decorate([
        aurelia_templating_1.bindable
    ], UxDialogFooter.prototype, "buttons", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxDialogFooter.prototype, "useDefaultButtons", void 0);
    UxDialogFooter = UxDialogFooter_1 = __decorate([
        aurelia_templating_1.customElement('ux-dialog-footer'),
        aurelia_templating_1.inlineView("\n  <template>\n    <slot></slot>\n    <template if.bind=\"buttons.length > 0\">\n      <button type=\"button\"\n        class=\"btn btn-default\"\n        repeat.for=\"button of buttons\"\n        click.trigger=\"close(button)\">\n        ${button}\n      </button>\n    </template>\n  </template>\n")
    ], UxDialogFooter);
    exports.UxDialogFooter = UxDialogFooter;
    var UxDialogFooter_1;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('aurelia-dialog/attach-focus',["require", "exports", "aurelia-templating", "aurelia-pal"], function (require, exports, aurelia_templating_1, aurelia_pal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AttachFocus = (function () {
        function AttachFocus(element) {
            this.element = element;
            this.value = true;
        }
        AttachFocus.prototype.attached = function () {
            if (this.value && this.value !== 'false') {
                this.element.focus();
            }
        };
        AttachFocus.prototype.valueChanged = function (newValue) {
            this.value = newValue;
        };
        return AttachFocus;
    }());
    /**
     * @internal
     */
    AttachFocus.inject = [aurelia_pal_1.DOM.Element];
    AttachFocus = __decorate([
        aurelia_templating_1.customAttribute('attach-focus')
    ], AttachFocus);
    exports.AttachFocus = AttachFocus;
});

define('aurelia-dialog/dialog-service',["require", "exports", "aurelia-dependency-injection", "aurelia-metadata", "aurelia-templating", "./dialog-settings", "./dialog-cancel-error", "./lifecycle", "./dialog-controller"], function (require, exports, aurelia_dependency_injection_1, aurelia_metadata_1, aurelia_templating_1, dialog_settings_1, dialog_cancel_error_1, lifecycle_1, dialog_controller_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /* tslint:enable:max-line-length */
    function whenClosed(onfulfilled, onrejected) {
        return this.then(function (r) { return r.wasCancelled ? r : r.closeResult; }).then(onfulfilled, onrejected);
    }
    function asDialogOpenPromise(promise) {
        promise.whenClosed = whenClosed;
        return promise;
    }
    /**
     * A service allowing for the creation of dialogs.
     */
    var DialogService = (function () {
        function DialogService(container, compositionEngine, defaultSettings) {
            /**
             * The current dialog controllers
             */
            this.controllers = [];
            /**
             * Is there an open dialog
             */
            this.hasOpenDialog = false;
            this.hasActiveDialog = false;
            this.container = container;
            this.compositionEngine = compositionEngine;
            this.defaultSettings = defaultSettings;
        }
        DialogService.prototype.validateSettings = function (settings) {
            if (!settings.viewModel && !settings.view) {
                throw new Error('Invalid Dialog Settings. You must provide "viewModel", "view" or both.');
            }
        };
        // tslint:disable-next-line:max-line-length
        DialogService.prototype.createCompositionContext = function (childContainer, host, settings) {
            return {
                container: childContainer.parent,
                childContainer: childContainer,
                bindingContext: null,
                viewResources: null,
                model: settings.model,
                view: settings.view,
                viewModel: settings.viewModel,
                viewSlot: new aurelia_templating_1.ViewSlot(host, true),
                host: host
            };
        };
        DialogService.prototype.ensureViewModel = function (compositionContext) {
            if (typeof compositionContext.viewModel === 'function') {
                compositionContext.viewModel = aurelia_metadata_1.Origin.get(compositionContext.viewModel).moduleId;
            }
            if (typeof compositionContext.viewModel === 'string') {
                return this.compositionEngine.ensureViewModel(compositionContext);
            }
            return Promise.resolve(compositionContext);
        };
        DialogService.prototype._cancelOperation = function (rejectOnCancel) {
            if (!rejectOnCancel) {
                return { wasCancelled: true };
            }
            throw dialog_cancel_error_1.createDialogCancelError();
        };
        // tslint:disable-next-line:max-line-length
        DialogService.prototype.composeAndShowDialog = function (compositionContext, dialogController) {
            var _this = this;
            if (!compositionContext.viewModel) {
                // provide access to the dialog controller for view only dialogs
                compositionContext.bindingContext = { controller: dialogController };
            }
            return this.compositionEngine.compose(compositionContext).then(function (controller) {
                dialogController.controller = controller;
                return dialogController.renderer.showDialog(dialogController).then(function () {
                    _this.controllers.push(dialogController);
                    _this.hasActiveDialog = _this.hasOpenDialog = !!_this.controllers.length;
                }, function (reason) {
                    if (controller.viewModel) {
                        lifecycle_1.invokeLifecycle(controller.viewModel, 'deactivate');
                    }
                    return Promise.reject(reason);
                });
            });
        };
        /**
         * @internal
         */
        DialogService.prototype.createSettings = function (settings) {
            settings = Object.assign({}, this.defaultSettings, settings);
            if (typeof settings.keyboard !== 'boolean' && !settings.keyboard) {
                settings.keyboard = !settings.lock;
            }
            if (typeof settings.overlayDismiss !== 'boolean') {
                settings.overlayDismiss = !settings.lock;
            }
            Object.defineProperty(settings, 'rejectOnCancel', {
                writable: false,
                configurable: true,
                enumerable: true
            });
            this.validateSettings(settings);
            return settings;
        };
        DialogService.prototype.open = function (settings) {
            var _this = this;
            if (settings === void 0) { settings = {}; }
            // tslint:enable:max-line-length
            settings = this.createSettings(settings);
            var childContainer = settings.childContainer || this.container.createChild();
            var resolveCloseResult;
            var rejectCloseResult;
            var closeResult = new Promise(function (resolve, reject) {
                resolveCloseResult = resolve;
                rejectCloseResult = reject;
            });
            var dialogController = childContainer.invoke(dialog_controller_1.DialogController, [settings, resolveCloseResult, rejectCloseResult]);
            childContainer.registerInstance(dialog_controller_1.DialogController, dialogController);
            closeResult.then(function () {
                removeController(_this, dialogController);
            }, function () {
                removeController(_this, dialogController);
            });
            var compositionContext = this.createCompositionContext(childContainer, dialogController.renderer.getDialogContainer(), dialogController.settings);
            var openResult = this.ensureViewModel(compositionContext).then(function (compositionContext) {
                if (!compositionContext.viewModel) {
                    return true;
                }
                return lifecycle_1.invokeLifecycle(compositionContext.viewModel, 'canActivate', dialogController.settings.model);
            }).then(function (canActivate) {
                if (!canActivate) {
                    return _this._cancelOperation(dialogController.settings.rejectOnCancel);
                }
                // if activation granted, compose and show
                return _this.composeAndShowDialog(compositionContext, dialogController)
                    .then(function () { return ({ controller: dialogController, closeResult: closeResult, wasCancelled: false }); });
            });
            return asDialogOpenPromise(openResult);
        };
        /**
         * Closes all open dialogs at the time of invocation.
         * @return Promise<DialogController[]> All controllers whose close operation was cancelled.
         */
        DialogService.prototype.closeAll = function () {
            return Promise.all(this.controllers.slice(0).map(function (controller) {
                if (!controller.settings.rejectOnCancel) {
                    return controller.cancel().then(function (result) {
                        if (result.wasCancelled) {
                            return controller;
                        }
                        return;
                    });
                }
                return controller.cancel().then(function () { return; }).catch(function (reason) {
                    if (reason.wasCancelled) {
                        return controller;
                    }
                    return Promise.reject(reason);
                });
            })).then(function (unclosedControllers) { return unclosedControllers.filter(function (unclosed) { return !!unclosed; }); });
        };
        return DialogService;
    }());
    /**
     * @internal
     */
    DialogService.inject = [aurelia_dependency_injection_1.Container, aurelia_templating_1.CompositionEngine, dialog_settings_1.DefaultDialogSettings];
    exports.DialogService = DialogService;
    function removeController(service, dialogController) {
        var i = service.controllers.indexOf(dialogController);
        if (i !== -1) {
            service.controllers.splice(i, 1);
            service.hasActiveDialog = service.hasOpenDialog = !!service.controllers.length;
        }
    }
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./w3.css\"></require>\n  <div class=\"w3-card-2 w3-sand w3-center\">\n    <h3>Virtual Folder</h3>\n  </div>\n  <div if.bind=\"firsttime\">\n    <intro></intro>\n    <setting></setting>\n  </div>\n  <div if.bind=\"!firsttime\">\n    <filemanager></filemanager>\n  </div>\n</template>\n\n"; });
define('text!icons.css', ['module'], function(module) { module.exports = ".fa {\n  display: inline-block;\n  font-size: inherit;\n  text-rendering: auto;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  width: 18px;\n}\n.fa-remove:before,\n.fa-close:before,\n.fa-times:before {\n  content: url(\"data:image/svg+xml,%3Csvg%20version%3D%271.1%27%20width%3D%27100%25%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%2021.9%2021.9%27%20enable-background%3D%27new%200%200%2021.9%2021.9%27%3E%20%3Cg%3E%20%3Cg%3E%20%3Cpath%20d%3D%27M14.1%2C11.3c-0.2-0.2-0.2-0.5%2C0-0.7l7.5-7.5c0.2-0.2%2C0.3-0.5%2C0.3-0.7s-0.1-0.5-0.3-0.7l-1.4-1.4C20%2C0.1%2C19.7%2C0%2C19.5%2C0%20%20c-0.3%2C0-0.5%2C0.1-0.7%2C0.3l-7.5%2C7.5c-0.2%2C0.2-0.5%2C0.2-0.7%2C0L3.1%2C0.3C2.9%2C0.1%2C2.6%2C0%2C2.4%2C0S1.9%2C0.1%2C1.7%2C0.3L0.3%2C1.7C0.1%2C1.9%2C0%2C2.2%2C0%2C2.4%20%20s0.1%2C0.5%2C0.3%2C0.7l7.5%2C7.5c0.2%2C0.2%2C0.2%2C0.5%2C0%2C0.7l-7.5%2C7.5C0.1%2C19%2C0%2C19.3%2C0%2C19.5s0.1%2C0.5%2C0.3%2C0.7l1.4%2C1.4c0.2%2C0.2%2C0.5%2C0.3%2C0.7%2C0.3%20%20s0.5-0.1%2C0.7-0.3l7.5-7.5c0.2-0.2%2C0.5-0.2%2C0.7%2C0l7.5%2C7.5c0.2%2C0.2%2C0.5%2C0.3%2C0.7%2C0.3s0.5-0.1%2C0.7-0.3l1.4-1.4c0.2-0.2%2C0.3-0.5%2C0.3-0.7%20%20s-0.1-0.5-0.3-0.7L14.1%2C11.3z%27%2F%3E%20%3C%2Fg%3E%20%3C%2Fg%3E%20%3C%2Fsvg%3E \");\n}\n.fa-cog:before {\n  content: url(\"data:image/svg+xml,%3Csvg%20version%3D%271.1%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20x%3D%270px%27%20y%3D%270px%27%20viewBox%3D%270%200%20489.7%20489.7%27%20style%3D%27enable-background%3Anew%200%200%20489.7%20489.7%3B%27%3E%20%20%3Cg%3E%20%20%3Cg%3E%20%20%3Cpath%20d%3D%27M60.6%2C461.95c0%2C6.8%2C5.5%2C12.3%2C12.3%2C12.3s12.3-5.5%2C12.3-12.3v-301.6c34.4-5.9%2C60.8-35.8%2C60.8-71.9c0-40.3-32.8-73-73-73%20%20s-73%2C32.7-73%2C73c0%2C36.1%2C26.3%2C66%2C60.8%2C71.9v301.6H60.6z%20M24.3%2C88.45c0-26.7%2C21.8-48.5%2C48.5-48.5s48.5%2C21.8%2C48.5%2C48.5%20%20s-21.8%2C48.5-48.5%2C48.5S24.3%2C115.25%2C24.3%2C88.45z%27%2F%3E%20%20%3Cpath%20d%3D%27M317.1%2C401.25c0-36.1-26.3-66-60.8-71.9V27.75c0-6.8-5.5-12.3-12.3-12.3s-12.3%2C5.5-12.3%2C12.3v301.6%20%20c-34.4%2C5.9-60.8%2C35.8-60.8%2C71.9c0%2C40.3%2C32.8%2C73%2C73%2C73S317.1%2C441.45%2C317.1%2C401.25z%20M195.6%2C401.25c0-26.7%2C21.8-48.5%2C48.5-48.5%20%20s48.5%2C21.8%2C48.5%2C48.5s-21.8%2C48.5-48.5%2C48.5S195.6%2C427.95%2C195.6%2C401.25z%27%2F%3E%20%20%3Cpath%20d%3D%27M416.6%2C474.25c6.8%2C0%2C12.3-5.5%2C12.3-12.3v-301.6c34.4-5.9%2C60.8-35.8%2C60.8-71.9c0-40.3-32.8-73-73-73s-73%2C32.7-73%2C73%20%20c0%2C36.1%2C26.3%2C66%2C60.8%2C71.9v301.6C404.3%2C468.75%2C409.8%2C474.25%2C416.6%2C474.25z%20M368.1%2C88.45c0-26.7%2C21.8-48.5%2C48.5-48.5%20%20s48.5%2C21.8%2C48.5%2C48.5s-21.8%2C48.5-48.5%2C48.5C389.8%2C136.95%2C368.1%2C115.25%2C368.1%2C88.45z%27%2F%3E%20%20%3C%2Fg%3E%20%20%3C%2Fg%3E%20%20%3C%2Fsvg%3E  \");\n}\n.fa-window-minimize:before{\n  content: url(\"data:image/svg+xml,%3Csvg%20version%3D%271.1%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20x%3D%270px%27%20y%3D%270px%27%20viewBox%3D%270%200%20489.3%20489.3%27%20style%3D%27enable-background%3Anew%200%200%20489.3%20489.3%3B%27%3E%3Cg%3E%09%3Cg%3E%09%09%3Cpath%20d%3D%27M0%2C12.251v464.7c0%2C6.8%2C5.5%2C12.3%2C12.3%2C12.3h224c6.8%2C0%2C12.3-5.5%2C12.3-12.3s-5.5-12.3-12.3-12.3H24.5v-440.2h440.2v210.5%09%09%09c0%2C6.8%2C5.5%2C12.2%2C12.3%2C12.2s12.3-5.5%2C12.3-12.2v-222.7c0-6.8-5.5-12.2-12.3-12.2H12.3C5.5-0.049%2C0%2C5.451%2C0%2C12.251z%27%2F%3E%09%09%3Cpath%20d%3D%27M476.9%2C489.151c6.8%2C0%2C12.3-5.5%2C12.3-12.3v-170.3c0-6.8-5.5-12.3-12.3-12.3H306.6c-6.8%2C0-12.3%2C5.5-12.3%2C12.3v170.4%09%09%09c0%2C6.8%2C5.5%2C12.3%2C12.3%2C12.3h170.3V489.151z%20M318.8%2C318.751h145.9v145.9H318.8V318.751z%27%2F%3E%09%09%3Cpath%20d%3D%27M135.9%2C257.651c0%2C6.8%2C5.5%2C12.3%2C12.3%2C12.3h109.5c6.8%2C0%2C12.3-5.5%2C12.3-12.3v-109.5c0-6.8-5.5-12.3-12.3-12.3%09%09%09s-12.3%2C5.5-12.3%2C12.3v79.9l-138.7-138.7c-4.8-4.8-12.5-4.8-17.3%2C0c-4.8%2C4.8-4.8%2C12.5%2C0%2C17.3l138.7%2C138.7h-79.9%09%09%09C141.4%2C245.351%2C135.9%2C250.851%2C135.9%2C257.651z%27%2F%3E%09%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E\");\n}\n.fa-window-maximize:before{\n  content: url(\"data:image/svg+xml,%3Csvg%20version%3D%271.1%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20x%3D%270px%27%20y%3D%270px%27%20viewBox%3D%270%200%20258.008%20258.008%27%20style%3D%27enable-background%3Anew%200%200%20258.008%20258.008%3B%27%20%20xml%3Aspace%3D%27preserve%27%3E%20%20%3Cg%3E%20%20%3Cg%3E%20%20%3Cpath%20d%3D%27M125.609%2C122.35H10.049C4.5%2C122.35%2C0%2C126.85%2C0%2C132.399v115.56c0%2C5.549%2C4.5%2C10.048%2C10.049%2C10.048H125.61%20%20c5.548%2C0%2C10.046-4.499%2C10.046-10.048v-115.56C135.656%2C126.85%2C131.158%2C122.35%2C125.609%2C122.35z%20M115.559%2C237.909H20.098v-95.463%20%20h95.461V237.909z%27%2F%3E%20%20%3Cpath%20d%3D%27M247.958%2C0.001H10.049C4.5%2C0.001%2C0%2C4.5%2C0%2C10.049v93.312c0%2C5.55%2C4.5%2C10.05%2C10.049%2C10.05c5.55%2C0%2C10.049-4.5%2C10.049-10.05%20%20V20.098h217.812v217.812h-82.915c-5.55%2C0-10.05%2C4.5-10.05%2C10.05c0%2C5.549%2C4.5%2C10.048%2C10.05%2C10.048h92.964%20%20c5.55%2C0%2C10.05-4.499%2C10.05-10.048V10.049C258.008%2C4.5%2C253.508%2C0.001%2C247.958%2C0.001z%27%2F%3E%20%20%3Cpath%20d%3D%27M154.35%2C106.876c1.965%2C1.961%2C4.534%2C2.942%2C7.105%2C2.942c2.57%2C0%2C5.142-0.981%2C7.104-2.942l31.755-31.757V89.57%20%20c0%2C5.549%2C4.499%2C10.047%2C10.05%2C10.047c5.549%2C0%2C10.048-4.498%2C10.048-10.047V53.054c0-0.365-0.068-0.713-0.107-1.068%20%20c0.329-2.933-0.588-5.979-2.837-8.229c-2.146-2.148-5.023-3.079-7.831-2.873c-0.233-0.017-0.461-0.072-0.696-0.072h-36.513%20%20c-5.551%2C0-10.051%2C4.5-10.051%2C10.05c0%2C5.549%2C4.5%2C10.049%2C10.051%2C10.049h13.679L154.35%2C92.665%20%20C150.426%2C96.589%2C150.426%2C102.952%2C154.35%2C106.876z%27%2F%3E%20%20%3C%2Fg%3E%20%20%3C%2Fg%3E%20%20%3C%2Fsvg%3E\");\n/*  content: url(\"data:image/svg+xml;utf8,<svg version='1.1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 258.008 258.008' style='enable-background:new 0 0 258.008 258.008;'  xml:space='preserve'>  <g>  <g>  <path d='M125.609,122.35H10.049C4.5,122.35,0,126.85,0,132.399v115.56c0,5.549,4.5,10.048,10.049,10.048H125.61  c5.548,0,10.046-4.499,10.046-10.048v-115.56C135.656,126.85,131.158,122.35,125.609,122.35z M115.559,237.909H20.098v-95.463  h95.461V237.909z'/>  <path d='M247.958,0.001H10.049C4.5,0.001,0,4.5,0,10.049v93.312c0,5.55,4.5,10.05,10.049,10.05c5.55,0,10.049-4.5,10.049-10.05  V20.098h217.812v217.812h-82.915c-5.55,0-10.05,4.5-10.05,10.05c0,5.549,4.5,10.048,10.05,10.048h92.964  c5.55,0,10.05-4.499,10.05-10.048V10.049C258.008,4.5,253.508,0.001,247.958,0.001z'/>  <path d='M154.35,106.876c1.965,1.961,4.534,2.942,7.105,2.942c2.57,0,5.142-0.981,7.104-2.942l31.755-31.757V89.57  c0,5.549,4.499,10.047,10.05,10.047c5.549,0,10.048-4.498,10.048-10.047V53.054c0-0.365-0.068-0.713-0.107-1.068  c0.329-2.933-0.588-5.979-2.837-8.229c-2.146-2.148-5.023-3.079-7.831-2.873c-0.233-0.017-0.461-0.072-0.696-0.072h-36.513  c-5.551,0-10.051,4.5-10.051,10.05c0,5.549,4.5,10.049,10.051,10.049h13.679L154.35,92.665  C150.426,96.589,150.426,102.952,154.35,106.876z'/>  </g>  </g>  </svg>  \");*/\n}\n\n.fa-caret-down:before{\n  content:url('data:image/svg+xml,<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\"  viewBox=\"0 0 292.362 292.362\" style=\"enable-background:new 0 0 292.362 292.362;\"  xml:space=\"preserve\">  <g>  <path d=\"M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424  C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428  s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z\"/>  </g> </svg>');\n}\n\n/* most icons derived from http://www.flaticon.com/free-icon/caret-down_25243, needs to attribute*/\n\n.vf-transition{\n  -webkit-transition: all 0.5s ease-in-out;\n  -moz-transition: all 0.5s ease-in-out;\n  -ms-transition: all 0.5s ease-in-out;\n  transition: visibility 0.5s, height 0.5s ease-in-out;\n}\n.w3-code-2{line-height:1;font-size:10px}\n\n.CodeMirror {\n  height: 100%!important;\n}\n"; });
define('text!autocomplete/vfAutocompleteSearch.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./vfAutocompleteSearch.css\"></require>\n\n\n  <input ref=\"input\" autocomplete=\"off\" value.bind=\"value & debounce:750\"\n         blur.trigger=\"blurSuggestions($event)\"\n         keydown.delegate=\"keypressed($event)\"\n         placeholder.bind=\"placeholder\" focus.trigger=\"focusSuggestions()\"\n         size.bind=\"size\">\n\n  <div ref=\"results\" show.bind=\"showing\" class=\"result-container\">\n    <div repeat.for=\"resultGroup of resultGroups\" class=\"result-card\">\n\n        <header class=\"result-card-heading\">${resultGroup.groupValue} (${resultGroup.doclist.numFound})</header>\n        <div class=\"result-card-body\">\n          <span repeat.for=\"doclistRec of resultGroup.doclist.docs\">\n\n            <div class=\"result-card-item\"><button type=\"button\" class=\"result-card-item-label w3-button w3-padding-0\" click.trigger=\"clicked(doclistRec.value)\" >${doclistRec.value}</button> <span class=\"result-card-item-count\">(${doclistRec.num_pdb_entries})</span></div>\n          </span>\n\n        </div>\n        <footer class=\"result-card-footer\">\n\n          <a class=\"result-card-item-label\" href=\"#\" click.delegate=\"searchMore(resultGroup.doclist.docs[0].var_name)\">More...</a>\n        </footer>\n\n    </div>\n    <div show.bind=\"resultGroupsEmpty\">Enter PDB or UnitProt accession code, protein name or related terms.</div>\n  </div>\n</div>\n</template>\n"; });
define('text!w3.css', ['module'], function(module) { module.exports = "/* W3.CSS 2.99 Mar 2017 by Jan Egil and Borge Refsnes */\nhtml{box-sizing:border-box}*,*:before,*:after{box-sizing:inherit}\n/* Extract from normalize.css by Nicolas Gallagher and Jonathan Neal git.io/normalize */\nhtml{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}\narticle,aside,details,figcaption,figure,footer,header,main,menu,nav,section,summary{display:block}\naudio,canvas,progress,video{display:inline-block}progress{vertical-align:baseline}\naudio:not([controls]){display:none;height:0}[hidden],template{display:none}\na{background-color:transparent;-webkit-text-decoration-skip:objects}\na:active,a:hover{outline-width:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}\ndfn{font-style:italic}mark{background:#ff0;color:#000}\nsmall{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}\nsub{bottom:-0.25em}sup{top:-0.5em}figure{margin:1em 40px}\nimg{border-style:none}svg:not(:root){overflow:hidden}\ncode,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}\nhr{box-sizing:content-box;height:0;overflow:visible}\nbutton,input,select,textarea{font:inherit;margin:0}optgroup{font-weight:bold}\nbutton,input{overflow:visible}button,select{text-transform:none}\nbutton,html [type=button],[type=reset],[type=submit]{-webkit-appearance:button}\nbutton::-moz-focus-inner, [type=button]::-moz-focus-inner, [type=reset]::-moz-focus-inner, [type=submit]::-moz-focus-inner{border-style:none;padding:0}\nbutton:-moz-focusring, [type=button]:-moz-focusring, [type=reset]:-moz-focusring, [type=submit]:-moz-focusring{outline:1px dotted ButtonText}\nfieldset{border:1px solid #c0c0c0;margin:0 2px;padding:.35em .625em .75em}\nlegend{color:inherit;display:table;max-width:100%;padding:0;white-space:normal}textarea{overflow:auto}\n[type=checkbox],[type=radio]{padding:0}\n[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}\n[type=search]{-webkit-appearance:textfield;outline-offset:-2px}\n[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}\n::-webkit-input-placeholder{color:inherit;opacity:0.54}\n::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}\n/* End extract */\nhtml,body{font-family:Verdana,sans-serif;font-size:15px;line-height:1.5}html{overflow-x:hidden}\nh1,h2,h3,h4,h5,h6,.w3-slim,.w3-wide{font-family:\"Segoe UI\",Arial,sans-serif}\nh1{font-size:36px}h2{font-size:30px}h3{font-size:24px}h4{font-size:20px}h5{font-size:18px}h6{font-size:16px}\n.w3-serif{font-family:\"Times New Roman\",Times,serif}\nh1,h2,h3,h4,h5,h6{font-weight:400;margin:10px 0}.w3-wide{letter-spacing:4px}\nh1 a,h2 a,h3 a,h4 a,h5 a,h6 a{font-weight:inherit}\nhr{border:0;border-top:1px solid #eee;margin:20px 0}\na{color:inherit}\n.w3-image{max-width:100%;height:auto}\n.w3-table,.w3-table-all{border-collapse:collapse;border-spacing:0;width:100%;display:table}\n.w3-table-all{border:1px solid #ccc}\n.w3-bordered tr,.w3-table-all tr{border-bottom:1px solid #ddd}\n.w3-striped tbody tr:nth-child(even){background-color:#f1f1f1}\n.w3-table-all tr:nth-child(odd){background-color:#fff}\n.w3-table-all tr:nth-child(even){background-color:#f1f1f1}\n.w3-hoverable tbody tr:hover,.w3-ul.w3-hoverable li:hover{background-color:#ccc}\n.w3-centered tr th,.w3-centered tr td{text-align:center}\n.w3-table td,.w3-table th,.w3-table-all td,.w3-table-all th{padding:8px 8px;display:table-cell;text-align:left;vertical-align:top}\n.w3-table th:first-child,.w3-table td:first-child,.w3-table-all th:first-child,.w3-table-all td:first-child{padding-left:16px}\n.w3-btn,.w3-btn-block,.w3-button{border:none;display:inline-block;outline:0;padding:6px 16px;vertical-align:middle;overflow:hidden;text-decoration:none!important;color:#fff;background-color:#000;text-align:center;cursor:pointer;white-space:nowrap}\n.w3-btn:hover,.w3-btn-block:hover,.w3-btn-floating:hover,.w3-btn-floating-large:hover{box-shadow:0 8px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)}\n.w3-button{color:#000;background-color:#f1f1f1;padding:8px 16px}.w3-button:hover{color:#000!important;background-color:#ccc!important}\n.w3-btn,.w3-btn-floating,.w3-btn-floating-large,.w3-closenav,.w3-opennav,.w3-btn-block,.w3-button{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}\n.w3-btn-floating,.w3-btn-floating-large{display:inline-block;text-align:center;color:#fff;background-color:#000;position:relative;overflow:hidden;z-index:1;padding:0;border-radius:50%;cursor:pointer;font-size:24px}\n.w3-btn-floating{width:40px;height:40px;line-height:40px}.w3-btn-floating-large{width:56px;height:56px;line-height:56px}\n.w3-disabled,.w3-btn:disabled,.w3-button:disabled,.w3-btn-floating:disabled,.w3-btn-floating-large:disabled{cursor:not-allowed;opacity:0.3}.w3-disabled *,:disabled *{pointer-events:none}\n.w3-btn.w3-disabled:hover,.w3-btn-block.w3-disabled:hover,.w3-btn:disabled:hover,.w3-btn-floating.w3-disabled:hover,.w3-btn-floating:disabled:hover,\n.w3-btn-floating-large.w3-disabled:hover,.w3-btn-floating-large:disabled:hover{box-shadow:none}\n.w3-btn-group .w3-btn{float:left}.w3-btn-block{width:100%}\n.w3-btn-bar .w3-btn{box-shadow:none;background-color:inherit;color:inherit;float:left}.w3-btn-bar .w3-btn:hover{background-color:#ccc}\n.w3-badge,.w3-tag,.w3-sign{background-color:#000;color:#fff;display:inline-block;padding-left:8px;padding-right:8px;text-align:center}\n.w3-badge{border-radius:50%}\nul.w3-ul{list-style-type:none;padding:0;margin:0}ul.w3-ul li{padding:6px 2px 6px 16px;border-bottom:1px solid #ddd}ul.w3-ul li:last-child{border-bottom:none}\n.w3-tooltip,.w3-display-container{position:relative}.w3-tooltip .w3-text{display:none}.w3-tooltip:hover .w3-text{display:inline-block}\n.w3-navbar{list-style-type:none;margin:0;padding:0;overflow:hidden}\n.w3-navbar li{float:left}.w3-navbar li a,.w3-navitem,.w3-navbar li .w3-btn,.w3-navbar li .w3-input{display:block;padding:8px 16px}.w3-navbar li .w3-btn,.w3-navbar li .w3-input{border:none;outline:none;width:100%}\n.w3-navbar li a:hover{color:#000;background-color:#ccc}\n.w3-navbar .w3-dropdown-hover,.w3-navbar .w3-dropdown-click{position:static}\n.w3-navbar .w3-dropdown-hover:hover{background-color:#ccc;color:#000}\n.w3-navbar a,.w3-topnav a,.w3-sidenav a,.w3-dropdown-content a,.w3-accordion-content a,.w3-dropnav a,.w3-navblock a{text-decoration:none!important}\n.w3-navbar .w3-opennav.w3-right{float:right!important}.w3-topnav{padding:8px 8px}\n.w3-navblock .w3-dropdown-hover:hover,.w3-navblock .w3-dropdown-click:hover{background-color:#ccc;color:#000}\n.w3-navblock .w3-dropdown-hover,.w3-navblock .w3-dropdown-click{width:100%}.w3-navblock .w3-dropdown-hover .w3-dropdown-content,.w3-navblock .w3-dropdown-click .w3-dropdown-content{min-width:100%}\n.w3-topnav a{padding:0 8px;border-bottom:3px solid transparent;-webkit-transition:border-bottom .25s;transition:border-bottom .25s}\n.w3-topnav a:hover{border-bottom:3px solid #fff}.w3-topnav .w3-dropdown-hover a{border-bottom:0}\n.w3-opennav,.w3-closenav{color:inherit}.w3-opennav:hover,.w3-closenav:hover{cursor:pointer;opacity:0.8}\n.w3-btn,.w3-btn-floating,.w3-dropnav a,.w3-btn-floating-large,.w3-btn-block, .w3-navbar a,.w3-navblock a,.w3-sidenav a,.w3-pagination li a,.w3-hoverable tbody tr,.w3-hoverable li,\n.w3-accordion-content a,.w3-dropdown-content a,.w3-dropdown-click:hover,.w3-dropdown-hover:hover,.w3-opennav,.w3-closenav,.w3-closebtn,*[class*=\"w3-hover-\"]\n{-webkit-transition:background-color .25s,color .15s,box-shadow .25s,opacity 0.25s,filter 0.25s,border 0.15s;transition:background-color .25s,color .15s,box-shadow .15s,opacity .25s,filter .25s,border .15s}\n.w3-ripple:active{opacity:0.5}.w3-ripple{-webkit-transition:opacity 0s;transition:opacity 0s}\n.w3-sidenav,.w3-sidebar{height:100%;width:200px;background-color:#fff;position:fixed!important;z-index:1;overflow:auto}\n.w3-sidenav a,.w3-navblock a{padding:4px 2px 4px 16px}.w3-sidenav a:hover,.w3-navblock a:hover{background-color:#ccc;color:#000}.w3-sidenav a,.w3-dropnav a,.w3-navblock a{display:block}\n.w3-sidenav .w3-dropdown-hover:hover,.w3-sidenav .w3-dropdown-hover:first-child,.w3-sidenav .w3-dropdown-click:hover,.w3-dropnav a:hover{background-color:#ccc;color:#000}\n.w3-sidenav .w3-dropdown-hover,.w3-sidenav .w3-dropdown-click,.w3-bar-block .w3-dropdown-hover,.w3-bar-block .w3-dropdown-click{width:100%}\n.w3-sidenav .w3-dropdown-hover .w3-dropdown-content,.w3-sidenav .w3-dropdown-click .w3-dropdown-content,.w3-bar-block .w3-dropdown-hover .w3-dropdown-content,.w3-bar-block .w3-dropdown-click .w3-dropdown-content{min-width:100%}\n.w3-bar-block .w3-dropdown-hover .w3-button,.w3-bar-block .w3-dropdown-click .w3-button{width:100%;text-align:left;background-color:inherit;color:inherit;padding:6px 2px 6px 16px}\n.w3-main,#main{transition:margin-left .4s}\n.w3-modal{z-index:3;display:none;padding-top:100px;position:fixed;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:rgb(0,0,0);background-color:rgba(0,0,0,0.4)}\n.w3-modal-content{margin:auto;background-color:#fff;position:relative;padding:0;outline:0;width:600px}.w3-closebtn{text-decoration:none;float:right;font-size:24px;font-weight:bold;color:inherit}\n.w3-closebtn:hover,.w3-closebtn:focus{color:#000;text-decoration:none;cursor:pointer}\n.w3-pagination{display:inline-block;padding:0;margin:0}.w3-pagination li{display:inline}\n.w3-pagination li a{text-decoration:none;color:#000;float:left;padding:8px 16px}\n.w3-pagination li a:hover{background-color:#ccc}\n.w3-input-group,.w3-group{margin-top:24px;margin-bottom:24px}\n.w3-input{padding:8px;display:block;border:none;border-bottom:1px solid #808080;width:100%}\n.w3-label{color:#009688}.w3-input:not(:valid)~.w3-validate{color:#f44336}\n.w3-select{padding:9px 0;width:100%;color:#000;border:1px solid transparent;border-bottom:1px solid #009688}\n.w3-select select:focus{color:#000;border:1px solid #009688}.w3-select option[disabled]{color:#009688}\n.w3-dropdown-click,.w3-dropdown-hover{position:relative;display:inline-block;cursor:pointer}\n.w3-dropdown-hover:hover .w3-dropdown-content{display:block;z-index:1}\n.w3-dropdown-click:hover{background-color:#ccc;color:#000}\n.w3-dropdown-hover:hover > .w3-button:first-child,.w3-dropdown-click:hover > .w3-button:first-child{background-color:#ccc;color:#000}\n.w3-dropdown-content{cursor:auto;color:#000;background-color:#fff;display:none;position:absolute;min-width:160px;margin:0;padding:0}\n.w3-dropdown-content a{padding:6px 16px;display:block}\n.w3-dropdown-content a:hover{background-color:#ccc}\n.w3-accordion{width:100%;cursor:pointer}\n.w3-accordion-content{cursor:auto;display:none;position:relative;width:100%;margin:0;padding:0}\n.w3-accordion-content a{padding:6px 16px;display:block}.w3-accordion-content a:hover{background-color:#ccc}\n.w3-progress-container{width:100%;height:1.5em;position:relative;background-color:#f1f1f1}\n.w3-progressbar{background-color:#757575;height:100%;position:absolute;line-height:inherit}\ninput[type=checkbox].w3-check,input[type=radio].w3-radio{width:24px;height:24px;position:relative;top:6px}\ninput[type=checkbox].w3-check:checked+.w3-validate,input[type=radio].w3-radio:checked+.w3-validate{color:#009688}\ninput[type=checkbox].w3-check:disabled+.w3-validate,input[type=radio].w3-radio:disabled+.w3-validate{color:#aaa}\n.w3-bar{width:100%;overflow:hidden}.w3-center .w3-bar{display:inline-block;width:auto}\n.w3-bar .w3-bar-item{padding:8px 16px;float:left;background-color:inherit;color:inherit;width:auto;border:none;outline:none;display:block}\n.w3-bar .w3-dropdown-hover,.w3-bar .w3-dropdown-click{position:static;float:left}\n.w3-bar .w3-button{background-color:inherit;color:inherit;white-space:normal}\n.w3-bar-block .w3-bar-item{width:100%;display:block;padding:6px 2px 6px 16px;text-align:left;background-color:inherit;color:inherit;border:none;outline:none}\n.w3-block{display:block;width:100%}\n.w3-responsive{overflow-x:auto}\n.w3-container:after,.w3-container:before,.w3-panel:after,.w3-panel:before,.w3-row:after,.w3-row:before,.w3-row-padding:after,.w3-row-padding:before,.w3-cell-row:before,.w3-cell-row:after,\n.w3-topnav:after,.w3-topnav:before,.w3-clear:after,.w3-clear:before,.w3-btn-group:before,.w3-btn-group:after,.w3-btn-bar:before,.w3-btn-bar:after,.w3-bar:before,.w3-bar:after\n{content:\"\";display:table;clear:both}\n.w3-col,.w3-half,.w3-third,.w3-twothird,.w3-threequarter,.w3-quarter{float:left;width:100%}\n.w3-col.s1{width:8.33333%}\n.w3-col.s2{width:16.66666%}\n.w3-col.s3{width:24.99999%}\n.w3-col.s4{width:33.33333%}\n.w3-col.s5{width:41.66666%}\n.w3-col.s6{width:49.99999%}\n.w3-col.s7{width:58.33333%}\n.w3-col.s8{width:66.66666%}\n.w3-col.s9{width:74.99999%}\n.w3-col.s10{width:83.33333%}\n.w3-col.s11{width:91.66666%}\n.w3-col.s12,.w3-half,.w3-third,.w3-twothird,.w3-threequarter,.w3-quarter{width:99.99999%}\n@media (min-width:601px){\n  .w3-col.m1{width:8.33333%}\n  .w3-col.m2{width:16.66666%}\n  .w3-col.m3,.w3-quarter{width:24.99999%}\n  .w3-col.m4,.w3-third{width:33.33333%}\n  .w3-col.m5{width:41.66666%}\n  .w3-col.m6,.w3-half{width:49.99999%}\n  .w3-col.m7{width:58.33333%}\n  .w3-col.m8,.w3-twothird{width:66.66666%}\n  .w3-col.m9,.w3-threequarter{width:74.99999%}\n  .w3-col.m10{width:83.33333%}\n  .w3-col.m11{width:91.66666%}\n  .w3-col.m12{width:99.99999%}}\n@media (min-width:993px){\n  .w3-col.l1{width:8.33333%}\n  .w3-col.l2{width:16.66666%}\n  .w3-col.l3,.w3-quarter{width:24.99999%}\n  .w3-col.l4,.w3-third{width:33.33333%}\n  .w3-col.l5{width:41.66666%}\n  .w3-col.l6,.w3-half{width:49.99999%}\n  .w3-col.l7{width:58.33333%}\n  .w3-col.l8,.w3-twothird{width:66.66666%}\n  .w3-col.l9,.w3-threequarter{width:74.99999%}\n  .w3-col.l10{width:83.33333%}\n  .w3-col.l11{width:91.66666%}\n  .w3-col.l12{width:99.99999%}}\n.w3-content{max-width:980px;margin:auto}\n.w3-rest{overflow:hidden}\n.w3-layout-container,.w3-cell-row{display:table;width:100%}.w3-layout-row{display:table-row}.w3-layout-cell,.w3-layout-col,.w3-cell{display:table-cell}\n.w3-layout-top,.w3-cell-top{vertical-align:top}.w3-layout-middle,.w3-cell-middle{vertical-align:middle}.w3-layout-bottom,.w3-cell-bottom{vertical-align:bottom}\n.w3-hide{display:none!important}.w3-show-block,.w3-show{display:block!important}.w3-show-inline-block{display:inline-block!important}\n@media (max-width:600px){.w3-modal-content{margin:0 10px;width:auto!important}.w3-modal{padding-top:30px}\n  .w3-topnav a{display:block}.w3-navbar li:not(.w3-opennav){float:none;width:100%!important}.w3-navbar li.w3-right{float:none!important}\n  .w3-topnav .w3-dropdown-hover .w3-dropdown-content,.w3-navbar .w3-dropdown-click .w3-dropdown-content,.w3-navbar .w3-dropdown-hover .w3-dropdown-content,.w3-dropdown-hover.w3-mobile .w3-dropdown-content,.w3-dropdown-click.w3-mobile .w3-dropdown-content{position:relative}\n  .w3-topnav,.w3-navbar{text-align:center}.w3-hide-small{display:none!important}.w3-layout-col,.w3-mobile{display:block;width:100%!important}.w3-bar-item.w3-mobile,.w3-dropdown-hover.w3-mobile,.w3-dropdown-click.w3-mobile{text-align:center}\n  .w3-dropdown-hover.w3-mobile,.w3-dropdown-hover.w3-mobile .w3-btn,.w3-dropdown-hover.w3-mobile .w3-button,.w3-dropdown-click.w3-mobile,.w3-dropdown-click.w3-mobile .w3-btn,.w3-dropdown-click.w3-mobile .w3-button{width:100%}}\n@media (max-width:768px){.w3-modal-content{width:500px}.w3-modal{padding-top:50px}}\n@media (min-width:993px){.w3-modal-content{width:900px}.w3-hide-large{display:none!important}.w3-sidenav.w3-collapse,.w3-sidebar.w3-collapse{display:block!important}}\n@media (max-width:992px) and (min-width:601px){.w3-hide-medium{display:none!important}}\n@media (max-width:992px){.w3-sidenav.w3-collapse,.w3-sidebar.w3-collapse{display:none}.w3-main{margin-left:0!important;margin-right:0!important}}\n.w3-top,.w3-bottom{position:fixed;width:100%;z-index:1}.w3-top{top:0}.w3-bottom{bottom:0}\n.w3-overlay{position:fixed;display:none;width:100%;height:100%;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,0.5);z-index:2}\n.w3-left{float:left!important}.w3-right{float:right!important}\n.w3-tiny{font-size:10px!important}.w3-small{font-size:12px!important}\n.w3-medium{font-size:15px!important}.w3-large{font-size:18px!important}\n.w3-xlarge{font-size:24px!important}.w3-xxlarge{font-size:36px!important}\n.w3-xxxlarge{font-size:48px!important}.w3-jumbo{font-size:64px!important}\n.w3-vertical{word-break:break-all;line-height:1;text-align:center;width:0.6em}\n.w3-left-align{text-align:left!important}.w3-right-align{text-align:right!important}\n.w3-justify{text-align:justify!important}.w3-center{text-align:center!important}\n.w3-display-topleft{position:absolute;left:0;top:0}.w3-display-topright{position:absolute;right:0;top:0}\n.w3-display-bottomleft{position:absolute;left:0;bottom:0}.w3-display-bottomright{position:absolute;right:0;bottom:0}\n.w3-display-middle{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%)}\n.w3-display-left{position:absolute;top:50%;left:0%;transform:translate(0%,-50%);-ms-transform:translate(-0%,-50%)}\n.w3-display-right{position:absolute;top:50%;right:0%;transform:translate(0%,-50%);-ms-transform:translate(0%,-50%)}\n.w3-display-topmiddle{position:absolute;left:50%;top:0;transform:translate(-50%,0%);-ms-transform:translate(-50%,0%)}\n.w3-display-bottommiddle{position:absolute;left:50%;bottom:0;transform:translate(-50%,0%);-ms-transform:translate(-50%,0%)}\n.w3-display-container:hover .w3-display-hover{display:block}.w3-display-container:hover span.w3-display-hover{display:inline-block}.w3-display-hover{display:none}\n.w3-display-position{position:absolute}\n.w3-circle{border-radius:50%!important}\n.w3-round-small{border-radius:2px!important}.w3-round,.w3-round-medium{border-radius:4px!important}\n.w3-round-large{border-radius:8px!important}.w3-round-xlarge{border-radius:16px!important}\n.w3-round-xxlarge{border-radius:32px!important}.w3-round-jumbo{border-radius:64px!important}\n.w3-border-0{border:0!important}.w3-border{border:1px solid #ccc!important}\n.w3-border-top{border-top:1px solid #ccc!important}.w3-border-bottom{border-bottom:1px solid #ccc!important}\n.w3-border-left{border-left:1px solid #ccc!important}.w3-border-right{border-right:1px solid #ccc!important}\n.w3-margin{margin:16px!important}.w3-margin-0{margin:0!important}\n.w3-margin-top{margin-top:16px!important}.w3-margin-bottom{margin-bottom:16px!important}\n.w3-margin-left{margin-left:16px!important}.w3-margin-right{margin-right:16px!important}\n.w3-section{margin-top:16px!important;margin-bottom:16px!important}\n.w3-padding-tiny{padding:2px 4px!important}.w3-padding-small{padding:4px 8px!important}\n.w3-padding-medium,.w3-padding,.w3-form{padding:8px 16px!important}\n.w3-padding-large{padding:12px 24px!important}.w3-padding-xlarge{padding:16px 32px!important}\n.w3-padding-xxlarge{padding:24px 48px!important}.w3-padding-jumbo{padding:32px 64px!important}\n.w3-padding-4{padding-top:4px!important;padding-bottom:4px!important}\n.w3-padding-8{padding-top:8px!important;padding-bottom:8px!important}\n.w3-padding-12{padding-top:12px!important;padding-bottom:12px!important}\n.w3-padding-16{padding-top:16px!important;padding-bottom:16px!important}\n.w3-padding-24{padding-top:24px!important;padding-bottom:24px!important}\n.w3-padding-32{padding-top:32px!important;padding-bottom:32px!important}\n.w3-padding-48{padding-top:48px!important;padding-bottom:48px!important}\n.w3-padding-64{padding-top:64px!important;padding-bottom:64px!important}\n.w3-padding-128{padding-top:128px!important;padding-bottom:128px!important}\n.w3-padding-0{padding:0!important}\n.w3-padding-top{padding-top:8px!important}.w3-padding-bottom{padding-bottom:8px!important}\n.w3-padding-left{padding-left:16px!important}.w3-padding-right{padding-right:16px!important}\n.w3-topbar{border-top:6px solid #ccc!important}.w3-bottombar{border-bottom:6px solid #ccc!important}\n.w3-leftbar{border-left:6px solid #ccc!important}.w3-rightbar{border-right:6px solid #ccc!important}\n.w3-row-padding,.w3-row-padding>.w3-half,.w3-row-padding>.w3-third,.w3-row-padding>.w3-twothird,.w3-row-padding>.w3-threequarter,.w3-row-padding>.w3-quarter,.w3-row-padding>.w3-col{padding:0 8px}\n.w3-spin{animation:w3-spin 2s infinite linear;-webkit-animation:w3-spin 2s infinite linear}\n@-webkit-keyframes w3-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}\n@keyframes w3-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}\n.w3-container{padding:0.01em 16px}\n.w3-panel{padding:0.01em 16px;margin-top:16px!important;margin-bottom:16px!important}\n.w3-example{background-color:#f1f1f1;padding:0.01em 16px}\n.w3-code,.w3-codespan{font-family:Consolas,\"courier new\";font-size:16px}\n.w3-code{line-height:1.4;width:auto;background-color:#fff;padding:8px 12px;border-left:4px solid #4CAF50;word-wrap:break-word}\n.w3-codespan{color:crimson;background-color:#f1f1f1;padding-left:4px;padding-right:4px;font-size:110%}\n.w3-example,.w3-code{margin:20px 0}.w3-card{border:1px solid #ccc}\n.w3-card-2,.w3-example{box-shadow:0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)!important}\n.w3-card-4,.w3-hover-shadow:hover{box-shadow:0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)!important}\n.w3-card-8{box-shadow:0 8px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)!important}\n.w3-card-12{box-shadow:0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19)!important}\n.w3-card-16{box-shadow:0 16px 24px 0 rgba(0,0,0,0.22),0 25px 55px 0 rgba(0,0,0,0.21)!important}\n.w3-card-24{box-shadow:0 24px 24px 0 rgba(0,0,0,0.2),0 40px 77px 0 rgba(0,0,0,0.22)!important}\n.w3-animate-fading{-webkit-animation:fading 10s infinite;animation:fading 10s infinite}\n@-webkit-keyframes fading{0%{opacity:0}50%{opacity:1}100%{opacity:0}}\n@keyframes fading{0%{opacity:0}50%{opacity:1}100%{opacity:0}}\n.w3-animate-opacity{-webkit-animation:opac 0.8s;animation:opac 0.8s}\n@-webkit-keyframes opac{from{opacity:0} to{opacity:1}}\n@keyframes opac{from{opacity:0} to{opacity:1}}\n.w3-animate-top{position:relative;-webkit-animation:animatetop 0.4s;animation:animatetop 0.4s}\n@-webkit-keyframes animatetop{from{top:-300px;opacity:0} to{top:0;opacity:1}}\n@keyframes animatetop{from{top:-300px;opacity:0} to{top:0;opacity:1}}\n.w3-animate-left{position:relative;-webkit-animation:animateleft 0.4s;animation:animateleft 0.4s}\n@-webkit-keyframes animateleft{from{left:-300px;opacity:0} to{left:0;opacity:1}}\n@keyframes animateleft{from{left:-300px;opacity:0} to{left:0;opacity:1}}\n.w3-animate-right{position:relative;-webkit-animation:animateright 0.4s;animation:animateright 0.4s}\n@-webkit-keyframes animateright{from{right:-300px;opacity:0} to{right:0;opacity:1}}\n@keyframes animateright{from{right:-300px;opacity:0} to{right:0;opacity:1}}\n.w3-animate-bottom{position:relative;-webkit-animation:animatebottom 0.4s;animation:animatebottom 0.4s}\n@-webkit-keyframes animatebottom{from{bottom:-300px;opacity:0} to{bottom:0px;opacity:1}}\n@keyframes animatebottom{from{bottom:-300px;opacity:0} to{bottom:0;opacity:1}}\n.w3-animate-zoom {-webkit-animation:animatezoom 0.6s;animation:animatezoom 0.6s}\n@-webkit-keyframes animatezoom{from{-webkit-transform:scale(0)} to{-webkit-transform:scale(1)}}\n@keyframes animatezoom{from{transform:scale(0)} to{transform:scale(1)}}\n.w3-animate-input{-webkit-transition:width 0.4s ease-in-out;transition:width 0.4s ease-in-out}.w3-animate-input:focus{width:100%!important}\n.w3-opacity,.w3-hover-opacity:hover{opacity:0.60;-webkit-backface-visibility:hidden}\n.w3-opacity-off,.w3-hover-opacity-off:hover{opacity:1;-webkit-backface-visibility:hidden}\n.w3-opacity-max{opacity:0.25;-webkit-backface-visibility:hidden}\n.w3-opacity-min{opacity:0.75;-webkit-backface-visibility:hidden}\n.w3-greyscale-max,.w3-grayscale-max,.w3-hover-greyscale:hover,.w3-hover-grayscale:hover{-webkit-filter:grayscale(100%);filter:grayscale(100%)}\n.w3-greyscale,.w3-grayscale{-webkit-filter:grayscale(75%);filter:grayscale(75%)}\n.w3-greyscale-min,.w3-grayscale-min{-webkit-filter:grayscale(50%);filter:grayscale(50%)}\n.w3-sepia{-webkit-filter:sepia(75%);filter:sepia(75%)}\n.w3-sepia-max,.w3-hover-sepia:hover{-webkit-filter:sepia(100%);filter:sepia(100%)}\n.w3-sepia-min{-webkit-filter:sepia(50%);filter:sepia(50%)}\n.w3-text-shadow{text-shadow:1px 1px 0 #444}.w3-text-shadow-white{text-shadow:1px 1px 0 #ddd}\n.w3-transparent{background-color:transparent!important}\n.w3-hover-none:hover{box-shadow:none!important;background-color:transparent!important}\n/* Colors */\n.w3-amber,.w3-hover-amber:hover{color:#000!important;background-color:#ffc107!important}\n.w3-aqua,.w3-hover-aqua:hover{color:#000!important;background-color:#00ffff!important}\n.w3-blue,.w3-hover-blue:hover{color:#fff!important;background-color:#2196F3!important}\n.w3-light-blue,.w3-hover-light-blue:hover{color:#000!important;background-color:#87CEEB!important}\n.w3-brown,.w3-hover-brown:hover{color:#fff!important;background-color:#795548!important}\n.w3-cyan,.w3-hover-cyan:hover{color:#000!important;background-color:#00bcd4!important}\n.w3-blue-grey,.w3-hover-blue-grey:hover,.w3-blue-gray,.w3-hover-blue-gray:hover{color:#fff!important;background-color:#607d8b!important}\n.w3-green,.w3-hover-green:hover{color:#fff!important;background-color:#4CAF50!important}\n.w3-light-green,.w3-hover-light-green:hover{color:#000!important;background-color:#8bc34a!important}\n.w3-indigo,.w3-hover-indigo:hover{color:#fff!important;background-color:#3f51b5!important}\n.w3-khaki,.w3-hover-khaki:hover{color:#000!important;background-color:#f0e68c!important}\n.w3-lime,.w3-hover-lime:hover{color:#000!important;background-color:#cddc39!important}\n.w3-orange,.w3-hover-orange:hover{color:#000!important;background-color:#ff9800!important}\n.w3-deep-orange,.w3-hover-deep-orange:hover{color:#fff!important;background-color:#ff5722!important}\n.w3-pink,.w3-hover-pink:hover{color:#fff!important;background-color:#e91e63!important}\n.w3-purple,.w3-hover-purple:hover{color:#fff!important;background-color:#9c27b0!important}\n.w3-deep-purple,.w3-hover-deep-purple:hover{color:#fff!important;background-color:#673ab7!important}\n.w3-red,.w3-hover-red:hover{color:#fff!important;background-color:#f44336!important}\n.w3-sand,.w3-hover-sand:hover{color:#000!important;background-color:#fdf5e6!important}\n.w3-teal,.w3-hover-teal:hover{color:#fff!important;background-color:#009688!important}\n.w3-yellow,.w3-hover-yellow:hover{color:#000!important;background-color:#ffeb3b!important}\n.w3-white,.w3-hover-white:hover{color:#000!important;background-color:#fff!important}\n.w3-black,.w3-hover-black:hover{color:#fff!important;background-color:#000!important}\n.w3-grey,.w3-hover-grey:hover,.w3-gray,.w3-hover-gray:hover{color:#000!important;background-color:#9e9e9e!important}\n.w3-light-grey,.w3-hover-light-grey:hover,.w3-light-gray,.w3-hover-light-gray:hover{color:#000!important;background-color:#f1f1f1!important}\n.w3-dark-grey,.w3-hover-dark-grey:hover,.w3-dark-gray,.w3-hover-dark-gray:hover{color:#fff!important;background-color:#616161!important}\n.w3-pale-red,.w3-hover-pale-red:hover{color:#000!important;background-color:#ffdddd!important}\n.w3-pale-green,.w3-hover-pale-green:hover{color:#000!important;background-color:#ddffdd!important}\n.w3-pale-yellow,.w3-hover-pale-yellow:hover{color:#000!important;background-color:#ffffcc!important}\n.w3-pale-blue,.w3-hover-pale-blue:hover{color:#000!important;background-color:#ddffff!important}\n.w3-text-amber,.w3-hover-text-amber:hover{color:#ffc107!important}\n.w3-text-aqua,.w3-hover-text-aqua:hover{color:#00ffff!important}\n.w3-text-blue,.w3-hover-text-blue:hover{color:#2196F3!important}\n.w3-text-light-blue,.w3-hover-text-light-blue:hover{color:#87CEEB!important}\n.w3-text-brown,.w3-hover-text-brown:hover{color:#795548!important}\n.w3-text-cyan,.w3-hover-text-cyan:hover{color:#00bcd4!important}\n.w3-text-blue-grey,.w3-hover-text-blue-grey:hover,.w3-text-blue-gray,.w3-hover-text-blue-gray:hover{color:#607d8b!important}\n.w3-text-green,.w3-hover-text-green:hover{color:#4CAF50!important}\n.w3-text-light-green,.w3-hover-text-light-green:hover{color:#8bc34a!important}\n.w3-text-indigo,.w3-hover-text-indigo:hover{color:#3f51b5!important}\n.w3-text-khaki,.w3-hover-text-khaki:hover{color:#b4aa50!important}\n.w3-text-lime,.w3-hover-text-lime:hover{color:#cddc39!important}\n.w3-text-orange,.w3-hover-text-orange:hover{color:#ff9800!important}\n.w3-text-deep-orange,.w3-hover-text-deep-orange:hover{color:#ff5722!important}\n.w3-text-pink,.w3-hover-text-pink:hover{color:#e91e63!important}\n.w3-text-purple,.w3-hover-text-purple:hover{color:#9c27b0!important}\n.w3-text-deep-purple,.w3-hover-text-deep-purple:hover{color:#673ab7!important}\n.w3-text-red,.w3-hover-text-red:hover{color:#f44336!important}\n.w3-text-sand,.w3-hover-text-sand:hover{color:#fdf5e6!important}\n.w3-text-teal,.w3-hover-text-teal:hover{color:#009688!important}\n.w3-text-yellow,.w3-hover-text-yellow:hover{color:#d2be0e!important}\n.w3-text-white,.w3-hover-text-white:hover{color:#fff!important}\n.w3-text-black,.w3-hover-text-black:hover{color:#000!important}\n.w3-text-grey,.w3-hover-text-grey:hover,.w3-text-gray,.w3-hover-text-gray:hover{color:#757575!important}\n.w3-text-light-grey,.w3-hover-text-light-grey:hover,.w3-text-light-gray,.w3-hover-text-light-gray:hover{color:#f1f1f1!important}\n.w3-text-dark-grey,.w3-hover-text-dark-grey:hover,.w3-text-dark-gray,.w3-hover-text-dark-gray:hover{color:#3a3a3a!important}\n.w3-border-amber,.w3-hover-border-amber:hover{border-color:#ffc107!important}\n.w3-border-aqua,.w3-hover-border-aqua:hover{border-color:#00ffff!important}\n.w3-border-blue,.w3-hover-border-blue:hover{border-color:#2196F3!important}\n.w3-border-light-blue,.w3-hover-border-light-blue:hover{border-color:#87CEEB!important}\n.w3-border-brown,.w3-hover-border-brown:hover{border-color:#795548!important}\n.w3-border-cyan,.w3-hover-border-cyan:hover{border-color:#00bcd4!important}\n.w3-border-blue-grey,.w3-hover-border-blue-grey:hover,.w3-border-blue-gray,.w3-hover-border-blue-gray:hover{border-color:#607d8b!important}\n.w3-border-green,.w3-hover-border-green:hover{border-color:#4CAF50!important}\n.w3-border-light-green,.w3-hover-border-light-green:hover{border-color:#8bc34a!important}\n.w3-border-indigo,.w3-hover-border-indigo:hover{border-color:#3f51b5!important}\n.w3-border-khaki,.w3-hover-border-khaki:hover{border-color:#f0e68c!important}\n.w3-border-lime,.w3-hover-border-lime:hover{border-color:#cddc39!important}\n.w3-border-orange,.w3-hover-border-orange:hover{border-color:#ff9800!important}\n.w3-border-deep-orange,.w3-hover-border-deep-orange:hover{border-color:#ff5722!important}\n.w3-border-pink,.w3-hover-border-pink:hover{border-color:#e91e63!important}\n.w3-border-purple,.w3-hover-border-purple:hover{border-color:#9c27b0!important}\n.w3-border-deep-purple,.w3-hover-border-deep-purple:hover{border-color:#673ab7!important}\n.w3-border-red,.w3-hover-border-red:hover{border-color:#f44336!important}\n.w3-border-sand,.w3-hover-border-sand:hover{border-color:#fdf5e6!important}\n.w3-border-teal,.w3-hover-border-teal:hover{border-color:#009688!important}\n.w3-border-yellow,.w3-hover-border-yellow:hover{border-color:#ffeb3b!important}\n.w3-border-white,.w3-hover-border-white:hover{border-color:#fff!important}\n.w3-border-black,.w3-hover-border-black:hover{border-color:#000!important}\n.w3-border-grey,.w3-hover-border-grey:hover,.w3-border-gray,.w3-hover-border-gray:hover{border-color:#9e9e9e!important}\n.w3-border-light-grey,.w3-hover-border-light-grey:hover,.w3-border-light-gray,.w3-hover-border-light-gray:hover{border-color:#f1f1f1!important}\n.w3-border-dark-grey,.w3-hover-border-dark-grey:hover,.w3-border-dark-gray,.w3-hover-border-dark-gray:hover{border-color:#616161!important}\n.w3-border-pale-red,.w3-hover-border-pale-red:hover{border-color:#ffe7e7!important}.w3-border-pale-green,.w3-hover-border-pale-green:hover{border-color:#e7ffe7!important}\n.w3-border-pale-yellow,.w3-hover-border-pale-yellow:hover{border-color:#ffffcc!important}.w3-border-pale-blue,.w3-hover-border-pale-blue:hover{border-color:#e7ffff!important}\n\n"; });
define('text!b2dropcontrol/onedrivecontrol.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"w3-third\">\n    <div class=\"w3-card-2 w3-sand w3-hover-shadow w3-round-large\">\n      <h3>${heading}</h3>\n      <p>ONEDRIVE is a commercial data store and exchange service.\n        West-life portal can use your ONEDRIVE account to access and download your data files. </p>            <!-- form is showed only if the b2drop is not connected -->\n      <form show.bind=\"dialogstateentry\">\n        <p>You need to have existing ONEDRIVE account. </p>\n        <a show.bind=\"showonedrivebutton\" class=\"w3-btn w3-round-large\" href=\"${oneDriveAuthUrl}\" id=\"authlink\">Connect to ONEDRIVE</a>\n        <hr/>Status: <span>${status}</span>\n      </form>\n      <!-- if it is connected, then status info is showed and option to reconnect is showed-->\n      <form show.bind=\"dialogstateconnected\" submit.trigger=\"reconnect()\">\n        <span>ONEDRIVE service connected.</span>\n        <button class=\"w3-btn w3-round-large\" type=\"submit\">reconnect</button>\n      </form>\n\n      <div show.bind=\"dialogstateconnecting\">\n        <span>ONEDRIVE connecting ...</span>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('text!autocomplete/vfAutocompleteSearch.css', ['module'], function(module) { module.exports = ".result-container{\n  font-family: 'helvetica neue', arial, sans-serif;\n  width: auto;\n  /*border: solid 1px #b6b6b6;*/\n  position: fixed;\n  display: inline-block;\n  background: #fff;\n  z-index: 999;\n  box-shadow: 0px -5px 21px -12px rgba(0, 0, 0, 0.2), 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);\n  margin-top: 2px;\n  margin-bottom: 20px;\n  overflow-y: auto;\n}\n\n.result-card{\n  margin: 5px;\n  padding: 5px;\n  border: solid 1px rgba(115, 179, 96, 5);\n  width:250px;\n  max-height: 370px;\n  overflow-y: scroll; /*tomas changed */\n  box-sizing: content-box !important;\n  float:left;\n}\n\n.result-card-heading{\n  box-sizing: content-box !important;\n  border: 1px solid rgb(115, 179, 96);\n  background: rgba(115, 179, 96, 1);\n  color: #fff;\n  height:20px;\n  padding: 5px 10px;\n  line-height:20px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  text-align: left;\n  flex-basis: auto !important;\n}\n\n.result-card-footer{\n  height:20px;\n  padding: 5px 10px;\n  line-height:20px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  border-top: 1px dotted #999;\n  text-align: right;\n  font-size: 12px;\n  font-weight: bold;\n}\n\n.result-card-item, .result-card-item:visited{\n  font-size: 11.5px;\n  border-bottom: 1px dotted #999;\n  cursor: pointer;\n  text-decoration: none;\n  color: #232323;\n}\n\n.result-card-item:hover{\n  text-decoration: none;\n  background: rgba(115, 179, 96, 0.2);\n}\n\n.result-card-item:last-child{\n  border-bottom: none !important;\n}\n\n.result-card-item:first-child{\n  margin-top:5px;\n}\n\n.result-card-item-label{\n  float:left;\n  width: 75%;\n  text-align: left;\n  height: 20px;\n  line-height: 20px;\n/*  padding: 5px 0px 5px 10px;*/\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.result-card-item-count{\n  width: 25%;\n  text-align: right;\n  height: 20px;\n  line-height: 20px;\n  padding: 5px 5px 5px 0px;\n}\n\n.show-more-link, .show-more-link:visited{\n  text-decoration: none;\n  color:#000;\n}\n\n.show-more-link:hover{\n  text-decoration: none;\n  color: rgba(115, 179, 96, 1);\n}\n\n.result-card-item-count-heading{\n  font-size: 12px;\n  display: inline-block;\n  float: right;\n}\n\na.result-card-item-count-heading, a.result-card-item-count-heading:hover,\na.result-card-item-count-heading:active, a.result-card-item-count-heading:visited {\n  color: #fff;\n  cursor: pointer;\n  text-decoration: none;\n  font-size: 14px;\n}\n\n.norecords-result-card{\n  margin: 0 5px;\n  padding: 5px;\n  font-size: 14px;\n  color: #666;\n  width:250px;\n}\n\n.scrollbar-element{\n  max-height:inherit;\n}\n\n.ps-container:hover>.ps-scrollbar-x-rail, .ps-container:hover>.ps-scrollbar-y-rail {\n  opacity: 1 !important;\n}\n"; });
define('text!dataset/app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../pdbcomponents/dataset\"></require>\n  <dataset></dataset>\n</template>\n"; });
define('text!editor/fileeditor.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"codemirror/lib/codemirror.css\" as=\"scoped\"></require>\n  <require from=\"codemirror/theme/eclipse.css\" as=\"scoped\"></require>\n  <div class=\"w3-card w3-pale-blue w3-code-2\">\n  <textarea ref=\"cmTextarea\">\n\n  </textarea>\n  </div>\n</template>\n"; });
define('text!filemanager2/app.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"./panel\"></require>\n  <require from=\"../w3.css\"></require>\n  <require from=\"./app.css\"></require>\n\n    <div class=\"w3-card-2 w3-sand w3-center\">\n        <h3>Virtual Folder - File manager<i show.bind=\"!provider.temporary\" class=\"w3-right w3-padding-8 fa fa-cog\" click.delegate=\"setupFileManager()\"></i></h3>\n    </div>\n\n    <div class=\"w3-half\">\n        <panel pid=\"left\"></panel>\n    </div>\n\n    <div class=\"w3-half\">\n        <panel pid=\"right\"></panel>\n    </div>\n\n  <div class=\"w3-clear w3-margin w3-padding\"></div>\n</template>\n"; });
define('text!filemanager2/fmsettings.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"w3-card w3-sand\">\n  <ai-dialog>\n    <ai-dialog-body>\n      <h3>${message}</h3>\n      <form>\n      <input class=\"w3-check\" type=\"checkbox\" checked.bind=\"visualizepdb\">\n      <label>click on *.pdb file will visualize in LiteMol(unchecked - shaw RAW in Edit)</label>\n      <p></p>\n      </form>\n    </ai-dialog-body>\n\n    <ai-dialog-footer>\n      <button class=\"w3-btn\" click.trigger = \"close()\">Close</button>\n    </ai-dialog-footer>\n\n  </ai-dialog>\n  </div>\n</template>\n"; });
define('text!filemanager2/panel.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"../filepicker/filepanel\"></require>\n    <require from=\"../pdbcomponents/viewpanel\"></require>\n    <require from=\"../pdbcomponents/dataset\"></require>\n    <require from=\"../tabs/tabs\"></require>\n    <require from='../editor/fileeditor'></require>\n\n  <tabs tabs.bind=\"paneltabs\"></tabs>\n    <div show.bind=\"selectedList\">\n        <filepanel panelid.bind=\"pid\"></filepanel>\n    </div>\n\n    <div show.bind=\"selectedView\">\n        <fileeditor></fileeditor>\n    </div>\n\n    <div show.bind=\"selectedVisual\">\n        <viewpanel></viewpanel>\n    </div>\n\n    <div show.bind=\"selectedDataset\">\n      <dataset></dataset>\n    </div>\n\n\n</template>\n"; });
define('text!filemanager2/viewpanelpv.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"w3-card w3-white \">\n    <span>${fileurl}</span>\n    <form fileurl.call=\"viewfile\">\n      Load another entry from:\n      <ul>\n        <li>\n          <input id=\"pdbid\" title=\"type PDB id and press enter\" placeholder=\"1r6a\"\n                 maxlength=\"4\" size=\"4\" value.bind=\"pdbentry\"\n                 change.trigger=\"loadpdbfile()\"\n          />\n          PDB database\n        </li>\n        <li>\n          <input id=\"pdbid2\" title=\"type PDB id and press enter\" placeholder=\"1r6a\"\n                 maxlength=\"4\" size=\"4\" value.bind=\"pdbentry2\"\n                 change.trigger=\"loadfromredo()\"\n          />\n          PDB-REDO database\n        </li>\n      </ul>\n    </form>\n    <div class=\"fileviewer\" style=\"height: 100%; width: 100%\">\n    </div>\n  </div>\n</template>\n"; });
define('text!filepicker/app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./filepanel\"></require>\n  <require from=\"../w3.css\"></require>\n  <div class=\"w3-card-2 w3-sand w3-center\">\n    <h3>Virtual Folder - File Picker</h3>\n  </div>\n<div class=\"w3-margin w3-padding w3-card w3-sand\">\n  <filepanel></filepanel>\n</div>\n</template>\n"; });
define('text!filepicker/filepanel.html', ['module'], function(module) { module.exports = "<template bindable=\"panelid\">\n    <div class=\"w3-card-2 w3-pale-blue w3-hoverable w3-padding w3-margin-right\">\n        <span>${path} contains ${filescount} items.<button click.delegate=\"refresh()\">refresh</button></span>\n        <table id=\"${panelid}\">\n            <thead>\n            <tr>\n                <th style=\"text-align:left\">name</th>\n                <th style=\"text-align:right\">size</th>\n                <th style=\"text-align:center\">date</th>\n            </tr>\n            </thead>\n            <tbody>\n            <tr class=\"w3-hover-green\" repeat.for=\"file of files\" click.trigger=\"selectFile(file)\">\n              <td>${file.name}</td><td class=\"w3-right\">${file.size}</td><td align=\"center\">${file.date}</td>\n            </tr>\n            </tbody>\n        </table>\n    </div>\n</template>\n\n"; });
define('text!pdbcomponents/checkurl.html', ['module'], function(module) { module.exports = "<template>\n  <span show.bind=\"showit\">\n      <slot></slot>\n  </span>\n  <span show.bind=\"!showit\">${failmessage}</span>\n</template>\n"; });
define('text!pdbcomponents/dataitem.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./pdb-id\"></require>\n  <require from=\"./pdb-ids\"></require>\n  <require from=\"./entry-id\"></require>\n  <require from=\"./hideable\"></require>\n  <require from=\"./checkurl\"></require>\n  <require from=\"../w3.css\"></require>\n  <require from=\"../icons.css\"></require>\n\n  <i if.bind=\"showitem\" class=\"fa fa-window-minimize\" click.delegate=\"hideitem()\"></i>\n  <i if.bind=\"!showitem\" class=\"fa fa-window-maximize\" click.delegate=\"hideitem()\"></i>\n\n  <span class=\"w3-right\" show.bind=\"itemPDBEntry\">recognized as PDB entry</span>\n  <span class=\"w3-right\" show.bind=\"itemUniprotEntry\">recognized as UniProt entry</span>\n  <br/><span if.bind=\"itemPDBEntry\">PDB Links:<a href='javascript:void(0);' class='pdb-links' pdb-id=\"${item}\">${item}</a></span>\n  <span if.bind=\"itemUniprotEntry\">UniProt Link <a href=\"http://www.uniprot.org/uniprot/${item}\">${item}</a></span>\n  <div if.bind=\"showitem\">\n    <div id=\"pdblinks-${item}\" if.bind=\"itemPDBEntry\">\n      <hideable defaulthide=true title=\"PDB Litemol Viewer\"><div style=\"position:relative;height:400px;width:600px;\"><pdb-lite-mol pdb-id=\"'${item}'\" hide-controls=\"true\" load-ed-maps=\"true\"></pdb-lite-mol></div></hideable>\n      <checkurl url=\"//www.cmbi.ru.nl/pdb_redo/${pdbredo}/${item}/pdbe.json\" failmessage=\"\">\n      <hideable title=\"PDB Redo\">\n        <!--checkurl url=\"//pdb-redo.eu/db/${item}/pdbe.json\" failmessage=\"No PDB-REDO data available for this structure.\"-->\n          <pdb-redo pdb-id=\"${item}\"></pdb-redo>\n        <!--/checkurl-->\n      </hideable>\n      </checkurl>\n      <checkurl url=\"//www.mrc-lmb.cam.ac.uk/rajini/api/${item}\" failmessage=\"\">\n      <hideable title=\"PDB Residue interaction\"><pdb-residue-interactions pdb-id=\"${item}\"></pdb-residue-interactions></hideable>\n      </checkurl>\n      <hideable title=\"PDB 3D complex\">\n        <checkurl url=\"//shmoo.weizmann.ac.il/elevy/3dcomplexV5/dataV5/json_v3/${item}.json\" failmessage=\"No 3D-complex data available for this structure.\">\n          <pdb-3d-complex pdb-id=\"${item}\" assembly-id=\"1\"></pdb-3d-complex>\n        </checkurl>\n      </hideable>\n\n      <hr/>\n      Showing entity-id:<select name=\"entityids\" value.bind=\"selectedid\" change.delegate=\"selectedValueChanged()\"><option repeat.for=\"entityid of entityids\" value=\"${entityid}\">${entityid}</option></select>\n      <hideable title=\"PDB Topology Viewer\"><pdb-topology-viewer ref=\"el1\" entry-id=\"${item}\" entity-id=\"1\"></pdb-topology-viewer></hideable>\n      <hideable title=\"PDB Sequence Viewer\"><pdb-seq-viewer ref=\"el2\" entry-id=\"${item}\" entity-id=\"1\" height=\"370\"></pdb-seq-viewer></hideable>\n    </div>\n\n    <div id=\"uniprot-${item}\" if.bind=\"itemUniprotEntry\">\n      <hideable title=\"PDB UniProt Viewer\"><pdb-uniprot-viewer entry-id=\"${item}\" height=\"320\"></pdb-uniprot-viewer></hideable>\n    </div>\n  </div>\n\n</template>\n"; });
define('text!pdbcomponents/dataset.html', ['module'], function(module) { module.exports = "<template>\n\n  <require from=\"./pdb-id\"></require>\n  <require from=\"./pdb-ids\"></require>\n  <require from=\"./entry-id\"></require>\n  <require from=\"./dataitem\"></require>\n  <require from=\"./hideable\"></require>\n  <require from=\"../autocomplete/vfAutocompleteSearch\"></require>\n\n\n    <div class=\"w3-card-2 w3-sand w3-center\">\n      <h3>Virtual Folder - Dataset</h3>\n    </div>\n\n  <div class=\"w3-card w3-pale-blue\">\n\n    <div show.bind=\"showlist\">\n      <table class=\"w3-table\">\n        <tr ><td class=\"w3-large w3-hover-green\" click.delegate=\"createnewdataset()\">Create New Dataset</td>\n\n        </tr>\n        <tr repeat.for=\"item of datasetlist\"><td class=\"w3-large w3-hover-green\" click.delegate=\"selectdataset(item)\">${item.Name}</td>\n          <td click.delegate=\"removedataset(item)\"\n                class=\"w3-button w3-btn\">&times;</td>\n        </tr>\n      </table>\n    </div>\n\n    <div show.bind=\"!showlist\">\n      <div class=\"w3-display-container w3-large w3-hover-green\" click.delegate=\"unselectdataset(item)\">${name}</div>\n\n      <form>\n        PDB or related item to add:<br/>\n        <vf-autocomplete-search submit.call=\"additem(item)\" placeholder=\"1cbs (PDB entry) or P12355 (Uniprot entry)\" size=\"40\"></vf-autocomplete-search>\n      </form>\n\n      <hr/>\n      <hideable title=\"PDB Prints\"><pdb-prints pdb-ids='${pdbdataset}' settings='{\"size\": 24 }'></pdb-prints></hideable>\n      <br/>\n      <ul>\n        <li repeat.for=\"item of pdbdataset\"><span class=\"w3-black w3-center\">${item}</span>\n          <i class=\"fa fa-remove\" click.delegate=\"removeitem(item)\"></i>\n          <dataitem item=\"${item}\"></dataitem>\n        </li>\n      </ul>\n\n      dataset name:\n      <input value.bind=\"name\" change.trigger=\"changename()\"/>\n      <br/>\n\n      <!-- will be enabled after backend service is available -->\n      <button type=\"button\" click.delegate=\"submit()\" disabled.bind=\"!canSubmit\">Publish dataset</button>\n    </div>\n\n  </div>\n</template>\n"; });
define('text!pdbcomponents/hideable.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"../icons.css\"></require>\n    <button class=\"w3-bold w3-sand w3-button w3-block w3-padding-0 w3-border\" click.delegate=\"changeshowit()\">${title} <i class=\"fa fa-caret-down\"></i></button>\n    <span show.bind=\"showit\" class=\"vf-transition\">\n      <slot></slot>\n    </span>\n</template>\n"; });
define('text!pdbcomponents/viewpanel.html', ['module'], function(module) { module.exports = "<template bindable=\"panelid\">\n\n    <p><b>EMBL EBI PDB Viewer: </b><span id=\"pdbid\"></span></p>\n    <input id=\"pdbid\" title=\"type PDB id and press enter\" placeholder=\"1r6a\"\n           maxlength=\"4\" size=\"4\" value.bind=\"pdbentry\"\n           change.delegate='loadpdb()'/>from PDB database</input>\n    <div id=\"pdbwrapper\">\n        <div style=\"position:relative;height:600px;width:800px;\" id=\"pdbviewer\">\n            <pdb-lite-mol pdb-id=\"'4ika'\" load-ed-maps=\"true\"></pdb-lite-mol>\n        </div>\n    </div>\n\n</template>\n"; });
define('text!tabs/tabs.html', ['module'], function(module) { module.exports = "<template>\n    <ul class=\"w3-navbar\">\n        <li repeat.for=\"tab of tabs\">\n            <a class=\"w3-padding-tiny w3-small w3-light-grey w3-hover-blue\" href=\"javascript:void(0)\" click.delegate=\"opentab(tab)\">${tab.label}</a>\n        </li>\n    </ul>\n</template>"; });
define('text!uploaddirpicker/app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../filepicker/filepanel\"></require>\n  <require from=\"./uploaddirpanel\"></require>\n  <require from=\"../w3.css\"></require>\n  <div class=\"w3-card-2 w3-sand w3-center\">\n    <h3>Virtual Folder - Upload-dir Picker</h3>\n  </div>\n<div class=\"w3-margin w3-padding w3-card w3-sand\">\n  <uploaddirpanel></uploaddirpanel>\n</div>\n</template>\n"; });
define('text!uploaddirpicker/uploaddirpanel.html', ['module'], function(module) { module.exports = "<template bindable=\"panelid\">\n  <div class=\"w3-card-2 w3-pale-blue w3-hoverable w3-padding w3-margin-right\">\n    <span>${path} contains ${filescount} items.<button click.delegate=\"refresh()\">refresh</button> <button click.delegate=\"selectThisDir()\">Select this as UPLOAD dir</button></span>\n    <table id=\"${panelid}\">\n      <thead>\n      <tr>\n        <th style=\"text-align:left\">name</th>\n        <th style=\"text-align:right\">size</th>\n        <th style=\"text-align:center\">date</th>\n      </tr>\n      </thead>\n      <tbody>\n      <tr class=\"w3-hover-green\" repeat.for=\"file of files\" click.trigger=\"selectFile(file)\">\n        <td>${file.name}</td><td>${file.size}</td><td align=\"center\">${file.date}</td>\n      </tr>\n      </tbody>\n    </table>\n  </div>\n</template>\n"; });
define('text!virtualfoldermodules/app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./modulesetting\"></require>\n\n  <modulesetting></modulesetting>\n\n</template>\n"; });
define('text!virtualfoldermodules/ccp4control.html', ['module'], function(module) { module.exports = "<template>\n  <div class.bind=\"classin\">\n    <h4>CCP4 suite</h4>\n    <p>The CCP4 (Collaborative Computational Project, Number 4)\n      software suite is a collection of programs and associated data\n      and software libraries which can be used for macromolecular\n      structure determination by X-ray crystallography.</p>\n    <p>West-life portal allows access to CCP4 software tools without need to install them separatately. </p>\n    <p show.bind=\"!enabled\">To enable local copy of CCP4 suite you agree that you have Academic or Commercial License. If not, please obtain a license first at <a href=\"http://www.ccp4.ac.uk/ccp4license.php\">CCP4License</a>.</p>\n    <button show.bind=\"!enabled\" class=\"w3-btn w3-round-large\" click.trigger=\"enable()\">Agree & Enable CCP4</button>\n  </div>\n</template>\n"; });
define('text!virtualfoldermodules/modulesetting.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./scipioncontrol\"></require>\n  <require from=\"./virtuosocontrol\"></require>\n  <require from=\"./ccp4control\"></require>\n  <require from=\"../pdbcomponents/hideable\"></require>\n\n  <hideable title=\"Available modules\" defaulthide=\"true\">\n    <scipioncontrol></scipioncontrol>\n    <ccp4control></ccp4control>\n    <virtuosocontrol></virtuosocontrol>\n  </hideable>\n</template>\n"; });
define('text!virtualfoldermodules/scipioncontrol.html', ['module'], function(module) { module.exports = "<template>\n\n  <div class.bind=\"classin\">\n\n    <h4>Scipion</h4>\n    <p>Scipion is an image processing framework to obtain 3D models\n      of macromolecular complexes using Electron Microscopy.</p>\n    <p>West-life portal allows access to Scipion software tools without need to install them separatately. </p>\n    <p show.bind=\"!enabled\">To enable and start local copy of Scipion Webtools, please click the Enable button.</p>\n    <button show.bind=\"!enabled\" class=\"w3-btn w3-round-large\" click.trigger=\"enable()\">Enable Scipion</button>\n    <p show.bind=\"enabled\">\n      Access Scipion Services:<a href=\"http://localhost:8001/\">local Scipion webtool</a>\n    </p>\n</div>\n</template>\n"; });
define('text!virtualfoldermodules/virtuosocontrol.html', ['module'], function(module) { module.exports = "<template>\n\n  <div class.bind=\"classin\">\n    <h4>Virtuoso</h4>\n    <p>Virtuoso-opensource is Virtuoso is a scalable cross-platform server that combines Relational, Graph, and Document Data Management with Web Application Server and Web Services Platform functionality.\n    </p>\n    <p>To enable and start local instance of Virtuoso, please click the Enable button.</p>\n    <button class=\"w3-btn w3-round-large\" onclick=\"$.post('/metadataservice/sbservice/virtuoso'); this.disabled=true\">Enable Virtuoso</button>\n    <p>\n      Access Virtuoso Services:<a href=\"/virtuoso\">local Virtuoso webtool</a>\n    </p>\n    </div>\n</template>\n"; });
define('text!virtualfoldersetting/aliastable.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../icons.css\"></require>\n  <div class=\"w3-sand w3-padding\">\n\n      <table class=\"w3-sand \">\n        <thead>\n        <tr><th colspan=\"3\">List of connected providers</th> </tr>\n        <tr>\n          <th align=\"left\">Alias</th>\n          <th align=\"left\">Type</th>\n          <th></th>\n        </tr>\n        </thead>\n        <tbody>\n        <tr class=\"w3-hover-green\" repeat.for=\"provider of providers\">\n          <td>${provider.alias}</td><td>${provider.type}</td><td><a href=\"filemanager.html\"class=\"w3-button\">Browse content</a></td><td align=\"center\"><i show.bind=\"!provider.temporary\" class=\"fa fa-cog\" click.delegate=\"setupProvider(provider)\"></i></td><td align=\"center\"><i show.bind=\"!provider.temporary\" class=\"fa fa-remove\" click.delegate=\"removeProvider(provider)\"></i></td>\n        </tr>\n        </tbody>\n        <tfoot>\n        <tr>\n          <td colspan=\"3\"><button  class=\"w3-btn w3-round-large w3-blue\" type=\"submit\" class=\"w3-buttons\">Add new file provider</button></td>\n        </tr>\n        </tfoot>\n      </table>\n\n  </div>\n</template>\n"; });
define('text!virtualfoldersetting/app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./storageprovider\"></require>\n  <require from=\"../virtualfoldermodules/modulesetting\"></require>\n  <require from=\"./clouddeployment\"></require>\n  <require from=\"../w3.css\"></require>\n\n  <div class=\"w3-card-2 w3-sand w3-center\">\n    <h3>Virtual Folder - Settings</h3>\n  </div>\n\n  <storageprovider></storageprovider>\n\n  <div if.bind=\"islocalhost\">\n    <modulesetting></modulesetting>\n  </div>\n\n  <div if.bind=\"islocalhost\">\n    <clouddeployment></clouddeployment>\n  </div>\n</template>\n"; });
define('text!virtualfoldersetting/clouddeployment.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../pdbcomponents/hideable\"></require>\n\n  <hideable title=\"Cloud deployment\" defaulthide=\"true\">\n    <div class=\"w3-card-4 w3-sand\">\n      <h3>Available virtual machines</h3>\n      <table class=\"w3-table w3-striped w3-hoverable\">\n        <thead>\n        <tr>\n          <th>name</th>\n          <th>location</th>\n          <th>capacity</th>\n          <th>mounted VF</th>\n          <th>task status</th>\n        </tr>\n        </thead>\n\n        <tr>\n          <td>West-Life VF 17.05</td>\n          <td>EGI FedCloud, CESNET</td>\n          <td>8GB RAM, 50GB scratch disc</td>\n          <td>mounted - all (b2drop,dropbox,pcloud)</td>\n          <td class=\"w3-pale-green\">OK, CPU utilization 50%</td>\n          <td><a href=\"#\">Connect to console</a></td>\n        </tr>\n\n        <tr>\n          <td>West-Life VF 17.05</td>\n          <td>EGI FedCloud, INFN</td>\n          <td>16GB RAM, 50GB scratch disc</td>\n          <td>mounted - all (b2drop,dropbox,pcloud)</td>\n          <td class=\"w3-pale-red\">halted</td>\n        </tr>\n        <tr>\n          <td><button class=\"w3-button\">Create new VM</button></td>\n        </tr>\n      </table>\n    </div>\n  </hideable>\n\n</template>\n"; });
define('text!virtualfoldersetting/genericcontrol.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../w3.css\"></require>\n  <div class=\"w3-sand w3-padding w3-margin\">\n\n    <form submit.trigger=\"addProvider()\">\n\n\n      <select class=\"w3-select\" name=\"option\" value.bind=\"selectedProvider\">\n        <option value=\"\" disabled selected>Choose provider</option>\n        <option repeat.for=\"provider of providers\" value.bind=\"provider\">${provider}</option>\n      </select>\n\n      <div show.bind=\"selectedProvider\">\n\n        <div show.bind=\"selectedB2Drop\">\n          <p>The West-Life VRE uses B2DROP to store data files. B2DROP is a secure and trusted data exchange service for researchers and scientists. \n            \n          <a href=\"https://b2drop.eudat.eu/pwm/public/NewUser?\">Register</a>\n            </p>\n          Username:<input  class=\"w3-bar\" type=\"text\" name=\"username\"  maxlength=\"1024\" value.bind=\"username\" placeholder=\"B2DROP username\" /><br/>\n          Password:<input  class=\"w3-bar\" type=\"password\" name=\"securetoken\" maxlength=\"1024\" value.bind=\"password\" placeholder=\"B2DROP password\"/><br/>\n          Alias (optional):<input type=\"text\" name=\"alias\"  class=\"w3-bar\" maxlength=\"1024\" value.bind=\"alias\"\n\t      tooltip=\"Name for subfolder where these B2DROP files will be mounted\"\n\t  /><br/>\n          \n          <button class=\"w3-btn w3-round-large w3-right\" type=\"submit\">Add</button>\n        </div>\n\n        <div show.bind=\"selectedDropbox\">\n          <p>DROPBOX is a commercial data store and exchange service.\n            West-life portal can use your DROPBOX account to access and download your data files. </p>\n\n          <input type=\"checkbox\" ref=\"knownSecureToken\"/><span class=\"w3-tiny\">I know the secure token </span>\n          <div show.bind=\"!knowntoken\">\n            <p>You need to have a DROPBOX account. </p>\n            <a class=\"w3-btn w3-round-large\" href=\"${dropboxauthurl}\" id=\"authlink\">Connect to DROPBOX</a>\n          </div>\n          <div show.bind=\"knowntoken\">Secure token:\n            <input  class=\"w3-bar\" type=\"text\" name=\"securetoken\" maxlength=\"1024\" value.bind=\"securetoken\"\n                   readonly.bind=\"!editing\"\n\t\t   /><br/>\n            Alias (optional):<input class=\"w3-bar\" type=\"text\" name=\"alias\" maxlength=\"1024\" value.bind=\"alias\"\n\t           tooltip=\"Name for subfolder where these Dropbox files will be mounted\"\n\t    /><br/>\n            <button class=\"w3-btn w3-round-large\" type=\"submit\">Add</button>\n\n          </div>\n\n        </div>\n\n        <div show.bind=\"selectedFileSystem\">\n          Internal path to be linked:\n          <input  class=\"w3-bar\" type=\"text\" name=\"securetoken\" maxlength=\"1024\" value.bind=\"filesystempath\"/><br/>\n          Alias (optional):<input  class=\"w3-bar\" type=\"text\" name=\"alias\" maxlength=\"1024\" value.bind=\"alias\"\n\t      tooltip=\"Name for subfolder where these local files will be mounted\"\n\t  /><br/>\n          <button class=\"w3-btn w3-round-large w3-right\" type=\"submit\">Add</button>\n        </div>\n\n        <div show.bind=\"selectedWebDav\">\n          <p>WebDAV is standard protocol to access files via the web. If you have address (WebDAV url) of a\n            service, you can add it to West-life virtual folder directly.</p>\n          WebDAV URL:<input class=\"w3-bar\" type=\"text\" name=\"accessurl\" maxlength=\"1024\" value.bind=\"accessurl\" \n\t  placeholder=\"https://...\" /><br/>\n          Username:<input  class=\"w3-bar\" type=\"text\" name=\"username\" maxlength=\"1024\" value.bind=\"username\"/><br/>\n          Password:<input  class=\"w3-bar\" type=\"password\" name=\"securetoken\" maxlength=\"1024\" value.bind=\"password\"/><br/>\n          Alias (optional):<input  class=\"w3-bar\" type=\"text\" name=\"alias\"  maxlength=\"1024\" value.bind=\"alias\"\n\t     tooltip=\"Name for subfolder where this Webdav folder will be mounted\"\n\t  /><br/>\n          <button class=\"w3-btn w3-round-large w3-right\" type=\"submit\">Add</button>\n        </div>\n\n      </div>\n\n    </form>\n\n\n  </div>\n\n</template>\n"; });
define('text!virtualfoldersetting/storageprovider.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./genericcontrol\"></require>\n  <require from=\"./aliastable\"></require>\n  <require from=\"../pdbcomponents/hideable\"></require>\n\n  <hideable title=\"Storage providers\">\n    <div class=\"w3-container\">\n      <form submit.trigger=\"newProvider()\" class=\"w3-half\">\n        <aliastable></aliastable>\n      </form>\n\n      <genericcontrol show.bind=\"showprovider\" class=\"w3-half\"></genericcontrol>\n\n    </div>\n  </hideable>\n\n</template>\n"; });
define('text!filemanager2/app.css', ['module'], function(module) { module.exports = "ux-dialog-overlay.active {background-color: black;opacity: .5;}\n"; });
//# sourceMappingURL=app-bundle.js.map