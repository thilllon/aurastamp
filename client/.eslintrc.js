const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:cypress/recommended',
    // 'plugin:prettier/recommended',
    // 'plugin:storybook/recommended',
    // 'plugin:cypress/recommended',
  ],
  env: {
    node: true,
    browser: true,
    es2021: true,
    jest: true,
  },
  // parserOptions: {
  //   ecmaFeatures: {
  //     jsx: true,
  //   },
  //   sourceType: 'module',
  // },
  rules: {
    'react/display-name': 'off',
    // https://github.com/facebook/react/issues/22545
    'react-hooks/exhaustive-deps': 'error',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          '@mui/styles', // use `@mui/material/styles` instead
          // 'next/link', // use custom `Link` component instead
        ],
      },
    ],
    'no-debugger': isProduction ? 'error' : 'off',
    'no-empty-pattern': 'off',
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': ['off'],
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      isProduction ? 'off' : 'off',
      {
        // vars: 'all',
        // args: 'after-used',
        // argsIgnorePattern: '^_|___&|^next$',
        // varsIgnorePattern: '^_|___&|^React&',
        // caughtErrorsIgnorePattern: '^_',
      },
    ],
    // '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    // '@next/next/no-img-element': 'off',
  },
  ignorePatterns: ['**/.scripts/**/*.{ts,tsx}'],
};
