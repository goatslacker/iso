var Iso = require('../../../')

var Router = require('react-router')
var React = require('react')

var routes = require('../src/routes.jsx')

var alt = require('../src/alt')

// Once we bootstrap the stores, we run react-router using
// Router.HistoryLocation
// the element is created and we just render it into the container
// and our application is now live
Iso.bootstrap(function (state, _, container) {
  alt.bootstrap(state)

  Router.run(routes, Router.HistoryLocation, function (Handler) {
    var node = React.createElement(Handler)
    React.render(node, container)
  })
})
