var React = require('react')

var TimeStore = require('../stores/TimeStore')

var App = React.createClass({
  getInitialState() {
    return TimeStore.getState()
  },

  render() {
    return <div>{`The time is now: ${this.state.time}`}</div>
  }
})

module.exports = App
