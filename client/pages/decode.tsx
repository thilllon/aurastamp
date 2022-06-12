/* eslint-disable @next/next/no-img-element */
import { Cropper } from '@/components/Cropper';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { ModalDecoder } from '@/components/modal/ModalDecoder';
import { StampModel } from '@/types/types';
import { FRNCC } from '@/utils/styles';
import { sendEvent } from '@/utils/useGoogleAnalytics';
import { Alert, Box, Button, CircularProgress, Container } from '@mui/material';
import axios from 'axios';
import React, { ChangeEventHandler, ReactNode, useCallback, useEffect, useState } from 'react';
import { browserName } from 'react-device-detect';
import { PixelCrop } from 'react-image-crop';

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

export default function DecodePage() {
  const [originalFile, setOriginalFile] = useState<File>();
  const [modelName, setModelName] = useState<StampModel>(defaultModelName);
  const [hiddenMessage, setHiddenMessage] = useState('');
  const [hiddenImageUrl, setHiddenImageUrl] = useState('');
  const [encodedImageBase64String, setEncodedImageBase64String] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [croppedBlob, setCroppedBlob] = useState<Blob>();
  const [downloadable, setDownloadable] = useState(true);
  const [key, setKey] = useState(1);

  // for Modal
  const [openModal, setOpenModal] = useState(false);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

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

  const onUnload = async () => {
    setCroppedBlob(undefined);
    setHiddenMessage('');
  };

  const onClickDecode = async () => {
    setErrorMessage('');
    setHiddenMessage('');
    if (!croppedBlob) {
      return;
    }
    const baseUrl = process.env.NEXT_PUBLIC_API_URI;
    const url = baseUrl + '/decode_stamp';
    const formData = new FormData();
    formData.append('file', croppedBlob); // FIX: file에서 croppedBlob으로 변경
    if (modelName) {
      formData.append('model_name', modelName);
    }
    try {
      setIsLoading(true);
      const res = await axios.post(url, formData);
      console.info(res.data);
      setHiddenMessage(res.data.secret ?? '');
      setHiddenImageUrl(res.data.secret_image ?? '');
      setErrorMessage(res.data.error ?? '');
      sendEvent('button_click', {
        category: 'decode',
        label: 'secret',
        value: res.data.secret,
      });

      // modal을 통해 hidden info display
      handleModalOpen();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onClickRetry = () => {
    setKey((x) => x + 1);
    setHiddenMessage('');
    setEncodedImageBase64String('');
    setCroppedBlob(undefined);
  };

  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
          minHeight: (theme) =>
            `calc(100vh - ${Number(theme.mixins.toolbar.minHeight) + 8 + footerHeight}px)`,
        }}
      >
        <Box key={key} sx={{ mt: 0 }}>
          <Cropper
            guideMessage='Pick an image to find a message'
            defaultAspect={1}
            onChangeFile={onChange}
            onCropEnd={onCropEnd}
            freeze={Boolean(encodedImageBase64String)}
            hideImageSpec={true}
            hidePreview={true}
            onUnload={onUnload}
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
        <Box sx={{ width: '100%', gap: 1, mt: 3, ...FRNCC }}>
          <Button
            sx={{ flex: 1 }}
            variant={'contained'}
            onClick={onClickDecode}
            disabled={isLoading || !croppedBlob}
            endIcon={isLoading ? <CircularProgress size={24} /> : null}
          >
            read
          </Button>
          <Button sx={{ flex: 1 }} onClick={onClickRetry}>
            retry
          </Button>
        </Box>

        {errorMessage && (
          <Alert severity='error' sx={{ mt: 3 }}>
            {errorMessage}
          </Alert>
        )}
        <ModalDecoder
          open={openModal}
          hiddenMessage={hiddenMessage}
          hiddenImageUrl={hiddenImageUrl}
          handleModalClose={handleModalClose}
        />
      </Container>
    </>
  );
}

DecodePage.getLayout = (page: ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
