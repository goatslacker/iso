# iso

> Isomorphic JavaScript applications using React and express

[isomorphic javascript](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/)
is all the rage, and [React](https://facebook.github.io/react/) is a nifty way
to build JavaScript applications. Unfortunately getting your React application to render
on the server and then pick back up on the client takes quite a bit of work. **iso** is
meant to ease that pain with two very small helpers, one for the client and one for the server.

Iso is meant to work with [express](http://expressjs.com/) to render your application on the
server side. With iso you're not forced to use flux, MVC, or any other specific pattern.

# Install

  npm install iso

# Setting up

`server.js`

    // all that is required to start rendering react on the server side
    var express = require('express')
    var iso = require('iso/server')

    var app = express()
    iso(app)

    // a custom react component we will render on the server and client
    var MyReactComponent = require('./MyReactComponent')

    // a sample route
    app.get('/', function (req, res) {
      // the special 'ship' method that iso added
      res.ship('layout', MyReactComponent, {
        serverTime: Date.now()
      })
    })

`client.js`

    var iso = require('iso/client')
    var MyReactComponent = require('./MyReactComponent')
    iso(document.getElementById('app'), MyReactComponent)

`MyReactComponent.js`

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

`iso/server` extends your app to provide a method to the express response object.
The new method `ship` can be called several ways, its goal is to render the React
component on the server with the data provided and pass down the data to the client
side so it can be used to bootstrap the component.

`iso/client` renders a React component on the client side, it takes all the
data that has been passed in from the server side and bootstraps the component
on the client so it can pick up right where it left off.

You can see full working application code in the `examples/` directory.

# API

More about `response.ship`

ship can be called in various ways:

    // ship(Object)
    ship({
      serverTime: Date.now()
    })

    // ship(String, Object)
    ship('layout', {
      serverTime: Date.now()
    })

    // ship(Function, Object)
    ship(MyReactComponent, {
      serverTime: Date.now()
    })

    // ship(String, Function, Object)
    ship('layout', MyReactComponent, {
      serverTime: Date.now()
    })

If you plan on omitting the view or the react component then you'll need to provide
it to iso when extending your express application like so:

    // iso(ExpressApplication, String, Routes)
    iso(app, 'layout', {
      '/': MyReactComponent
    })

# License

MIT
