var React = require('react')
var alt = require('../alt')
var IsomorphicMixin = require('alt/mixins/IsomorphicMixin')

var MyReactComponent = require('./MyReactComponent')

module.exports = React.createClass({
  mixins: [IsomorphicMixin.create(alt)],

  render: function () {
    return React.createElement(
      'div',
      null,
      React.createElement(MyReactComponent)
    )
  }
})
