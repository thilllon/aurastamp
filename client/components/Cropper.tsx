/* eslint-disable @next/next/no-img-element */
import {
  canvasPreview,
  canvasToBlob,
  centerAspectCrop,
  toReadableSize,
} from '@/components/CropperHelper';
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
import React, { ChangeEventHandler, SyntheticEvent, useRef, useState } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useDebounce } from 'react-use';

// TODO: undo 기능 추가할 것, 스타일 기능 추가할것

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

const buttonHeight = 36; // button height in pixel
const uploadButtonSize = 200;
const debounceDelay = 200; // ms

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
  // all state variables ------------------------------------
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
  // --------------------------------------------------------
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useDebounce(
    async () => {
      if (imgRef.current && previewCanvasRef.current && typeof completedCrop !== 'undefined') {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, scale, rotate);
        const croppedBlob = await canvasToBlob(previewCanvasRef.current);
        // console.info('cropped size', toReadableSize(croppedBlob?.size || 0));
        // const { previewUrl, blob } = await imgPreview(
        //   previewImageRef.current,
        //   completedCrop,
        //   scale,
        //   rotate
        // );
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
      // setIsCropProcessing(true);
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
          // setIsCropProcessing(false);
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
      // --------------------------------
      // blob to base64
      // --------------------------------
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
              // inputProps={{ accept: 'image/*' }}
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
