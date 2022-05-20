/* eslint-disable @next/next/no-img-element */
import { Cropper } from '@/components/Cropper';
import { ImageCrop } from '@/components/imageEditor/ImageCrop';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { StampModel } from '@/types/types';
import { FRNCC } from '@/utils/styles';
import { Alert, Box, Button, CircularProgress, Container, TextField } from '@mui/material';
import axios from 'axios';
import getConfig from 'next/config';
import React, { ChangeEventHandler, ReactNode, useCallback, useEffect, useState } from 'react';
import { browserName } from 'react-device-detect';
import { PixelCrop } from 'react-image-crop';

const { publicRuntimeConfig } = getConfig();

type EncodePageProps = {};

const MAX_MESSAGE_LENGTH = 255;
const footerHeight = 120;
const defaultModelName = 'the';

export const downloadBase64String = (b64String: string) => {
  const fileName = 'aurastamp_' + Date.now() + '.png';
  const downloadLink = document.createElement('a');
  downloadLink.download = fileName;
  downloadLink.innerHTML = 'Download File';
  downloadLink.href = 'data:image/png;base64,' + b64String;
  downloadLink.click();
};

export const base64ToBlob = (b64Data: string, contentType = '', sliceSize = 512) => {
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

export default function EncodePage({}: EncodePageProps) {
  const [originalFile, setOriginalFile] = useState<File>();
  const [modelName, setModelName] = useState<StampModel>(defaultModelName);
  const [hiddenMessage, setHiddenMessage] = useState('');
  const [encodedImageBase64String, setEncodedImageBase64String] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [croppedBlob, setCroppedBlob] = useState<Blob>();
  const [downloadable, setDownloadable] = useState(true);
  const [key, setKey] = useState(1);

  useEffect(() => {
    setDownloadable(isDownloadableBrowser(browserName));
  }, []);

  const isDownloadableBrowser = (browser: string) => {
    const unSupportedBrowserList = ['Edge', 'Chrome'];
    return unSupportedBrowserList.indexOf(browser) == -1;
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    // event handler for file load, unload
    const file = ev.target.files?.[0] ?? undefined;
    setOriginalFile(file);
    // FIXME: blob=>file 변환할것
    setCroppedBlob(file);
  };

  const onCropEnd = useCallback(async (crop: PixelCrop | undefined, blob?: Blob) => {
    setCroppedBlob(blob);
  }, []);

  const onChangeMessage: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (ev) => {
    let msg = ev.target.value;
    if (msg.length > MAX_MESSAGE_LENGTH) {
      msg = msg.slice(0, MAX_MESSAGE_LENGTH);
    }
    setHiddenMessage(msg);
  };

  const onClickEncode = async () => {
    // debugger;
    setErrorMessage('');
    if (!croppedBlob) {
      return;
    }
    const baseUrl = process.env.NEXT_PUBLIC_API_URI;
    const url = baseUrl + '/encode_stamp';
    const formData = new FormData();
    formData.append('file', croppedBlob); // FIX: file에서 croppedBlob으로 변경
    if (modelName) {
      formData.append('model_name', modelName);
    }
    formData.append('text', hiddenMessage);
    formData.append('return_type', 'base64');
    setIsLoading(true);
    try {
      const res = await axios.post(url, formData);
      setEncodedImageBase64String(res.data);
    } catch (err) {
      console.error(err);
      setErrorMessage(JSON.stringify(err));
    } finally {
      setIsLoading(false);
    }
  };

  const onClickDownload = () => {
    downloadBase64String(encodedImageBase64String);
  };

  const onClickRetry = () => {
    setKey((x) => x + 1);
    setHiddenMessage('');
    setEncodedImageBase64String('');
  };

  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'space-between',
          minHeight: (theme) =>
            `calc(100vh - ${Number(theme.mixins.toolbar.minHeight) + 8 + footerHeight}px)`,
        }}
      >
        <Box key={key} sx={{ mt: 3 }}>
          <Cropper
            guideMessage='Pick an image to stamp'
            defaultAspect={1}
            onChangeFile={onChange}
            onCropEnd={onCropEnd}
            freeze={Boolean(encodedImageBase64String)}
          />
        </Box>

        {encodedImageBase64String && (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexFlow: 'column nowrap',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 3,
            }}
          >
            <img
              src={'data:image/png;base64,' + encodedImageBase64String}
              alt={'result'}
              style={{ width: '100%' }}
            />
          </Box>
        )}

        {!encodedImageBase64String && (
          <TextField
            sx={{ mt: 3 }}
            fullWidth
            value={hiddenMessage}
            onChange={onChangeMessage}
            disabled={isLoading}
            onKeyDown={(ev) => {
              if (ev.key === 'Enter') {
                onClickEncode();
              }
            }}
            placeholder={'type message to hide :)'}
          />
        )}

        <Box sx={{ width: '100%', gap: 1, mt: 3, ...FRNCC }}>
          <Button
            sx={{ flex: 1 }}
            variant={'contained'}
            onClick={onClickEncode}
            // disabled={!encodedImageBase64String || isLoading || !originalFile || !hiddenMessage}
            endIcon={isLoading ? <CircularProgress size={24} /> : null}
          >
            write
          </Button>
          <Button sx={{ flex: 1 }} onClick={onClickRetry}>
            retry
          </Button>
        </Box>

        {encodedImageBase64String && !downloadable && (
          <Alert severity='warning' sx={{ mt: 3 }}>
            현재 Browser에서는 다운로드가 불가합니다.😢 사진을 Long Press하여 다운 받아 주세요.
          </Alert>
        )}

        {encodedImageBase64String && (
          <Button fullWidth sx={{ mt: 3 }} variant='contained' onClick={onClickDownload}>
            download
          </Button>
        )}

        {errorMessage && (
          <Alert severity='error' sx={{ mt: 3 }}>
            {errorMessage}
          </Alert>
        )}
      </Container>
    </>
  );
}

EncodePage.getLayout = (page: ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
