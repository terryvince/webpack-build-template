const baseConfig = require('./base.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const {entry, plugins, dist, src} = baseConfig;
const path = require('path');

const staticPath = {from:path.join(src, 'static/'), to: path.join(dist, 'static/')};

module.exports = {
    entry,
    mode: 'production',
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../'),
        }),
        new VueLoaderPlugin(),
        ...plugins,
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css'
        }),
        new CopyWebpackPlugin([staticPath],{debug:'warning'})
    ],
    devtool: 'sourceMap',
    output: {
        filename: 'js/[name].js',
        path: dist
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: /src/,
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
                            production: true
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
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            outputPath: 'css/',
                            publicPath: 'css/'
                        }
                    },
                    'css-loader',
                    {loader: 'postcss-loader', options: {sourceMap: true}}
                ]
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            outputPath: 'css/',
                            publicPath: 'css/'
                        }
                    },
                    'css-loader',
                    {loader: 'postcss-loader', options: {sourceMap: true}},
                    'sass-loader'
                ]
            },
            {
                test: /\.vue$/,
                use:{
                    loader: 'vue-loader',
                    options: {
                        'scss': [
                            {
                                loader: MiniCssExtractPlugin.loader,
                                options: {
                                    outputPath: 'css/',
                                    publicPath: 'css/'
                                }
                            },
                            'css-loader',
                            'sass-loader'
                        ],
                        'sass': [
                            {
                                loader: MiniCssExtractPlugin.loader,
                                options: {
                                    outputPath: 'css/',
                                    publicPath: 'css/'
                                }
                            },
                            'css-loader',
                            'sass-loader?indentedSyntax'
                        ]
                    }
                }
            }
        ]
    }
};
