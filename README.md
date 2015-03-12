# Iso

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/goatslacker/iso?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

> A helper class that allows you to hand off data from server to client.

Iso is a class. You instantiate it, add your markup, add some data to go with it, and render it.
On the clientside Iso picks up what you sent down and gives it back to you so you can bring your content to life.

## API

### Iso#add(html: string, data: ?object, meta: ?object): this

You provide the markup to `add` and some data you wish to pass down, and iso will save it internally.

### Iso#render(): string

Once you're ready to collect your html you call `render` and a string will be returned to you.

### Iso.bootstrap(onNode: function)

This function takes a callback which is then called with the data, the meta, and a reference to the container node on the DOM.

## Usage

Sample:

```js
// server.js
var iso = new Iso()

request.get('/', function (req, res) {
  iso.add('<div>Hello, World!</div>', { someSampleData: 'Hello, World!' }, { id: 'hello' })
  res.render(iso.render())
})

// client.js
Iso.bootstrap(function (state, meta, node) {
  // Now I do something with this data, perhaps run it through some library and then append the result to node?
})
```

## Examples

## [datetime-flux](examples/datetime-flux)

Datetime-flux is a minimal example showing how to render a React component on the server and then picking it back up on the client using flux implementation [alt](https://github.com/goatslacker/alt). It seeds the stores with initial data on the server and then bootstraps them back on the client. It includes a click handler which updates the time, this click handler is initialized on the client.

## [iso-todomvc](examples/iso-todomvc)

Iso-todomvc is todomvc written to work with [alt](https://github.com/goatslacker/alt). It is mostly the same code as [flux's todomvc](https://github.com/facebook/flux/tree/master/examples/flux-todomvc) and only a couple of lines in the view layer have changed. The bulk of the changes were in the store and actions, and the removal of the dispatcher and the constants since [alt](https://github.com/goatslacker/alt) handles those two for you.

## [react-router-flux](examples/react-router-flux)

React-router-flux is a minimal example showing how to use [react-router](https://github.com/rackt/react-router) and [alt](https://github.com/goatslacker/alt) in order to build isomorphic applications. The [client](examples/react-router-flux/client.js) file which handles the routing of components and the bootstrapping of stores is only 17 LOC.

## License

[MIT](http://josh.mit-license.org/)
