module.exports = {
    'moduleFileExtensions': [
        'js',
        'vue',
        'ts'
    ],
    'transform': {
        '^.+\\.ts$': 'ts-jest',
        '^.+\\.vue$': 'vue-jest'
    },
    'testRegex': '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
    'transformIgnorePatterns': [
        'node_modules/*'
    ]
};