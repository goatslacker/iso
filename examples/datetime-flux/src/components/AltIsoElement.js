let React = require('react')
let alt = require('../alt')
let IsomorphicMixin = require('alt/mixins/IsomorphicMixin')
let DateTimeComponent = require('./DateTimeComponent')

module.exports = React.createClass({
  
  mixins: [IsomorphicMixin.create(alt)],

  render: function () {
    return React.createElement(
      'div',
      null,
      React.createElement(DateTimeComponent)
    )
  }
})
