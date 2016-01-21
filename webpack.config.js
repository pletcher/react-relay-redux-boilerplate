import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import path from 'path'
import postcssImport from 'postcss-import'
import precss from 'precss'
import webpack from 'webpack'

export default {
  context: __dirname,
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(__dirname, 'js', 'app.js')
  ],
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          plugins: ['./build/babelRelayPlugin'],
        },
        test: /\.js$/,
      },
      {
        loader: 'style!css!postcss',
        test: /\.css$/,
      }
    ]
  },
  output: {
    chunkFilename: '[id].js',
    filename: '[name].js',
    path: '/'
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  postcss: (webpack) => {
    return [autoprefixer, precss, postcssImport({ addDependencyTo: webpack })]
  },
  resolve: {
    root: [
      __dirname,
      path.resolve(__dirname, './js')
    ]
  }
}
