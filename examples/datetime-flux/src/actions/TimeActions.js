var alt = require('../alt')

class TimeActions {
  constructor() {
    this.generateActions('updateTime', 'setAsync')
  }

  setAsync(n) {
    setTimeout(function () {
      this.dispatch(n)
    }.bind(this), 500)
  }
}

module.exports = alt.createActions(TimeActions)
