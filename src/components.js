module.exports = makeComponents

var fs = require('fs')
var path = require('path')

function makeComponents(root) {
  return [
    'module.exports = {',
    fs.readdirSync(root).filter(function (x) {
      var ext = path.extname(x)
      return ext === '.js' || ext === '.jsx'
    }).map(function (fileName) {
      var key = fileName.replace(path.extname(fileName), '')
      var fullpath = path.join(root, fileName)
      return '"' + key + '": require("' + fullpath + '")'
    }).join(',\n'),
    '}'
  ].join('\n')
}
