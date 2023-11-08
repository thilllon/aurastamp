// 바벨 설정 파일(.babelrc.js)이 존재하면 next.js는 자동으로 swc 대신 babel을 컴파일러로 사용하기 때문에 빌드 속도가 상대적으로 느리다. 그래서 빌드시에는 바벨이 적용되지 않도록 해야한다. 그럼에도 불구하고 개발환경에서 바벨을 써야하는 이유는 mui에서 default import를 사용하지 않기 위함이다. 바벨을 쓰지 않으면 모든 mui 컴포넌트는 default import 해야한다. mui 예제를 보면 항상 이렇게 default import 하고있는 것을 볼 수 있다. named import를 한다면 사용하지도 않는 모든 모듈을 다 불러오게 된다. 특히 icons 같은 경우 사용하지 않는 모든 컴포넌트가 모두 import 되므로 번들 사이즈가 매우 커진다. 특히 개발 환경에서는 HMR을 사용중이므로 속도가 느려지는 것이 느껴진다. 따라서 named import를 쓰기 위해서는 어쩔 수 없이 바벨설정이 필요하다.

// 바벨 설정으로 인한 side effect
// @emotion의 css props 방식 스타일링 적용시
// babel 사용 안하면 tsconfig.json에서 jsxImportSource 설정만으로 가능
// babel 사용하면 @emotion/react, @emotion/babel-plugin 필요

// https://nextjs.org/docs/advanced-features/customizing-babel-config

const isProduction = process.env.NODE_ENV === 'production';

const presets = [
  [
    'next/babel',
    {
      // jsx pragma 없이 emotion css props 사용하기 위해 필요
      'preset-react': {
        runtime: 'automatic',
        importSource: '@emotion/react',
      },
    },
  ],
];

const plugins = [
  '@emotion/babel-plugin', // jsx pragma 없이 emotion css props 사용하기 위해 필요
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
  [
    'babel-plugin-import',
    { libraryName: '@mui/lab', libraryDirectory: '', camel2DashComponentName: false },
  ],
];

if (isProduction) {
  // plugins.push(['transform-remove-console', { exclude: ['warn', 'error'] }]);
  plugins.push(['transform-remove-console']);
  plugins.push('transform-remove-debugger');
}

module.exports = { presets, plugins };
