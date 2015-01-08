var alt = require('../alt')

function TimeStore() {
  this.time = Date.now()
}

module.exports = alt.createStore(TimeStore, 'TimeStore')
