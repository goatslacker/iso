module.exports = {
  server: server,
  client: client
}

var Iso = require('../')
var React = require('react')

function server(components) {
  components = components || {}

  return function (name, props) {
    var component = components[name]
    if (!component) {
      return null
    }
    var element = React.createElement(component, props)
    var markup = React.renderToString(element)
    return Iso.render(markup, props, { name: name })
  }
}

function client(components) {
  Iso.bootstrap(function (props, meta, container) {
    var name = meta.name

    var component = components[name]

    if (!component) {
      return
    }

    var element = React.createElement(component, props)
    React.render(element, container)
  })
}
