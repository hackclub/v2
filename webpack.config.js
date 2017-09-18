const path = require('path')
const webpack = require('webpack')
const UglifyEsPlugin = require('uglify-es-webpack-plugin')

module.exports = {
  entry: './src/entry.js',

  output: {
    path: path.join(__dirname, 'docs'),
    filename: 'bundle.js'
  },

  node: {
    fs: 'empty'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new UglifyEsPlugin()
  ],

  devServer: {
    contentBase: 'docs/',
    historyApiFallback: true
  }
}
