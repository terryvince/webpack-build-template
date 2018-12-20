module.exports = {
    'plugins': [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-class-properties',
        ['@babel/plugin-proposal-decorators',{legacy: true}],
        '@babel/plugin-proposal-export-namespace-from',
        '@babel/plugin-proposal-function-sent',
        '@babel/plugin-proposal-json-strings',
        '@babel/plugin-proposal-numeric-separator',
        '@babel/plugin-proposal-throw-expressions',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-syntax-import-meta'
    ],
    'presets': [['@babel/preset-env', {
        'modules': 'commonjs',
        'targets': {
            'browsers': [
                'iOS >= 6',
                'Android > 4.1',
                'not ie <= 8'
            ]
        }
    }]
    ]
};
