'use client';

/* eslint-disable @next/next/no-img-element */
import 'react-image-crop/dist/ReactCrop.css';

import { CheckIcon, CropIcon, Cross1Icon, SunIcon, UploadIcon } from '@radix-ui/react-icons';
import { ChangeEventHandler, SyntheticEvent, useRef, useState } from 'react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import { useDebounce } from 'react-use';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { canvasPreview } from './image-editor/canvas-preview';

const debounceDelayMs = 200;

type CropperProps = {
  /**
   * default aspect ratio
   * @default 1
   */
  defaultAspectRatio?: number;
  hidePreview?: boolean;
  hideImageSpec?: boolean;
  showScaleController?: boolean;
  showRotateController?: boolean;
  showAspectRatioController?: boolean;
  onChangeFile?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onCropEnd?: (completedCrop: PixelCrop | undefined, blob: Blob) => void;
  freeze?: boolean;
  onConfirmCrop?: (crop: PixelCrop | undefined, blob: Blob) => void;
  onUnload?: () => void;
};

const canvasToBlob = async (canvas: HTMLCanvasElement): Promise<Blob | null> => {
  return new Promise((resolve) => {
    return canvas.toBlob(resolve, 'image/png', 0.7);
  });
};

const centerAspectCrop = (mediaWidth: number, mediaHeight: number, aspect: number) => {
  const crop = makeAspectCrop({ unit: '%', width: 90 }, aspect, mediaWidth, mediaHeight);
  return centerCrop(crop, mediaWidth, mediaHeight);
};

const toReadableSize = (bytes: number, decimalPlace = 1) => {
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

export const LegacyImageCropper = ({
  defaultAspectRatio: defaultAspect = 1,
  hideImageSpec = false,
  hidePreview: hidePreviewCanvas = false,
  showScaleController = false,
  showRotateController = false,
  showAspectRatioController = true,
  onChangeFile,
  onCropEnd,
  onConfirmCrop: onConfirmCropProp,
  onUnload,
  freeze = false,
}: CropperProps) => {
  const [sourceImageBase64, setImgSrcBase64] = useState('');
  const [imgSrcBase64Original, setImgSrcBase64Original] = useState('');
  const [originalBlob, setOriginalBlob] = useState<Blob>();
  const [croppedBlobSize, setCroppedBlobSize] = useState<number>();
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isCropProcessing, setIsCropProcessing] = useState(false); // for better UX
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined);

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useDebounce(
    async () => {
      if (imgRef.current && previewCanvasRef.current && typeof completedCrop !== 'undefined') {
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, scale, rotate);
        const croppedBlob = await canvasToBlob(previewCanvasRef.current);
        setCroppedBlobSize(croppedBlob?.size);
        if (croppedBlob) {
          onCropEnd?.(completedCrop, croppedBlob);
        }
      }
    },
    debounceDelayMs,
    [completedCrop, scale, rotate],
  );

  const onClickConfirmCrop = async () => {
    if (previewCanvasRef.current) {
      const newBlob = await canvasToBlob(previewCanvasRef.current);
      if (newBlob) {
        // --------------------------------
        // blob to base64
        // --------------------------------
        const reader = new FileReader();
        reader.onload = () => {
          const imgSrc = reader.result?.toString() || '';
          setImgSrcBase64(imgSrc);
        };
        reader.onloadend = () => {
          onConfirmCropProp?.(completedCrop, newBlob);
        };
        reader.readAsDataURL(newBlob);
      }
    }

    setCrop(undefined);
    setCompletedCrop(undefined);
    setIsEditMode(false);
    setAspectRatio(undefined);
  };

  const onClickCancelCropMode = () => {
    setCrop(undefined);
    setCompletedCrop(undefined);
    setIsEditMode(false);
    setAspectRatio(undefined);
  };

  const onClickResetImage = () => {
    setImgSrcBase64(imgSrcBase64Original);
    setCrop(undefined);
    setCompletedCrop(undefined);
    setIsEditMode(false);
    setAspectRatio(undefined);
  };

  const onClickUnloadImage = () => {
    setImgSrcBase64('');
    setImgSrcBase64Original('');
    setOriginalBlob(undefined);
    setCrop(undefined);
    setCompletedCrop(undefined);
    setIsEditMode(false);
    setAspectRatio(undefined);
    onUnload?.();
  };

  const onDragStart = () => {
    setIsEditMode(true);
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = async (ev) => {
    if (ev.target.files && ev.target.files.length > 0) {
      const newFile = ev.target.files[0];
      setCrop(undefined); // Makes crop preview update between images.
      setCompletedCrop(undefined);
      setOriginalBlob(newFile);
      // blob to base64
      const reader = new FileReader();
      reader.onload = () => {
        const imgSrc = reader.result?.toString() || '';
        setImgSrcBase64(imgSrc);
        setImgSrcBase64Original(imgSrc);
      };
      reader.readAsDataURL(newFile);
    } else {
      setOriginalBlob(undefined);
    }
    onChangeFile?.(ev);
  };

  const onImageLoad = (ev: SyntheticEvent<HTMLImageElement>) => {
    if (aspectRatio) {
      const { width, height } = ev.currentTarget;
      setCrop(centerAspectCrop(width, height, aspectRatio));
    }
  };

  const onClickStartCrop = () => {
    setIsEditMode(true);
    if (imgRef.current) {
      const { width, height } = imgRef.current;
      setAspectRatio(defaultAspect);
      setCrop(centerAspectCrop(width, height, defaultAspect));
    }
  };

  const onCheckFixAspectRatio = (ev: any) => {
    // TODO: defaultAspect가 아 니라 current aspect ratio 구하는걸로 향후 수정
    const currentAspect = defaultAspect;
    // const currentAspect = completedCrop ? completedCrop.height / completedCrop.width : 1;
    const newAspect = (ev.target as any).checked ? currentAspect : undefined;
    setAspectRatio(newAspect);
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      {!hideImageSpec && (
        <>
          <span>
            {`length: ${sourceImageBase64.length.toLocaleString()} / ${imgSrcBase64Original.length.toLocaleString()}`}
          </span>
          <span>
            {`size: ${toReadableSize(croppedBlobSize ?? 0)} / ${toReadableSize(
              originalBlob?.size ?? 0,
            )}`}
          </span>
        </>
      )}

      {/* -------------------------------- */}
      {/* Uploader */}
      {/* -------------------------------- */}

      {!sourceImageBase64 && (
        <label
          htmlFor='uploader'
          className='flex flex-col flex-nowrap justify-center items-center rounded-lg border-2 border-solid border-blue-500 p-1'
          style={{ width: 160, height: 160, maxWidth: 160, maxHeight: 160 }}
        >
          <div className='cursor-pointer flex justify-center items-center w-full h-full rounded-lg border-2 border-dashed border-gray-400 hover:border-gray-500 hover:bg-gray-100 active:bg-gray-200'>
            <Input
              id='uploader'
              type='file'
              className='hidden'
              // inputProps={{ accept: 'image/*' }} // 설정시 android에서 동작안함
              onChange={onChange}
            />
            <div className='flex flex-col flex-nowrap justify-center items-center'>
              <UploadIcon />
            </div>
          </div>
        </label>
      )}

      {/* -------------------------------- */}
      {/* Controller */}
      {/* -------------------------------- */}

      {(showScaleController || showRotateController) && (
        <div>
          {showScaleController && (
            <div>
              <label htmlFor='scale-input'>Scale: </label>
              <input
                id='scale-input'
                type='number'
                step='0.1'
                value={scale}
                disabled={!sourceImageBase64}
                onChange={(ev) => setScale(Number(ev.target.value))}
              />
            </div>
          )}

          {showRotateController && (
            <div>
              <label htmlFor='rotate-input'>Rotate: </label>
              <input
                id='rotate-input'
                type='number'
                value={rotate}
                disabled={!sourceImageBase64}
                onChange={(ev) => setRotate(Math.min(180, Math.max(-180, Number(ev.target.value))))}
              />
            </div>
          )}
        </div>
      )}

      {/* -------------------------------- */}
      {/* Buttons at the top */}
      {/* -------------------------------- */}

      <div className='flex flex-row flex-nowrap justify-center items-center w-full mb-1 gap-1'>
        {isEditMode && showAspectRatioController && (
          <div>
            <div className='items-top flex space-x-2'>
              <Checkbox
                id='aspect'
                onChange={onCheckFixAspectRatio}
                value={'end'}
                checked={Boolean(aspectRatio)}
                disabled={freeze}
              />

              <div className='grid gap-1.5 leading-none'>
                <label
                  htmlFor='aspect'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  Fix aspect ratio
                </label>
                <p className='text-sm text-muted-foreground'>To fix ratio of width/height</p>
              </div>
            </div>
          </div>
        )}

        <div className='mr-auto' />

        {sourceImageBase64 && !isEditMode && (
          <Button
            className='gap-2'
            onClick={onClickResetImage}
            disabled={freeze || sourceImageBase64 === imgSrcBase64Original}
          >
            <SunIcon />
            사진원본으로 되돌리기
          </Button>
        )}

        {sourceImageBase64 && isEditMode && (
          <Button className='gap-2' disabled={freeze} onClick={onClickCancelCropMode}>
            <Cross1Icon />
            crop 기능 끄기
          </Button>
        )}

        {sourceImageBase64 && !isEditMode && (
          <Button
            className='gap-2'
            disabled={freeze || isCropProcessing}
            onClick={onClickStartCrop}
          >
            <CropIcon />
            crop
            {/* {isCropProcessing && <CircularProgress />} */}
          </Button>
        )}

        {sourceImageBase64 && isEditMode && (
          <Button className='gap-2' disabled={freeze} onClick={onClickConfirmCrop}>
            <CheckIcon />
            confirm
          </Button>
        )}
      </div>

      {/* -------------------------------- */}
      {/* Cropped image */}
      {/* -------------------------------- */}

      {sourceImageBase64 && (
        <ReactCrop
          locked={!isEditMode}
          onDragStart={onDragStart}
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(compCrop) => setCompletedCrop(compCrop)}
          aspect={aspectRatio}
        >
          <img
            draggable={false}
            ref={imgRef}
            alt='Crop me'
            src={sourceImageBase64}
            style={{
              maxHeight: '50vh',
              transform: `scale(${scale}) rotate(${rotate}deg)`,
            }}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      )}

      {/* -------------------------------- */}
      {/* Preview */}
      {/* -------------------------------- */}

      {completedCrop !== undefined && (
        <div className='flex justify-center items-center'>
          <canvas
            hidden={hidePreviewCanvas}
            ref={previewCanvasRef}
            className='object-contain'
            style={{
              width: completedCrop.width,
              height: completedCrop.height,
            }}
          />
        </div>
      )}

      {/* -------------------------------- */}
      {/* Buttons at the bottom */}
      {/* -------------------------------- */}

      <div className='mt-1 flex justify-center gap-1'>
        {sourceImageBase64 && (
          <Button
            className='gap-2'
            onClick={onClickResetImage}
            disabled={freeze || sourceImageBase64 === imgSrcBase64Original}
          >
            <SunIcon />
            reset
          </Button>
        )}

        {sourceImageBase64 && (
          <Button className='gap-2' disabled={freeze} onClick={onClickUnloadImage}>
            <Cross1Icon />
            unload
          </Button>
        )}
      </div>
    </div>
  );
};
