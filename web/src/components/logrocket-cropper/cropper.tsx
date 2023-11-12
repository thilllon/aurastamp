/* eslint-disable @next/next/no-img-element */
'use client';

import 'react-image-crop/dist/ReactCrop.css';

import Image from 'next/image';
import React, {
  ChangeEvent,
  ChangeEventHandler,
  MouseEvent,
  MouseEventHandler,
  SyntheticEvent,
  useRef,
  useState,
} from 'react';
import ReactCrop, {
  Crop,
  PercentCrop,
  PixelCrop,
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from 'react-image-crop';
import { Button } from '../ui/button';
import { canvasPreview } from './canvas-preview';
import { useDebounceEffect } from './use-debounce';

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop({ unit: '%', width: 90 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight,
  );
}

function ControlScale({
  disabled,
  scale,
  onChange,
}: {
  disabled?: boolean;
  scale?: number;
  onChange: ChangeEventHandler;
}) {
  return (
    <div>
      <label htmlFor="scale-input">Scale: </label>
      <input
        id="scale-input"
        type="number"
        step="0.1"
        value={scale}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
}

function ControlRotate({
  disabled,
  rotate,
  onChange,
}: {
  disabled?: boolean;
  rotate?: number;
  onChange: ChangeEventHandler;
}) {
  return (
    <div>
      <label htmlFor="rotate-input">Rotate: </label>
      <input
        id="rotate-input"
        type="number"
        value={rotate}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
}

function ControlFixingAspect({
  fixed,
  onClick,
}: {
  fixed?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <Button onClick={onClick} variant={fixed ? 'default' : 'secondary'}>
      {fixed ? 'fixed' : 'not fixed'}
    </Button>
  );
}

const defaultAspect = 16 / 9;

export default function RocketCropper({
  controlScale,
  controlRotate,
  controlAspect,
}: {
  controlScale?: boolean;
  controlRotate?: boolean;
  controlAspect?: boolean;
}) {
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const blobUrlRef = useRef('');
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
  const [imageSource, setImageSource] = useState('');
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [controls, setControls] = useState<{
    scale: number;
    rotate: number;
    aspect: number | undefined;
  }>({ scale: 1, rotate: 0, aspect: defaultAspect });

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
      setCrop(centerAspectCrop(width, height, controls.aspect));
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
    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
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

    // FIXME: defaultAspect 대신 이미지 aspect를 가져오기
    const aspect = defaultAspect;
    setControls({ ...controls, aspect });
    if (imageRef.current) {
      const { width, height } = imageRef.current;
      const newCrop = centerAspectCrop(width, height, aspect);
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

  function onClickLeaveCrop(event: MouseEvent): void {
    console.log(event);
  }

  function onClickConfirmCrop(event: MouseEvent): void {
    console.log(event);
  }

  function onChangeCrop(crop: PixelCrop, percentCrop: PercentCrop): void {
    setCrop(percentCrop);
  }

  function onCompleteCrop(crop: PixelCrop, percentCrop: PercentCrop): void {
    setCompletedCrop(crop);
  }

  return (
    <div>
      <div className="" aria-description="crop controls">
        <input type="file" accept="image/*" onChange={onSelectFile} />
        {controlScale && (
          <ControlScale disabled={!imageSource} scale={controls.scale} onChange={onChangeScale} />
        )}
        {controlRotate && (
          <ControlRotate
            disabled={!imageSource}
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
            href="#hidden"
            ref={hiddenAnchorRef}
            className="hidden absolute -top-96 -left-96"
          />
        </div>
      )}

      {Boolean(completedCrop) && (
        <div>
          <Button onClick={onClickLeaveCrop}>나가기</Button>
          <Button onClick={onClickConfirmCrop}>확인</Button>
        </div>
      )}

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
            style={{
              scale: controls.scale,
              rotate: `${controls.rotate}deg`,
              // transform: `scale(${controlValues.scale}) rotate(${controlValues.rotate}deg)`,
            }}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      )}

      {Boolean(completedCrop) && (
        <canvas
          ref={previewCanvasRef}
          className="object-contain"
          style={{
            width: completedCrop?.width,
            height: completedCrop?.height,
          }}
        />
      )}
    </div>
  );
}
