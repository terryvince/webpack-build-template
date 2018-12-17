const baseConfig = require('./base.config');
const {entry, plugins, devServer, src, root} = baseConfig;
const HtmlWebpackReloadPlugin = require('html-webpack-reload-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');

const staticPath = {from:path.join(src, 'static/'), to: path.join(root, '.temp/static/')};

module.exports = {
    entry,
    mode: 'development',
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },
    plugins: [
        new CleanWebpackPlugin(['.temp'], {
            root: path.resolve(__dirname, '../'),
        }),
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([staticPath],{debug:'debug'}),
        ...plugins,
        new HtmlWebpackReloadPlugin()
    ],
    // stats:'errors-only',
    devtool: 'inline-source-map',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../.temp')
    },
    devServer,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules|bower_components/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                },
                'eslint-loader'
                ]
            },
            {
                test: /\.(ejs|html)$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: [':data-src', 'img:src'],
                            minimize: false  //压缩html
                        }
                    },
                    {
                        loader: 'ejs-html-loader',
                        options: {
                            context: baseConfig,
                            season: 1,
                            episode: 9,
                            production: false
                        }
                    }
                ]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'static/font/',
                        publicPath: 'static/font/'
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[name].[ext]',
                            outputPath: 'static/',
                            publicPath: 'static/'
                        }
                    }
                ]
            },
            {
                test: '/.css$/',
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.vue$/,
                use:{
                    loader: 'vue-loader',
                    options: {
                        'scss': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader'
                        ],
                        'sass': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader?indentedSyntax'
                        ]
                    }
                }
            }
        ]
    }
};
