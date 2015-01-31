var escapeTextForBrowser = require('react/lib/escapeTextForBrowser')

let each = (x, f) => Array.prototype.forEach.call(x, f)
let parse = (node, x) => JSON.parse(node.getAttribute(x))

class Iso {
  constructor() {
    this.html = []
    this.data = []
  }

  add(html, _state = {}, _meta = {}) {
    var state = escapeTextForBrowser(JSON.stringify(_state))
    var meta = escapeTextForBrowser(JSON.stringify(_meta))
    this.html.push(html)
    this.data.push({ state, meta })
    return this
  }

  render() {
    var markup = this.html.reduce((markup, html, i) => {
      return markup + `<div class="___iso-html___" data-key="${i}">${html}</div>`
    }, '')

    var data = this.data.reduce((nodes, data, i) => {
      var { state, meta } = data
      return nodes + `<div class="___iso-state___" data-key="${i}" data-meta="${meta}" data-state="${state}"></div>`
    }, '')

    return (
`
${markup}
${data}
`
    )
  }

  static render(html, state = {}, meta = {}) {
    return new Iso().add(html, state, meta).render()
  }

  static bootstrap(onNode) {
    if (!onNode) {
      return
    }

    var nodes = document.querySelectorAll('.___iso-html___')
    var state = document.querySelectorAll('.___iso-state___')

    var cache = {}

    each(state, (node) => {
      var meta = parse(node, 'data-meta')
      var state = parse(node, 'data-state')
      cache[node.getAttribute('data-key')] = { meta, state }
    })

    each(nodes, (node) => {
      var key = node.getAttribute('data-key')
      if (!cache[key]) {
        return
      }
      var { meta, state } = cache[key]
      onNode(state, meta, node)
    })

    cache = null
  }

  static on(metaKey, metaValue, onNode) {
    Iso.bootstrap((state, meta, node) => {
      if (meta[metaKey] && meta[metaKey] === metaValue) {
        onNode(state, meta, node)
      }
    })
  }
}

module.exports = Iso
