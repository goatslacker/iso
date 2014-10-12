var React = require('react')

var MyReactComponent = React.createClass({
  getInitialState: function () {
    return {
      time: this.props.serverTime
    }
  },

  updateTime: function () {
    this.setState({
      time: Date.now()
    })
  },

  render: function () {
    return React.DOM.div({
      onClick: this.updateTime
    }, this.state.time)
  }
})

module.exports = MyReactComponent
