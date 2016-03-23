var Iso = require('../../../')

var ReactRouter = require('react-router')
var React = require('react')
var ReactDom = require('react-dom')

var createBrowserHistory = require('history/lib/createBrowserHistory')

var routes = require('../src/routes.jsx')

var alt = require('../src/alt')

var history = createBrowserHistory()

// Once we bootstrap the stores, we run react-router using
// Router.HistoryLocation
// the element is created and we just render it into the container
// and our application is now live
Iso.bootstrap(function (state, container) {
  alt.bootstrap(state)

  var node = React.createElement(ReactRouter.Router, {history: history}, routes)
  ReactDom.render(node, container)
})
