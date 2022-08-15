#!/usr/bin/env node

// Following setting is required before run this code
// At .vscode/settings.json, add following option:
// "editor.codeActionsOnSave"."source.organizeImports" = true

const fs = require('fs');
const glob = require('globby');
const { path: rootDir } = require('app-root-path');
const path = require('path');

const main = async () => {
  const included = [
    ...[path.join(rootDir, 'pages/**/*.tsx')].map((p) => p.split(path.sep).join('/')),
    ...[path.join(rootDir, 'src/**/*.tsx')].map((p) => p.split(path.sep).join('/')),
  ];
  const excluded = [];

  const manipulate = (filePath, from = "from '@/", to = "from '@@@@/") => {
    const file = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'w+' });
    const replaced = file.replaceAll(from, to);
    fs.writeFileSync(filePath, replaced, { encoding: 'utf8', flag: 'w+' });
  };

  const restore = (filePath, from = "from '@/", to = "from '@@@@/") => {
    const file = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'w+' });
    const replaced = file.replaceAll(from, to);
    fs.writeFileSync(filePath, replaced, { encoding: 'utf8', flag: 'w+' });
  };

  const files = await glob([...included, , ...excluded]);
  files.map((filePath) => manipulate(filePath));
  files.map((filePath) => restore(filePath));
};

main();
