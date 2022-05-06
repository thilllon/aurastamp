/* eslint-disable @next/next/no-img-element */
import { ImageCrop } from '@/components/imageEditor/ImageCrop';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { StampModel } from '@/types/types';
import { Box, Button, CircularProgress, Container, TextField } from '@mui/material';
import axios from 'axios';
import getConfig from 'next/config';
import React, { ChangeEventHandler, ReactNode, useCallback, useState } from 'react';
import { PixelCrop } from 'react-image-crop';

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
  const [croppedBlob, setCroppedBlob] = useState<Blob>();

  const b64toBlob = (b64Data: string, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data); // TODO: deprecated. Buffer.from으로 변경할 예정
    // const byteCharacters = Buffer.from(b64Data, 'base64');

    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    // event handler for file load, unload
    setFile(ev.target.files?.[0] ?? undefined);
  };

  const onCropEnd = useCallback(async (crop: PixelCrop | undefined, blob?: Blob) => {
    setCropData(crop);
    setCroppedBlob(blob);
  }, []);

  const onChangeMessage: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (ev) => {
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

    // FIX: file에서 croppedBlob으로 변경
    if (!croppedBlob) return;
    formData.append('file', croppedBlob);

    // if (!file) return;
    // formData.append('file', file);

    if (modelName) {
      formData.append('model_name', modelName);
    }
    formData.append('text', message);
    formData.append('return_type', 'base64');
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
