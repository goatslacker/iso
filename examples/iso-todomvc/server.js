require('node-jsx').install({ harmony: true })

var express = require('express')
var React = require('react')

var Iso = require('../../')
var alt = require('./js/alt')
var app = express()

var path = require('path')
app.set('view engine', 'jade')
app.set('views', path.join(__dirname, 'templates'))
app.use('/js', express.static(path.join(__dirname, 'js')))
app.use('/css', express.static(path.join(__dirname, 'css')))
app.use('/todomvc-common', express.static(path.join(__dirname, 'todomvc-common')))

var TodoApp = require('./js/components/TodoApp.react')

// Bootstrap our flux stores, create the markup, send it to iso.
app.get('/', function (req, res) {
  fictionalDatabaseWithTodos(function (todos) {
    var data = { TodoStore: { todos: todos } }

    alt.bootstrap(JSON.stringify(data))

    var markup = React.renderToStaticMarkup(React.createElement(TodoApp))
    res.render('index', {
      html: Iso.render(markup, data)
    })
  })
})

app.listen(8080)


// Load a bunch of fake todos.
// Disclaimer: checking off boxes on the frontend doesn't affect this :(
function fictionalDatabaseWithTodos(cb) {
  var tasks = [
    ['Write readme'],
    ['Create react plugin', true],
    ['Write blog post'],
    ['Add the flux-todomvc example', true],
    ['Add the flux-chat example'],
    ['Release new pakage on npm']
  ]

  var todos = tasks.reduce(function (obj, args) {
    var todo = createTodo.apply(null, args)
    obj[todo.id] = todo
    return obj
  }, {})

  setTimeout(function () {
    cb(todos)
  }, 100)
}

function createTodo(text, complete) {
  var id = (Date.now() + Math.floor(Math.random() * 999999)).toString(36)
  return {
    id: id,
    complete: complete || false,
    text: text
  }
}
