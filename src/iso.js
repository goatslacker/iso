import cheerio from 'cheerio';

const escapeTextForBrowser = require('escape-html')

const defaultConfiguration = {
  markupClassName: '___iso-html___',
  markupElement: 'div',
  dataClassName: '___iso-state___',
  dataElement: 'script',
  keyPrefix: ''
}
const each = (x, f) => Array.prototype.forEach.call(x, f)
const parse = (node, x) => JSON.parse(node.getAttribute(x))
const setDefaults = (config) => {
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
    this.html = []
    this.data = []
  }

  add(html, _state = {}, _meta = {}) {
    const meta = escapeTextForBrowser(JSON.stringify(_meta));
    this.html.push(html)
    this.data.push(JSON.parse(_state))
    return this
  }

  render() {
    const data = `<${this.dataElement} class="${this.dataClassName}" type="application/json">${JSON.stringify(this.data)}</${this.dataElement}>`;

    const markup = this.html.reduce((markup, html, i) => {
      let $ = cheerio.load(html);
      var isoHtml = $.html();
      return markup + isoHtml;
    }, '')
    
    let $ = cheerio.load(markup);
    
    $('html').find('body').append(data);
    const output = $.html();

    return (`${output}`)
  }

  static render(html, state = {}, meta = {}, config = defaultConfiguration) {
    return new Iso(config).add(html, state, meta).render()
  }

  static bootstrap(onNode, config = defaultConfiguration) {
    setDefaults(config)
    if (!onNode) {
      return
    }

    const state = document.querySelectorAll(`.${config.dataClassName}`)

    let cache = JSON.parse(state[0].innerHTML);
      
    onNode(cache, document.documentElement);

    cache = null;
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
