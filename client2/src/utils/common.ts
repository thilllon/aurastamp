export const n2d = (linuxTime: number, timeZone = 'Asia/Seoul', locale = 'ko-KR') =>
  new Date(linuxTime).toLocaleString(locale, { timeZone });

import { Locale } from '@/utils/locale';
// --------------------------------
// --------------------------------
import crypto from 'crypto';
import { formatDuration, intervalToDuration } from 'date-fns';
import { customAlphabet } from 'nanoid';

export const genId = customAlphabet('1234567890abcdef', 10);

export const sleep = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));

export const readableFileSize = (bytes: number, decimalPlace = 1) => {
  const thresh = 1024;
  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }
  const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let idx = -1;
  const r = 10 ** decimalPlace;

  do {
    bytes /= thresh;
    ++idx;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && idx < units.length - 1);

  return bytes.toFixed(decimalPlace) + ' ' + units[idx];
};

export const extractAlphaNumeric = (str: string) => str.replace(/[^0-9A-Z]+/gi, '');

export const calculateTimeLeft = (date: Date = new Date()): string[] => {
  const duration = intervalToDuration({ start: new Date(date), end: new Date() });
  const timeLeft = formatDuration(duration, { delimiter: ' ', zero: true })
    .split(' ')
    .filter((v) => v !== '' && !isNaN(parseInt(v)));
  return timeLeft;
};

// eslint-disable-next-line no-sparse-arrays
export const nthSuffix = (n: number) => [, 'st', 'nd', 'rd'][(n / 10) % 10 ^ 1 && n % 10] || 'th';

export const loadSdk = ({
  id,
  src,
}: {
  id: string;
  src: `//${string}` | `https://${string}` | `http://${string}`;
}): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const tags = document.querySelectorAll(`script#${id}`);
    tags?.forEach((tag) => tag.remove());
    const scriptTag: HTMLScriptElement = document.createElement('script');
    scriptTag.id = id;
    scriptTag.src = src;
    scriptTag.onload = resolve;
    document.body.append(scriptTag);
  });
};

export const loadKakaoSdk = () => {
  return loadSdk({ id: 'kakao-sdk', src: '//developers.kakao.com/sdk/js/kakao.min.js' });
};

export const download = (blob: Blob | MediaSource | null | undefined, fileName: string) => {
  if (!window || !window.URL || !document || typeof blob === 'undefined' || blob === null) {
    return;
  }
  const previewUrl = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.download = fileName;
  anchor.href = URL.createObjectURL(blob);
  anchor.click();
  window.URL.revokeObjectURL(previewUrl);
};

export const buildFullName = (
  firstName: string,
  lastName: string,
  // locale: string = (typeof window !== 'undefined' && window?.navigator?.language) ?? Locale.ko_KR,
  locale: string,
  censored = false
) => {
  // locale에 따라서 성-이름, 이름-성 순서를 정해서 full name을 만들어주는 함수
  // https://www.reuters.com/article/us-japan-names-idUSKCN1VR1LE

  if (locale === Locale.ko_KR) {
    if (censored) {
      // TODO: *개수와 cencored char 개수 일치시킬것인가?
      // TODO: family name이 길면 이름이랑 같이 자름?
      // TODO: 외자인경우 어떻게 자를것인가?
      return lastName + '*' + firstName.slice(-1);
    } else {
      return lastName + firstName;
    }
  } else if (locale === Locale.zh || locale === Locale.ja_JP || locale === Locale.ja) {
    if (censored) {
      // TODO: *개수와 cencored char 개수 일치시킬것인가?
      // TODO: family name이 길면 이름이랑 같이 자름?
      // TODO: 외자인경우 어떻게 자를것인가?
      return lastName + '*' + firstName.slice(-1);
    } else {
      return lastName + ' ' + firstName;
    }
  }
  return firstName + ' ' + lastName;
};

export const getUserLocale = () => {
  // https://stackoverflow.com/questions/25606730/get-current-locale-of-chrome
  if (window.navigator.languages) {
    return window.navigator.languages[0];
  } else {
    return (window.navigator as any).userLanguage ?? window.navigator.language;
  }
};

export const isDemo = () => {
  return (
    typeof window !== 'undefined' &&
    (window?.location?.hostname === 'staging.proved.work' ||
      window?.location?.hostname === 'www.proved.work' ||
      window?.location?.hostname === 'proved.work')
  );
};
