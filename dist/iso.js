"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var escapeTextForBrowser = require("escape-html");

var each = function (x, f) {
  return Array.prototype.forEach.call(x, f);
};
var parse = function (node, x) {
  return JSON.parse(node.getAttribute(x));
};

var Iso = (function () {
  function Iso(config) {
    _classCallCheck(this, Iso);

    this.markupClassName = config.markupClassName || "___iso-html___";
    this.markupElement = config.markupElement || "div";
    this.dataClassName = config.dataClassName || "___iso-state___";
    this.dataElement = config.dataElement || "div";
    this.html = [];
    this.data = [];
  }

  _createClass(Iso, {
    add: {
      value: function add(html) {
        var _state = arguments[1] === undefined ? {} : arguments[1];

        var _meta = arguments[2] === undefined ? {} : arguments[2];

        var state = escapeTextForBrowser(JSON.stringify(_state));
        var meta = escapeTextForBrowser(JSON.stringify(_meta));
        this.html.push(html);
        this.data.push({ state: state, meta: meta });
        return this;
      }
    },
    render: {
      value: function render() {
        var _this = this;

        var markup = this.html.reduce(function (markup, html, i) {
          return markup + ("<" + _this.markupElement + " class=\"" + _this.markupClassName + "\" data-key=\"" + i + "\">" + html + "</" + _this.markupElement + ">");
        }, "");

        var data = this.data.reduce(function (nodes, data, i) {
          var state = data.state;
          var meta = data.meta;

          return nodes + ("<" + _this.dataElement + " class=\"" + _this.dataClassName + "\" data-key=\"" + i + "\" data-meta=\"" + meta + "\" data-state=\"" + state + "\"></" + _this.dataElement + ">");
        }, "");

        return "\n" + markup + "\n" + data + "\n";
      }
    }
  }, {
    render: {
      value: function render(_x, html) {
        var config = arguments[0] === undefined ? { markupClassName: "___iso-html___", markupElement: "div", dataClassName: "___iso-state___", dataElement: "div" } : arguments[0];
        var state = arguments[2] === undefined ? {} : arguments[2];
        var meta = arguments[3] === undefined ? {} : arguments[3];

        return new Iso(config).add(html, state, meta).render();
      }
    },
    bootstrap: {
      value: function bootstrap(onNode) {
        if (!onNode) {
          return;
        }

        var nodes = document.querySelectorAll("." + this.markupClassName);
        var state = document.querySelectorAll("." + this.dataClassName);

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
      }
    },
    on: {
      value: function on(metaKey, metaValue, onNode) {
        Iso.bootstrap(function (state, meta, node) {
          if (meta[metaKey] && meta[metaKey] === metaValue) {
            onNode(state, meta, node);
          }
        });
      }
    }
  });

  return Iso;
})();

module.exports = Iso;

