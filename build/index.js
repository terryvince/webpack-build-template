const isPro = process.env.NODE_ENV === 'production';
const config = isPro ? require('./webpack.pro.config'): require('./webpack.dev.config');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server/lib/Server');
const chalk = require('chalk');
const devServer = config.devServer;
const compiler = webpack(config);

let isFirst = true;

if(!isPro){
    const {port,host}  = devServer;
    const devServerOptions = Object.assign({}, devServer);
    const server = new WebpackDevServer(compiler, devServerOptions);
    server.listen(port, host);
    compiler.hooks.done.tap('done',()=>{
        if(isFirst){
            let str = `Your application run on ${host}:${port} , please open brower to view.`;
            console.log(chalk.green.bold(str));
            isFirst = false;
        }
    })
}else{
    compiler.run((err, stats) => {
        if (err) {
            console.log(chalk.red.bold(err.stack || err));
            if (err.details) {
                console.log(chalk.red.bold(err.details));
            }
            return;
        }
        const info = stats.toJson();

        if (stats.hasErrors()) {
            console.log(chalk.red.bold(info.errors));
            return;
        }

        if (stats.hasWarnings()) {
            console.log(chalk.yellow.bold(info.warnings));
        }
        process.exit();
    });
}