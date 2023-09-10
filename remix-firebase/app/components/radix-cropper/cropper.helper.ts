import type { PixelCrop } from 'react-image-crop';
import { centerCrop, makeAspectCrop } from 'react-image-crop';

const TO_RADIANS = Math.PI / 180;

export const canvasPreview = async (
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop,
  scale = 1,
  rotate = 0
) => {
  console.info('## canvasPreview');

  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  // const pixelRatio = window.devicePixelRatio;
  const pixelRatio = 1;

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = 'high';

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const rotateRads = rotate * TO_RADIANS;
  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  ctx.save();

  // 5) Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY);
  // 4) Move the origin to the center of the original position
  ctx.translate(centerX, centerY);
  // 3) Rotate around the origin
  ctx.rotate(rotateRads);
  // 2) Scale the image
  ctx.scale(scale, scale);
  // 1) Move the center of the image to the origin (0,0)
  ctx.translate(-centerX, -centerY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  ctx.restore();
};

export const canvasToBlob = async (
  canvas: HTMLCanvasElement,
  type = 'image/png',
  quality = 0.7
): Promise<Blob | null> => {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
};

let previewUrl = '';

// Returns an image source you should set to state and pass
// `{previewSrc && <img alt="Crop preview" src={previewSrc} />}`
export const imagePreview = async (
  image: HTMLImageElement,
  crop: PixelCrop,
  scale = 1,
  rotate = 0
) => {
  const canvas = document.createElement('canvas');
  canvasPreview(image, canvas, crop, scale, rotate);
  const blob = await canvasToBlob(canvas);

  // 기존 previewUrl이 있는 경우
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
  }

  if (!blob) {
    return null;
  }

  previewUrl = URL.createObjectURL(blob);
  return { previewUrl, blob };
};

/**
 *
 * @param mediaWidth
 * @param mediaHeight
 * @param aspect
 * @returns
 */
export const centerAspectCrop = (mediaWidth: number, mediaHeight: number, aspect: number) => {
  const crop = makeAspectCrop({ unit: '%', width: 90 }, aspect, mediaWidth, mediaHeight);
  return centerCrop(crop, mediaWidth, mediaHeight);
};

/**
 * Convert bytes to human readable numbers with unit
 * @param bytes
 * @param decimalPlace
 * @returns
 */
export const toReadable = (bytes: number, decimalPlace = 1) => {
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

export const STORAGE_KEY = '__image__';

export const saveToLocalstorage = (data: ArrayBuffer, key = STORAGE_KEY, type = 'image/png') => {
  const uint8Array = new Uint8Array(data); // convert to unsigned int8 array
  const raw = String.fromCharCode(...uint8Array); // take UTF-16 code to binary string
  const base64 = btoa(raw); // convert binary to ascii(base64)
  const dataURL = `data:${type};base64,` + base64; // a DataURL is a Base64 string with a header
  localStorage.setItem(key, dataURL);
};
