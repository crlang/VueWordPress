const webpack = require('webpack');
const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = {
  target: "web",
  devtool: "#source-map",
  // entry: {
  //   app: "./src/app.js",
  //   vendor: "./src/vendor.js"
  // },
  entry: path.join(__dirname, 'src/index.js'),

  output: {
    filename: 'js/[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ['env']
      }
    }, {
      test: /\.(scss|css)$/,
      use: ExtractTextPlugin.extract({
        use: [{
          loader: "css-loader",
          options: {
            sourceMap: true,
            minimize: true
          }
        }, {
          loader: "postcss-loader",
          options: {
            sourceMap: true
          }
        }, {
          loader: "sass-loader",
          options: {
            sourceMap: true
          }
        }],
        fallback: "style-loader"
      })
    }, {
      test: /\.(jpg|jpeg|png|gif|svg)$/,
      use: [{
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: 'images/'
        }
      }]
    }, {
      test: /\.(ttf|otf|eot|woff|woff2)$/,
      use: [{
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: 'fonts/'
        }
      }]
    }, {
      test: /.vue$/,
      loader: "vue-loader",
      options: {
        loaders: {
          css: ExtractTextPlugin.extract({
            use: [{
              loader: "css-loader",
              options: {
                sourceMap: true,
                minimize: true
              }
            }, {
              loader: "postcss-loader",
              options: {
                sourceMap: true
              }
            }, {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }],
            fallback: 'vue-style-loader'
          })
        }
      }
    }]
  },

  devServer: {
    port: 8088,
    overlay: {
      error: true
    },
    hot: true,
    clientLogLevel: "none",// Cancel console packaging display
    open: true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: './css/style.css',
      allChunks: true
    }),
    new HTMLPlugin({
      template: "index.html"
    })
  ],

  resolve: {
    alias: {
      "vue": "vue/dist/vue.js"
    }
  }
};

module.exports = config;