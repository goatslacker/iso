module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['browserify', 'mocha', 'chai', 'sinon'],
    files: [
      'src/*.js',
      'test/*.spec.js'
    ],
    exclude: [],
    preprocessors: {
      'src/**/*.js': ['browserify'],
      'test/**/*.spec.js': ['browserify']
    },
    browserify: {
      debug: true,
      transform: ['babelify']
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  })
};