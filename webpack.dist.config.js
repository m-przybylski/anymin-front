const webpack = require('webpack');
const path    = require('path');
const config  = require('./webpack.config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const pug = require('pug');

config.output = {
  filename: '[name].bundle.js',
  publicPath: '',
  path: path.resolve(__dirname, 'dist')
};

const pugTransformer = (content, _path) => {
  return pug.compile(content, {})();
}

config.plugins = config.plugins.concat([

  // Reduces bundles total size
  new webpack.optimize.UglifyJsPlugin({
    mangle: {

      // You can specify all variables that should not be mangled.
      // For example if your vendor dependency doesn't use modules
      // and relies on global variables. Most of angular modules relies on
      // angular global variable, so we should keep it unchanged
      except: ['$super', '$', 'exports', 'require', 'angular', 'api']
    }
  }),

  // copy static assets which are not bundled into dist
  new CopyWebpackPlugin([
    {from : './src/assets', to: 'assets'},
    {from : './src/common/templates/calendar/day.pug', to: 'templates/calendar/day.html', transform: pugTransformer},
    {from : './src/common/templates/calendar/month.pug', to: 'templates/calendar/month.html', transform: pugTransformer},
    {from : './src/common/templates/calendar/year.pug', to: 'templates/calendar/year.html', transform: pugTransformer}
  ])
]);

module.exports = config;
