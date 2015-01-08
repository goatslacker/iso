var React = require('react')

var HelloStore = require('../stores/HelloStore')

var App = React.createClass({
  getInitialState() {
    return HelloStore.getState()
  },

  render() {
    return <div>{`Hello, ${this.state.name}`}</div>
  }
})

module.exports = App
