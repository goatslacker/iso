require('node-jsx').install({ extension: '.jsx', harmony: true })

var Router = require('react-router')
var React = require('react')
var express = require('express')
var iso = require('../../')

var routes = require('./src/routes')
var alt = require('./src/alt')

var app = express()

var path = require('path')
app.set('view engine', 'jade')
app.set('views', path.join(__dirname, 'templates'))
app.use('/js', express.static(path.join(__dirname, 'js')))

function getNameFromServer(cb) {
  setTimeout(function () {
    cb('Josh')
  }, 200)
}

app.get('/hello', function (req, res, next) {
  getNameFromServer(function (name) {
    res.locals.data = {
      HelloStore: { name: name }
    }
    next()
  })
})

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
