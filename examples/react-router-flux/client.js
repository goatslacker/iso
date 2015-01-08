var iso = require('../../')

var Router = require('react-router')
var React = require('react')

var routes = require('./src/routes.jsx')

var alt = require('./src/alt')

iso.client(function (state, container) {
  alt.bootstrap(state)

  Router.run(routes, Router.HistoryLocation, function (Handler) {
    var node = React.createElement(Handler)
    React.render(node, container)
  })
})
