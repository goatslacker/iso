'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var escapeTextForBrowser = require('escape-html');

var each = function each(x, f) {
  return Array.prototype.forEach.call(x, f);
};
var parse = function parse(node, x) {
  return JSON.parse(node.getAttribute(x));
};
var setDefaults = function setDefaults(config) {
  config.markupClassName = config.markupClassName || '___iso-html___';
  config.markupElement = config.markupElement || 'div';
  config.dataClassName = config.dataClassName || '___iso-state___';
  config.dataElement = config.dataElement || 'div';
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
      var config = arguments[3] === undefined ? { markupClassName: '___iso-html___', markupElement: 'div', dataClassName: '___iso-state___', dataElement: 'div' } : arguments[3];

      return new Iso(config).add(html, state, meta).render();
    }
  }, {
    key: 'bootstrap',
    value: function bootstrap(onNode) {
      var markupClassName = arguments[1] === undefined ? '___iso-html___' : arguments[1];
      var dataClassName = arguments[2] === undefined ? '___iso-state___' : arguments[2];

      if (!onNode) {
        return;
      }

      var nodes = document.querySelectorAll('.' + markupClassName);
      var state = document.querySelectorAll('.' + dataClassName);

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

