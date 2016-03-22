const webpack = require('webpack')
const config = require('./web.config')

module.exports = Object.assign({}, config, {
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
  ],
  output: {
    path: __dirname + '/dist',
    filename: '[name].min.js',
    library: 'Iso',
    libraryTarget: 'umd',
  },
})
