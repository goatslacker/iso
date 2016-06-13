var React = require('react')
var { Route } = require('react-router')

var App = require('./components/App.jsx')
var Hello = require('./components/Hello.jsx')
var Time = require('./components/Time.jsx')

var routes = (
  <Route path='/' component={App}>
    <Route path='hello(/:name)' component={Hello} />
    <Route path='time' component={Time} />
  </Route>
)

module.exports = routes
