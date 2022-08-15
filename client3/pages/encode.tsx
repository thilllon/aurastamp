/* eslint-disable @next/next/no-img-element */
import { Cropper } from '@/components/cropper/Cropper';
import { ModalEncoder } from '@/components/modal/ModalEncoder';
import { useEncodeImage } from '@/services/hooks';
import { Alert, Box, Button, CircularProgress, Container, TextField } from '@mui/material';
import React, { ChangeEventHandler, ReactNode, useCallback, useEffect, useState } from 'react';
import { browserName, isDesktop } from 'react-device-detect';
import { PixelCrop } from 'react-image-crop';

export type StampModel = 'bts' | 'blackpink' | 'the';

const maxMessageLength = 255;
const footerHeight = 120;
const defaultModelName = 'the';
const downloadGuideMessage = `Long press the image to download.`;
// 현재 브라우저에서는 다운로드가 불가능합니다.😢 (애초에 알릴필요가 있을까? 🤔)

const downloadBase64String = (b64String: string) => {
  const fileName = 'aurastamp_' + Date.now() + '.png';
  const downloadLink = document.createElement('a');
  downloadLink.download = fileName;
  downloadLink.innerHTML = 'Download File';
  downloadLink.href = 'data:image/png;base64,' + b64String;
  downloadLink.click();
};

const isDownloadable = () => {
  const unsupported = ['edge', 'chrome'];
  const flag = isDesktop || !unsupported.includes(browserName.toLowerCase());
  // TODO: 220609 현재 아이폰 사파리에서만 document로 다운받아지는 이슈
  // android: chrome, edge, samsung
  // ios: safari, chrome
  // desktop: chrome, edge, firefox
  return flag;
};

export default function EncodePage() {
  const [modelName, setModelName] = useState<StampModel>(defaultModelName);
  const [croppedBlob, setCroppedBlob] = useState<Blob>();
  const [hiddenMessage, setHiddenMessage] = useState('');
  const [encodedImgSrcBase64, setEncodedImgSrcBase64] = useState('');
  const [downloadable, setDownloadable] = useState(true);
  const [key, setKey] = useState(1);
  const encodeImage = useEncodeImage();

  // for Modal
  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };
  const handleModalWrite = (hiddenMessage: string, hiddenImage: File | undefined) => {
    onClickEncode(hiddenMessage, hiddenImage);
  };

  useEffect(() => {
    setDownloadable(isDownloadable());
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

  const onUnload = async () => {
    setCroppedBlob(undefined);
  };

  const onChangeMessage: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (ev) => {
    let msg = ev.target.value;
    if (msg.length > maxMessageLength) {
      msg = msg.slice(0, maxMessageLength);
    }
    setHiddenMessage(msg);
  };

  const onClickEncode = async (hiddenMessage: string, hiddenImage: File | undefined) => {
    if (!croppedBlob) {
      return;
    }
    const encoded = await encodeImage.mutateAsync({
      file: croppedBlob,
      modelName,
      hiddenMessage,
      hiddenImage,
      returnType: 'base64',
    });
    setEncodedImgSrcBase64(encoded);
  };

  const onClickDownload = () => {
    downloadBase64String(encodedImgSrcBase64);
  };

  const onClickShare = () => {};

  const onClickRetry = () => {
    setKey((x) => x + 1); // gorgeous way to remount
    setHiddenMessage('');
    setEncodedImgSrcBase64('');
    setCroppedBlob(undefined);
  };

  return (
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
      {!encodedImgSrcBase64 && (
        <Box key={key} sx={{ mt: 0 }}>
          <Cropper
            guideMessage='Pick an image to stamp'
            defaultAspect={1}
            onChangeFile={onChange}
            onCropEnd={onCropEnd}
            freeze={Boolean(encodedImgSrcBase64)}
            onConfirmCrop={onConfirmCrop}
            hidePreview={true}
            hideImageSpec={true}
            onUnload={onUnload}
          />
        </Box>
      )}
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

      <Box sx={{ width: '100%', gap: 1, mt: 3, ...FRNCC }}>
        {encodedImgSrcBase64 && (
          <Button sx={{ flex: 1 }} variant='contained' onClick={onClickDownload}>
            download
          </Button>
        )}
        {!encodedImgSrcBase64 && !encodeImage.isLoading && (
          <Button
            sx={{ flex: 1 }}
            variant={'contained'}
            onClick={handleModalOpen}
            disabled={!croppedBlob}
          >
            add contents
          </Button>
        )}
        {encodeImage.isLoading && (
          <Button
            sx={{ flex: 1 }}
            variant={'contained'}
            disabled={true}
            endIcon={encodeImage.isLoading && <CircularProgress size={24} />}
          >
            Writing...
          </Button>
        )}
        {!encodeImage.isLoading && (
          <Button variant='outlined' sx={{ flex: 1 }} onClick={onClickRetry}>
            retry
          </Button>
        )}
      </Box>

      {encodedImgSrcBase64 && !downloadable && (
        <Alert severity='warning' sx={{ mt: 3, wordBreak: 'break-word' }}>
          {downloadGuideMessage}
        </Alert>
      )}

      {encodeImage.error && (
        <Alert severity='error' sx={{ mt: 3 }}>
          {JSON.stringify(encodeImage.error ?? {})}
        </Alert>
      )}

      <ModalEncoder
        open={openModal}
        handleModalClose={handleModalClose}
        handleModalWrite={handleModalWrite}
      />
    </Container>
  );
}

EncodePage.getLayout = (page: ReactNode) => {
  return page;
  // return <DashboardLayout>{page}</DashboardLayout>;
};
