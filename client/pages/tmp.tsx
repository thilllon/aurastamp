/* eslint-disable @next/next/no-img-element */
import { Box, Container } from '@mui/material';
import React, { ChangeEventHandler, SyntheticEvent, useEffect, useRef, useState } from 'react';
import ReactCrop, { centerCrop, Crop, makeAspectCrop, PixelCrop } from 'react-image-crop';
import { useDebounce } from 'react-use';
import 'react-image-crop/dist/ReactCrop.css';

export default function TmpPage() {
  return (
    <div>
      <Container maxWidth='sm' sx={{ mt: 10, border: '2px solid' }}>
        <Cropper />{' '}
      </Container>
    </div>
  );
}

export const Cropper = () => {
  const [imgSrc, setImgSrc] = useState('');
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(16 / 9);

  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        console.info('previeUrl', previewUrl.slice(0, 20));
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, []);

  const onClickConfirmCrop = () => {
    //
  };
  const onClickResetCrop = () => {
    setCrop(undefined);
    setCompletedCrop(undefined);
    setImgSrc('');
  };
  const onClickPreviousImage = () => {
    //
  };

  const onSelectFile: ChangeEventHandler<HTMLInputElement> = (ev) => {
    if (ev.target.files && ev.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.onload = () => setImgSrc(reader.result?.toString() || '');
      reader.readAsDataURL(ev.target.files[0]);
    }
  };

  const onImageLoad = (ev: SyntheticEvent<HTMLImageElement>) => {
    if (aspect) {
      const { width, height } = ev.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  };

  const debounced = useDebounce(
    async () => {
      if (imgRef.current && previewCanvasRef.current && typeof completedCrop !== 'undefined') {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, scale, rotate);
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  const handleToggleAspectClick = () => {
    if (aspect) {
      setAspect(undefined);
    } else if (imgRef.current) {
      const { width, height } = imgRef.current;
      setAspect(16 / 9);
      setCrop(centerAspectCrop(width, height, 16 / 9));
    }
  };

  return (
    <>
      <div>
        <input
          type='file'
          // accept='image/*'
          onChange={onSelectFile}
        />
        <div>
          <label htmlFor='scale-input'>Scale: </label>
          <input
            id='scale-input'
            type='number'
            step='0.1'
            value={scale}
            disabled={!imgSrc}
            onChange={(e) => setScale(Number(e.target.value))}
          />
        </div>

        <Box>
          <label htmlFor='rotate-input'>Rotate: </label>
          <input
            id='rotate-input'
            type='number'
            value={rotate}
            disabled={!imgSrc}
            onChange={(e) => setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))}
          />
        </Box>

        <div>
          <button onClick={handleToggleAspectClick}>Toggle aspect {aspect ? 'off' : 'on'}</button>
        </div>
      </div>

      {/* // -------------------------------- */}

      {Boolean(imgSrc) && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(crop) => setCompletedCrop(crop)}
          aspect={aspect}
        >
          AAAAAAAAAA
          <img
            ref={imgRef}
            alt='Crop me'
            src={imgSrc}
            style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
            onLoad={onImageLoad}
          />
          bbbbbbbbbbbbb
        </ReactCrop>
      )}
      {/* // -------------------------------- */}
      {typeof completedCrop !== 'undefined' && (
        <canvas
          ref={previewCanvasRef}
          style={{
            border: '1px solid black',
            objectFit: 'contain',
            width: completedCrop.width,
            height: completedCrop.height,
          }}
        />
      )}
      {/* // -------------------------------- */}
      <button onClick={onClickConfirmCrop}>fix</button>
      <button onClick={onClickResetCrop}>reset</button>
      <button onClick={onClickPreviousImage}>previous</button>
    </>
  );
};
const TO_RADIANS = Math.PI / 180;

export const canvasPreview = async (
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop,
  scale = 1,
  rotate = 0
) => {
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

export const toBlob = async (canvas: HTMLCanvasElement): Promise<Blob | null> => {
  return new Promise((resolve) => canvas.toBlob(resolve));
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
  const blob = await toBlob(canvas);

  // 기존 previewUrl이 있는 경우
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
  }

  if (!blob) {
    return null;
  }

  previewUrl = URL.createObjectURL(blob);
  return previewUrl;
};

export const centerAspectCrop = (mediaWidth: number, mediaHeight: number, aspect: number) => {
  const crop = makeAspectCrop({ unit: '%', width: 90 }, aspect, mediaWidth, mediaHeight);
  return centerCrop(crop, mediaWidth, mediaHeight);
};
