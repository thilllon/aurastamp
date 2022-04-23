export const setTimestamp = () => {
  // NOTE: fs에서 빌드 에러. commonjs 따로 분리할것

  if (typeof window !== 'undefined') {
    return;
  }
  // // eslint-disable-next-line @typescript-eslint/no-var-requires
  // const fs = require('fs');
  // // eslint-disable-next-line @typescript-eslint/no-var-requires
  // const path = require('path');
  // // eslint-disable-next-line @typescript-eslint/no-var-requires
  // const { path: rootDir } = require('app-root-path');

  // fs.writeFileSync(path.join(rootDir, 'timestamp'), Date.now().toString());

  // // NOTE: child_process 이용하는 방식
  // // exec('sh hi.sh', (error, stdout, stderr) => {
  // //   console.log(stdout);
  // //   console.log(stderr);
  // //   if (error !== null) {
  // //     console.log(`exec error: ${error}`);
  // //   }
  // // });
};

export const getTimestamp = (fileName = 'timestamp', timeZone = 'Asia/Seoul', locale = 'ko-KR') => {
  // NOTE: fs에서 빌드 에러. commonjs 따로 분리할것
  if (typeof window !== 'undefined') {
    return;
  }
  // // eslint-disable-next-line @typescript-eslint/no-var-requires
  // const fs = require('fs');
  // // eslint-disable-next-line @typescript-eslint/no-var-requires
  // const path = require('path');
  // // eslint-disable-next-line @typescript-eslint/no-var-requires
  // const { path: rootDir } = require('app-root-path');

  // try {
  //   const line = fs.readFileSync(path.join(rootDir, fileName), 'utf-8');
  //   const date = new Date(parseInt(line.replaceAll('\n', '').replaceAll('\r\n', '')));
  //   const localeDate = date.toLocaleString(locale, { timeZone });
  //   console.log(date, localeDate);
  //   return { date, localeDate };
  // } catch (err) {
  //   console.error(err);
  //   return { date: undefined, localeDate: undefined };
  // }
};
