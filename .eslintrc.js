module.exports = {
    "env": {
            "browser": true,
            "commonjs": true,
            "node": true,
            "es6": true
            },
        "extends": ["eslint:recommended"],
        "plugins": [],
        "parser": "babel-eslint",
        "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
                "experimentalObjectRestSpread": true
        },
        "ecmaVersion": 8,
            "sourceType": "module"
    },
        "rules": {
        "no-console":0,
            "indent": ["error", 4],
            "linebreak-style": ["error", "windows"],
            "quotes": ["error", "single"],
            "semi": ["error", "always"],
            "no-unused-vars": [1, {"vars": "all", "args": "after-used"}]
    }
};
