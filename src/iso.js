const escapeTextForBrowser = require('escape-html')

const each = (x, f) => Array.prototype.forEach.call(x, f)
const parse = (node, x) => JSON.parse(node.getAttribute(x))

export default class Iso {
  constructor() {
    this.html = []
    this.data = []
  }

  add(html, _state = {}, _meta = {}) {
    const state = escapeTextForBrowser(JSON.stringify(_state))
    const meta = escapeTextForBrowser(JSON.stringify(_meta))
    this.html.push(html)
    this.data.push({ state, meta })
    return this
  }

  render() {
    const markup = this.html.reduce((markup, html, i) => {
      return markup + `<div class="___iso-html___" data-key="${i}">${html}</div>`
    }, '')

    const data = this.data.reduce((nodes, data, i) => {
      const { state, meta } = data
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

    const nodes = document.querySelectorAll('.___iso-html___')
    const state = document.querySelectorAll('.___iso-state___')

    let cache = {}

    each(state, (node) => {
      const meta = parse(node, 'data-meta')
      const state = parse(node, 'data-state')
      cache[node.getAttribute('data-key')] = { meta, state }
    })

    each(nodes, (node) => {
      const key = node.getAttribute('data-key')
      if (!cache[key]) {
        return
      }
      const { meta, state } = cache[key]
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
