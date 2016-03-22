module.exports = {
  context: __dirname + '/src',
  entry: {
    'iso': ['./iso.js'],
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    library: 'Iso',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
    }],
  },
}
