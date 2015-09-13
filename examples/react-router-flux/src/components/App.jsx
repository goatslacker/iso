var React = require('react')
var { RouteHandler, Link } = require('react-router')

var App = React.createClass({
  render() {
    return (
      <html className="___iso-html___">
        <head></head>
        <body>
          <Link to='hello'>Say hi</Link>
          <br />
          <Link to='time'>What time is it?</Link>
          <br />
          <RouteHandler {...this.props} />
        </body>
        <script src="/js/bundle.js"></script>
      </html>
    )
  }
})

module.exports = App
