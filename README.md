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

    // a custom react component we will render on the server and client
    var components = {
      'MyReactComponent': require('./MyReactComponent')
    }
    var iso = require('iso').server(components)

    var app = express()

    // a sample route
    app.get('/', function (req, res) {
      var html = iso('MyReactComponent', {
        serverTime: Date.now()
      })
      res.render('layout', {
        html: html
      })
    })

`client.js`

    var iso = require('../index')
    var components = {
      'MyReactComponent': require('./MyReactComponent')
    }
    iso.client(components)

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

`iso.server` wraps the components and returns a function. This function takes two parameters
the name/key of the component you want to use and the props you want to send to it.
The function then returns the html markup that should be sent down to the client.

`iso.client` is a function that takes your components and then proceeds to find all
"iso" rendered elements in your html. Those elements are then bootstrapped with the data
that was passed in from the server and it picks up right where it left off giving you
a live, dynamic application with no fuss.

You can see a full working demo application in the `examples/` directory.

# License

MIT
