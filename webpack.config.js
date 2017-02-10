module.exports = {
  entry: "./src/entry.js",
  output: {
    path: __dirname,
      filename: "build/bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        // exclude: /node_modules/
        query: {
          presets: ['es2015', 'react', 'stage-3']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  target: 'node',
  externals: {
    'electron': 'require("electron")',
    'fs': 'require("fs")'
  }
}
