let escapeTextForBrowser = require('react/lib/escapeTextForBrowser')

let each = (x, f) => Array.prototype.forEach.call(x, f)
let parse = (node, x) => JSON.parse(node.getAttribute(x))

class Iso {
  constructor() {
    this.html = []
    this.data = []
  }

  add(html, _state = {}, _meta = {}) {
    let state = escapeTextForBrowser(JSON.stringify(_state))
    let meta = escapeTextForBrowser(JSON.stringify(_meta))
    this.html.push(html)
    this.data.push({ state, meta })
    return this
  }

  render() {
    let markup = this.html.reduce((markup, html, i) => {
      return markup + `<div class="___iso-html___" data-key="${i}">${html}</div>`
    }, '')

    let data = this.data.reduce((nodes, data, i) => {
      let { state, meta } = data
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

    let nodes = document.querySelectorAll('.___iso-html___')
    let state = document.querySelectorAll('.___iso-state___')

    let cache = {}

    each(state, (node) => {
      let meta = parse(node, 'data-meta')
      let state = parse(node, 'data-state')
      cache[node.getAttribute('data-key')] = { meta, state }
    })

    each(nodes, (node) => {
      let key = node.getAttribute('data-key')
      if (!cache[key]) {
        return
      }
      let { meta, state } = cache[key]
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
