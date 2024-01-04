const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = {
  root: true,
  globals: {
    wp: true,
  },
  rules: {},
  parser: '@typescript-eslint/parser',
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
      webpack: {
        config: 'webpack.config.js',
      },
    },
  },
  plugins: ['@typescript-eslint'],
  extends: ['plugin:prettier/recommended'],
};
