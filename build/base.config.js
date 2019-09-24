const {resolve, join, basename, extname} = require('path');
const fs = require('fs');
const src = resolve(__dirname, '../src');
const root = resolve(__dirname, '../');
const htmlWebpackPlugin = require('html-webpack-plugin');
const htmlInjectionPlugin = require('html-script-injection-webpack-plugin');
const HtmlWebpackReloadPlugin = require('html-webpack-reload-plugin');

let base = {
    root,
    src,
    dist: resolve(__dirname, '../dist'),
    app: 'template of mutiple page',
    lang: 'zh_CN',
    entry: {main: resolve(src, 'main.js')},
    plugins: [],
    isProd: process.env.NODE_ENV === 'production',
    devServer: {
        // https:true,          //开起https服务器
        clientLogLevel: 'warning',
        contentBase: join(__dirname, '../.temp'),
        compress: true,
        host: '0.0.0.0',
        port: 9000,
        progress: true,
        hot: true,
        quiet: false,
        // hotOnly:true,
        // open:true,   //自动打开浏览器
        overlay:{
            errors:true, //编译过程中如果有任何错误，都会显示到页面上
        },
        historyApiFallback: true,
        stats: {colors: true, errors: true, errorDetails: true, modules: false, entrypoints: false},
        watchContentBase: true,
        proxy: {
            '/api': {
                target: 'https://www.hzz.com',
                // 因为使用的是https，会有安全校验，所以设置secure为false
                secure: false,
                // port: 80,
                // changeOrigin是关键，如果不加这个就无法跳转请求
                changeOrigin: true,
            }
        }
    },
    title: {
        app:'测试页面'
    }
};

let baseConfig = {
    ...base,
    rules: [
        {
            test: /\.js$/,
            include: /src/,
            exclude: file => (
                /node_modules/.test(file) &&
                !/\.vue\.js/.test(file)
            ),
            use: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            }, 'eslint-loader'
            ]
        },
        {
            test: /\.ts$/,
            loader: 'ts-loader',
            options: { appendTsSuffixTo: [/\.vue$/] }
        },
        {
            test: /\.pug$/,
            loader: 'pug-plain-loader'
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
                        context: base,
                        season: 1,
                        episode: 9,
                        production: base.isProd
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
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'static/fonts/'
                }
            }
        },
        {
            test: /\.(png|svg|jpg|gif|ico)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 1024 * 8,
                        name: '[name].[ext]',
                        // name: '[name][hash].[ext]',
                        outputPath: 'static/'
                    }
                }
            ]
        },
    ]
};

/*自动检测多入口多页面配置*/
(() => {
    // 只检测src根目录
    let files = fs.readdirSync(src);
    let entrys = files.filter(fileName => extname(fileName) === '.js');
    let pages = files.filter(fileName => extname(fileName) === '.html');
    let isVue = files.findIndex(fileName => extname(fileName) === '.vue')>=0;   //单页开发环境
    let entryOb = {};
    entrys.forEach((filename) => {
        if (filename !== 'main.js') {
            let name = basename(filename, '.js');
            entryOb[name] = resolve(src, filename);
        }
    });
    pages.forEach((filename) => {
        let injectMode;
        if (isVue) {
            injectMode = 'body';
        } else {
            injectMode = baseConfig.isProd ? 'body' : 'head';
        }
        let htmlWebpack = new htmlWebpackPlugin({
            filename: filename,
            template: resolve(src, filename),
            hash: true, // 为静态资源生成hash值
            // minify: true,
            xhtml: true,
            inject: injectMode //使用vue时需要等待文档加载完毕再引入，body后引入
        });
        baseConfig.plugins.push(htmlWebpack);
    });
    Object.assign(baseConfig.entry, entryOb);
    //是vue环境启用，或者其他环境的生产环境也启用自动注入脚本插件
    if(isVue || baseConfig.isProd){
        baseConfig.plugins.push(new htmlInjectionPlugin({injectPoint: true}));
    }
    // 多页开发环境启用html改动自动刷新插件。
    if(!isVue && !baseConfig.isProd) {
        baseConfig.plugins.push(new HtmlWebpackReloadPlugin());
    }
})();

module.exports = baseConfig;
