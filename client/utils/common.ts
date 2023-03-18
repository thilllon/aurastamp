import crypto from 'crypto';
import { formatDuration, intervalToDuration } from 'date-fns';
import { customAlphabet } from 'nanoid';
import { validate as validateUuid } from 'uuid';

export const genId = customAlphabet('1234567890abcdef', 10);

export const sleep = (amount = 0) => new Promise((resolve) => setTimeout(resolve, amount));

export const toReadableSize = (bytes: number, decimalPlace = 1) => {
  const threshold = 1024;
  if (Math.abs(bytes) < threshold) {
    return bytes + ' B';
  }
  const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let idx = -1;
  const r = 10 ** decimalPlace;
  do {
    bytes /= threshold;
    ++idx;
  } while (Math.round(Math.abs(bytes) * r) / r >= threshold && idx < units.length - 1);
  return bytes.toFixed(decimalPlace) + ' ' + units[idx];
};

export const extractAlphaNumeric = (str: string) => {
  const extracted = str.replace(/[^0-9A-Z]+/gi, '');
  return extracted;
};

export const makeItemId = (title: string) => {
  const hash = crypto.createHash('md5').update(title).digest('hex');
  const tmp = extractAlphaNumeric(title);
  return tmp.slice(0, 10) + '-' + hash.slice(0, 10);
};

export const calculateTimeLeft = (date: Date = new Date()): string[] => {
  const duration = intervalToDuration({ start: new Date(date), end: new Date() });
  const timeLeft = formatDuration(duration, { delimiter: ' ', zero: true })
    .split(' ')
    .filter((v) => v !== '' && !isNaN(parseInt(v)));
  return timeLeft;
};

// eslint-disable-next-line no-sparse-arrays
export const nthSuffix = (n: number) => [, 'st', 'nd', 'rd'][(n / 10) % 10 ^ 1 && n % 10] || 'th';

export const isUuid = validateUuid;

export const getRandomColor = () => {
  // 256*256*256
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

export const download = (blob: Blob | MediaSource, fileName: string) => {
  const previewUrl = window?.URL?.createObjectURL?.(blob);
  const anchor = window?.document?.createElement('a');
  anchor.download = fileName;
  anchor.href = previewUrl;
  anchor.click();
  setTimeout(() => window?.URL?.revokeObjectURL?.(previewUrl), 0);
  window?.URL?.revokeObjectURL?.(previewUrl);
};
export const downloadBuffer = (
  arrayBuffer: any,
  fileName: string,
  mimetype = 'application/octet-stream'
) => {
  const anchor = document.createElement('a');
  // const previewUrl = URL.createObjectURL(new Blob([arrayBuffer], { type: mimetype }));
  const previewUrl = URL.createObjectURL(new Blob([arrayBuffer]));
  anchor.href = previewUrl;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(previewUrl);
};

export const downloadBase64String = (base64String: string, fileName: string) => {
  const downloadLink = document.createElement('a');
  downloadLink.download = fileName;
  // downloadLink.innerHTML = 'Download File';
  downloadLink.href = 'data:image/png;base64,' + base64String;
  downloadLink.click();
};

export const base64ToBlob = (base64String: string, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(base64String); // TODO: deprecated. Buffer.from으로 변경할 예정
  // const byteCharacters = Buffer.from(b64Data, 'base64');

  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

export const replaceURL = (inputText: string) => {
  // const exp = /(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/ig;
  // const exp =/(?:^|\b)((((https?|ftp|file|):\/\/)|[\w.])+\.[a-z]{2,3}(?:\:[0-9]{1,5})?(?:\/.*)?)([,\s]|$)/ig; /* eslint-disable-line */
  const exp =
    /(?:^|\b)(([\w+]+\:\/\/)?([\w\d-]+\.)*[\w-]+[\.\:]\w+([\/\?\=\&\#\.]?[\w-]+)*\/?)([,\s]|$)/gi; /* eslint-disable-line */
  let temp = inputText.replace(exp, '<a href="$1" target="_blank">$1</a>');
  let result = '';

  while (temp.length > 0) {
    const pos = temp.indexOf('href="');
    if (pos == -1) {
      result += temp;
      break;
    }
    result += temp.substring(0, pos + 6);

    temp = temp.substring(pos + 6, temp.length);
    if (temp.indexOf('://') > 8 || temp.indexOf('://') == -1) {
      result += 'http://';
    }
  }
  return result;
};
