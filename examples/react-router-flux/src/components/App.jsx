var React = require('react')
var { RouteHandler, Link } = require('react-router')

var App = React.createClass({
  render() {
    return (
      <html className="iso-root" data-key>
        <head></head>
        <body>
          <Link to='hello'>Say hi</Link>
          <br />
          <Link to='time'>What time is it?</Link>
          <br />
          <RouteHandler {...this.props} />
        </body>
        <span dangerouslySetInnerHTML={{__html: '<!--___iso-state___-->'}} />
      </html>
    )
  }
})

module.exports = App
