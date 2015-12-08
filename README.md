# Iso

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/goatslacker/iso?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

> A helper class that allows you to hand off data from server to client.

Iso is a class. You instantiate it, add your markup, add some data to go with it, and render it.
On the clientside Iso picks up what you sent down and gives it back to you so you can bring your content to life.

## API

### constructor(name = '', renderer = defaultRenderer)

The constructor takes in a `name` which is then used to build up a unique key for every added html,
and a `renderer` which is used to determine how the data is prestented to the client. By default
the renderer renders the markup into a div and the data into a script tag.

### Iso#add(html: string, data: ?object): this

You provide the markup to `add` and some data you wish to pass down, and iso will save it internally.

### Iso#render(): string

Once you're ready to collect your html you call `render` and a string will be returned to you.

### Iso.bootstrap(onNode: function, selector: function)

`onNode` is a function that is called with the data, and a reference to the container node on the
DOM. The `selector` is a function that you can configure to find the state and nodes on the DOM
and return them.

The returned payload from `selector` should be an Object which contains the state and node pair
for each unique key.

```js
{
  "foobar": {
    state: { name: "foo" },
    node: DOMNode,
  },
}
```

## Usage

Sample:

```js
// server.js
const iso = new Iso()

request.get('/', function (req, res) {
  iso.add('<div>Hello, World!</div>', { someSampleData: 'Hello, World!' })
  res.render(iso.render())
})

// client.js
Iso.bootstrap(function (state, node) {
  // Now I do something with this data, perhaps run it through some library and then append
  // the result to node?
})
```

## License

[MIT](http://josh.mit-license.org/)
