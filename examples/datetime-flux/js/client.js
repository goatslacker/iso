var Iso = require('../../../')
var React = require('react')
var AltIsomorphicElement = require('../src/components/AltIsomorphicElement')

Iso.on('react', true, function (props, _, node) {
  React.render(React.createElement(AltIsomorphicElement, props), node)
})
