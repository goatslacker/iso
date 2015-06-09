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
  dataElement: 'div'
};
var each = function each(x, f) {
  return Array.prototype.forEach.call(x, f);
};
var parse = function parse(node, x) {
  return JSON.parse(node.getAttribute(x));
};
var setDefaults = function setDefaults(config) {
  config.markupClassName = config.markupClassName || defaultConfiguration.markupClassName;
  config.markupElement = config.markupElement || defaultConfiguration.markupElement;
  config.dataClassName = config.dataClassName || defaultConfiguration.dataClassName;
  config.dataElement = config.dataElement || defaultConfiguration.dataElement;
};

var Iso = (function () {
  function Iso(config) {
    _classCallCheck(this, Iso);

    setDefaults(config);
    this.markupClassName = config.markupClassName;
    this.markupElement = config.markupElement;
    this.dataClassName = config.dataClassName;
    this.dataElement = config.dataElement;
    this.html = [];
    this.data = [];
  }

  _createClass(Iso, [{
    key: 'add',
    value: function add(html) {
      var _state = arguments[1] === undefined ? {} : arguments[1];

      var _meta = arguments[2] === undefined ? {} : arguments[2];

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

      var markup = this.html.reduce(function (markup, html, i) {
        return markup + ('<' + _this.markupElement + ' class="' + _this.markupClassName + '" data-key="' + i + '">' + html + '</' + _this.markupElement + '>');
      }, '');

      var data = this.data.reduce(function (nodes, data, i) {
        var state = data.state;
        var meta = data.meta;

        return nodes + ('<' + _this.dataElement + ' class="' + _this.dataClassName + '" data-key="' + i + '" data-meta="' + meta + '" data-state="' + state + '"></' + _this.dataElement + '>');
      }, '');

      return '\n' + markup + '\n' + data + '\n';
    }
  }], [{
    key: 'render',
    value: function render(html) {
      var state = arguments[1] === undefined ? {} : arguments[1];
      var meta = arguments[2] === undefined ? {} : arguments[2];
      var config = arguments[3] === undefined ? defaultConfiguration : arguments[3];

      return new Iso(config).add(html, state, meta).render();
    }
  }, {
    key: 'bootstrap',
    value: function bootstrap(onNode) {
      var config = arguments[1] === undefined ? defaultConfiguration : arguments[1];

      setDefaults(config);
      if (!onNode) {
        return;
      }

      var nodes = document.querySelectorAll('.' + config.markupClassName);
      var state = document.querySelectorAll('.' + config.dataClassName);

      var cache = {};

      each(state, function (node) {
        var meta = parse(node, 'data-meta');
        var state = parse(node, 'data-state');
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
      Iso.bootstrap(function (state, meta, node) {
        if (meta[metaKey] && meta[metaKey] === metaValue) {
          onNode(state, meta, node);
        }
      });
    }
  }]);

  return Iso;
})();

exports['default'] = Iso;
module.exports = exports['default'];

