/* eslint-disable @next/next/no-img-element */
import { Firework2 } from '@/components/Firework';
import { ImageCrop } from '@/components/imageEditor/ImageCrop';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Link } from '@/components/shared/Link';
import { Box, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import getConfig from 'next/config';
import React, { ChangeEventHandler, ReactNode, useCallback, useState } from 'react';
import { PixelCrop } from 'react-image-crop';
import { useTimeout, useTimeoutFn } from 'react-use';

const { publicRuntimeConfig } = getConfig();

type DecodePageProps = {};

const MAX_MESSAGE_LENGTH = 255;
const footerHeight = 120;

export default function DecodePage({}: DecodePageProps) {
  const [file, setFile] = useState<File>();
  const [cropped, setCropped] = useState<PixelCrop>();
  const [modelName, setModelName] = useState('BTS');
  const [message, setMessage] = useState('');
  const [resultImgSrc, setResultImgSrc] = useState('');
  const [secret, setSecret] = useState('');
  const [showCongrats, setShowCongrats] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    setFile(ev.target.files?.[0] ?? undefined);
  };

  const onCropEnd = useCallback((img: PixelCrop | undefined) => {
    console.info(img);
    setCropped(img);
  }, []);

  const onClickEmbed = async () => {
    const baseUrl = 'http://20.41.116.194:8000';
    const url = baseUrl + '/encode_stamp';
    const formData = new FormData();
    if (!file) {
      return;
    }
    formData.append('file', file);
    formData.append('model_name', modelName);
    formData.append('text', message);
    const res = await axios.post(url, formData);
    setResultImgSrc(res.data);
  };

  const onClickExtract = async () => {
    const baseUrl = 'http://20.41.116.194:8000';
    const url = baseUrl + '/decode_stamp';
    const formData = new FormData();
    if (!file) {
      return;
    }
    formData.append('file', file);
    formData.append('model_name', modelName);
    // formData.append('text', message);
    try {
      setLoading(true);
      const res = await axios.post(url, formData);
      console.info(res.data);
      setSecret(res.data.secret);
      setShowCongrats(true);
    } catch (err) {
      console.error(err);
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
          minHeight: (theme) =>
            `calc(100vh - ${Number(theme.mixins.toolbar.minHeight) + 8 + footerHeight}px)`,
        }}
      >
        <ImageCrop onChange={onChange} onCropEnd={onCropEnd} type={'decode'} />
        <Box sx={{ display: 'flex', flexFlow: 'column nowrap' }}>
          {secret?.startsWith('http://') ? (
            <Link href={secret}>
              <Typography>{secret}</Typography>
            </Link>
          ) : (
            <Typography>{secret}</Typography>
          )}
          {showCongrats && <Firework2 />}
        </Box>
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
          <Box sx={{ width: '100%', display: 'flex', gap: 1, mt: 2, mb: 3 }}>
            <Button
              sx={{ flex: 1 }}
              variant={'contained'}
              onClick={onClickExtract}
              disabled={!file}
            >
              Extract
            </Button>
          </Box>
          <Link href='/encode'>{`Hide your secret message!`}</Link>
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

DecodePage.getLayout = (page: ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};