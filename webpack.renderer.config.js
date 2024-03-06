const rules = require('./webpack.rules');
const webpack = require('webpack');

rules.push({
  test: /\.scss$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' },{
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: function () {
          return [
            require('autoprefixer')
          ];
        }
      }
    }
  }],
},{
  test: /\.(png|jpe?g|gif|ico|svg)$/, // We will handle of these file extensions
  use: [{ loader: "file-loader" }]
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]

};
