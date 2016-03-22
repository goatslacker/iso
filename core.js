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
