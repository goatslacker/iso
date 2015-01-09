var React = require('react')
var Route = require('react-router').Route

var App = require('./components/App.jsx')
var Hello = require('./components/Hello.jsx')
var Time = require('./components/Time.jsx')

var routes = (
  <Route name='home' path='/' handler={App}>
    <Route name='hello' path='/hello/:name?' handler={Hello} />
    <Route name='time' path='/time' handler={Time} />
  </Route>
)

module.exports = routes
