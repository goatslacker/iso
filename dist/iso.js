(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Iso"] = factory();
	else
		root["Iso"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _core = __webpack_require__(2);

	var _core2 = _interopRequireDefault(_core);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var KEY_NAME = 'data-iso-key';

	var defaultRenderer = {
	  markup: function () {
	    function markup(html, key) {
	      if (!html) return '';
	      return '<div ' + KEY_NAME + '="' + String(key) + '">' + String(html) + '</div>';
	    }

	    return markup;
	  }(),
	  data: function () {
	    function data(state, key) {
	      if (!state) return '';
	      return '<script type="application/json" ' + KEY_NAME + '="' + String(key) + '">' + String(state) + '</script>';
	    }

	    return data;
	  }()
	};

	var defaultSelector = function defaultSelector() {
	  var all = document.querySelectorAll('[' + KEY_NAME + ']');

	  return Array.prototype.reduce.call(all, function (cache, node) {
	    var key = node.getAttribute(KEY_NAME);

	    if (!cache[key]) cache[key] = {};

	    if (node.nodeName === 'SCRIPT') {
	      try {
	        var state = JSON.parse(_core2['default'].decode(node.innerHTML));
	        cache[key].state = state;
	      } catch (e) {
	        cache[key].state = {};
	      }
	    } else {
	      cache[key].node = node;
	    }

	    return cache;
	  }, {});
	};

	var Iso = function () {
	  function Iso() {
	    var name = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	    var renderer = arguments.length <= 1 || arguments[1] === undefined ? defaultRenderer : arguments[1];

	    _classCallCheck(this, Iso);

	    this.name = name;
	    this.renderer = renderer;
	    this.html = [];
	    this.data = [];
	  }

	  _createClass(Iso, [{
	    key: 'add',
	    value: function () {
	      function add(html) {
	        var _state = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	        var state = _core2['default'].encode(JSON.stringify(_state));
	        this.html.push(html);
	        this.data.push(state);
	        return this;
	      }

	      return add;
	    }()
	  }, {
	    key: 'render',
	    value: function () {
	      function render() {
	        return _core2['default'].server(this.html, this.data, this.renderer, this.name);
	      }

	      return render;
	    }()
	  }], [{
	    key: 'render',
	    value: function () {
	      function render(html) {
	        var state = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	        var name = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];
	        var renderer = arguments.length <= 3 || arguments[3] === undefined ? defaultRenderer : arguments[3];

	        return new Iso(name, renderer).add(html, state).render();
	      }

	      return render;
	    }()
	  }, {
	    key: 'bootstrap',
	    value: function () {
	      function bootstrap(onNode) {
	        var selector = arguments.length <= 1 || arguments[1] === undefined ? defaultSelector : arguments[1];

	        return _core2['default'].client(onNode, selector);
	      }

	      return bootstrap;
	    }()
	  }]);

	  return Iso;
	}();

	exports['default'] = Iso;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var rLt = /</g;
	var rGt = />/g;
	var rLte = /&lt;/g;
	var rGte = /&gt;/g;
	var rEnc = /[<>]/;
	var rDec = /&lt;|&gt;/;

	var coerceToString = function coerceToString(val) {
	  return val ? String(val) : '';
	};

	exports['default'] = {
	  encode: function () {
	    function encode(str) {
	      var val = coerceToString(str);

	      if (rEnc.test(val)) {
	        return val.replace(rLt, '&lt;').replace(rGt, '&gt;');
	      }

	      return val;
	    }

	    return encode;
	  }(),
	  decode: function () {
	    function decode(str) {
	      var val = coerceToString(str);

	      if (rDec.test(val)) {
	        return val.replace(rLte, '<').replace(rGte, '>');
	      }

	      return val;
	    }

	    return decode;
	  }(),
	  server: function () {
	    function server(html, data, renderer) {
	      var name = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];

	      var markup = html.reduce(function (nodes, html, i) {
	        var key = String(name) + '_' + String(i);
	        return nodes + renderer.markup(html, key, name);
	      }, '');

	      var state = data.reduce(function (nodes, state, i) {
	        var key = String(name) + '_' + String(i);
	        return nodes + renderer.data(state, key, name);
	      }, '');

	      return String(markup) + '\n' + String(state);
	    }

	    return server;
	  }(),
	  client: function () {
	    function client(onNode, selector) {
	      if (!onNode) return;

	      var cache = selector();

	      Object.keys(cache).forEach(function (key) {
	        var _cache$key = cache[key];
	        var state = _cache$key.state;
	        var node = _cache$key.node;

	        onNode(state, node, key);
	      });
	    }

	    return client;
	  }()
	};

/***/ }
/******/ ])
});
;