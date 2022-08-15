const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  env: { node: true, browser: true, es2021: true },
  rules: {
    'no-empty': 'warn',
    'no-empty-pattern': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'no-debugger': isProduction ? 'error' : 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@next/next/no-img-element': 'warn',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    'react/display-name': 'off',
    'react/no-unescaped-entities': 'off',
    'react/jsx-max-props-per-line': ['warn', { maximum: 4, when: 'multiline' }],
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@mui/styles', '@emotion/styled'],
            message: 'Use `@mui/material/styles` instead',
          },
          {
            group: ['@mui/system'],
            message: 'Use `@mui/material` instead',
          },
          {
            group: ['next/link'],
            message: 'Use custom `Link` component instead',
          },
          {
            group: ['@mui/material'],
            importNames: ['Link'],
            message: 'Use custom `Link` component instead',
          },
          {
            group: ['src/*'], // ['import2/*', '!import2/good'],
            message: 'Usage of absolute path is not allowed',
          },
        ],
      },
    ],
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
  },
  ignorePatterns: [
    '**/.scripts/**/*',
    '**/.legacy/**',
    'next.config.js',
    '.eslint*',
    'types/**',
    'transforms/**',
    '**/*.mdx',
    'mdx/**',
  ],
};
