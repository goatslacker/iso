!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.iso=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";

var escapeTextForBrowser = _dereq_("react/lib/escapeTextForBrowser");

var each = function (x, f) {
  return Array.prototype.forEach.call(x, f);
};
var parse = function (node, x) {
  return JSON.parse(node.getAttribute(x));
};

var Iso = (function () {
  var Iso = function Iso() {
    this.html = [];
    this.data = [];
  };

  Iso.prototype.add = function (html, _state, _meta) {
    if (_state === undefined) _state = {};
    if (_meta === undefined) _meta = {};
    var state = escapeTextForBrowser(JSON.stringify(_state));
    var meta = escapeTextForBrowser(JSON.stringify(_meta));
    this.html.push(html);
    this.data.push({ state: state, meta: meta });
    return this;
  };

  Iso.prototype.render = function () {
    var markup = this.html.reduce(function (markup, html, i) {
      return markup + ("<div class=\"___iso-html___\" data-key=\"" + i + "\">" + html + "</div>");
    }, "");

    var data = this.data.reduce(function (nodes, data, i) {
      var state = data.state;
      var meta = data.meta;
      return nodes + ("<div class=\"___iso-state___\" data-key=\"" + i + "\" data-meta=\"" + meta + "\" data-state=\"" + state + "\"></div>");
    }, "");

    return markup + data;
  };

  Iso.render = function (html, state, meta) {
    if (state === undefined) state = {};
    if (meta === undefined) meta = {};
    return new Iso().add(html, state, meta).render();
  };

  Iso.bootstrap = function (onNode) {
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
      var meta = cache[key].meta;
      var state = cache[key].state;
      onNode(state, meta, node);
    });

    cache = null;
  };

  return Iso;
})();

module.exports = Iso;

},{"react/lib/escapeTextForBrowser":2}],2:[function(_dereq_,module,exports){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule escapeTextForBrowser
 * @typechecks static-only
 */

"use strict";

var ESCAPE_LOOKUP = {
  "&": "&amp;",
  ">": "&gt;",
  "<": "&lt;",
  "\"": "&quot;",
  "'": "&#x27;"
};

var ESCAPE_REGEX = /[&><"']/g;

function escaper(match) {
  return ESCAPE_LOOKUP[match];
}

/**
 * Escapes text to prevent scripting attacks.
 *
 * @param {*} text Text value to escape.
 * @return {string} An escaped string.
 */
function escapeTextForBrowser(text) {
  return ('' + text).replace(ESCAPE_REGEX, escaper);
}

module.exports = escapeTextForBrowser;

},{}]},{},[1])(1)
});
