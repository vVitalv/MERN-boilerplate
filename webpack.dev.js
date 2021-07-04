require('dotenv').config()

const { resolve } = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

const { PORT, SOCKETS_ENABLE } = process.env

const config = {
  mode: 'development',
  optimization: {
    usedExports: true
  },
  devServer: {
    hot: true,
    // open: true,
    contentBase: resolve(__dirname, 'dist'),
    port: 8081,
    host: 'localhost',
    index: 'index.html',
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      context: ['/api', '/ws', '/favicon.ico'],
      target: `http://localhost:${PORT || 8080}`,
      ws: !!SOCKETS_ENABLE
    },
    publicPath: '/',
    historyApiFallback: true
  }
}

module.exports = merge(common, config)
