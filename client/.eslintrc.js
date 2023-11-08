module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['next/core-web-vitals', 'eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  env: {
    node: true,
    browser: true,
    es2021: true,
    jest: true,
  },
  rules: {
    'no-restricted-imports': [
      'error',
      {
        paths: [
          '@mui/styles', // use `@mui/material/styles` instead
        ],
      },
    ],
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-empty-function': ['off'],
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/ban-types': 'off',
  },
  ignorePatterns: ['**/.scripts/**/*.{ts,tsx}', 'next.config.js'],
};
