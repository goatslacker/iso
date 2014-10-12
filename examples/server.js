// all that is required to start rendering react on the server side
var express = require('express')
var iso = require('../server')
var jade = require('jade')

var app = express()
iso(app)

// a custom react component we will render on the server and client
var MyReactComponent = require('./MyReactComponent')

// needed so we can render templates, you may use your preferred view engine
var path = require('path')
app.set('view engine', 'jade')
app.set('views', path.join(__dirname, 'templates'))
app.use('/js', express.static(path.join(__dirname, 'js')))

// a sample route
app.get('/', function (req, res) {
  // the special 'ship' method that iso added
  res.ship('layout', MyReactComponent, {
    serverTime: Date.now()
  })
})

app.listen(8080)
