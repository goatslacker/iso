module.exports = {
  server: server,
  client: client
}

var escapeTextForBrowser = require('react/lib/escapeTextForBrowser')

function server(html, data = {}, meta = {}) {
  var xState = escapeTextForBrowser(JSON.stringify(data))
  var xMeta = escapeTextForBrowser(JSON.stringify(meta))

  return (
`<div class="node-iso-v3"
      data-state="${xState}"
      data-meta="${xMeta}">
  ${html}
</div>`
  )
}

function client(cb) {
  Array.prototype.forEach.call(
    document.querySelectorAll('.node-iso-v3'),
    node => cb(JSON.parse(node.getAttribute('data-state')), JSON.parse(node.getAttribute('data-meta')), node)
  )
}
