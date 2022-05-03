/* eslint-disable @next/next/no-img-element */
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { PhotoCamera } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CircularProgress,
  Container,
  IconButton,
  Input,
  TextField,
  Typography,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import getConfig from 'next/config';
import React, { ReactNode, ChangeEventHandler, useState, useCallback } from 'react';
import axios from 'axios';
import { download, downloadBuffer } from '@/utils/common';
import { ImageCrop } from '@/components/imageEditor/ImageCrop';
import { PixelCrop } from 'react-image-crop';
import { Link } from '@/components/shared/Link';
import { StampModel } from '@/types/types';
import { imgPreview } from '@/components/imageEditor/ImagePreview';

const { publicRuntimeConfig } = getConfig();

type EncodePageProps = {};

const MAX_MESSAGE_LENGTH = 255;
const footerHeight = 120;

export default function EncodePage({}: EncodePageProps) {
  const [file, setFile] = useState<File>();
  const [cropData, setCropData] = useState<PixelCrop>();
  const [modelName, setModelName] = useState<StampModel>('the');
  const [message, setMessage] = useState('');
  const [resultImgSrc, setResultImgSrc] = useState('');
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  const onChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    setFile(ev.target.files?.[0] ?? undefined);
    // setImage();
  };

  const onCropEnd = useCallback((img: PixelCrop | undefined) => {
    setCropData(img);
    const previewUrl = imgPreview(image, cropData);
    // setFile(ev.target.files?.[0] ?? undefined);
  }, []);

  const onChangeMessage = (ev: any) => {
    let msg = ev.target.value;
    if (msg.length > MAX_MESSAGE_LENGTH) {
      msg = msg.slice(0, MAX_MESSAGE_LENGTH);
    }
    setMessage(msg);
  };

  const onClickEmbed = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URI;
    const url = baseUrl + '/encode_stamp';
    const formData = new FormData();

    if (!file) {
      return;
    }
    formData.append('file', file);
    if (modelName) {
      formData.append('model_name', modelName);
    }
    formData.append('text', message);
    setLoading(true);
    try {
      const res = await axios.post(url, formData);
      setResultImgSrc(res.data);
    } catch (err) {
      console.error(err);
      setErrMsg(JSON.stringify(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'space-between',
          // justifyContent: 'center',
          alignItems: 'space-between',
          minHeight: (theme) =>
            `calc(100vh - ${Number(theme.mixins.toolbar.minHeight) + 8 + footerHeight}px)`,
        }}
      >
        <Box sx={{ width: '100%', height: '70%', display: 'flex', alignItems: 'center', gap: 1 }}>
          {!resultImgSrc && <ImageCrop onChange={onChange} onCropEnd={onCropEnd} />}

          {resultImgSrc && (
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
              <a href={'data:image/png;base64,' + resultImgSrc} download={'result.png'}>
                <img
                  src={'data:image/png;base64,' + resultImgSrc}
                  alt={'result'}
                  style={{ width: '100%' }}
                />
              </a>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            width: '100%',
            // position: 'sticky',
            // top: 'calc(100vh - 0px)',
            display: 'flex',
            flexFlow: 'column nowrap',
            alignItems: 'center',
          }}
        >
          {!resultImgSrc && (
            <TextField
              fullWidth
              sx={{
                // mt: 2,
                mb: 2,
              }}
              // size='small'
              value={message}
              onChange={onChangeMessage}
              placeholder={'type message to hide :)'}
            />
          )}
          {resultImgSrc && (
            <Box
              sx={{
                // mt: 2,
                mb: 2,
              }}
            />
          )}

          <Box sx={{ width: '30%', display: 'flex', gap: 1, mt: 2, mb: 3 }}>
            {!resultImgSrc && (
              <Button
                sx={{ flex: 1 }}
                variant={'contained'}
                onClick={onClickEmbed}
                disabled={loading || !file || !message}
                endIcon={loading ? <CircularProgress size={24} /> : null}
              >
                write
              </Button>
            )}
            {resultImgSrc && (
              <Button
                variant='outlined'
                onClick={() => {
                  const fileName = 'aurastamp_' + Date.now() + '.png';
                  const downloadLink = document.createElement('a');
                  downloadLink.download = fileName;
                  downloadLink.innerHTML = 'Download File';
                  downloadLink.href = 'data:image/png;base64,' + resultImgSrc;
                  downloadLink.click();
                }}
              >
                download
              </Button>
            )}
          </Box>

          {errMsg && <Box sx={{ p: 2, m: 3 }}>{errMsg}</Box>}

          {/* <Link href='/decode'>{`Let's go find the hidden message!`}</Link> */}
        </Box>
      </Container>
      {/* <Box
        sx={{
          background: (theme) => theme.palette.primary.main,
          height: 120,
          p: 2,
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ color: '#ffffff', fontSize: 24, fontWeight: 700 }}>{`Aura.`}</Typography>
      </Box> */}
    </>
  );
}

EncodePage.getLayout = (page: ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
