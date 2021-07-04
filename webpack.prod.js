require('dotenv').config()

const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const config = {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      () => ({
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      }),
      new CssMinimizerPlugin({
        exclude: /node_modules/,
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
  },
}

module.exports = merge(common, config)
