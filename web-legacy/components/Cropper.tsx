import 'react-image-crop/dist/ReactCrop.css';

import {
  ArrowBack as ArrowBackIcon,
  Check as CheckIcon,
  CloseOutlined as CloseOutlinedIcon,
  Crop as CropIcon,
  Restore as RestoreIcon,
  Upload as UploadIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Input,
  Typography,
} from '@mui/material';
import { ChangeEventHandler, SyntheticEvent, useRef, useState } from 'react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import { useDebounce } from 'react-use';

// TODO: undo 기능 추가할 것, 스타일 기능 추가할것

const TO_RADIANS = Math.PI / 180;
const buttonHeight = 36; // button height in pixel
const uploadButtonSize = 200;
const debounceDelay = 200; // ms

type CropperProps = {
  guideMessage?: string;
  defaultAspect?: number;
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

// const base64ToBlob = (base64String: string, contentType = '', sliceSize = 512) => {
//   const byteCharacters = atob(base64String); // TODO: deprecated. Buffer.from으로 변경할 예정
//   // const byteCharacters = Buffer.from(b64Data, 'base64');
//   const byteArrays = [];
//   for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
//     const slice = byteCharacters.slice(offset, offset + sliceSize);
//     const byteNumbers = new Array(slice.length);
//     for (let i = 0; i < slice.length; i++) {
//       byteNumbers[i] = slice.charCodeAt(i);
//     }
//     const byteArray = new Uint8Array(byteNumbers);
//     byteArrays.push(byteArray);
//   }
//   const blob = new Blob(byteArrays, { type: contentType });
//   return blob;
// };

const canvasPreview = async (
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

const canvasToBlob = async (canvas: HTMLCanvasElement): Promise<Blob | null> => {
  console.info('## canvasToBlob');

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

export const Cropper = ({
  guideMessage,
  defaultAspect = 1,
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
  const [imgSrcBase64, setImgSrcBase64] = useState('');
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
    debounceDelay,
    [completedCrop, scale, rotate]
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

  const onClickCancelCrop = () => {
    setCrop(undefined);
    setCompletedCrop(undefined);
    setIsEditMode(false);
    setAspectRatio(undefined);
  };

  const onClickResetCrop = () => {
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
    if (typeof aspectRatio !== 'undefined') {
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

  const onClickUndoCrop = () => {
    // TODO: undo crop
  };

  const onCheckFixAspectRatio: (event: SyntheticEvent<Element, Event>, checked: boolean) => void = (
    ev
  ) => {
    // TODO: defaultAspect가 아니라 current aspect ratio 구하는걸로 향후 수정
    const currentAspect = defaultAspect;
    // const currentAspect = completedCrop ? completedCrop.height / completedCrop.width : 1;
    const newAspect = (ev.target as any).checked ? currentAspect : undefined;
    setAspectRatio(newAspect);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {!hideImageSpec && (
        <>
          <Typography>
            {`length: ${imgSrcBase64.length.toLocaleString()} / ${imgSrcBase64Original.length.toLocaleString()}`}
          </Typography>
          <Typography>
            {`size: ${toReadableSize(croppedBlobSize ?? 0)} / ${toReadableSize(
              originalBlob?.size ?? 0
            )}`}
          </Typography>
        </>
      )}

      {/* -------------------------------- */}
      {/* Uploader */}
      {/* -------------------------------- */}

      {!imgSrcBase64 && (
        <Box
          htmlFor='uploadbutton'
          component='label'
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: uploadButtonSize,
            height: uploadButtonSize,
            maxWidth: uploadButtonSize,
            maxHeight: uploadButtonSize,
            borderRadius: 2,
            border: '2px solid #cccccc',
            p: 1,
          }}
        >
          <Box
            sx={{
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              borderRadius: 2,
              border: '2px dashed #cccccc',
              m: 'auto',
              '&:hover': {
                backgroundColor: '#eeeeee',
              },
              '&:active': {
                backgroundColor: '#dddddd',
              },
            }}
          >
            <Input
              id='uploadbutton'
              type='file'
              // inputProps={{ accept: 'image/*' }} // 설정시 android에서 동작안함
              sx={{ display: 'none' }}
              onChange={onChange}
            />
            <Box
              sx={{
                display: 'flex',
                flexFlow: 'column nowrap',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <UploadIcon sx={{ fontSize: 40, color: '#cccccc' }} />
              {guideMessage && (
                <Typography
                  sx={{
                    userSelect: 'none',
                    color: '#cccccc',
                    textAlign: 'center',
                    maxHeight: (theme) => theme.spacing(6),
                    textOverflow: 'hidden',
                    overflow: 'hidden',
                  }}
                >
                  {guideMessage}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      )}

      {/* -------------------------------- */}
      {/* Controller */}
      {/* -------------------------------- */}

      {(showScaleController || showRotateController) && (
        <Box>
          {showScaleController && (
            <Box>
              <label htmlFor='scale-input'>Scale: </label>
              <input
                id='scale-input'
                type='number'
                step='0.1'
                value={scale}
                disabled={!imgSrcBase64}
                onChange={(ev) => setScale(Number(ev.target.value))}
              />
            </Box>
          )}

          {showRotateController && (
            <Box>
              <label htmlFor='rotate-input'>Rotate: </label>
              <input
                id='rotate-input'
                type='number'
                value={rotate}
                disabled={!imgSrcBase64}
                onChange={(ev) => setRotate(Math.min(180, Math.max(-180, Number(ev.target.value))))}
              />
            </Box>
          )}
        </Box>
      )}

      {/* -------------------------------- */}
      {/* Buttons at the top */}
      {/* -------------------------------- */}

      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          mb: 1,
          gap: 1,
        }}
      >
        {isEditMode && showAspectRatioController && (
          <FormControlLabel
            onChange={onCheckFixAspectRatio}
            value='end'
            checked={Boolean(aspectRatio)}
            disabled={freeze}
            control={<Checkbox />}
            label='fix aspect'
            labelPlacement='end'
            componentsProps={{
              typography: {
                fontSize: 14,
                fontWeight: 500,
              },
            }}
          />
        )}

        <Box sx={{ mr: 'auto' }} />

        {imgSrcBase64 && isEditMode && (
          <Button
            disabled={freeze}
            sx={{ height: buttonHeight }}
            startIcon={<CloseOutlinedIcon />}
            onClick={onClickCancelCrop}
          >
            cancel
          </Button>
        )}

        {imgSrcBase64 && !isEditMode && (
          <Button
            disabled={freeze || isCropProcessing}
            sx={{ height: buttonHeight }}
            startIcon={<CropIcon />}
            onClick={onClickStartCrop}
            endIcon={isCropProcessing && <CircularProgress />}
          >
            crop
          </Button>
        )}

        {imgSrcBase64 && isEditMode && (
          <Button
            disabled={freeze}
            sx={{ height: buttonHeight }}
            startIcon={<CheckIcon />}
            onClick={onClickConfirmCrop}
          >
            confirm
          </Button>
        )}
      </Box>

      {/* -------------------------------- */}
      {/* Cropped image */}
      {/* -------------------------------- */}

      {imgSrcBase64 && (
        <ReactCrop
          locked={!isEditMode}
          onDragStart={onDragStart}
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(compCrop) => setCompletedCrop(compCrop)}
          aspect={aspectRatio}
        >
          <img
            ref={imgRef}
            alt='Crop me'
            src={imgSrcBase64}
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

      {typeof completedCrop !== 'undefined' && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <canvas
            hidden={hidePreviewCanvas}
            ref={previewCanvasRef}
            style={{
              objectFit: 'contain',
              width: completedCrop.width,
              height: completedCrop.height,
            }}
          />
        </div>
      )}

      {/* -------------------------------- */}
      {/* Buttons at the bottom */}
      {/* -------------------------------- */}

      <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center', gap: 1 }}>
        {imgSrcBase64 && (
          <Button
            sx={{ height: buttonHeight }}
            startIcon={<RestoreIcon />}
            onClick={onClickResetCrop}
            disabled={freeze || imgSrcBase64 === imgSrcBase64Original}
          >
            reset
          </Button>
        )}

        {/* TODO: undo 기능 */}
        {false && imgSrcBase64 && (
          <Button
            sx={{ height: buttonHeight }}
            startIcon={<ArrowBackIcon />}
            onClick={onClickUndoCrop}
            disabled={freeze || imgSrcBase64 === imgSrcBase64Original}
          >
            undo
          </Button>
        )}

        {imgSrcBase64 && (
          <Button
            disabled={freeze}
            sx={{ height: buttonHeight }}
            startIcon={<CloseOutlinedIcon />}
            onClick={onClickUnloadImage}
          >
            unload
          </Button>
        )}
      </Box>
    </Box>
  );
};
