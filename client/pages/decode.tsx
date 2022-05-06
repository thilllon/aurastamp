/* eslint-disable @next/next/no-img-element */
import { Firework2 } from '@/components/Firework';
import { ImageCrop } from '@/components/imageEditor/ImageCrop';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Link } from '@/components/shared/Link';
import { Box, Button, CircularProgress, Container, IconButton, Typography } from '@mui/material';
import axios from 'axios';
import React, { ChangeEventHandler, ReactNode, useCallback, useState } from 'react';
import { PixelCrop } from 'react-image-crop';
import { StampModel } from '@/types/types';
import { AnySchema } from 'yup';
import ShareIcon from '@mui/icons-material/Share';

type DecodePageProps = {};

const footerHeight = 120;
const defaultModelName = 'the';

const replaceURL = (inputText: string) => {
  // const exp = /(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/ig;
  const exp =
    /((\b(((https?|ftp|file|):\/\/)|www[.]|)[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])+[a-z0-9]{2,4})/gi; /* eslint-disable-line */
  let temp = inputText.replace(exp, '<a href="$1" target="_blank">$1</a>');
  let result = '';

  while (temp.length > 0) {
    const pos = temp.indexOf('href="');
    if (pos == -1) {
      result += temp;
      break;
    }
    result += temp.substring(0, pos + 6);

    temp = temp.substring(pos + 6, temp.length);
    if (temp.indexOf('://') > 8 || temp.indexOf('://') == -1) {
      result += 'http://';
    }
  }
  return result;
};

export default function DecodePage({}: DecodePageProps) {
  const [originalFile, setOriginalFile] = useState<File>();
  const [modelName, setModelName] = useState<StampModel>(defaultModelName);
  const [secret, setSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [croppedBlob, setCroppedBlob] = useState<Blob>();

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

  // const onClickShare = () => {
  //   navigator?.share({
  //     title: '기록하며 성장하기',
  //     text: 'Hello World',
  //     url: 'https://shinsangeun.github.io',
  //   });
  // };

  const onClickDecode = async () => {
    setErrorMessage('');
    setSecret('');
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
      setSecret(res.data.secret ?? '');
      setErrorMessage(res.data.error ?? '');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
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
        <Box
          sx={{
            width: '100%',
            height: '70%',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            mt: 2,
            mb: 3,
          }}
        >
          <ImageCrop onChange={onChange} onCropEnd={onCropEnd} />
        </Box>

        {(secret || errorMessage) && (
          <Box
            sx={{
              display: 'flex',
              border: 1,
              p: 4,
              borderRadius: '12px',
              alignItems: 'center',
              borderColor: (theme) => theme.palette.primary.main,
              flexFlow: 'column nowrap',
            }}
          >
            {secret && <div dangerouslySetInnerHTML={{ __html: replaceURL(secret) }} />}
            {errorMessage ? <Typography>{errorMessage}</Typography> : <Typography></Typography>}
          </Box>
        )}

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexFlow: 'column nowrap',
            alignItems: 'center',
            gap: 1,
            mt: 2,
          }}
        >
          <Box sx={{ width: '40%', display: 'flex', gap: 1, mt: 2, mb: 3 }}>
            <Button
              sx={{ flex: 1 }}
              variant={'contained'}
              onClick={onClickDecode}
              disabled={!originalFile}
              endIcon={isLoading ? <CircularProgress size={24} /> : null}
            >
              read
            </Button>

            {/* {secret && (
              <IconButton onClick={onClickShare}>
                <ShareIcon sx={{ fontSize: 35 }} />
              </IconButton>
            )} */}
          </Box>
        </Box>
      </Container>

    </>
  );
}

DecodePage.getLayout = (page: ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
