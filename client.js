var React = require('react')
var Router = require('director').Router

function isos(routes) {
  var clientRoutes = Object.keys(routes).reduce(function (x, route) {
    var component = routes[route]
    x[route] = function () {
      React.renderComponent(
        component.call(component, window.isos),
        document.getElementById('app')
      )
    }
    return x
  }, {})

  var router = Router(clientRoutes).configure({
    html5history: true
  })
  router.init()
}

module.exports = isos
