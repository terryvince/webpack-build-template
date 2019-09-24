const baseConfig = require('./base.config');
const {entry, plugins, devServer, src, root, rules} = baseConfig;
const {HotModuleReplacementPlugin} = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

const staticPath = {from: path.join(src, 'static/'), to: path.join(root, '.temp/static/')};
module.exports = {
    entry,
    mode: 'development',
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([staticPath], {debug: 'debug'}),
        ...plugins,
        new HotModuleReplacementPlugin()
    ],
    // stats:'errors-only',
    devtool: 'inline-source-map',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../.temp')
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.ts'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve('../src')
        }
    },
    devServer,
    module: {
        rules: [
            ...rules,
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1,import: true } },
                    'postcss-loader'
                ]
            },
            {
                test: /\.styl(us)?$/,
                use: [
                    'vue-style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'stylus-loader'
                ]
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    'vue-style-loader',
                    { loader: 'css-loader', options: { importLoaders: 2 } },
                    'postcss-loader',
                    'fast-sass-loader'
                ]
            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader'
                }
            }
        ]
    }
};
