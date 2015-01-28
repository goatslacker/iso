let React = require('react')

let TimeActions = require('../actions/TimeActions')
let TimeStore = require('../stores/TimeStore')

class MyReactComponent extends React.Component {
  constructor() {
    this.state = TimeStore.getState()
  }

  componentDidMount() {
    TimeStore.listen(() => this.setState(TimeStore.getState()))
  }

  componentWillUnmount() {
    TimeStore.unlisten(() => this.setState(TimeStore.getState()))
  }

  updateTime() {
    TimeActions.updateTime(Date.now())
  }

  render() {
    return (
      <div onClick={this.updateTime}>
        <div>{`Click me to update the time: ${this.state.time}`}</div>
        <div>{`This is a unique ID: ${this.state.asyncValue}`}</div>
      </div>
    )
  }
}

module.exports = MyReactComponent
