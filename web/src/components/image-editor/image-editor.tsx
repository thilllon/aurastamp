/* eslint-disable @next/next/no-img-element */
'use client';

import 'react-image-crop/dist/ReactCrop.css';

import { Button } from '@/components/ui/button';
import { blobToDataUrl, cn } from '@/libs/utils';
import { CropIcon } from 'lucide-react';
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
import { canvasPreview } from './canvas-preview';
import { centerAspectCrop } from './controls';
import { useDebounceEffect } from './use-debounce';

const initialControls = { scale: 1, rotate: 0, aspect: undefined };

type Base64DataUrl = string; // data:image/png;base64,xxxx
type BlobDataUrl = string; // blob:http://localhost:3000/xxxx

/**
 * @see https://blog.logrocket.com/how-to-build-an-image-picker-using-react-native-image-crop-picker/
 */
export function ImageEditor({
  image,
  originalImage,
  onConfirm,
  onCrop,
}: {
  image: Base64DataUrl;
  originalImage: Base64DataUrl;
  onConfirm: (event: MouseEvent<HTMLButtonElement>, dataUrl: Base64DataUrl) => void;
  onCrop: (event: MouseEvent<HTMLButtonElement>, dataUrl: Base64DataUrl) => void;
}) {
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const imageSourceRef = useRef<Base64DataUrl>(image);
  const blobUrlRef = useRef<BlobDataUrl>(''); // 다운받을때만 쓰고 항상 비워진채로 유지하기
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
  const originalImageRef = useRef<Base64DataUrl>(originalImage);

  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [controls, setControls] = useState<{
    scale: number;
    rotate: number;
    aspect: number | undefined; // aspect=width/height
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
    // prevent memory leak by remove previous image's blob reference
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
    blobUrlRef.current = URL.createObjectURL(blob);
    hiddenAnchorRef.current!.href = blobUrlRef.current;
    hiddenAnchorRef.current!.click();
    _destroyBlob();
  }

  function onChangeAspect(event: FormEvent<HTMLButtonElement>) {
    // console.log(event);
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

  async function onClickConfirm(event: MouseEvent<HTMLButtonElement>): Promise<void> {
    // await _downloadImage();
    // slightly different from "reset" handler
    // imageSourceRef.current = '';
    // _destroyBlob();
    // setCrop(undefined);
    // setCompletedCrop(undefined);
    // setControls(initialControls);

    onConfirm(event, imageSourceRef.current);
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

  function onClickCancelEdit() {
    imageSourceRef.current = originalImageRef.current;
    _destroyBlob();
    setCrop(undefined);
    setCompletedCrop(undefined);
    setControls(initialControls);
  }

  async function onClickCrop(event: MouseEvent<HTMLButtonElement>) {
    imageSourceRef;
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
    const blob = await offscreen.convertToBlob({ type: 'image/png', quality: 1 });
    blobToDataUrl(blob, (dataUrl) => {
      imageSourceRef.current = String(dataUrl);
      // onCrop(event, blobUrlRef.current);
      _destroyBlob();

      // imageSourceRef 가 업뎃될때는 다시한번 그려줘야하니까 useState로 바꿔야하나?
      // 근데 그러면 초기로딩할때 한번깜빡일거같은데
      // 이렇게 처리하자
      // setX((x) => x * -1);
      setCrop(undefined);

      // blobUrlRef.current = URL.createObjectURL(blob);
      // // hiddenAnchorRef.current!.href = blobUrlRef.current;
      // // hiddenAnchorRef.current!.click();
      // console.log(blobUrlRef.current);
    });
  }

  return (
    <div>
      {/* {controlScale && (
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
      )} */}

      <div>
        {/* <ControlFixingAspect checked={Boolean(controls.aspect)} onChange={onChangeAspect} /> */}

        {/* <Button
          className='w-full'
          variant={'outline'}
          disabled={!completedCrop}
          onClick={onClickDownload}
        >
          Download
        </Button> */}
      </div>

      {Boolean(completedCrop) && (
        <a
          download
          href='#hidden'
          ref={hiddenAnchorRef}
          className='absolute -left-96 -top-96 hidden'
        />
      )}

      {Boolean(imageSourceRef.current) && (
        <div className='flex items-center justify-center object-contain'>
          <ReactCrop
            crop={crop}
            onChange={onChangeCrop}
            onComplete={onCompleteCrop}
            aspect={controls.aspect}
            keepSelection={false}
          >
            <img
              draggable={false}
              src={imageSourceRef.current}
              alt={'editable image'}
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
          className='hidden object-contain'
          style={{ width: completedCrop?.width, height: completedCrop?.height }}
        />
      )}

      <div className='mt-4 flex items-center justify-center gap-2'>
        <Button
          className={cn('w-full gap-2')}
          variant={'outline'}
          disabled={!completedCrop}
          onClick={onClickCancelEdit}
        >
          {'Cancel'}
        </Button>

        {/* 이건 ui로 해결해야할듯. 그냥 외부 누르면 크롭 꺼지도록 */}
        {/* keepSelection={false} 이걸로 해결 */}
        {/* <Button
          className={cn('w-full')}
          variant={'outline'}
          disabled={!completedCrop}
          // onClick={onClickResetEdit}
        >
          크롭 취소
        </Button> */}

        <Button
          className={cn('w-full', crop ? 'hidden' : null)}
          variant={'default'}
          disabled={!completedCrop}
          onClick={onClickConfirm}
        >
          Confirm
        </Button>

        <Button
          className={cn('w-full gap-2', crop ? null : 'hidden')}
          disabled={false}
          variant={'outline'}
          onClick={onClickCrop}
        >
          Crop
          <CropIcon />
        </Button>
      </div>
    </div>
  );
}
