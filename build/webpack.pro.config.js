const baseConfig = require('./base.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');
const {entry, plugins, dist, src, rules} = baseConfig;

const staticPath = {from:path.join(src, 'static/'), to: path.join(dist, 'static/')};

module.exports = {
    entry,
    mode: 'production',
    resolve: {
        extensions: ['.js', '.vue', '.json', '.ts'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve('../src')
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30*1000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                // jquery:{
                //     test: /jquery/,
                //     priority: -5
                // },//提取jquery为单独块
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                    // maxSize:300*1000,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        ...plugins,
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            // filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[name].css'
        }),
        new CopyWebpackPlugin([staticPath],{debug:'warning'})
    ],
    devtool: 'source-map',    //source-map 携带源码映射  none 不携带映射
    output: {
        filename: 'js/[name].js',
        // filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[name].js',
        // publicPath: dist,
        path: dist
    },
    module: {
        rules: [
            ...rules,
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: '../'
                        }
                    },
                    { loader: 'css-loader', options: { importLoaders: 1,import: true } },
                    {loader: 'postcss-loader'}
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
                            publicPath: '../'
                        }
                    },
                    { loader: 'css-loader', options: { importLoaders: 2 } },
                    {loader: 'postcss-loader'},
                    'sass-loader'
                ]
            },
            {
                test: /\.vue$/,
                use:{
                    loader: 'vue-loader'
                }
            }
        ]
    }
};
