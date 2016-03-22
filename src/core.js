const rLt = /</g
const rGt = />/g
const rLte = /&lt;/g
const rGte = /&gt;/g
const rEnc = /[<>]/
const rDec = /&lt;|&gt;/

const coerceToString = val => val ? String(val) : ''

export default {
  encode(str) {
    const val = coerceToString(str)

    if (rEnc.test(val)) {
      return val.replace(rLt, '&lt;').replace(rGt, '&gt;')
    }

    return val
  },

  decode(str) {
    const val = coerceToString(str)

    if (rDec.test(val)) {
      return val.replace(rLte, '<').replace(rGte, '>')
    }

    return val
  },

  server(html, data, renderer, name = '') {
    const markup = html.reduce((nodes, html, i) => {
      const key = `${name}_${i}`
      return nodes + renderer.markup(html, key, name)
    }, '')

    const state = data.reduce((nodes, state, i) => {
      const key = `${name}_${i}`
      return nodes + renderer.data(state, key, name)
    }, '')

    return `${markup}\n${state}`
  },

  client(onNode, selector) {
    if (!onNode) return

    const cache = selector()

    Object.keys(cache).forEach((key) => {
      const { state, node } = cache[key]
      onNode(state, node, key)
    })
  },
}
