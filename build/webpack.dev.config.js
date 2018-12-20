const baseConfig = require('./base.config');
const {entry, plugins, devServer, src, root, rules} = baseConfig;
const HtmlWebpackReloadPlugin = require('html-webpack-reload-plugin');
const {HotModuleReplacementPlugin} = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const path = require('path');

const staticPath = {from: path.join(src, 'static/'), to: path.join(root, '.temp/static/')};

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
        new CopyWebpackPlugin([staticPath], {debug: 'debug'}),
        ...plugins,
        new HotModuleReplacementPlugin(),
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
            ...rules,
            {
                test: '/.css$/',
                use: [
                    'style-loader',
                    'css-loader',
                    {loader: 'postcss-loader', options: {sourceMap: true}},
                ]
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {loader: 'postcss-loader', options: {sourceMap: true}},
                    'sass-loader'
                ]
            },
            {
                test: /\.vue$/,
                use: {
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
