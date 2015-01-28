# Iso

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/goatslacker/iso?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

> Barebones isomorphic JavaScript helper

Iso only has two methods `client` and `server`

## API

### function server(html: string, data = {}: object, meta = {}: object): string

You provide the markup to `server` and some data you wish to pass down, and iso will return the markup needed to render.

### function client(cb: function): undefined

`client` only takes in a callback which calls back with the data, meta, and a reference the container node on the DOM.

## Usage

Iso is very barebones leaving some implementation details to the developer. There is a [React plugin included](lib/react.js) which makes creating isomorphic React components easier.

## Examples

## [datetime](examples/datetime)

Datetime is a minimal example showing how to render a React component on the server and then picking it back up on the client. It includes a click handler which updates the time, this click handler is initialized on the client. This example makes use of the [react plugin](lib/react.js).

## [datetime-flux](examples/datetime-flux)

Datetime-flux is the same datetime example but using flux implementation [alt](https://github.com/goatslacker/alt). It seeds the stores with initial data on the server and then bootstraps them back on the client. The interaction is the same, a click handler is included which changes the time onClick.

## [react-router-flux](examples/react-router-flux)

React-router-flux is a minimal example showing how to use [react-router](https://github.com/rackt/react-router) and [alt](https://github.com/goatslacker/alt) in order to build isomorphic applications. The [client](examples/react-router-flux/client.js) file which handles the routing of components and the bootstrapping of stores is only 17 LOC.

## License

[MIT](http://josh.mit-license.org/)
