var express = require('express')
var components = require('./components')

var iso = require('../index').server(components)
var app = express()

var path = require('path')
app.set('view engine', 'jade')
app.set('views', path.join(__dirname, 'templates'))
app.use('/js', express.static(path.join(__dirname, 'js')))

app.get('/', function (req, res) {
  res.render('layout', {
    html: iso('MyReactComponent', {
      serverTime: Date.now()
    })
  })
})

app.listen(8080)
