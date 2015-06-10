var Iso = require('../../../')
var React = require('react')
var AltIsomorphicElement = require('../src/components/AltIsomorphicElement')
var isoConfig = require('./../src/iso-config');

Iso.on('react', true, function (props, _, node) {
  React.render(React.createElement(AltIsomorphicElement, props), node)
}, isoConfig)
