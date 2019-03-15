const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let HWPConfig = new HtmlWebpackPlugin({
  filename: 'home.html',
  template: './views/home.handlebars',
  inject: false
})

let pages = [
  'articles/add',
  'articles/edit',
  'articles/main',
  'articles/read',
  'layouts/main',
  'partials/msg',
  'partials/navbar',
  'partials/userArticles',
  'user/login',
  'user/register'
];

let multiplesFiles = pages.map(function(entryName) {
  return new HtmlWebpackPlugin({
    filename: entryName + '.html',
    template: `./views/${entryName}.handlebars`,
    inject: false
  })
})

module.exports = {
  mode: 'development',
  entry: [
    './views/main.js',
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.handlebars$/,
        include: [
          path.resolve(__dirname, 'dist/partials')
        ],
        loader: "handlebars-loader",
        options: {
          partialDirs: [__dirname + 'dist/partials'],
        }
      }
    ],
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    HWPConfig
  ].concat(multiplesFiles)
};
