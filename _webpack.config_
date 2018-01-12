var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './demo/demo.js'
  ],
  output: {
    path: path.join(__dirname, 'path'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      include: __dirname,
      exclude: /node_modules/
    },
    {
      test: /\.css?$/,
      loaders: [ 'style', 'raw' ],
      include: __dirname,
      exclude: /node_modules/
    }]
  }
}
