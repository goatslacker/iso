const KEY_NAME = 'data-iso-key'

const defaultRenderer = {
  markup(html, key) {
    if (!html) return ''
    return `<div ${KEY_NAME}="${key}">${html}</div>`
  },

  data(state, key) {
    if (!state) return ''
    return `<script type="application/json" ${KEY_NAME}="${key}">${state}</script>`
  },
}

const defaultSelector = () => {
  const all = document.querySelectorAll(`[${KEY_NAME}]`)

  return Array.prototype.reduce.call(all, (cache, node) => {
    const key = node.getAttribute(KEY_NAME)

    if (!cache[key]) cache[key] = {}

    if (node.nodeName === 'SCRIPT') {
      const state = JSON.parse(node.innerHTML)
      cache[key].state = state
    } else {
      cache[key].node = node
    }

    return cache
  }, {})
}

export default class Iso {
  constructor(name = '', renderer = defaultRenderer) {
    this.name = name
    this.renderer = renderer
    this.html = []
    this.data = []
  }

  add(html, _state = {}) {
    const state = JSON.stringify(_state)
    this.html.push(html)
    this.data.push(state)
    return this
  }

  render() {
    const markup = this.html.reduce((nodes, html, i) => {
      const key = `${this.name}_${i}`
      return nodes + this.renderer.markup(html, key, this.name)
    }, '')

    const data = this.data.reduce((nodes, state, i) => {
      const key = `${this.name}_${i}`
      return nodes + this.renderer.data(state, key, this.name)
    }, '')

    return `${markup}\n${data}`
  }

  static render(html, state = {}, name = '', renderer = defaultRenderer) {
    return new Iso(name, renderer).add(html, state).render()
  }

  static bootstrap(onNode, selector = defaultSelector) {
    if (!onNode) return

    const cache = selector()

    Object.keys(cache).forEach((key) => {
      const { state, node } = cache[key]
      onNode(state, node, key)
    })
  }
}
