'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var escapeTextForBrowser = require('escape-html');

var defaultConfiguration = {
  markupClassName: '___iso-html___',
  markupElement: 'div',
  dataClassName: '___iso-state___',
  dataElement: 'script',
  keyPrefix: '',
  entryHook: 'iso-root'
};
var each = function each(x, f) {
  return Array.prototype.forEach.call(x, f);
};
var parse = function parse(node, x) {
  return JSON.parse(node.getAttribute(x));
};
var setDefaults = function setDefaults(config) {
  config.entryHook = config.entryHook || defaultConfiguration.entryHook;
  config.markupClassName = config.markupClassName || defaultConfiguration.markupClassName;
  config.markupElement = config.markupElement || defaultConfiguration.markupElement;
  config.dataClassName = config.dataClassName || defaultConfiguration.dataClassName;
  config.dataElement = config.dataElement || defaultConfiguration.dataElement;
  config.keyPrefix = config.keyPrefix || defaultConfiguration.keyPrefix;
};

var Iso = (function () {
  function Iso() {
    var config = arguments.length <= 0 || arguments[0] === undefined ? defaultConfiguration : arguments[0];

    _classCallCheck(this, Iso);

    setDefaults(config);
    this.markupClassName = config.markupClassName;
    this.markupElement = config.markupElement;
    this.dataClassName = config.dataClassName;
    this.dataElement = config.dataElement;
    this.keyPrefix = config.keyPrefix;
    this.entryHook = config.entryHook;
    this.html = [];
    this.data = [];
  }

  _createClass(Iso, [{
    key: 'add',
    value: function add(html) {
      var _state = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var _meta = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      var state = escapeTextForBrowser(JSON.stringify(_state));
      var meta = escapeTextForBrowser(JSON.stringify(_meta));
      this.html.push(html);
      this.data.push({ state: state, meta: meta });
      return this;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var data = this.data.reduce(function (nodes, data, i) {
        var state = data.state;
        var meta = data.meta;

        return nodes + ('<' + _this.dataElement + ' class="' + _this.dataClassName + '" type="application/json" data-key="' + _this.keyPrefix + '_' + i + '" data-meta="' + meta + '">' + state + '</' + _this.dataElement + '>');
      }, '');

      var markup = this.html.reduce(function (markup, html, i) {
        if (_this.entryHook) {
          var isoHtml = html.replace(_this.entryHook, _this.markupClassName).replace('data-key', 'data-key="' + _this.keyPrefix + '_' + i + '"').replace('<!--___iso-state___-->', data);
          return markup + isoHtml;
        } else {
          return markup + ('<' + _this.markupElement + ' class="' + _this.markupClassName + '" data-key="' + _this.keyPrefix + '_' + i + '">' + html + '</' + _this.markupElement + '>');
        }
      }, '');

      return '' + markup;
    }
  }], [{
    key: 'render',
    value: function render(html) {
      var state = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var meta = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
      var config = arguments.length <= 3 || arguments[3] === undefined ? defaultConfiguration : arguments[3];

      return new Iso(config).add(html, state, meta).render();
    }
  }, {
    key: 'bootstrap',
    value: function bootstrap(onNode) {
      var config = arguments.length <= 1 || arguments[1] === undefined ? defaultConfiguration : arguments[1];

      setDefaults(config);
      if (!onNode) {
        return;
      }

      var nodes = document.querySelectorAll('.' + config.markupClassName);
      var state = document.querySelectorAll('.' + config.dataClassName);

      var cache = {};

      each(state, function (node) {
        var meta = parse(node, 'data-meta'); // meta
        var state = JSON.parse(node.innerHTML); // state
        cache[node.getAttribute('data-key')] = { meta: meta, state: state };
      });

      each(nodes, function (node) {
        var key = node.getAttribute('data-key');
        if (!cache[key]) {
          return;
        }
        var _cache$key = cache[key];
        var meta = _cache$key.meta;
        var state = _cache$key.state;

        onNode(state, meta, node);
      });

      cache = null;
    }
  }, {
    key: 'on',
    value: function on(metaKey, metaValue, onNode) {
      var config = arguments.length <= 3 || arguments[3] === undefined ? defaultConfiguration : arguments[3];

      setDefaults(config);
      Iso.bootstrap(function (state, meta, node) {
        if (meta[metaKey] && meta[metaKey] === metaValue) {
          onNode(state, meta, node);
        }
      }, config);
    }
  }]);

  return Iso;
})();

exports['default'] = Iso;
module.exports = exports['default'];

