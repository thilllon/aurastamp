/* eslint-disable @next/next/no-img-element */
'use client';

import 'react-image-crop/dist/ReactCrop.css';

import clsx from 'clsx';
import { ChangeEvent, MouseEvent, SyntheticEvent, useRef, useState } from 'react';
import ReactCrop, { Crop, PercentCrop, PixelCrop, convertToPixelCrop } from 'react-image-crop';
import { Button } from '../ui/button';
import { canvasPreview } from './canvas-preview';
import { useDebounceEffect } from './use-debounce';
import {
  ControlFixingAspect,
  ControlRotate,
  ControlScale,
  centerAspectCrop,
} from './callback-functions';

const initialControls = { scale: 1, rotate: 0, aspect: undefined };

// logrocket 블로그 참조한 크로퍼
export default function LogRocketCropper({
  controlScale,
  controlRotate,
  controlAspect,
  onCropEnd,
}: {
  controlScale?: boolean;
  controlRotate?: boolean;
  controlAspect?: boolean;
  onCropEnd: (image: File | Blob) => void;
}) {
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const blobUrlRef = useRef<string>('');
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
  const form1234Ref = useRef<HTMLFormElement>(null);

  const [imageSource, setImageSource] = useState(''); // original image
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [controls, setControls] = useState<{
    scale: number;
    rotate: number;
    aspect: number | undefined; // width/height
  }>(initialControls);

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imageRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imageRef.current,
          previewCanvasRef.current,
          completedCrop,
          controls.scale,
          controls.rotate,
        );
      }
    },
    100,
    [completedCrop, controls.scale, controls.rotate],
  );

  function onSelectFile(event: ChangeEvent<HTMLInputElement>): void {
    if (event.target.files && event.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener('load', () => setImageSource(reader.result?.toString() || ''));
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  function onImageLoad(event: SyntheticEvent<HTMLImageElement>): void {
    if (controls.aspect) {
      const { width, height } = event.currentTarget;
      setCrop(centerAspectCrop(width, height, controls.aspect, 0.9));
    }
  }

  async function onClickDownloadImage() {
    const image = imageRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error('Crop canvas does not exist');
    }

    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
    );
    const context = offscreen.getContext('2d');
    if (!context) {
      throw new Error('No 2d context');
    }

    context.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height,
    );
    // You might want { type: "image/jpeg", quality: <0 to 1> } to reduce image size
    const blob = await offscreen.convertToBlob({ type: 'image/png' });
    if (blobUrlRef.current) {
      // remove previous image's blobUrlRef
      URL.revokeObjectURL(blobUrlRef.current);
    }
    blobUrlRef.current = URL.createObjectURL(blob);
    hiddenAnchorRef.current!.href = blobUrlRef.current;
    hiddenAnchorRef.current!.click();
  }

  function onClickToggleAspect() {
    if (controls.aspect) {
      setControls({ ...controls, aspect: undefined });
      return;
    }

    if (imageRef.current) {
      const { width, height } = imageRef.current;
      // TODO: 이전에 crop이 있었으면 그것을 기준으로 aspect를 잡아야 한다.
      const aspect = width / height;
      const newCrop = centerAspectCrop(width, height, aspect, 0.9);
      setControls({ ...controls, aspect });
      setCrop(newCrop);
      setCompletedCrop(convertToPixelCrop(newCrop, width, height));
    }
  }

  function onChangeScale(event: ChangeEvent<HTMLInputElement>) {
    setControls({ ...controls, scale: Number(event.target.value) });
  }

  function onChangeRotate(event: ChangeEvent<HTMLInputElement>) {
    setControls({
      ...controls,
      rotate: Math.min(180, Math.max(-180, Number(event.target.value))),
    });
  }

  function onClickCancelCrop(event: MouseEvent): void {
    console.log(event);
    // TODO: crop을 끝내고,
  }

  function onClickConfirmCrop(event: MouseEvent): void {
    console.log(event);
    // onCropEnd();
  }

  function onChangeCrop(crop: PixelCrop, percentCrop: PercentCrop): void {
    // console.warn(crop, percentCrop);
    // PixelCrop: width, ehight, x, y, unit='px'
    // PercentCrop
    setCrop(percentCrop);
  }

  function onCompleteCrop(crop: PixelCrop, percentCrop: PercentCrop): void {
    setCompletedCrop(crop);
    console.warn(crop, percentCrop);
  }

  function onClickReset() {
    // previewCanvasRef.current = null;
    // imageRef.current = null;
    // hiddenAnchorRef.current?.href = null;

    if (blobUrlRef.current) {
      // remove previous image's blobUrlRef
      URL.revokeObjectURL(blobUrlRef.current);
    }
    blobUrlRef.current = '';
    setImageSource('');
    setCrop(undefined);
    setCompletedCrop(undefined);
    setControls(initialControls);
    form1234Ref.current?.reset();
  }

  return (
    <div>
      <div className='' aria-description='crop controls'>
        <label
          htmlFor='uploadButton'
          className={clsx(
            'flex justify-center items-center border-2 border-slate-900 p-1 hover:bg-slate-100',
            'w-[8rem]',
            'h-[8rem]',
            'min-w-[8rem]',
            'min-h-[8rem]',
          )}
        >
          <form
            name='form1234'
            ref={form1234Ref}
            className={clsx(
              'cursor-pointer flex justify-center items-center w-full h-full border-2 border-dashed border-slate-700 m-auto min-h-[100px]',
              // 'w-[8rem]',
              // 'h-[8rem]',
              // 'min-w-[8rem]',
              // 'min-h-[8rem]',
            )}
          >
            <input
              id='uploadButton'
              className='hidden'
              type='file'
              accept='image/*'
              onChange={onSelectFile}
            />
            <div className='flex flex-col flex-nowrap justify-center items-center'>
              <span className='text-center select-none text-slate-600 overflow-hidden over'>
                Click to upload image
              </span>
            </div>
          </form>
        </label>
        {controlScale && (
          <ControlScale
            disabled={Boolean(imageSource)}
            scale={controls.scale}
            onChange={onChangeScale}
          />
        )}
        {controlRotate && (
          <ControlRotate
            disabled={Boolean(imageSource)}
            rotate={controls.rotate}
            onChange={onChangeRotate}
          />
        )}
        {controlAspect && (
          <ControlFixingAspect fixed={Boolean(controls.aspect)} onClick={onClickToggleAspect} />
        )}
      </div>

      {Boolean(completedCrop) && (
        <div>
          <Button onClick={onClickDownloadImage}>Download Crop</Button>
          <a
            download
            href='#hidden'
            ref={hiddenAnchorRef}
            className='hidden absolute -top-96 -left-96'
          />
        </div>
      )}

      {Boolean(completedCrop) && (
        <div>
          <Button onClick={onClickCancelCrop}>크롭 나가기</Button>
          <Button onClick={onClickConfirmCrop}>크롭 확인</Button>
        </div>
      )}

      <div>
        <Button onClick={onClickReset}>Reset All</Button>
      </div>

      {Boolean(imageSource) && (
        <ReactCrop
          crop={crop}
          onChange={onChangeCrop}
          onComplete={onCompleteCrop}
          aspect={controls.aspect}
          keepSelection={true}
          // minWidth={400}
          // minHeight={200}
        >
          <img
            src={imageSource}
            alt={'target image'}
            ref={imageRef}
            style={{ scale: controls.scale, rotate: `${controls.rotate}deg` }}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      )}

      {Boolean(completedCrop) && (
        <canvas
          ref={previewCanvasRef}
          className='object-contain'
          style={{ width: completedCrop?.width, height: completedCrop?.height }}
        />
      )}
    </div>
  );
}
