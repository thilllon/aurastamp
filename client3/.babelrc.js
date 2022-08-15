// https://nextjs.org/docs/advanced-features/customizing-babel-config
const presets = [
  [
    'next/babel',
    // {
    //   // jsx pragma 없이 사용하기 위해 필요
    //   'preset-react': {
    //     runtime: 'automatic',
    //     importSource: '@emotion/react',
    //   },
    // },
  ],
];

const plugins = [
  [
    'babel-plugin-import',
    { libraryName: '@mui/material', libraryDirectory: '', camel2DashComponentName: false },
    'core',
  ],
  [
    'babel-plugin-import',
    { libraryName: '@mui/icons-material', libraryDirectory: '', camel2DashComponentName: false },
    'icons',
  ],
];

const isRemote = !!process.env.VERCEL_ENV;

if (isRemote) {
  plugins.push(['transform-remove-console', { exclude: ['error'] }]);
}

module.exports = { presets, plugins };
