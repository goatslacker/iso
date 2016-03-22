import core from './core'

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
      try {
        const state = JSON.parse(core.decode(node.innerHTML))
        cache[key].state = state
      } catch (e) {
        cache[key].state = {}
      }
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
    const state = core.encode(JSON.stringify(_state))
    this.html.push(html)
    this.data.push(state)
    return this
  }

  render() {
    return core.server(this.html, this.data, this.renderer, this.name)
  }

  static render(html, state = {}, name = '', renderer = defaultRenderer) {
    return new Iso(name, renderer).add(html, state).render()
  }

  static bootstrap(onNode, selector = defaultSelector) {
    return core.client(onNode, selector)
  }
}
