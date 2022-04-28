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

const { publicRuntimeConfig } = getConfig();

type EncodePageProps = {};

const MAX_MESSAGE_LENGTH = 255;
const footerHeight = 120;

export default function EncodePage({}: EncodePageProps) {
  const [file, setFile] = useState<File>();
  const [cropped, setCropped] = useState<PixelCrop>();
  const [modelName, setModelName] = useState<StampModel | null>(null);
  const [message, setMessage] = useState('');
  const [resultImgSrc, setResultImgSrc] = useState('');
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const onChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    setFile(ev.target.files?.[0] ?? undefined);
  };

  const onCropEnd = useCallback((img: PixelCrop | undefined) => {
    setCropped(img);
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
        <ImageCrop onChange={onChange} onCropEnd={onCropEnd} />
        <Box
          sx={{
            width: '100%',
            // position: 'sticky',
            // top: 'calc(100vh - 0px)',
            display: 'flex',
            flexFlow: 'column nowrap',
            alignItems: 'center',
            gap: 1,
            mt: 2,
          }}
        >
          <TextField
            fullWidth
            sx={{
              // mt: 2,
              mb: 2,
            }}
            // size='small'
            value={message}
            onChange={onChangeMessage}
            placeholder={'Type message to hide :)'}
          />

          <Box sx={{ width: '100%', display: 'flex', gap: 1, mt: 2, mb: 3 }}>
            <Button
              sx={{ flex: 1 }}
              variant={'contained'}
              onClick={onClickEmbed}
              disabled={loading || !file || !message}
              endIcon={loading ? <CircularProgress size={24} /> : null}
            >
              Embed
            </Button>
          </Box>

          <Box sx={{ p: 2, m: 3 }}>{errMsg}</Box>

          {resultImgSrc && (
            <a href={'data:image/png;base64,' + resultImgSrc} download={'result.png'}>
              <img src={'data:image/png;base64,' + resultImgSrc} alt={'result'} />
            </a>
          )}

          {resultImgSrc && (
            <Button
              variant='outlined'
              sx={{ width: '100%' }}
              onClick={() => {
                const fileName = 'aurastamp_' + Date.now() + '.png';
                const downloadLink = document.createElement('a');
                downloadLink.download = fileName;
                downloadLink.innerHTML = 'Download File';
                downloadLink.href = 'data:image/png;base64,' + resultImgSrc;
                downloadLink.click();
              }}
            >
              Download
            </Button>
          )}
          <Link href='/decode'>{`Let's go find the hidden message!`}</Link>
        </Box>
      </Container>
      <Box
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
      </Box>
    </>
  );
}

EncodePage.getLayout = (page: ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
