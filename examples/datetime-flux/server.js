let express = require('express')

let React = require('react')
let AltIsoElement = require('./src/components/AltIsoElement')

let Iso = require('../../')
let app = express()

// This is express boilerplate to make our bundled JS available as well
// as our template
let path = require('path')
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
// seed the stores with data, and render the html using iso and jade.
app.get('/', function (req, res) {
  getTimeFromServer(function (time) {
    let rand = Math.random()

    let data = {
      TimeStore: {
        time: time,
        asyncValue: rand
      }
    }

    let node = React.createElement(AltIsoElement, {
      altStores: data
    })

    res.render('layout', {
      html: Iso.render(React.renderToString(node), { altStores: data }, { react: true })
    })
  })
})

app.listen(8080)
