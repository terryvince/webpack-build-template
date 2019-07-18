const baseConfig = require('./base.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
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
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                    // maxSize:300*1000,
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
            // filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[name].css'
        }),
        new CopyWebpackPlugin([staticPath],{debug:'warning'})
    ],
    devtool: 'source-map',
    output: {
        filename: 'js/[name].js',
        // filename: 'js/[name].[hash].js',
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
                    { loader: 'css-loader', options: { importLoaders: 1,import: true , sourceMap:true } },
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
                            publicPath: '../'
                        }
                    },
                    { loader: 'css-loader', options: { importLoaders: 2, sourceMap:true } },
                    {loader: 'postcss-loader', options: {sourceMap: true}},
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
