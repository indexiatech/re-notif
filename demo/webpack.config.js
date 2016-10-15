var path = require('path');
var webpack = require('webpack');
var npmPath = path.resolve(__dirname, '../node_modules');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  cache: true,
  entry: {
    demo: ['./demo.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist_demo'),
    publicPath: '/static/',
    filename: 'bundle.js'
  },
  resolveLoader: { modulesDirectories: [npmPath] },
  resolve: {
    extensions: ['', '.css', '.js', '.json', '.jsx', '.webpack.js', '.web.js'],
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
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
      exclude: npmPath,
    }, {
      test: /\.css$/,
      loaders: ['style', 'css'],
      exclude: npmPath,
    }, {
      test: /\.png|\.jpg$/,
      loaders: ['file-loader']
    }]
  }
};
