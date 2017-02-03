const path = require('path');
const webpack = require('webpack');
const package = require('./package.json');

const prod = process.env.NODE_ENV === 'production';

module.exports = (function () {

  const config = {};

  // entry file
  config.entry = path.resolve(__dirname, package.main);

  // if (prod) {
    // include source-map
    config.devtool = 'source-map';
  // }

  // output file and path
  config.output = {
    library: 'TasQue',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    filename: (prod) ? 'tasq.min.js' : 'tasq.js'
  }

  // config.output.library = 'Tasq';
  // config.output.libraryTarget = 'amd';

  // module loaders object -> array
  config.module = {
    rules: [
      // babel loader
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] }
    ]
  }

  // add uglify
  if (prod) {
    config.plugins = [
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true
      })
  ];
  }

  // return the configuration object
  return config;
})();

// const config = {
//   entry: path.resolve(__dirname, package.main),
//   devtool: 'source-map',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: (prod) ? 'tasq.min.js' : 'tasq.js'
//   },
//   module: {
//     rules: [
//       // babel loader
//       { test: /\.js$/, exclude: /node_modules/,
//         use: [{
//           loader: 'babel-loader',
//           options: { presets: [ ['es2015'] ] }
//         }]
//       }
//     ]
//   }
//
// }
//
// module.exports = config;
