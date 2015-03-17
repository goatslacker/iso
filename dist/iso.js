"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var escapeTextForBrowser = require("escape-html");

var each = function (x, f) {
  return Array.prototype.forEach.call(x, f);
};
var parse = function (node, x) {
  return JSON.parse(node.getAttribute(x));
};

var Iso = (function () {
  function Iso() {
    _classCallCheck(this, Iso);

    this.html = [];
    this.data = [];
  }

  _prototypeProperties(Iso, {
    render: {
      value: function render(html) {
        var state = arguments[1] === undefined ? {} : arguments[1];
        var meta = arguments[2] === undefined ? {} : arguments[2];

        return new Iso().add(html, state, meta).render();
      },
      writable: true,
      configurable: true
    },
    bootstrap: {
      value: function bootstrap(onNode) {
        if (!onNode) {
          return;
        }

        var nodes = document.querySelectorAll(".___iso-html___");
        var state = document.querySelectorAll(".___iso-state___");

        var cache = {};

        each(state, function (node) {
          var meta = parse(node, "data-meta");
          var state = parse(node, "data-state");
          cache[node.getAttribute("data-key")] = { meta: meta, state: state };
        });

        each(nodes, function (node) {
          var key = node.getAttribute("data-key");
          if (!cache[key]) {
            return;
          }
          var _cache$key = cache[key];
          var meta = _cache$key.meta;
          var state = _cache$key.state;

          onNode(state, meta, node);
        });

        cache = null;
      },
      writable: true,
      configurable: true
    },
    on: {
      value: function on(metaKey, metaValue, onNode) {
        Iso.bootstrap(function (state, meta, node) {
          if (meta[metaKey] && meta[metaKey] === metaValue) {
            onNode(state, meta, node);
          }
        });
      },
      writable: true,
      configurable: true
    }
  }, {
    add: {
      value: function add(html) {
        var _state = arguments[1] === undefined ? {} : arguments[1];

        var _meta = arguments[2] === undefined ? {} : arguments[2];

        var state = escapeTextForBrowser(JSON.stringify(_state));
        var meta = escapeTextForBrowser(JSON.stringify(_meta));
        this.html.push(html);
        this.data.push({ state: state, meta: meta });
        return this;
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var markup = this.html.reduce(function (markup, html, i) {
          return markup + ("<div class=\"___iso-html___\" data-key=\"" + i + "\">" + html + "</div>");
        }, "");

        var data = this.data.reduce(function (nodes, data, i) {
          var state = data.state;
          var meta = data.meta;

          return nodes + ("<div class=\"___iso-state___\" data-key=\"" + i + "\" data-meta=\"" + meta + "\" data-state=\"" + state + "\"></div>");
        }, "");

        return "\n" + markup + "\n" + data + "\n";
      },
      writable: true,
      configurable: true
    }
  });

  return Iso;
})();

module.exports = Iso;

