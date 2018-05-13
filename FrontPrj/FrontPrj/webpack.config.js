'use strict';

var path = require('path');

var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig(myCustomCliOptions) {
    console.log(myCustomCliOptions);

    var config = {};

    config.entry = isTest ? void 0 : {
        'app': path.resolve(__dirname, 'index.js')
    };

    config.output = isTest ? {} : {
        // Absolute output directory
        path: path.resolve(__dirname , 'ref-build'),
        //publicPath: isProd ? 'ref-build' : 'http://localhost:8080/',
        publicPath: isProd ? './' : 'http://localhost:8080/',

        // Filename for entry points
        filename: 'bundle-[hash].js'//isProd ? '[name].[hash].js' : '[name].bundle.js',

        // Filename for non-entry points
        // chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
    };

    if (isTest) {
        config.devtool = 'inline-source-map';
    }
    else if (isProd) {
        config.devtool = 'source-map';
    }
    else {
        config.devtool = 'eval-source-map';
    }

    config.module = {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
          },
          {
            test: /\.css$/,
            loader: ['style-loader', 'css-loader'] //check out the post-css loader && url-loader
          },
          {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            loader: 'file-loader?limit=1024&name=/images/[name].[ext]'
          },
          {
            test: /\.html$/,
            loader: 'raw-loader'
          }
        ]
    };
    if (isTest) {
        config.module.rules.push({
            enforce: 'pre',
            test: /\.js$/,
            exclude: [
                /node_modules/,
                /\.spec\.js$/
            ],
            loader: 'istanbul-instrumenter-loader',
            query: {
                esModules: true
            }
        })
    }

    config.resolve = {
        alias: {
            '@root': path.resolve(__dirname),
            '@src': path.resolve(__dirname, 'src'),
            '@pages': path.resolve(__dirname, 'src', 'pages'),
            '@app': path.resolve(__dirname, 'src', 'app'),
            '@components': path.resolve(__dirname, 'src', 'components')
        }
    }

    config.plugins = [
        new webpack.DefinePlugin({
            'process.env.localdev': myCustomCliOptions.localdev
        })
    ];

    if (!isTest) {
        config.plugins.push(
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src', 'main-layout', 'index.html'),
                inject: 'body'
            })//,
            //new ExtractTextPlugin({ filename: 'css/[name].css', disable: !isProd, allChunks: true })
        )
    }

    if (isProd) {
        config.plugins.push(
            // new webpack.optimize.UglifyJsPlugin({
            //     output: {
            //         comments: false,
            //     },
            //}),
            // new CopyWebpackPlugin([{
            //     from: __dirname + '/src/images',
            //     to: 'images'
            // }])
            new CopyWebpackPlugin([{
                from: __dirname + '/web.config'
            }])
        )
    }

    config.devServer = {
        contentBase: './src/',
        stats: 'minimal'
    };

    return config;
};
