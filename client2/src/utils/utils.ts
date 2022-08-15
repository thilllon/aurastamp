import fs from 'fs';
import path from 'path';

export const getZZZUrls = () => {
  const urls = fs
    .readdirSync(path.join(process.cwd(), 'pages/zzz'))
    .map((elem) => '/zzz/' + elem.replace('.tsx', ''));
  return urls;
};
