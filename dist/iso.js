'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var escapeTextForBrowser = require('escape-html');

var defaultConfiguration = {
  markupClassName: '___iso-html___',
  markupElement: 'div',
  dataClassName: '___iso-state___',
  dataElement: 'script',
  keyPrefix: ''
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
    this.html = [];
    this.data = [];
  }

  _createClass(Iso, [{
    key: 'add',
    value: function add(html) {
      var _state = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var _meta = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      var meta = escapeTextForBrowser(JSON.stringify(_meta));
      this.html.push(html);
      this.data.push(JSON.parse(_state));
      return this;
    }
  }, {
    key: 'render',
    value: function render() {
      var data = '<' + this.dataElement + ' class="' + this.dataClassName + '" type="application/json">' + JSON.stringify(this.data) + '</' + this.dataElement + '>';

      var markup = this.html.reduce(function (markup, html, i) {
        var $ = _cheerio2['default'].load(html);
        var isoHtml = $.html();
        return markup + isoHtml;
      }, '');

      var $ = _cheerio2['default'].load(markup);

      $('html').find('body').append(data);
      var output = $.html();

      return '' + output;
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

      var state = document.querySelectorAll('.' + config.dataClassName);

      var cache = JSON.parse(state[0].innerHTML);

      onNode(cache, document.documentElement);

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

