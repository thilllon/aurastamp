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

const { publicRuntimeConfig } = getConfig();

type IndexPageProps = {};

export default function IndexPage({}: IndexPageProps) {
  const [file, setFile] = useState<File>();
  const [cropped, setCropped] = useState<PixelCrop>();
  const [modelName, setModelName] = useState('BTS');
  const [message, setMessage] = useState('');
  const [resultImgSrc, setResultImgSrc] = useState('');

  const onChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    // console.info(ev.target.files);
    setFile(ev.target.files?.[0] ?? undefined);
  };

  const onCropEnd = useCallback((img: PixelCrop | undefined) => {
    console.info(img);
    setCropped(img);
  }, []);

  const onClickCrop = () => {};

  const onClickCancel = () => {
    //
  };

  const onChangeMessage = (ev: any) => {
    let msg = ev.target.value;
    if (msg.length > 255) {
      msg = msg.slice(0, 255);
    }
    setMessage(msg);
  };

  const onClickEmbed = async () => {
    // // const baseUrl = process.env.NEXT_PUBLIC_API_URI;
    // const url = baseUrl + '/encode_stamp';
    // const formData = new FormData();
    // if (!file) {
    //   return;
    // }
    // formData.append('file', file);
    // formData.append('model_name', modelName);
    // formData.append('text', '안녕하세요');
    // const res = await axios.post(url, formData, {
    //   // responseType: 'blob', // Important
    //   // responseType: 'arraybuffer',
    // });
    // console.info(typeof res.data, res.data);
    // // const buf = Buffer.from(res.data, 'utf8');
    // // downloadBuffer(res.data, 'arraybuffer.png', file.type);
    // // window.location.href = 'data:application/octet-stream;base64,' + res.data;
    // // download(
    // //   // new Blob([`data:image/png;base64,` + res.data], { type: 'image/png' }),
    // //   new Blob([res.data], { type: 'image/png' }),
    // //   Date.now() + '.png'
    // // );
    // // setResultImgSrc(`data:image/png;base64,` + res.data);
    // setResultImgSrc(res.data);
  };
  const onClickExtract = async () => {
    //
  };

  return (
    <Container
      sx={{
        // border: '2px solid blue',
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        minHeight: (theme) => `calc(100vh - ${Number(theme.mixins.toolbar.minHeight) + 8}px)`,
      }}
    >
      <ImageCrop onChange={onChange} onCropEnd={onCropEnd} />
      {/* <Box sx={{ border: '1px solid', height: 3000 }}></Box> */}

      <Box
        sx={{
          // border: '2px solid',
          width: '100%',
          position: 'sticky',
          // bottom: 0,
          top: 'calc(100vh - 0px)',

          display: 'flex',
          flexFlow: 'column nowrap',
          alignItems: 'center',
          gap: 1,
          mt: 2,
        }}
      >
        <TextField
          fullWidth
          sx={{}}
          size='small'
          value={message}
          onChange={onChangeMessage}
          placeholder={'Type message to hide :)'}
        />

        {resultImgSrc && (
          <a href={'data:image/png;base64,' + resultImgSrc} download={'result.png'}>
            <img src={'data:image/png;base64,' + resultImgSrc} alt={'result'} />
          </a>
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
            Download
          </Button>
        )}

        <Box
          sx={{
            // border: '2px solid',
            width: '100%',
            // position: 'sticky',
            // bottom: 0,
            // top: 'calc(100vh - 0px)',
            display: 'flex',
            // flexFlow: 'column nowrap',
            // alignItems: 'center',
            gap: 1,
            mt: 2,
          }}
        >
          <Button sx={{ flex: 1 }} variant={'contained'} onClick={onClickEmbed}>
            Embed
          </Button>
          <Button sx={{ flex: 1 }} variant={'contained'} onClick={onClickExtract}>
            Extract
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

IndexPage.getLayout = (page: ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
