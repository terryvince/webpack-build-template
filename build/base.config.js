const {resolve,join,basename,extname} = require('path');
const fs = require('fs');
const src = resolve(__dirname, '../src');
const root = resolve(__dirname, '../');
const htmlWebpackPlugin = require('html-webpack-plugin');

let baseConfig = {
    root,
    src,
    dist: resolve(__dirname, '../dist'),
    app:'template of mutiple page',
    lang: 'zhCN',
    entry: {main: resolve(src,'main.js')},
    plugins: [],
    isProd: process.env.NODE_ENV === 'production',
    devServer: {
        clientLogLevel: 'warning',
        contentBase: join(__dirname, '../.temp'),
        compress: true,
        host: '192.168.1.159',
        port: 9000,
        progress: true,
        stats: { colors: true, errors:true, errorDetails:true, modules:false, entrypoints:false }
    },
    title:{
        test:'template test'
    }
};

/*自动检测多入口多页面配置*/
(()=>{
    // 只src检测根目录
    let entrys=fs.readdirSync(src).filter(fileName=>extname(fileName)==='.js');
    let pages = fs.readdirSync(src).filter(fileName=>extname(fileName)==='.html');
    let entryOb={};
    entrys.forEach((filename)=>{
        if(filename!=='main.js')
        {
            let name = basename(filename, '.js');
            entryOb[name]=resolve(src,filename);
        }
    });
    pages.forEach((filename)=>{
        let htmlWebpack = new htmlWebpackPlugin({
            filename: filename,
            template: resolve(src, filename),
            // hash: true, // 为静态资源生成hash值
            // minify: true,
            // xhtml: true,
            inject: baseConfig.isProd ? 'body': 'head'  //使用vue时需要等待文档加载完毕再引入，body后引入,如果html内联有script标签要注意顺序，最好放在body之后html之前
        });
        baseConfig.plugins.push(htmlWebpack);
    });
    Object.assign(baseConfig.entry,entryOb);
})();

module.exports = baseConfig;
