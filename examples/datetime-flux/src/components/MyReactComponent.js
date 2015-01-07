var React = require('react')

var TimeActions = require('../actions/TimeActions')
var TimeStore = require('../stores/TimeStore')

var MyReactComponent = React.createClass({
  getInitialState: function () {
    return TimeStore.getState()
  },

  componentDidMount: function () {
    TimeStore.listen(this.onChange)
  },

  onChange: function () {
    this.setState(this.getInitialState())
  },

  updateTime: function () {
    TimeActions.updateTime(Date.now())
  },

  render: function () {
    return React.DOM.div({
      onClick: this.updateTime
    }, [
      React.DOM.div({ key: 1 }, 'Click me to update the time: ' + this.state.time),
      React.DOM.div({ key: 2 }, 'Unique ID? ' + this.state.asyncValue)
    ])
  }
})

module.exports = MyReactComponent
