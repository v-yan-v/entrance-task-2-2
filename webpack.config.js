/** добавить в package.json для запуска команд: npm run xxx *
 * "scripts": {
    "buildDev": "webpack --mode development",
    "buildProd": "webpack --mode production",
    "serv": "webpack-dev-server --mode development --open"
  },
 */


'use strict';

const path = require('path'); // вычисляет пути к файлам, чтоб можно был писать './src/file.ext' и получалось 'path/to/dist/file.ext' вместо 'path/to/dist./file.ext'
const HtmlWebpackPlugin = require('html-webpack-plugin'); // для обработки хтмл шаблонов, дефолт плагина lodash
const CopyWebpackPlugin = require('copy-webpack-plugin'); // копируем файлы без обработки
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // для работы с текстовыми файлами, например sass
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

/** функция для обработки нескольких html шаблонов
 * usage:
 * plugins: [ ... ].concat(htmlPlugins)
 //
 // const fs = require('fs');
 // function generateHtmlPlugins(templateDir) {
//   const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
//   return templateFiles.map(item => {
//     const parts = item.split('.');
//     const name = parts[0];
//     const extension = parts[1];
//     return new HtmlWebpackPlugin({
//       filename: `${name}.html`,
//       template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
//       inject: false,
//     })
//   })
// }
 //
 // const htmlPlugins = generateHtmlPlugins('./src/html/views');
 **/

module.exports = {
  mode: 'development',
  entry: [
    './src/main.js',
  ],
  output: {
    filename: './js/bundle.js',
    path: __dirname + '/dist'
  },
  
  // !!! devServer не создаёт файлы в outputDir !!! он делает это в "памяти". для сборки запускай webpack или webpack-cli
  devServer: {
    contentBase: path.join(__dirname, '/dist'),
    watchContentBase: true, // включаем слежение за указанным контентом - полная перезагрузка страницы (замена browsersync)
    compress: true,
    port: 9000,
    overlay: true, // показывать ошибки в браузере
    open: true, // открывать страницу в браузере при запуске сервера
    host: '0.0.0.0', // If you want your server to be accessible externally, specify it like this
    // https: true
  },
  
  watch: true,
  
  // devtool: "source-map",
  devtool: '#eval-source-map',
  
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader?optional[]=runtime',
          options: {
            presets: [
              ["@babel/env", {
                targets: {
                  edge: "17",
                  firefox: "60",
                  chrome: "67",
                  safari: "11.1",
                  ie: "11"
                },
                useBuiltIns: "usage"
              }]
            ]
          }
        }
      }
      ,{
        // обязательно сделать include './project/src/main.sass'; в вашем entrypoint.js чтоб этот блок сработал
        test: /\.(sass|scss)$/,
        include: path.resolve(__dirname, './src/'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                // If you are having trouble with urls not resolving add this setting.
                // See https://github.com/webpack-contrib/css-loader#url
                url: false,
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false, // не встраивать ссылки на js и css файлы в HTML код, это если хотим ставить их самостоятельно
      template: path.resolve(__dirname, './src/main.html')
    })
    , new CopyWebpackPlugin([
      {
        from: './src/img/**',
        to: './img/'
      }
      //, {
      //   from: './src/fonts',
      //   to: './fonts'
      // },
    ])
    , new ExtractTextPlugin({
      filename: './css/main.css', // собрать стили в этот общий файл
      allChunks: true
    })
    // , new UglifyJsPlugin()
  ]
};
