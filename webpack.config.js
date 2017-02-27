const path = require('path');

module.exports = {
  entry: './renderer/entry.js',
  output: {
    path: path.join(__dirname, 'app', 'dist'),
    publicPath: path.join(__dirname, 'app', 'dist/'),
    filename: './bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        query: {
          presets: ['es2015', 'react', 'stage-3']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff2?)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  target: 'electron',
  node: {
    __dirname: false,
    __filename: false,
  }
}
