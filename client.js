var React = require('react')

function iso(node, component) {
  React.render(React.createElement(component, window.iso), node)
}

module.exports = iso
