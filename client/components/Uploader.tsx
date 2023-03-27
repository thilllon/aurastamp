/* eslint-disable @next/next/no-img-element */
import { imgPreview } from '@/components/imageEditor/ImagePreview';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CropIcon from '@mui/icons-material/Crop';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Input } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { ChangeEventHandler, ReactEventHandler, ReactNode, useRef, useState } from 'react';
import ReactCrop, { centerCrop, Crop, makeAspectCrop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useDebounce } from 'react-use';

export const download = (blob: Blob | MediaSource, fileName: string) => {
  const previewUrl = window?.URL?.createObjectURL?.(blob);
  const anchor = window?.document?.createElement('a');
  anchor.download = fileName;
  anchor.href = previewUrl;
  anchor.click();
  setTimeout(() => window?.URL?.revokeObjectURL?.(previewUrl), 0);
  window?.URL?.revokeObjectURL?.(previewUrl);
};
export const downloadBuffer = (
  arrayBuffer: any,
  fileName: string,
  mimetype = 'application/octet-stream'
) => {
  const anchor = document.createElement('a');
  // const previewUrl = URL.createObjectURL(new Blob([arrayBuffer], { type: mimetype }));
  const previewUrl = URL.createObjectURL(new Blob([arrayBuffer]));
  anchor.href = previewUrl;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(previewUrl);
};

const TO_RADIANS = Math.PI / 180;

export async function canvasPreview(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop,
  scale = 1,
  rotate = 0
) {
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

  return canvas;
}

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
const centerAspectCrop = (mediaWidth: number, mediaHeight: number, aspect: number) => {
  return centerCrop(
    makeAspectCrop({ unit: '%', width: 100 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight
  );
};

export type ImageCrop = {
  children?: ReactNode;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onCropEnd?: (crop: PixelCrop | undefined, blob?: Blob) => void;
  onCrop?: () => {};
  icon?: string;
};

export const ImageCrop = ({
  children,
  icon,
  onChange: onChangeProps,
  onCropEnd,
  onCrop,
}: ImageCrop) => {
  const [base64String, setBase64String] = useState<string>('');
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const previewImageRef = useRef<HTMLImageElement>(null);
  const [isCropMode, setIsCropMode] = useState(false);

  const [crop, setCrop] = useState<Crop | undefined>({
    unit: '%', // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(1);

  const onSelectFile: ChangeEventHandler<HTMLInputElement> = async (ev) => {
    if (ev.target.files && ev.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setBase64String(reader?.result?.toString() || '');
      });
      reader.readAsDataURL(ev.target.files[0]);
    }
    onChangeProps?.(ev);
  };

  const onImageLoad: ReactEventHandler<HTMLImageElement> = async (ev) => {
    if (aspect) {
      const { width, height } = ev.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  };

  useDebounce(
    async () => {
      if (completedCrop && previewImageRef.current && previewCanvasRef.current) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          previewImageRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
        const { previewUrl, blob } = await imgPreview(
          previewImageRef.current,
          completedCrop,
          scale,
          rotate
        );
        onCropEnd?.(completedCrop, blob);
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  const onClickConfirmCrop = async (ev: any) => {
    if (previewCanvasRef.current) {
      const data = previewCanvasRef.current.toDataURL('image/jpeg');
      setBase64String(data);
      setIsCropMode(false);
      if (previewImageRef.current && completedCrop) {
        const { previewUrl, blob } = await imgPreview(
          previewImageRef.current,
          completedCrop,
          scale,
          rotate
        );
        onCropEnd?.(completedCrop, blob);
      }
      setCrop(undefined);
      setCompletedCrop(undefined);
    }
  };

  const onClickCancelCrop = () => {
    if (isCropMode) {
      setCrop(undefined);
      setCompletedCrop(undefined);
      setIsCropMode(false);
    } else {
      setBase64String('');
      setCrop(undefined);
      setScale(1);
      setRotate(0);
      // TODO:
      // setAspect(16 / 9);
      setCompletedCrop(undefined);
    }
  };

  const handleToggleAspectClick = async () => {
    if (aspect) {
      setAspect(undefined);
    } else if (previewImageRef.current) {
      const { width, height } = previewImageRef.current;
      setAspect(16 / 9);
      setCrop(centerAspectCrop(width, height, 16 / 9));
    }
  };

  const IconBox = (props: any) => {
    const whichPage = props.icon;
    console.log(props.icon);
    if (whichPage == 'decode') {
      return <SearchIcon sx={{ fontSize: 100 }} />;
    } else if (whichPage == 'encode') {
      return <BorderColorIcon sx={{ fontSize: 100 }} />;
    }
    return <div></div>;
  };

  const onClickCropMode = () => {
    setIsCropMode(true);
  };

  const htmlId = 'image-uploader';

  return (
    <Box sx={{ width: '100%', pt: 3 }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
          alignItems: 'center',
          pt: '50px',
        }}
      >
        {!base64String && (
          <Box
            component='label'
            htmlFor='uploadbutton'
            sx={{
              cursor: 'pointer',
              border: '8px solid black',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Input
              // inputProps={{ accept: 'image/*' }}
              id='uploadbutton'
              type='file'
              sx={{ display: 'none' }}
              onChange={onSelectFile}
            />
            <Box sx={{ margin: '20px' }}>
              <IconBox icon={icon} />
            </Box>
          </Box>
        )}

        {/* <div>
          <label htmlFor='scale-input'>Scale: </label>
          <input
            id='scale-input'
            type='number'
            step='0.1'
            value={scale}
            disabled={!imgSrc}
            onChange={(e) => setScale(Number(e.target.value))}
          />
        </div> */}

        {/* <div>
          <label htmlFor='rotate-input'>Rotate: </label>
          <input
            id='rotate-input'
            type='number'
            value={rotate}
            disabled={!imgSrc}
            onChange={(e) => setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))}
          />
        </div> */}

        {/* <div>
          <button onClick={handleToggleAspectClick}>Toggle aspect {aspect ? 'off' : 'on'}</button>
        </div> */}
      </Box>

      {Boolean(base64String) && (
        <Box sx={{ float: 'right', margin: '10px 0px' }}>
          {!isCropMode && (
            <IconButton onClick={onClickCropMode}>
              <CropIcon sx={{ fontSize: 35 }} />
            </IconButton>
          )}
          {isCropMode && (
            <IconButton onClick={onClickConfirmCrop}>
              <CheckIcon sx={{ fontSize: 35 }} />
            </IconButton>
          )}
          <IconButton onClick={onClickCancelCrop}>
            <CloseIcon sx={{ fontSize: 35 }} />
          </IconButton>
        </Box>
      )}

      {Boolean(base64String) && !isCropMode && (
        <img
          alt='Crop me'
          src={base64String}
          style={{ width: '100%', transform: `scale(${scale}) rotate(${rotate}deg)` }}
        />
      )}

      {Boolean(base64String) && isCropMode && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspect}
          style={{ width: '100%' }}
        >
          <img
            ref={previewImageRef}
            alt='Crop me2'
            src={base64String}
            style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      )}

      <Box sx={{ display: 'none' }}>
        {Boolean(isCropMode) && (
          <canvas
            ref={previewCanvasRef}
            style={{
              objectFit: 'contain',
              width: completedCrop?.width ?? 0,
              height: completedCrop?.height ?? 0,
            }}
          />
        )}
      </Box>
      {/* <img src={imgSrc} alt='dd' /> */}
    </Box>
  );
};
