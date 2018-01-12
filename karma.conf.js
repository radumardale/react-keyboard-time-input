var path = require('path')
var webpackConfig = require('./webpack.config')

module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    files: [ 'test/test-*' ],
    preprocessors: { 'test/test-*': ['webpack', 'sourcemap'] },
    webpack: webpackConfig,
    //   {
    //   devtool: 'inline-source-map',
    //   module: {
    //     loaders: webpackConfig.module.loaders.concat([{
    //       test: /\.js$/,
    //       include: path.join(__dirname, 'src'),
    //       exclude: /node_modules/,
    //       loader: 'isparta'
    //     }])
    //   }
    // },
    webpackServer: {
      quiet: true,
      noInfo: true
    },
    browsers: ['Chrome'],
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      reporters: [{ type: 'html' }, { type: 'text' }]
    }
  })
}
