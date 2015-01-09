require('node-jsx').install({ extension: '.jsx', harmony: true })

var Router = require('react-router')
var React = require('react')
var express = require('express')
var iso = require('../../')

var routes = require('./src/routes')
var alt = require('./src/alt')

var app = express()

// This is express boilerplate to make our bundled JS available as well
// as our template
var path = require('path')
app.set('view engine', 'jade')
app.set('views', path.join(__dirname, 'templates'))
app.use('/js', express.static(path.join(__dirname, 'js')))

// Simulate an asynchronous event that takes 200ms to complete
function getNameFromServer(cb) {
  setTimeout(function () {
    cb('Josh')
  }, 200)
}

// Prior to running react-router we setup this route in order to handle data
// fetching. We can pass data fetched via express' locals.
app.get('/hello', function (req, res, next) {
  getNameFromServer(function (name) {
    res.locals.data = {
      HelloStore: { name: name }
    }
    next()
  })
})

// This is where the magic happens, we take the locals data we have already
// fetched and seed our stores with data.
// Next we use react-router to run the URL that is provided in routes.jsx
// Finally we use iso in order to render this content so it picks back up
// on the client side and bootstraps the stores.
app.use(function (req, res) {
  alt.bootstrap(JSON.stringify(res.locals.data || {}))

  Router.run(routes, req.url, function (Handler) {
    var content = React.renderToString(React.createElement(Handler))
    res.render('layout', {
      html: iso.server(content, res.locals.data)
    })
  })
})

app.listen(8080)
