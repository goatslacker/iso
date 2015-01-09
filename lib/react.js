module.exports = {
  server: server,
  client: client
}

var iso = require('../')
var React = require('react')

function server(components) {
  components = components || {}

  return function (name, props) {
    var component = components[name]
    if (!component) {
      return null
    }
    var element = React.createElement(component, props)
    var markup = React.renderToStaticMarkup(element)
    return iso.server(markup, props, { name: name })
  }
}

function client(components) {
  iso.client(function (props, meta, container) {
    var name = meta.name

    var component = components[name]

    if (!component) {
      return
    }

    var element = React.createElement(component, props)
    React.render(element, container)
  })
}
