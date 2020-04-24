module.exports = {
  extends: [
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'airbnb-typescript',
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
};
