const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = {
  devtool: 'source-map',
  entry: {
  },
  resolve: {
    extensions: ["", ".ts", ".webpack.js", ".web.js", ".js", ".json"],
    root: path.resolve('./src'),
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },
  stats: {
    errorDetails: true
  },
  module: {
    loaders: [
      //to generate static html files for some external directives
      {test: /\.tpl\.pug$/, loaders: ['file?name=[hash].html', 'pug-html?exports=false']},
      {test: /\.json$/, loader: "json"}, // to parse configs from node_modules
      {test: /\.jade$/, exclude: [/\.tpl\.pug$/], loader: "jade"},
      {test: /\.ts$/, exclude: [/app\/lib/, /node_modules/], loader: 'ng-annotate!awesome-typescript-loader'},
      {test: /\.html$/, loader: 'raw'},
      {test: /\.(scss|sass)$/, loader: 'style!css!sass'},
      {test: /\.css$/, loader: 'style!css'}
    ]
  },
  plugins: [
    // Injects bundles in your index.html instead of wiring all manually.
    // It also adds hash to all injected assets so we don't have problems
    // with cache purging during deployment.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      hash: true
    }),

    new CheckerPlugin(),

    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),

    new webpack.ProvidePlugin({
      "window.i18n": "phonenumber"
    }),

    // Automatically move all modules defined outside of application directory to vendor bundle.
    // If you are using more complicated project structure, consider to specify common chunks manually.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        return module.resource && module.resource.indexOf(path.resolve(__dirname, 'src')) === -1;
      }
    }),
  ]
};
