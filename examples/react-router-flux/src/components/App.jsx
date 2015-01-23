var React = require('react')
var { RouteHandler, Navigation } = require('react-router')

var App = React.createClass({
  mixins: [Navigation],

  hi() {
    this.transitionTo('hello')
  },

  time() {
    this.transitionTo('time')
  },

  render() {
    return (
      <div>
        <a href="#" onClick={this.hi}>Say hi</a>
        <br />
        <a href="#" onClick={this.time}>What time is it?</a>
        <br />
        <RouteHandler {...this.props} />
      </div>
    )
  }
})

module.exports = App
