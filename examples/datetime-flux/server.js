var express = require('express')

var components = require('./components')

var iso = require('../../lib/react').server(components)
var app = express()

var path = require('path')
app.set('view engine', 'jade')
app.set('views', path.join(__dirname, 'templates'))
app.use('/js', express.static(path.join(__dirname, 'js')))


function getTimeFromServer(cb) {
  setTimeout(function () {
    cb(Date.now())
  }, 250)
}


app.get('/', function (req, res) {
  getTimeFromServer(function (time) {
    var rand = Math.random()

    var data = {
      TimeStore: {
        time: time,
        asyncValue: rand
      }
    }

    res.render('layout', {
      html: iso('AltIsomorphicElement', { altStores: data })
    })
  })
})

app.listen(8080)
