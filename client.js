var React = require('react')

function iso(node, component) {
  React.renderComponent(component.call(component, window.iso), node)
}

module.exports = iso
