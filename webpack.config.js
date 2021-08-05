const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const mode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development'

const isDev = mode === 'development'

module.exports = {
  mode,
  devtool: isDev ? 'source-map' : false,
  devServer: {
    contentBase: './dist',
    hot: true,
  },

  plugins: [
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
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
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[fullhash].bundle.js',
  },
}
