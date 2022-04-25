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
