/* eslint-disable @next/next/no-img-element */
import { download } from '@/utils/common';
import { Box, Button, Card, CardActionArea, Input } from '@mui/material';
import React, { ChangeEventHandler, ReactNode, useEffect, useRef, useState } from 'react';
import ReactCrop, { centerCrop, Crop, makeAspectCrop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useDebounce } from 'react-use';
import { canvasPreview } from './CanvasPreview';

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop({ unit: '%', width: 90 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight
  );
}

export type ImageCrop = {
  children?: ReactNode;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onCropEnd?: (crop?: PixelCrop) => void;
  onCrop?: () => {};
  type?: 'encode' | 'decode';
};

export function ImageCrop({
  children,
  onChange: onChangeProps,
  onCropEnd,
  onCrop,
  type = 'encode',
}: ImageCrop) {
  const [imgSrc, setImgSrc] = useState('');
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(undefined);

  function onSelectFile(ev: React.ChangeEvent<HTMLInputElement>) {
    if (ev.target.files && ev.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgSrc(reader?.result?.toString() || '');
      });
      reader.readAsDataURL(ev.target.files[0]);
    }
    onChangeProps?.(ev);
  }
  useEffect(() => {
    onCropEnd?.(completedCrop);
  }, [completedCrop, onCropEnd]);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  useDebounce(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, scale, rotate);
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  const onClickCrop = (ev: any) => {
    if (previewCanvasRef.current) {
      const data = previewCanvasRef.current.toDataURL('image/jpeg');
      console.info(data);
      setImgSrc(data);
      // download(new Blob([data]), 'image.jpg');
      setCrop(undefined);
      setCompletedCrop(undefined);
    }
  };

  const onClickCancel = () => {
    setImgSrc('');
    setCrop(undefined);
    setScale(1);
    setRotate(0);
    // TODO:
    // setAspect(16 / 9);
    setCompletedCrop(undefined);
  };

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined);
    } else if (imgRef.current) {
      const { width, height } = imgRef.current;
      setAspect(16 / 9);
      setCrop(centerAspectCrop(width, height, 16 / 9));
    }
  }

  const htmlId = 'image-uploader';

  return (
    <Box
      sx={{
        width: '100%',
        // border: '2px solid'
        pt: 3,
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* {!imgSrc && (
          <Button
            fullWidth
            variant='outlined'
            component='label'
            htmlFor={htmlId}
            disableRipple={false}
            sx={{ mt: 2, mb: 2 }}
            // onClick={(ev: any) => {
            //   ev.preventDefault();
            // }}
          >
            <Input
              inputProps={{ accept: 'image/*' }}
              id={htmlId}
              type='file'
              onChange={onSelectFile}
              sx={{ display: 'none' }}
            />
            <>{`Upload`}</>
          </Button> 
        )} */}

        {!imgSrc && (
          <Box component='label' htmlFor='uploadbutton' sx={{ width: '100%' }}>
            <Input
              // inputProps={{ accept: 'image/*' }}
              id='uploadbutton'
              type='file'
              sx={{ display: 'none' }}
              onChange={onSelectFile}
            />
            <Button fullWidth variant='outlined' component='span'>
              Upload
            </Button>
          </Box>
        )}

        {/* <input 
          // accept='image/*'
          style={{ display: 'none' }}
          id='uploadbutton2'
          type='file'
          onChange={onSelectFile}
        />
        <label htmlFor='uploadbutton2'>
          <Button variant='contained' component='span'>
            aaaaaaaaaaa
          </Button>
        </label> */}

        {false && (
          <Card sx={{ backgroundColor: '#dddddd', p: 1, borderRadius: 2 }}>
            <CardActionArea
              component='label'
              htmlFor='tmp'
              disableRipple={false}
              sx={{
                // minHeight: 200,
                // borderRadius: 2,
                // backgroundColor: '#dddddd',
                // border: '2px dashed black',
                display: 'flex',
                flexFlow: 'column nowrap',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Input
                inputProps={{ accept: 'image/*' }}
                id={htmlId}
                type='file'
                onChange={onSelectFile}
                sx={{ display: 'none' }}
              />
              <>{`Upload`}</>
            </CardActionArea>
          </Card>
        )}

        {/* <input type='file' accept='image/*' onChange={onSelectFile} /> */}
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

      {Boolean(imgSrc) && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspect}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            ref={imgRef}
            alt='Crop me'
            src={imgSrc}
            style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {Boolean(completedCrop) && (
          <canvas
            ref={previewCanvasRef}
            style={{
              border: '1px solid black',
              objectFit: 'contain',
              width: completedCrop?.width ?? 0,
              height: completedCrop?.height ?? 0,
            }}
          />
        )}
      </Box>

      {imgSrc && (
        <Box sx={{ width: '100%', display: 'flex', gap: 1, mt: 2 }}>
          {type === 'encode' && (
            <Button
              sx={{ flex: 1 }}
              variant={'outlined'}
              onClick={onClickCrop}
              disabled={!completedCrop}
            >
              Crop
            </Button>
          )}
          <Button sx={{ flex: 1 }} variant={'outlined'} onClick={onClickCancel}>
            Cancel
          </Button>
        </Box>
      )}

      {/* <img src={imgSrc} alt='dd' /> */}
    </Box>
  );
}
