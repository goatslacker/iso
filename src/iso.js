const escapeTextForBrowser = require('escape-html')

const defaultConfiguration = {
  markupClassName: '___iso-html___',
  markupElement: 'div',
  dataClassName: '___iso-state___',
  dataElement: 'div',
  keyPrefix: '',
  entryHook: 'iso-root'
}
const each = (x, f) => Array.prototype.forEach.call(x, f)
const parse = (node, x) => JSON.parse(node.getAttribute(x))
const setDefaults = (config) => {
  config.entryHook = config.entryHook || defaultConfiguration.entryHook;
  config.markupClassName = config.markupClassName || defaultConfiguration.markupClassName
  config.markupElement = config.markupElement || defaultConfiguration.markupElement
  config.dataClassName = config.dataClassName || defaultConfiguration.dataClassName
  config.dataElement = config.dataElement || defaultConfiguration.dataElement
  config.keyPrefix = config.keyPrefix || defaultConfiguration.keyPrefix
}

export default class Iso {
  constructor(config = defaultConfiguration) {
    setDefaults(config)
    this.markupClassName = config.markupClassName
    this.markupElement = config.markupElement
    this.dataClassName = config.dataClassName
    this.dataElement = config.dataElement
    this.keyPrefix = config.keyPrefix
    this.entryHook = config.entryHook;
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

    const data = this.data.reduce((nodes, data, i) => {
      const { state, meta } = data
      return nodes + `<${this.dataElement} class="${this.dataClassName}" data-key="${this.keyPrefix}_${i}" data-meta="${meta}" data-state="${state}"></${this.dataElement}>`
    }, '')

    const markup = this.html.reduce((markup, html, i) => {
      if (this.entryHook) {
        var isoHtml = html.replace(this.entryHook, this.markupClassName)
          .replace('data-key', `data-key="${this.keyPrefix}_${i}"`)
          .replace('<!--___iso-state___-->', data);
        return markup + isoHtml;
      } else {
        return markup + `<${this.markupElement} class="${this.markupClassName}" data-key="${this.keyPrefix}_${i}">${html}</${this.markupElement}>`
      }
    }, '')
    
    return (`${markup}`)
  }

  static render(html, state = {}, meta = {}, config = defaultConfiguration) {
    return new Iso(config).add(html, state, meta).render()
  }

  static bootstrap(onNode, config = defaultConfiguration) {
    setDefaults(config)
    if (!onNode) {
      return
    }

    const nodes = document.querySelectorAll(`.${config.markupClassName}`)
    const state = document.querySelectorAll(`.${config.dataClassName}`)

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

  static on(metaKey, metaValue, onNode, config = defaultConfiguration) {
    setDefaults(config)
    Iso.bootstrap((state, meta, node) => {
      if (meta[metaKey] && meta[metaKey] === metaValue) {
        onNode(state, meta, node)
      }
    }, config)
  }
}
