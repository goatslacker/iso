import { assert } from 'chai'
import cheerio from 'cheerio'
import Iso from '../'
import { jsdom } from 'jsdom'

const testState = (serverState, clientStateString) => {
  assert.isString(clientStateString, 'state from DOM is a string')
  const clientState = JSON.parse(clientStateString)

  Object.keys(serverState).forEach((key) => {
    assert(clientState[key] === serverState[key], `${key} is ${serverState[key]}`)
  })
}

const escapeHtml = (html) => (
  String(html)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
)

const customRenderer = {
  markup(html, key) {
    return `<div class="iso-markup" data-iso-key="${key}">${html}</div>`
  },

  data(state, key) {
    const escaped = escapeHtml(state)
    return `<div class="iso-state" data-iso-key="${key}" data-iso-state=${escaped}></div>`
  },
}

const getRenderedPair = (html) => {
  const $ = cheerio.load(html)('[data-iso-key]')
  const markup = $.first().text()
  const clientState = $.next().text()

  return { $, markup, clientState }
}

export default {
  'html and state render using add': () => {
    const iso = new Iso('feature')
    const serverState = {
      foo: true,
    }

    iso.add('<span>Hello World</span>', serverState)

    const html = iso.render()

    const { markup, clientState } = getRenderedPair(html)

    assert(markup === 'Hello World', 'markup is correct')

    testState(serverState, clientState)
  },

  'Iso.render': () => {
    const serverState = {
      hello: 'World',
    }
    const html = Iso.render('test', serverState, 'hello-world')

    const { $, markup, clientState } = getRenderedPair(html)

    testState(serverState, clientState)

    assert($.attr('data-iso-key') === 'hello-world_0', 'the name is included in the iso key')

    assert(markup === 'test', 'html was rendered on page')
  },

  'Iso.render with a custom renderer': () => {
    const serverState = {
      goatslacker: 'iso',
    }

    const html = Iso.render('foo bar bear', serverState, 'custom-markup', customRenderer)

    const { $, markup, clientState } = getRenderedPair(html)

    assert($.first().attr('class') === 'iso-markup', 'the class name was inserted')
    assert($.next().attr('class') === 'iso-state', 'the class name was inserted')

    assert($.attr('data-iso-key') === 'custom-markup_0', 'the name is included in the iso key')

    assert(markup === 'foo bar bear', 'html was rendered on page')
  },

  'bootstrap': (done) => {
    const serverState = { foo: 'bar' }
    const html = '<h2>It works!</h2>'

    const markup = Iso.render(html, serverState)
    global.document = jsdom(markup)

    Iso.bootstrap((state, node) => {
      assert(state.foo === 'bar', 'the state is in the DOM correctly')
      assert(node.innerHTML === html, 'the html was retrieved correctly')

      delete global.document
      done()
    })
  },

  'bootstrap with custom selector': (done) => {
    const serverState = { foo: 'bar' }
    const html = '<h2>It works!</h2>'

    const markup = Iso.render(html, serverState, '', customRenderer)

    global.document = jsdom(markup)

    Iso.bootstrap((state, node, key) => {
      assert(state.foo === 'bar', 'the state is in the DOM correctly')
      assert(node.innerHTML === html, 'the html was retrieved correctly')
      assert(key === 'MyComponent', 'the custom key was sent down')

      delete global.document
      done()
    }, () => {
      const node = document.querySelectorAll('.iso-markup')[0]
      const state = JSON.parse(
        document.querySelectorAll('.iso-state')[0].getAttribute('data-iso-state')
      )

      return {
        MyComponent: { node, state }
      }
    })
  },

  'bad state': (done) => {
    const markup = `
      <div data-iso-key="_0"></div>
      <script type="application/json" data-iso-key="_0">SOME BAD JSON</script>
    `

    global.document = jsdom(markup)

    Iso.bootstrap((state, node, key) => {
      assert(Object.keys(state).length === 0, 'empty object returned')
      delete global.document
      done()
    })
  },

  'state that contains </script>': (done) => {
    const serverState = { foo: '</script>' }
    const html = '<h2>It works!</h2>'

    const markup = Iso.render(html, serverState)
    global.document = jsdom(markup)

    Iso.bootstrap((state, node) => {
      assert(state.foo === '</script>', 'the state was properly decoded')
      assert(node.innerHTML === html, 'the html was retrieved correctly')

      delete global.document
      done()
    })
  },
}
