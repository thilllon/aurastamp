import { DependencyList, useCallback, useEffect, useRef } from 'react';
import { centerCrop, makeAspectCrop, PixelCrop } from 'react-image-crop';

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
  const pixelRatio = window.devicePixelRatio;
  // const pixelRatio = 1

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

let previewUrl = '';

console.log('🚀 ~ file: tmp.tsx ~ line 86 ~ previewUrl', previewUrl);

export const canvasToBlob = async (canvas: HTMLCanvasElement): Promise<Blob | null> => {
  console.info('## canvasToBlob');

  return new Promise((resolve) => {
    return canvas.toBlob(resolve, 'image/png', 0.7);
  });
};

// Returns an image source you should set to state and pass
// `{previewSrc && <img alt="Crop preview" src={previewSrc} />}`
export const imgPreview = async (
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

export const centerAspectCrop = (mediaWidth: number, mediaHeight: number, aspect: number) => {
  const crop = makeAspectCrop({ unit: '%', width: 90 }, aspect, mediaWidth, mediaHeight);
  return centerCrop(crop, mediaWidth, mediaHeight);
};

// --------------------------------
// --------------------------------
// --------------------------------

// https://github.com/streamich/react-use/blob/master/src/useTimeoutFn.ts
export type UseTimeoutFnReturn = [() => boolean | null, () => void, () => void];
export const useTimeoutFn = (fn: Function, ms = 0): UseTimeoutFnReturn => {
  const ready = useRef<boolean | null>(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const callback = useRef(fn);

  const isReady = useCallback(() => ready.current, []);

  const set = useCallback(() => {
    ready.current = false;
    timeout.current && clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      ready.current = true;
      callback.current();
    }, ms);
  }, [ms]);

  const clear = useCallback(() => {
    ready.current = null;
    timeout.current && clearTimeout(timeout.current);
  }, []);

  // update ref when function changes
  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  // set on mount, clear on unmount
  useEffect(() => {
    set();
    return clear;
  }, [clear, ms, set]);

  return [isReady, clear, set];
};
export type UseDebounceReturn = [() => boolean | null, () => void];

export const useDebounce = (fn: Function, ms = 0, deps: DependencyList = []): UseDebounceReturn => {
  const [isReady, cancel, reset] = useTimeoutFn(fn, ms);
  useEffect(reset, [reset, ...deps]);
  return [isReady, cancel];
};
