import 'react-image-crop/dist/ReactCrop.css';

import { ArrowUturnLeftIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { Indicator, Root } from '@radix-ui/react-checkbox';
import { CheckIcon, CheckboxIcon, ScissorsIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import type { ChangeEventHandler, SyntheticEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { Crop, PixelCrop } from 'react-image-crop';
import ReactImageCrop from 'react-image-crop';
import {
  STORAGE_KEY,
  canvasPreview,
  canvasToBlob,
  centerAspectCrop,
  toReadable,
} from './cropper.helper';
import { useDebounce } from './cropper.hooks';

const uploadButtonSize = 200 as const;

// TODO: undo 기능 추가할 것, 스타일 기능 추가할것

type CropperProps = {
  /**
   * upload button message
   */
  message?: string;
  /**
   * show preview image to be upload
   */
  showPreview?: boolean;
  /**
   * show image specification such as size, aspect ratio, etc.
   */
  showImageSpec?: boolean;
  showScaleController?: boolean;
  showRotateController?: boolean;
  showAspectRatioController?: boolean;
  /**
   * ?????????
   */
  freeze?: boolean;
  /**
   * Debounce delay time in second
   * @default 0.5
   */
  debounceDelay?: number;
  onChangeFile?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onCropEnd?: (blob: Blob, completedCrop?: PixelCrop) => void;
  onConfirmCrop?: (crop: PixelCrop | undefined, blob: Blob) => void;
  /**
   * @returns
   */
  onClearImage?: () => void;
};

type ImageStatus = 'ready' | 'editing' | 'processing';

type ImageEffect = {
  scale: number;
  rotate: number;
  aspectRatio?: number;
  crop?: Crop;
  cropCompleted?: PixelCrop;
};

type ImageData = {
  /**
   * Base64 encoded image source of current image
   */
  current?: string;
  /**
   * Base64 encoded image source of last image
   */
  last?: string;
  originalBlob: Blob | null;
  croppedBlobSize: number | null;
};

const defaultImageData: ImageData = {
  current: undefined,
  last: undefined,
  originalBlob: null,
  croppedBlobSize: null,
} as const;
const defaultImageEffect: ImageEffect = {
  rotate: 0,
  scale: 1,
  aspectRatio: undefined,
  crop: undefined,
  cropCompleted: undefined,
} as const;
const defaultImageStatus: ImageStatus = 'ready' as const;

export const Cropper = ({
  message: guideMessage = 'Drag & drop an image here, or click to select an image',
  showImageSpec = true,
  showPreview: showPreviewCanvas = true,
  showScaleController = false,
  showRotateController = false,
  showAspectRatioController = true,
  freeze = false,
  debounceDelay = 0.5,
  onChangeFile,
  onCropEnd,
  onConfirmCrop,
  onClearImage,
}: CropperProps) => {
  const [data, setData] = useState<ImageData>(defaultImageData);
  const [status, setStatus] = useState<ImageStatus>(defaultImageStatus);
  const [effect, setEffect] = useState<ImageEffect>(defaultImageEffect);

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useDebounce(
    async () => {
      if (imageRef.current && previewCanvasRef.current && effect.cropCompleted !== undefined) {
        // FIXME: remove imagePreview
        // const { previewUrl, blob } = await imagePreview(
        //   previewImageRef.current,
        //   cropCompleted,
        //   effect.scale,
        //   effect.rotate
        // );
        // canvasPreview is more performant than imagePreview.
        canvasPreview(
          imageRef.current,
          previewCanvasRef.current,
          effect.cropCompleted,
          effect.scale,
          effect.rotate
        );
        const croppedBlob = await canvasToBlob(previewCanvasRef.current);
        if (croppedBlob) {
          setData((d) => ({ ...d, croppedBlobSize: croppedBlob?.size }));
          onCropEnd?.(croppedBlob, effect.cropCompleted);
        }
      }
    },
    debounceDelay,
    [effect.cropCompleted, effect.scale, effect.rotate]
  );

  const onCropConfirm = async () => {
    if (!previewCanvasRef.current) {
      return;
    }
    const newBlob = await canvasToBlob(previewCanvasRef.current);
    if (newBlob) {
      // blob to base64
      const reader = new FileReader();
      reader.addEventListener('loadstart', () => {
        setStatus('processing');
      });
      reader.addEventListener('load', (event) => {
        setData((d) => ({ ...d, current: reader.result?.toString() }));
      });
      reader.addEventListener('loadend', () => {
        onConfirmCrop?.(effect.cropCompleted, newBlob);
        // FIXME: 다 날릴필요없고 현재 이미지의 디멘션은 저장해두는게 낫지않나
        setEffect((e) => ({
          ...e,
          aspectRatio: undefined,
          crop: undefined,
          cropCompleted: undefined,
        }));
        setStatus('ready');
      });
      reader.addEventListener('error', (event) => {
        console.error(event);
        setStatus('ready');
      });
      reader.readAsDataURL(newBlob);
    }
  };

  const onCropCancel = () => {
    setEffect((e) => ({ ...e, aspectRatio: undefined, crop: undefined, cropCompleted: undefined }));
    setStatus('ready');
  };

  const onCropReset = () => {
    setData((d) => ({ ...d, current: d.last }));
    setEffect((e) => ({ ...e, aspectRatio: undefined, crop: undefined, cropCompleted: undefined }));
    setStatus('ready');
  };

  const onClickClearImage = () => {
    setData((d) => ({ ...d, current: undefined, last: undefined, originalBlob: null }));
    setEffect(() => defaultImageEffect);
    setStatus('ready');
    onClearImage?.();
  };

  const onCropDragStart = () => {
    setStatus('editing');
  };

  const onCropDragEnd = () => {
    console.log('onDragEnd');
  };

  const onChangeImage: ChangeEventHandler<HTMLInputElement> = async (event) => {
    if (!(event.target.files && event.target.files.length > 0)) {
      return;
    }
    const file = event.target.files[0];
    setEffect((e) => defaultImageEffect); // makes crop preview update between images.
    setData((d) => ({ ...defaultImageData, originalBlob: file }));
    // blob to base64
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const imageSource = reader.result?.toString();
      setData((d) => ({ ...d, last: imageSource, current: imageSource }));
    });
    reader.addEventListener('error', () => {
      setData(() => defaultImageData);
    });
    reader.readAsDataURL(file);
    onChangeFile?.(event);
  };

  const onImageLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    if (typeof effect.aspectRatio === 'number') {
      return;
    }
    const { width, height } = event.currentTarget;
    setEffect((e) => ({
      ...e,
      crop: centerAspectCrop(width, height, effect.aspectRatio as number),
    }));
  };

  const onCropActivate = () => {
    if (imageRef.current && effect.aspectRatio !== undefined) {
      const { width, height } = imageRef.current;
      setEffect((e) => ({
        ...e,
        aspectRatio: effect.aspectRatio,
        crop: centerAspectCrop(width, height, effect.aspectRatio as number),
      }));
    }
    setStatus('editing');
  };

  const onCropUndo = () => {
    // TODO: undo crop
  };

  const onCheckFixAspectRatio = (event: SyntheticEvent<Element, Event>, checked: boolean) => {
    const currentAspect = effect.cropCompleted
      ? effect.cropCompleted.height / effect.cropCompleted.width
      : undefined;
    const newAspect = (event.target as any).checked ? currentAspect : undefined;
    setEffect((e) => ({ ...e, aspectRatio: newAspect }));
  };

  console.warn('preview', previewCanvasRef.current);

  return (
    <div style={{ borderWidth: 2, borderColor: 'blue', borderStyle: 'solid' }}>
      {showImageSpec && data.current && data.last && (
        <>
          <div style={{ fontSize: 8 }}>
            {`length: ${data.current.length.toLocaleString()}/${data.last.length.toLocaleString()}`}
          </div>
          <div style={{ fontSize: 8 }}>
            {data.croppedBlobSize !== null && `cropped image: ${toReadable(data.croppedBlobSize)}`}
          </div>
          <div style={{ fontSize: 8 }}>
            {`original image: ${toReadable(data.originalBlob?.size ?? 0)}`}
          </div>
          <div style={{ fontSize: 8 }}>{`aspect ratio: ${effect.aspectRatio ?? 'N/A'}`}</div>
        </>
      )}
      {/* -------------------------------- */}
      {/* Uploader */}
      {/* -------------------------------- */}
      {!data.current && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: uploadButtonSize,
            height: uploadButtonSize,
            maxWidth: uploadButtonSize,
            maxHeight: uploadButtonSize,
            borderRadius: 4,
            padding: 4,
            borderWidth: 2,
            borderColor: '#cccccc',
          }}
        >
          <label
            htmlFor="uploadButton"
            style={{
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              borderRadius: 4,
              borderWidth: 2,
              borderStyle: 'dashed',
              borderColor: '#cccccc',
              margin: 'auto',
              backgroundColor: '#eeeeee',
              // '&:hover': {
              //   backgroundColor: '#eeeeee',
              // },
              // '&:active': {
              //   backgroundColor: '#dddddd',
              // },
            }}
          >
            <input
              id="uploadButton"
              style={{ display: 'none' }}
              type="file"
              onChange={onChangeImage}
              // inputProps={{ accept: 'image/*' }} // 설정시 android에서 동작안함
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'nowrap',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* <ArrowUpTrayIcon scale={0.1} fontSize={2} /> */}
              {guideMessage && (
                <div style={{ fontSize: 14, textAlign: 'center' }}>{guideMessage}</div>
              )}
            </div>
          </label>
        </div>
      )}
      {/* -------------------------------- */}
      {/* Controller */}
      {/* -------------------------------- */}
      {(showScaleController || showRotateController) && (
        <div>
          {showScaleController && (
            <div>
              <label htmlFor="__cropper__scaleInput">scale: </label>
              <input
                id="__cropper__scaleInput"
                type="number"
                step="0.1"
                max={1}
                min={0}
                value={effect.scale}
                disabled={!data.current}
                onChange={(event) => {
                  setEffect((e) => ({
                    ...e,
                    scale: Math.min(1, Math.max(Number(event.target.value), 0)),
                  }));
                }}
              />
            </div>
          )}

          {showRotateController && (
            <div>
              <label htmlFor="__cropper__rotateInput">rotate: </label>
              <input
                id="__cropper__rotateInput"
                type="number"
                value={effect.rotate}
                disabled={!data.current}
                onChange={(event) => {
                  setEffect((e) => ({
                    ...e,
                    rotate: Math.min(180, Math.max(-180, Number(event.target.value))),
                  }));
                }}
              />
            </div>
          )}
        </div>
      )}
      {/* -------------------------------- */}
      {/* control buttons */}
      {/* -------------------------------- */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          marginBottom: 1,
          gap: 1,
        }}
      >
        {data.current && (
          <Button
            onClick={onCropReset}
            disabled={freeze || data.current === data.last}
            title="reset all effects"
          >
            <ArrowUturnLeftIcon style={{ width: 16 }} />
            reset crop
          </Button>
        )}

        {/* TODO: undo 기능 */}
        {/* {false && imageSourceBase64 && (
          <Button
            onClick={onClickUndoCrop}
            disabled={freeze || imageSourceBase64 === imageSourceBase64Original}
          >
            <ArrowLeftIcon />
            undo
          </Button>
        )} */}

        {data.current && (
          <Button disabled={freeze} onClick={onClickClearImage} title={'clear image'}>
            <XMarkIcon style={{ width: 16 }} />
            clear
          </Button>
        )}

        <div style={{ flex: 1 }} />

        {status === 'editing' && showAspectRatioController && (
          <div>
            {/* <form>
              <div className="flex items-center">
                <Root id="c1">
                  <Indicator className="text-violet11">
                    <CheckIcon />
                  </Indicator>
                </Root>
                <label htmlFor="c1">Fix aspect ratio</label>
              </div>
            </form> */}
            {/* FIXME: formcontroll을 plain으로 바꿔야하는데 */}
            {/* FIXME: formcontroll을 plain으로 바꿔야하는데 */}
            {/* FIXME: formcontroll을 plain으로 바꿔야하는데 */}
            {/* <FormControlLabel
              onChange={onCheckFixAspectRatio}
              // value="end"
              checked={Boolean(aspectRatio)}
              disabled={freeze}
              control={<Checkbox />}
              label="fix aspect"
              labelPlacement="end"
              componentsProps={{
                typography: {
                  fontSize: 14,
                  fontWeight: 500,
                },
              }}
            /> */}
          </div>
        )}

        {data.current && status === 'editing' && (
          <Button disabled={freeze} onClick={onCropCancel}>
            <XMarkIcon />
            cancel
          </Button>
        )}

        {data.current && status !== 'editing' && (
          <Button disabled={freeze || status === 'processing'} onClick={onCropActivate}>
            <ScissorsIcon />
            crop
          </Button>
        )}

        {/* {isCropProcessing && <CircularProgress />} */}

        {data.current && status === 'editing' && (
          <Button disabled={freeze || !previewCanvasRef.current} onClick={onCropConfirm}>
            <CheckboxIcon style={{ width: 16 }} />
            confirm
          </Button>
        )}
      </div>
      {/* -------------------------------- */}
      {/* image */}
      {/* -------------------------------- */}
      {data.current && (
        <ReactImageCrop
          locked={status !== 'editing'}
          onDragStart={onCropDragStart}
          onDragEnd={onCropDragEnd}
          crop={effect.crop}
          onChange={(_, percentCrop) => setEffect((e) => ({ ...e, crop: percentCrop }))}
          onComplete={(cropCompleted) => setEffect((e) => ({ ...e, cropCompleted }))}
          aspect={effect.aspectRatio}
          className="react-image-crop"
          // ReactCrop__child-wrapper
          // style={{ display: 'flex', justifyContent: 'center' }}
        >
          <img
            ref={imageRef}
            alt="current"
            src={data.current}
            style={{
              border: '8px solid red',
              maxHeight: '50vh',
              // transform: `scale(${effect.scale}) rotate(${effect.rotate}deg)`,
              scale: effect.scale,
              rotate: `${effect.rotate}deg`,
            }}
            onLoad={onImageLoad}
          />
        </ReactImageCrop>
      )}
      {/* -------------------------------- */}
      {/* preview of cropped image */}
      {/* -------------------------------- */}
      <pre>{JSON.stringify(effect.cropCompleted ?? {}, null, 2)}</pre>
      
      {effect.cropCompleted !== undefined && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <canvas
            hidden={!showPreviewCanvas}
            ref={previewCanvasRef}
            style={{
              border: '4px solid skyblue',
              objectFit: 'contain',
              width: effect.cropCompleted.width,
              height: effect.cropCompleted.height,
            }}
          />
        </div>
      )}
    </div>
  );
};
