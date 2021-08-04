const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const mode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development'

const isDev = mode === 'development'

module.exports = {
  mode,
  devtool: isDev ? 'source-map' : false,
  devServer: {
    contentBase: './dist',
  },

  plugins: [
    new HtmlWebpackPlugin({ template: 'index.html' }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[hash].bundle.js',
  },
}
