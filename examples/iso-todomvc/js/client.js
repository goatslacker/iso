var Iso = require('../../../')
var React = require('react')
var TodoApp = require('./components/TodoApp.react')

var alt = require('./alt')

Iso.bootstrap(function (state, _, container) {
  alt.bootstrap(JSON.stringify(state))
  React.render(React.createElement(TodoApp), container)
})
