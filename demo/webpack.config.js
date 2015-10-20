var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
      'webpack-hot-middleware/client',
      './index',
      './index.html'
  ],
  output: {
    path: path.join(__dirname, 'dist_demo'),
    filename: 'demo.js',
    publicPath: '/static/'
  },
  resolveLoader: {
    modulesDirectories: ['../node_modules']
  },
  plugins: [
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.NormalModuleReplacementPlugin(
      /^re-notif/, function(data) {
        const suffix = data.request.substring('re-notif'.length);
        data.request =  path.resolve(__dirname, '../src/' + suffix);
      }
    )
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: [path.join(__dirname), path.join(__dirname, '../src')]
    }, {
      test: /\.html$/,
      loader: 'file?name=[name].[ext]',
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }, {
      test: /\.png|\.jpg$/,
      loaders: ['file-loader']
    }]
  }
};
