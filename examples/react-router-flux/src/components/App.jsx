var React = require('react')
var Link  = require('react-router').Link

var App = React.createClass({
  render() {
    return (
      <div>
        <Link to='/hello'>Say hi</Link>
        <br />
        <Link to='/time'>What time is it?</Link>
        <br />
        {this.props.children}
      </div>
    )
  }
})

module.exports = App
