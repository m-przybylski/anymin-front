const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CheckerPlugin} = require('awesome-typescript-loader')

module.exports = {
  devtool: 'eval',//'source-map',
  entry: {},
  resolve: {
    extensions: [/*"", */".ts", ".webpack.js", ".web.js", ".js", ".json"],
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },
  stats: {
    errorDetails: true
  },
  module: {
    rules: [
      //to generate static html files for some external directives
      {test: /\.tpl\.pug$/, use: [
        {loader: 'file-loader', options: {name: '[hash].html'}},
        {loader:'pug-html-loader', options: {exports: 'false'}}]
      },
      {test: /\.pug$/, exclude: [/\.tpl\.pug$/], use: [{loader: "pug-loader"}]},
      {test: /\.ts$/, exclude: [], use: [
        {loader: 'ng-annotate-loader'},
        {loader: 'awesome-typescript-loader'}
      ]},
      {test: /\.html$/, use: [{loader: 'raw-loader'}]},
      {
        test: /\.(scss|sass)$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'sass-loader'}
        ]
      },
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'}
        ]
      }
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
