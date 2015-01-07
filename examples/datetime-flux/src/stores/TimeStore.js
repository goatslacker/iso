var alt = require('../alt')
var TimeActions = require('../actions/TimeActions')

function TimeStore() {
  this.bindActions(TimeActions)
  this.time = 0
  this.asyncValue = undefined
}

TimeStore.prototype.onUpdateTime = function (time) {
  this.time = time
}

TimeStore.prototype.onSetAsync = function (n) {
  this.asyncValue = n
}

TimeStore.prototype.getState = function () {
  return {
    time: this.time,
    foo: this.foo
  }
}

module.exports = alt.createStore(TimeStore, 'TimeStore')
