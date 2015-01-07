var alt = require('../alt')

function TimeActions() {
  this.generateActions('updateTime', 'setAsync')
}

TimeActions.prototype.setAsync = function (n) {
  setTimeout(function () {
    this.dispatch(n)
  }.bind(this), 500)
}

module.exports = alt.createActions(TimeActions)
