/* eslint-disable @next/next/no-img-element */
import { Cropper } from '@/components/cropper/Cropper';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { ModalDecoder } from '@/components/modal/ModalDecoder';
import { axiosClient } from '@/services/hooks';
import { StampModel } from '@/types/types';
import { FRNCC } from '@/utils/styles';
import { sendEvent } from '@/utils/useGoogleAnalytics';
import { Alert, Box, Button, CircularProgress, Container } from '@mui/material';
import { ChangeEventHandler, ReactNode, useCallback, useEffect, useState } from 'react';
import { browserName } from 'react-device-detect';
import { PixelCrop } from 'react-image-crop';

const footerHeight = 120;
const defaultModelName = 'the';

export default function DecodePage() {
  const [originalFile, setOriginalFile] = useState<File>();
  const [modelName, setModelName] = useState<StampModel>(defaultModelName);
  const [hashString, setHashString] = useState('');
  const [hiddenMessage, setHiddenMessage] = useState('');
  const [hiddenImageUrl, setHiddenImageUrl] = useState('');
  const [viewCnt, setViewCnt] = useState(0);
  const [likeCnt, setLikeCnt] = useState(0);
  const [dislikeCnt, setDislikeCnt] = useState(0);
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
    // FIXME: blob => file 변환할것
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
    const formData = new FormData();
    formData.append('file', croppedBlob); // FIXME: file에서 croppedBlob으로 변경
    if (modelName) {
      formData.append('model_name', modelName);
    }
    try {
      setIsLoading(true);
      const res = await axiosClient.post('/decode', formData);
      setHashString(res.data.hash_string ?? '');
      setHiddenMessage(res.data.secret ?? '');
      setHiddenImageUrl(res.data.secret_image ?? '');
      setViewCnt(res.data.view_cnt ?? 0);
      setLikeCnt(res.data.like_cnt ?? 0);
      setDislikeCnt(res.data.dislike_cnt ?? 0);
      setErrorMessage(res.data.error ?? '');
      sendEvent('button_click', {
        category: 'decode',
        label: 'secret',
        value: res.data.secret,
      });
      // modal을 통해 hidden info display
      if (!res.data.error) {
        handleModalOpen();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onClickRetry = () => {
    setKey((x) => x + 1);
    setHiddenMessage('');
    setErrorMessage('');
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
          <Button variant='outlined' sx={{ flex: 1 }} onClick={onClickRetry}>
            retry
          </Button>
        </Box>
        {errorMessage && (
          <Alert severity='error' sx={{ mt: 3, wordBreak: 'break-word' }}>
            {errorMessage}
          </Alert>
        )}
        <ModalDecoder
          open={openModal}
          modelName={modelName}
          hashString={hashString}
          hiddenMessage={hiddenMessage}
          hiddenImageUrl={hiddenImageUrl}
          viewCnt={viewCnt}
          likeCnt={likeCnt}
          dislikeCnt={dislikeCnt}
          handleModalClose={handleModalClose}
        />
      </Container>
    </>
  );
}

DecodePage.getLayout = (page: ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
