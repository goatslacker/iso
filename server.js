var React = require('react/addons')
var expressState = require('express-state')
var overload = require('superoverload')

function iso(app, view, routes) {
  if (!app) {
    throw new TypeError('Must pass in an express application')
  }
  routes = routes || {}
  view = view || ''

  app.set('state namespace', 'iso')

  expressState.extend(app)

  app.response.ship = overload(
    // res.ship({ foo: true })
    ['object'],
    function (data) {
      doShip.call(this, view, null, data)
    },
    // res.ship('layout', { foo: true })
    ['string', 'object'],
    function (view, data) {
      doShip.call(this, view, null, data)
    },
    // res.ship(Foo, { foo: true })
    ['function', 'object'],
    function (component, data) {
      doShip.call(this, view, component, data)
    },
    // res.ship('layout', Foo, { foo: true })
    ['string', 'function', 'object'],
    function (view, component, data) {
      doShip.call(this, view, component, data)
    }
  )

  function doShip(view, component, data) {
    var route = this.req.route.path
    component = component || routes[route]
    if (!component) {
      return this.status(404).end()
    }

    this.expose(data)

    this.render(view, {
      html: React.renderComponentToString(component(data))
    })
  }
}

module.exports = iso
