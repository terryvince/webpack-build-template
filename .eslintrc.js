module.exports = {
    "env": {
            "browser": true,
            "commonjs": true,
            "node": true,
            "es6": true,
            "jest": true,
            },
    "extends": ["eslint:recommended","plugin:vue/essential"],
    "plugins": ["vue"],
    // "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "parser": "@typescript-eslint/parser",
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 8,
        "sourceType": "module",
        "useJSXTextNode": true,
        "project": "./tsconfig.json",
        "tsconfigRootDir": "./",
        "extraFileExtensions": [".vue"]
    },
    "rules": {
    "no-console":0,
        "indent": ["error", 4],
        "linebreak-style": ["error", "windows"],
        "quotes": ["error", "single"],
        // "semi": ["error", "always"],
        "no-unused-vars": [1, {"vars": "all", "args": "after-used"}]
    }
};
