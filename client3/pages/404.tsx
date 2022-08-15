/* eslint-disable @next/next/no-img-element */
import { HeadMetaTags } from '@/components/HeadMetaTags';
import { Link } from '@/components/Link';
import { BaseLayout } from '@/layouts/BaseLayout';
import { SearchTwoTone as SearchTwoToneIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FormEventHandler, ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Status404() {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const router = useRouter();

  const onSubmit: FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    // FIXME: 검색기능 구현
    // console.log(text);
    // router.push('/');
  };

  useEffect(() => {
    return () => {
      setText('');
    };
  }, []);

  return (
    <>
      <HeadMetaTags title={'404 Not Found'} />
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: (theme) => `calc(100vh - ${theme.header.height})`,
          pb: 3,
        }}
      >
        <Container>
          <Box textAlign='center'>
            <Image alt='404' width={240} height={150} src='/static/images/status/404.svg' />
            <Typography variant='h2' sx={{ my: 2 }}>
              {t('찾으시는 페이지가 존재하지 않습니다')}
            </Typography>
            <Typography variant='h4' color='text.secondary' fontWeight='normal' sx={{ mb: 4 }}>
              {t('찾으시는 정보를 검색해주세요')}
            </Typography>
          </Box>

          <Container maxWidth='sm'>
            <Card sx={{ textAlign: 'center', mt: 3, p: 4 }}>
              <Box component='form' onSubmit={onSubmit}>
                <TextField
                  fullWidth
                  value={text}
                  onChange={(ev) => setText(ev.target.value)}
                  sx={{ backgroundColor: (theme) => theme.colors.alpha.white[100] }}
                  placeholder={t('검색...')}
                  InputProps={{
                    startAdornment: (
                      <IconButton onClick={() => {}}>
                        <SearchTwoToneIcon />
                      </IconButton>
                    ),
                  }}
                />
              </Box>

              <Divider sx={{ my: 4 }}>{t('또는')}</Divider>

              <Button LinkComponent={Link} href='/' variant='outlined'>
                {t('홈으로 이동하기')}
              </Button>
            </Card>
          </Container>
        </Container>
      </Box>
    </>
  );
}

Status404.getLayout = (page: ReactElement) => {
  return <BaseLayout>{page}</BaseLayout>;
};
