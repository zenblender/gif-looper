var path = require('path');
module.exports = {
  entry: './src/main.js',
  output: {
    path:       __dirname,
    filename:   'bundle.js'
  },
  module: {
    loaders: [{
      loader:   'babel-loader',
      test:     /\.jsx?$/,
      exclude:  /node_modules/,
      query: {
        presets: ['es2015']
      }
    },{
      test: /\.less$/,
      loader: 'style!css!less'
    }]
  }
};
