/* eslint-disable @next/next/no-img-element */
import { Cropper } from '@/components/Cropper';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useEncodeImage } from '@/services/hooks';
import { StampModel } from '@/types/types';
import { downloadBase64String } from '@/utils/common';
import { FRNCC } from '@/utils/styles';
import { Alert, Box, Button, CircularProgress, Container, TextField } from '@mui/material';
import React, { ChangeEventHandler, ReactNode, useCallback, useEffect, useState } from 'react';
import { browserName } from 'react-device-detect';
import { PixelCrop } from 'react-image-crop';

const maxMessageLength = 255;
const footerHeight = 120;
const defaultModelName = 'the';
const downloadGuideMessage = `현재 Browser에서는 다운로드가 불가합니다.😢 사진을 Long Press하여 다운 받아 주세요.`;

const isDownloadableBrowser = (browser: string) => {
  const unSupportedBrowserList = ['Edge', 'Chrome'];
  return unSupportedBrowserList.indexOf(browser) == -1;
};

export default function EncodePage() {
  const [modelName, setModelName] = useState<StampModel>(defaultModelName);
  const [hiddenMessage, setHiddenMessage] = useState('');
  const [encodedImgSrcBase64, setEncodedImgSrcBase64] = useState('');
  const [croppedBlob, setCroppedBlob] = useState<Blob>();
  const [downloadable, setDownloadable] = useState(true);
  const [key, setKey] = useState(1);
  const encodeImage = useEncodeImage();

  useEffect(() => {
    setDownloadable(isDownloadableBrowser(browserName));
  }, []);

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((ev) => {
    const file = ev.target.files?.[0] ?? undefined;
    setCroppedBlob(file);
  }, []);

  const onCropEnd = useCallback(async (crop: PixelCrop | undefined, blob: Blob) => {
    // FIXME: 테스트중
    // setCroppedBlob(blob);
  }, []);

  const onConfirmCrop = async (crop: PixelCrop | undefined, blob: Blob) => {
    // FIXME: 테스트중
    setCroppedBlob(blob);
  };

  const onChangeMessage: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (ev) => {
    let msg = ev.target.value;
    if (msg.length > maxMessageLength) {
      msg = msg.slice(0, maxMessageLength);
    }
    setHiddenMessage(msg);
  };

  const onClickEncode = async () => {
    if (!croppedBlob) {
      return;
    }
    const encoded = await encodeImage.mutateAsync({
      file: croppedBlob,
      modelName,
      hiddenMessage,
      returnType: 'base64',
    });
    setEncodedImgSrcBase64(encoded);
  };

  const onClickDownload = () => {
    downloadBase64String(encodedImgSrcBase64, 'aurastamp_' + Date.now() + '.png');
  };

  const onClickRetry = () => {
    setKey((x) => x + 1); // gorgeous way to remount
    setHiddenMessage('');
    setEncodedImgSrcBase64('');
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
            freeze={Boolean(encodedImgSrcBase64)}
            onConfirmCrop={onConfirmCrop}
            hidePreview={true}
            hideImageSpec={true}
          />
        </Box>

        {encodedImgSrcBase64 && (
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
              src={'data:image/png;base64,' + encodedImgSrcBase64}
              alt={'encoded image'}
              style={{ width: '100%' }}
            />
          </Box>
        )}

        {!encodedImgSrcBase64 && (
          <TextField
            sx={{ mt: 3 }}
            fullWidth
            value={hiddenMessage}
            onChange={onChangeMessage}
            disabled={encodeImage.isLoading}
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
            // disabled={!encodedImageBase64String || encodeImage.isLoading || !originalFile || !hiddenMessage}
            endIcon={encodeImage.isLoading && <CircularProgress size={24} />}
          >
            write
          </Button>
          <Button sx={{ flex: 1 }} onClick={onClickRetry}>
            retry
          </Button>
        </Box>

        {encodedImgSrcBase64 && !downloadable && (
          <Alert severity='warning' sx={{ mt: 3 }}>
            {downloadGuideMessage}
          </Alert>
        )}

        {encodedImgSrcBase64 && (
          <Button fullWidth sx={{ mt: 3 }} variant='contained' onClick={onClickDownload}>
            download
          </Button>
        )}

        {encodeImage.error && (
          <Alert severity='error' sx={{ mt: 3 }}>
            {JSON.stringify(encodeImage.error ?? {})}
          </Alert>
        )}
      </Container>
    </>
  );
}

EncodePage.getLayout = (page: ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
