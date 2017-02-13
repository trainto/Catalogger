module.exports = {
  context: __dirname + '/src',
  entry: "./entry.js",
  output: {
    path: __dirname + '/build',
    publicPath: __dirname + '/build/',
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
  target: 'node'
}
