var express = require('express')

var components = require('./components')

var iso = require('../../lib/react').server(components)
var app = express()

// This is express boilerplate to make our bundled JS available as well
// as our template
var path = require('path')
app.set('view engine', 'jade')
app.set('views', path.join(__dirname, 'templates'))
app.use('/js', express.static(path.join(__dirname, 'js')))


// Simulate an asynchronous event, lets say the time is stored in some storage
// system that takes 250ms to retrieve.
function getTimeFromServer(cb) {
  setTimeout(function () {
    cb(Date.now())
  }, 250)
}


// Our only simple route, we retrieve the time from our asynchronous system
// seed the stores with data
// and render the html using iso and jade.
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
