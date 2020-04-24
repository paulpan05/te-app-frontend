module.exports = {
  extends: [
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'airbnb-typescript',
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    'react/no-array-index-key': 'off',
    'operator-linebreak': 'off',
    'react/prop-types': 'off',
  },
};
