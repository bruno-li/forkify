// require packages intalled from npm
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// the config for webpack, on where to look for the files and bundle them
module.exports = {
  // the development source files
  // polifill using babel for ES6 features to older versions
  entry: ['@babel/polyfill', './src/js/index.js'],
  // the output from compressing in dev more or production mode
  output: {
    // absolute path is require to bundle
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
  },
  // loads the dev server to mimic a http request
  devServer: {
    contentBase: './dist',
  },
  // plugin to generate the index files
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
  ],
  // modules for babel for transpilation
  module: {
    rules: [
      {
        // regular expression to look all fules with .js extension
        test: /\.js/,
        // excludes the node modules files so babel it does not get apply to all .js files inside the node modules folder
        exclude: /node_modules/,
        use: {
          // if a .js found, it will load the loader
          loader: 'babel-loader',
        },
      },
    ],
  },
};
