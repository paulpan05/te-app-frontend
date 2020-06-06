module.exports = {
  extends: [
    'react-app',
    'airbnb-typescript',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/prop-types': 'off',
    'array-callback-return': 'off',
    'react/no-array-index-key': 'off',
    'import/no-cycle': 'off',
  },
};
