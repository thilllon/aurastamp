/* eslint-disable @next/next/no-img-element */
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { PhotoCamera } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActionArea,
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

const { publicRuntimeConfig } = getConfig();

type IndexPageProps = {};

const MAX_MESSAGE_LENGTH = 255;

export default function IndexPage({}: IndexPageProps) {
  const [file, setFile] = useState<File>();
  const [cropped, setCropped] = useState<PixelCrop>();
  const [modelName, setModelName] = useState('BTS');
  const [message, setMessage] = useState('');
  const [resultImgSrc, setResultImgSrc] = useState('');

  const onChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    setFile(ev.target.files?.[0] ?? undefined);
  };

  const onCropEnd = useCallback((img: PixelCrop | undefined) => {
    console.info(img);
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
    const res = await axios.post(url, formData);
    console.info(res.data);
    // setResultImgSrc(res.data);
  };

  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'center',
          minHeight: (theme) => `calc(100vh - ${Number(theme.mixins.toolbar.minHeight) + 8}px)`,
        }}
      >
        <Box sx={{ display: 'flex', flexFlow: 'column nowrap', gap: 2 }}>
          <Link href='/encode' sx={{ width: '100%' }}>
            <Button fullWidth sx={{ flex: 1, minHeight: 120 }} variant={'contained'}>
              <Typography variant='h4'>{`Embed`}</Typography>
            </Button>
          </Link>
          <Link href='/decode'>
            <Button fullWidth sx={{ flex: 1, minHeight: 120 }} variant={'contained'}>
              <Typography variant='h4'>{`Extract`}</Typography>
            </Button>
          </Link>
        </Box>
      </Container>
    </>
  );
}

IndexPage.getLayout = (page: ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
