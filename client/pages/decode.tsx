/* eslint-disable @next/next/no-img-element */
import { Firework2 } from '@/components/Firework';
import { ImageCrop } from '@/components/imageEditor/ImageCrop';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Link } from '@/components/shared/Link';
import { Box, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import React, { ChangeEventHandler, ReactNode, useCallback, useState } from 'react';
import { PixelCrop } from 'react-image-crop';
import { StampModel } from '@/types/types';

type DecodePageProps = {};

const footerHeight = 120;

export default function DecodePage({}: DecodePageProps) {
  const [file, setFile] = useState<File>();
  const [cropped, setCropped] = useState<PixelCrop>();
  const [modelName, setModelName] = useState<StampModel>('the');
  const [secret, setSecret] = useState('');
  const [showCongrats, setShowCongrats] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');


  const onChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    setFile(ev.target.files?.[0] ?? undefined);
  };

  const onCropEnd = useCallback((img: PixelCrop | undefined) => {
    setCropped(img);
  }, []);

  const onClickExtract = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URI;
    const url = baseUrl + '/decode_stamp';
    const formData = new FormData();
    if (!file) {
      return;
    }
    formData.append('file', file);
    if (modelName) {
      formData.append('model_name', modelName);
    }
    try {
      setLoading(true);
      const res = await axios.post(url, formData);
      console.info(res.data);
      if (res.data.secret) {
        setSecret(res.data.secret);
        setShowCongrats(true);
      }
      else if (res.data.error) {
        setErrMsg(res.data.error);
      }
    } catch (err) {
      console.error(err);
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
          minHeight: (theme) =>
            `calc(100vh - ${Number(theme.mixins.toolbar.minHeight) + 8 + footerHeight}px)`,
        }}
      >
        <Box sx={{ width: '100%', height: '70%', display: 'flex', alignItems: 'center', gap: 1, mt: 2, mb: 3 }}>
         <ImageCrop onChange={onChange} onCropEnd={onCropEnd} type={'decode'} />
        </Box>

        {secret && (
          <Box sx={{ display: 'flex', 
            border: 1,
            p: 4,
            borderRadius: '12px',
            alignItems: 'center',
            borderColor: (theme) => theme.palette.primary.main,
            flexFlow: 'column nowrap' }}>
          {secret?.startsWith('http') ? (
            <Link href={secret}>
              <Typography>{secret}</Typography>
            </Link>
          ) : (
            <Typography>{secret}</Typography>
          )}
          {/* {showCongrats && <Firework2 />} */}
        </Box>
        )}

        {errMsg && (
          <Box sx={{ display: 'flex', flexFlow: 'column nowrap' }}>
            <Typography>{errMsg}</Typography>
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
          <Box sx={{ width: '30%', display: 'flex', gap: 1, mt: 2, mb: 3 }}>
            <Button
              sx={{ flex: 1 }}
              variant={'contained'}
              onClick={onClickExtract}
              disabled={!file}
            >
              Extract
            </Button>
          </Box>
          {/* <Link href='/encode'>{`Hide your secret message!`}</Link> */}
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

DecodePage.getLayout = (page: ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
