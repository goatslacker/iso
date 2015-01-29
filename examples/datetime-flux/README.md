# datetime-flux-iso

> Isomorphic react application using flux.

## Running This

```sh
npm install; npm run build; npm start
```

Then open your browser to `localhost:8080` and enjoy.

## What

This is a simple ismorphic application which renders the current time and a random number sent from the server.

The purpose of this application is to show how an isomorphic react application using flux could work with [iso](https://github.com/goatslacker/iso).

One of the challenges with using flux isomorphically is how flux is structured. In flux, since the data only flows one way, all data changes start via the action triggers. This presents an issue on the server since actions are meant to be fire-and-forget and you can only dispatch one at a time. What this means is that an action has no callback and it's difficult to set off a chain of actions and know when they all completed.

Store's themselves have listeners and you could theoretically use a store's listener along with `waitFor` to get close, but the React components usually rely on these store listeners in order to set their internal state which kicks off DOM diffing, thus making them unsuitable for usage on the server side.

An isomorphic flux implementation could theoretically add callbacks to actions, but that goes against the spirit of flux, and doesn't look very sexy.

```js
TimeAction.updateTime(Date.now(), function () {
  // do next thing...
})
```

Another challenge is that in flux stores are singletons. Pairing singleton data stores with concurrent requests is a recipe for disaster. One way of solving this dilemma is to create instances of these stores, but then the trade-off is that you're passing these instances around each component so they have a reference to the data and can use the appropriate store. This is both fragile and cumbersome.

```js
class App extends React.Component {
  render() {
    return <TimeComponent fluxInstance={fluxImplementation} />
  }
}

class TimeComponent extends React.Component {
  constructor(props) {
    this.state = props.fluxInstance.getStore('TimeStore').getState()
  }
  
  render() {
    return <div>{this.state.time}</div>
  }
}
```

Fortunately, flux's stores work very well when they are synchronous. This means we can seed the stores with data, render our application, and then revert the stores to their previous virgin state. [Alt](https://github.com/goatslacker/alt) is a flux implementation that facilitates this.

alt uses a method called `bootstrap` which seeds the stores with data on the server, and then initializes them when the application starts on the client. Turning `TimeComponent` into something that looks a lot like plain flux.

```js
// yay, references and plain old require!
var TimeStore = require('../stores/TimeStore')

class TimeComponent extends React.Component {
  constructor() {
    this.state = TimeStore.getState()
  }
  
  render() {
    return <div>{this.state.time}</div>
  }
}
```

Actions then are meant to only be used on the client-side once the application starts. On the server you can perform all the necessary data gathering, and once complete you seed the data.

In this example, the random number sent from the server is in order to test flux's singleton stores. Two concurrent requests won't interfere with each other and the store's data will never collide. The time component allows you to click in order to change the time via React's onClick, this proves that the application was initialized correctly on the client.

## License

[MIT](http://josh.mit-license.org/)
