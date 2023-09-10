// import { ModalEncoder } from '@/components/modal/ModalEncoder';
// import { Alert, Box, Button, CircularProgress } from '@mui/material';
import type { ChangeEventHandler } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { browserName, isDesktop } from 'react-device-detect';
import type { PixelCrop } from 'react-image-crop';
import type { AurastampModel } from '../lib/aurastamp';
import { downloadBase64ToPng } from '../lib/aurastamp';
import { Cropper } from '../components/radix-cropper';
import { Box, Button, Text } from '@radix-ui/themes';

const maxMessageLength = 255;
const footerHeight = 120;
const defaultModelName = 'the';
const downloadGuideMessage = `Long press the image to download.`;
// 현재 브라우저에서는 다운로드가 불가능합니다.😢 (애초에 알릴필요가 있을까? 🤔)

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
  const [modelName, setModelName] = useState<AurastampModel>(defaultModelName);
  const [croppedBlob, setCroppedBlob] = useState<Blob>();
  const [hiddenMessage, setHiddenMessage] = useState('');
  const [encodedImgSrcBase64, setEncodedImgSrcBase64] = useState('');
  const [downloadable, setDownloadable] = useState(true);
  const [key, setKey] = useState(1);
  // const encodeImage = useEncodeImage();

  // for Modal
  const [openModal, setOpenModal] = useState(false);

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

  const onClickEncode = async (hiddenMessage: string, hiddenImage: File | undefined) => {
    if (!croppedBlob) {
      return;
    }
    // const encoded = await encodeImage.mutateAsync({
    //   file: croppedBlob,
    //   modelName,
    //   hiddenMessage,
    //   hiddenImage,
    //   returnType: 'base64',
    // });
    // setEncodedImgSrcBase64(encoded);
  };

  const onClickDownload = () => {
    downloadBase64ToPng(encodedImgSrcBase64, `aurastamp_${Date.now()}`);
  };

  const onClickRetry = () => {
    setKey((x) => x + 1); // gorgeous way to remount
    setHiddenMessage('');
    setEncodedImgSrcBase64('');
    setCroppedBlob(undefined);
  };

  const onClickModalOpen = () => {
    setOpenModal(true);
  };

  // const onClickModalClose = () => {
  //   setOpenModal(false);
  // };

  // const onWriteModal = (hiddenMessage: string, hiddenImage: File | undefined) => {
  //   onClickEncode(hiddenMessage, hiddenImage);
  // };

  return (
    <Box>
      {!encodedImgSrcBase64 && (
        <Box key={key}>
          <Cropper
            message="Pick an image to stamp"
            defaultAspect={1}
            onChangeFile={onChange}
            onCropEnd={onCropEnd}
            freeze={Boolean(encodedImgSrcBase64)}
            onConfirmCrop={onConfirmCrop}
            showPreview={true}
            showImageSpec={true}
            onUnload={onUnload}
          />
        </Box>
      )}
      {encodedImgSrcBase64 && (
        <Box
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 3,
          }}
        >
          <img src={'data:image/png;base64,' + encodedImgSrcBase64} alt="encoded" />
        </Box>
      )}
      <Box>
        {encodedImgSrcBase64 && <Button onClick={onClickDownload}>download</Button>}
        {!encodedImgSrcBase64 && !encodeImage.isLoading && (
          <Button onClick={onClickModalOpen} disabled={!croppedBlob}>
            add contents
          </Button>
        )}
        {encodeImage.isLoading && (
          <Button style={{ flex: 1 }} disabled={true}>
            Writing...
            {encodeImage.isLoading && <CircularProgress size={24} />}
          </Button>
        )}
        {!encodeImage.isLoading && (
          <Button variant="outline" style={{ flex: 1 }} onClick={onClickRetry}>
            retry
          </Button>
        )}
      </Box>
      {encodedImgSrcBase64 && !downloadable && (
        <Text color="red" style={{ marginTop: 3, wordBreak: 'break-word' }}>
          {downloadGuideMessage}
        </Text>
      )}
      {encodeImage.error && (
        <Text color="red" style={{ marginTop: 3 }}>
          {JSON.stringify(encodeImage.error ?? {})}
        </Text>
      )}
      {/* <ModalEncoder
        open={openModal}
        handleModalClose={onClickModalClose}
        handleModalWrite={onWriteModal}
      /> */}
    </Box>
  );
}
