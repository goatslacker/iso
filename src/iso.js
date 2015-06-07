const escapeTextForBrowser = require('escape-html')

const each = (x, f) => Array.prototype.forEach.call(x, f)
const parse = (node, x) => JSON.parse(node.getAttribute(x))

export default class Iso {
  constructor(config) {
    this.markupClassName = config.markupClassName || '___iso-html___'
    this.markupElement = config.markupElement || 'div'
    this.dataClassName = config.dataClassName || '___iso-state___'
    this.dataElement = config.dataElement || 'div'
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
      return markup + `<${this.markupElement} class="${this.markupClassName}" data-key="${i}">${html}</${this.markupElement}>`
    }, '')

    const data = this.data.reduce((nodes, data, i) => {
      const { state, meta } = data
      return nodes + `<${this.dataElement} class="${this.dataClassName}" data-key="${i}" data-meta="${meta}" data-state="${state}"></${this.dataElement}>`
    }, '')

    return (
`
${markup}
${data}
`
    )
  }

  static render(config = {markupClassName: '___iso-html___', markupElement: 'div', dataClassName: '___iso-state___', dataElement: 'div'}, html, state = {}, meta = {}) {
    return new Iso(config).add(html, state, meta).render()
  }

  static bootstrap(onNode, markupClassName='___iso-html___', dataClassName='___iso-state___') {

    if (!onNode) {
      return
    }

    const nodes = document.querySelectorAll(`.${markupClassName}`)
    const state = document.querySelectorAll(`.${dataClassName}`)

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
