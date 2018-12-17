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
        test:'测试页',
        index: '主页',
        noAuth:'无权限',
        agreement: '代理协议',
        agentGame:'选择代理游戏',
        previousStore:'预存房卡',
        selectAgent: '选择代理',
        rechargeCenter: '充值中心',
        agentBind: '代理绑定',
        agentCode: '输入代理码',
        agentRegister: '代理注册',
        buyQuanCard: '充值圈卡',
        myNextAgent: '我的下级代理',
        myGamer: '我的玩家',
        rechargeView:'直充业绩查询',
        personalCenter:'个人中心',
        myFamily: '我的亲友圈',
        moreAction:'更多操作',
        cardOrder: '充圈卡、圈卡订单/记录',
        register: '创建登录账号',
        paySet: '支付设置',
        dividend:'分红',
        dividendDetail: '分红详情'
    }
};

/*自动检测多入口多页面配置*/
(()=>{
    // 只检测根目录
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
