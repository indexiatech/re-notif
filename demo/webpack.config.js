var path = require('path');
var webpack = require('webpack');
var npmPath = path.resolve(__dirname, '../node_modules');

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
  resolveLoader: { modulesDirectories: [npmPath] },
  resolve: {
    extensions: ['', '.css', '.js', '.json', '.jsx', '.scss', '.webpack.js', '.web.js'],
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
    preLoaders: [
      {
        test: /\.js?$/,
        loader: 'eslint-loader',
        exclude: npmPath,
      },
    ],
    loaders: [
    {
      test: /\.js?$/,
      loaders: ['babel'],
      exclude: npmPath,
    },
    {
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
