module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/destructuring-assignment': 0,
    'react/no-access-state-in-setstate': 0,
    'react/prop-types': 0,
    'react/prefer-stateless-function': 0,
  },
};
