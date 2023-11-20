/* eslint-disable @next/next/no-img-element */
'use client';

import 'react-image-crop/dist/ReactCrop.css';

import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import ReactCrop, { Crop, PercentCrop, PixelCrop } from 'react-image-crop';
import { Button } from '../ui/button';
import { canvasPreview } from './canvas-preview';
import { ControlFixingAspect, ControlRotate, ControlScale, centerAspectCrop } from './controls';
import { useDebounceEffect } from './use-debounce';

const initialControls = { scale: 1, rotate: 0, aspect: undefined };

export type OnConfirmEdit = (image: File | Blob) => void;

/**
 * @see https://blog.logrocket.com/how-to-build-an-image-picker-using-react-native-image-crop-picker/
 */
export function LogRocketCropper({
  image,
  originalImage,
  onConfirmEdit,
  controlScale = false,
  controlRotate = false,
  controlAspect = true,
}: {
  image: string;
  originalImage: string;
  onConfirmEdit: OnConfirmEdit;
  controlScale?: boolean;
  controlRotate?: boolean;
  controlAspect?: boolean;
}) {
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const blobUrlRef = useRef<string>('');
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
  const originalImageRef = useRef<string>(originalImage);
  const imageSourceRef = useRef<string>(image);

  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [controls, setControls] = useState<{
    scale: number;
    rotate: number;
    aspect: number | undefined; // width/height
  }>(initialControls);

  useEffect(() => {
    return () => {
      _destroyBlob();
    };
  }, []);

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imageRef.current &&
        previewCanvasRef.current
      ) {
        // We use `canvasPreview` as it's much faster than `imagePreview`.
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

  function _destroyBlob() {
    // remove previous image's blobUrlRef
    // prevent memory leak
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
    }
    blobUrlRef.current = '';
  }

  function onLoadImage(event: SyntheticEvent<HTMLImageElement>): void {
    if (controls.aspect) {
      const { width, height } = event.currentTarget;
      setCrop(centerAspectCrop(width, height, controls.aspect, 0.9));
    }
  }

  async function _downloadImage() {
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
    _destroyBlob();
    blobUrlRef.current = URL.createObjectURL(blob);
    hiddenAnchorRef.current!.href = blobUrlRef.current;
    hiddenAnchorRef.current!.click();
  }

  function onChangeAspect(event: FormEvent<HTMLButtonElement>) {
    console.log(event);

    // if (controls.aspect) {
    //   setControls({ ...controls, aspect: undefined });
    //   return;
    // }

    // if (imageRef.current) {
    //   const { width, height } = imageRef.current;
    //   // TODO: 이전에 crop이 있었으면 그것을 기준으로 aspect를 잡아야 한다.
    //   const aspect = width / height;
    //   const newCrop = centerAspectCrop(width, height, aspect, 0.9);
    //   setControls({ ...controls, aspect });
    //   setCrop(newCrop);
    //   setCompletedCrop(convertToPixelCrop(newCrop, width, height));
    // }
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

  async function onClickConfirmEdit(event: MouseEvent): Promise<void> {
    // await _downloadImage();

    // slightly different from "reset" handler
    // imageSourceRef.current = '';
    // _destroyBlob();
    // setCrop(undefined);
    // setCompletedCrop(undefined);
    // setControls(initialControls);
    onConfirmEdit(new File([blobUrlRef.current!], 'image.png') as Blob);
  }

  function onChangeCrop(crop: PixelCrop, percentCrop: PercentCrop): void {
    setCrop(percentCrop);
  }

  function onCompleteCrop(crop: PixelCrop, percentCrop: PercentCrop): void {
    setCompletedCrop(crop);
  }

  async function onClickDownload() {
    await _downloadImage();
  }

  function onClickResetEdit() {
    imageSourceRef.current = originalImageRef.current;
    _destroyBlob();
    setCrop(undefined);
    setCompletedCrop(undefined);
    setControls(initialControls);
  }

  return (
    <div>
      {controlScale && (
        <ControlScale
          disabled={Boolean(imageSourceRef.current)}
          scale={controls.scale}
          onChange={onChangeScale}
        />
      )}
      {controlRotate && (
        <ControlRotate
          disabled={Boolean(imageSourceRef.current)}
          rotate={controls.rotate}
          onChange={onChangeRotate}
        />
      )}
      {controlAspect && (
        <ControlFixingAspect checked={Boolean(controls.aspect)} onChange={onChangeAspect} />
      )}

      {Boolean(completedCrop) && (
        <a
          download
          href='#hidden'
          ref={hiddenAnchorRef}
          className='hidden absolute -top-96 -left-96'
        />
      )}

      {Boolean(imageSourceRef.current) && (
        <div className='object-contain flex justify-center items-center'>
          <ReactCrop
            crop={crop}
            onChange={onChangeCrop}
            onComplete={onCompleteCrop}
            aspect={controls.aspect}
            keepSelection={true}
          >
            <img
              draggable={false}
              src={imageSourceRef.current}
              alt={'target image'}
              ref={imageRef}
              style={{ scale: controls.scale, rotate: `${controls.rotate}deg` }}
              onLoad={onLoadImage}
            />
          </ReactCrop>
        </div>
      )}

      {/* canvas preview is required to download the edit image */}
      {Boolean(completedCrop) && (
        <canvas
          ref={previewCanvasRef}
          className='object-contain hidden'
          style={{ width: completedCrop?.width, height: completedCrop?.height }}
        />
      )}

      <div className='flex justify-center items-center gap-2 mt-4'>
        <Button
          className='w-full'
          variant={'outline'}
          disabled={!completedCrop}
          onClick={onClickDownload}
        >
          Download
        </Button>

        <Button
          className='w-full'
          variant={'outline'}
          disabled={!completedCrop}
          onClick={onClickResetEdit}
        >
          되돌리기
        </Button>

        <Button
          className='w-full'
          variant={'default'}
          disabled={!completedCrop}
          onClick={onClickConfirmEdit}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}
