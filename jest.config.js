module.exports = {
    'moduleFileExtensions': [
        'js',
        'vue',
        'ts'
    ],
    'transform': {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.ts$': 'ts-jest',
        '^.+\\.vue$': 'vue-jest'
    },
    'testRegex': '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
    'transformIgnorePatterns': [
        'node_modules/*'
    ],
    'moduleNameMapper': {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    // 'collectCoverage': true,     //收集代码覆盖率报告，等待时间长
    // 'collectCoverageFrom': ['**/*.{js,vue}', '!**/node_modules/**'],
    // 'coverageReporters': ['html', 'text-summary']
};