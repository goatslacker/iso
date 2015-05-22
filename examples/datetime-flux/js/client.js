let Iso = require('../../../')
let React = require('react')
let AltIsoElement = require('../src/components/AltIsoElement')

Iso.on('react', true, function (props, _, node) {
  React.render(React.createElement(AltIsoElement, props), node)
})
