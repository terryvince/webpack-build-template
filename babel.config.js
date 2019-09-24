module.exports = {
    'plugins': [
        ["@babel/plugin-transform-runtime", {"corejs": 3}],
        ['@babel/plugin-proposal-decorators',{legacy: true}],           //装饰器支持
        ['@babel/plugin-proposal-class-properties',{loose: true}],      //class支持
        '@babel/plugin-proposal-export-namespace-from',                 //支持export * as ns from 'mod';
        '@babel/plugin-proposal-function-sent',                         //支持generator
        '@babel/plugin-syntax-dynamic-import',                          //动态导入
        '@babel/plugin-proposal-throw-expressions',                     //支持throw表达式
        '@babel/plugin-syntax-import-meta',
        '@babel/plugin-proposal-json-strings',
    ],
    'presets': [
        ['@babel/preset-env', {'modules': 'commonjs'}],
    // ['@vue/babel-preset-jsx']   //启用jsx语法
    ]
};
