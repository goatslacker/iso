module.exports = {
  server: server,
  client: client
}

var React = require('react')

function server(components) {
  components = components || {}

  return function (name, props) {
    var component = components[name]
    if (!component) {
      return this.status(404).end()
    }

    var markup = React.renderToStaticMarkup(React.createElement('div', {
      'className': 'iso-container',
      'data-component': name,
      'data-props': JSON.stringify(props)
    }, '{{data}}'))
    var element = React.createElement(component, props)
    var html = markup.replace('{{data}}', React.renderToString(element))

    return html
  }
}

function client(components) {
  Array.prototype.forEach.call(document.querySelectorAll('.iso-container'), function (node) {
    var name = node.dataset.component
    var props = JSON.parse(node.dataset.props)
    var component = components[name]

    if (!component) {
      return
    }

    var element = React.createElement(component, props)

    React.render(element, node)
  })
}
