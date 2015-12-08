'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KEY_NAME = 'data-iso-key';

var defaultRenderer = {
  markup: (function () {
    function markup(html, key) {
      if (!html) return '';
      return '<div ' + KEY_NAME + '="' + String(key) + '">' + String(html) + '</div>';
    }

    return markup;
  })(),
  data: (function () {
    function data(state, key) {
      if (!state) return '';
      return '<script type="application/json" ' + KEY_NAME + '="' + String(key) + '">' + String(state) + '</script>';
    }

    return data;
  })()
};

var defaultSelector = function defaultSelector() {
  var all = document.querySelectorAll('[' + KEY_NAME + ']');

  return Array.prototype.reduce.call(all, function (cache, node) {
    var key = node.getAttribute(KEY_NAME);

    if (!cache[key]) cache[key] = {};

    if (node.nodeName === 'SCRIPT') {
      try {
        var state = JSON.parse(node.innerHTML);
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

var Iso = (function () {
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
    value: (function () {
      function add(html) {
        var _state = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var state = JSON.stringify(_state);
        this.html.push(html);
        this.data.push(state);
        return this;
      }

      return add;
    })()
  }, {
    key: 'render',
    value: (function () {
      function render() {
        var _this = this;

        var markup = this.html.reduce(function (nodes, html, i) {
          var key = String(_this.name) + '_' + String(i);
          return nodes + _this.renderer.markup(html, key, _this.name);
        }, '');

        var data = this.data.reduce(function (nodes, state, i) {
          var key = String(_this.name) + '_' + String(i);
          return nodes + _this.renderer.data(state, key, _this.name);
        }, '');

        return String(markup) + '\n' + String(data);
      }

      return render;
    })()
  }], [{
    key: 'render',
    value: (function () {
      function render(html) {
        var state = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var name = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];
        var renderer = arguments.length <= 3 || arguments[3] === undefined ? defaultRenderer : arguments[3];

        return new Iso(name, renderer).add(html, state).render();
      }

      return render;
    })()
  }, {
    key: 'bootstrap',
    value: (function () {
      function bootstrap(onNode) {
        var selector = arguments.length <= 1 || arguments[1] === undefined ? defaultSelector : arguments[1];

        if (!onNode) return;

        var cache = selector();

        Object.keys(cache).forEach(function (key) {
          var _cache$key = cache[key];
          var state = _cache$key.state;
          var node = _cache$key.node;

          onNode(state, node, key);
        });
      }

      return bootstrap;
    })()
  }]);

  return Iso;
})();

exports.default = Iso;

