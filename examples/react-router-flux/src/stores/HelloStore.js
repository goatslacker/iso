var alt = require('../alt')

function HelloStore() {
  this.name = 'Nobody'
}

module.exports = alt.createStore(HelloStore, 'HelloStore')
