var alt = require('../alt')
var TimeActions = require('../actions/TimeActions')

class TimeStore {
  constructor() {
    this.bindActions(TimeActions)
    this.time = 0
    this.asyncValue = undefined
  }

  onUpdateTime(time) {
    this.time = time
  }

  onSetAsync(n) {
    this.asyncValue = n
  }
}

module.exports = alt.createStore(TimeStore, 'TimeStore')
