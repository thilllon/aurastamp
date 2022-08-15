import { gaEvent } from '@/components/GoogleAnalytics';
import { isDemo } from '@/utils/common';
import { GitHub } from '@mui/icons-material';
import { Box, Button, CircularProgress } from '@mui/material';
import { SxProps } from '@mui/material/styles';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { useQueryClient } from 'react-query';

const githubStyle: SxProps<any> = {
  borderColor: 'transparent !important',
  background: '#000000',
  color: '#ffffff',
  '&:hover': { background: (theme) => theme.colors.alpha.black[70] },
  '&:disabled': {
    color: (theme) => theme.colors.alpha.white[50],
    background: (theme) => theme.colors.alpha.black[70],
  },
};
const kakaoStyle: SxProps<any> = {
  borderColor: 'transparent !important',
  background: '#fae100',
  color: '#000000',
  '&:hover': { background: '#f5d300' },
  '&:disabled': {},
};

const googleStyle: SxProps<any> = {
  // https://developers.google.com/identity/branding-guidelines
  background: '#ffffff',
  borderColor: (theme) => `${theme.colors.alpha.black[30]} !important`,
  // color: '#4285f4',
  color: `#0000008a`,
  '&:hover': { background: '#00000020' },
  '&:disabled': { background: (theme) => theme.colors.alpha.black[30] },
};

export const LoginNextAuth = ({ sx }: { sx?: SxProps }) => {
  const { t } = useTranslation();
  const [disableOauth, setDisableOauth] = useState(false);
  const queryClient = useQueryClient();

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const oauthAllowedHosts = [
        'proved.work',
        'www.proved.work',
        'dev.proved.work',
        'qa.proved.work',
        'staging.proved.work',
        'localhost',
      ];
      const allowed = oauthAllowedHosts.includes(window.location.hostname);
      setDisableOauth(!allowed);
    }
  }, [router.isReady]);

  const [isLoading, setIsLoading] = useState({
    github: false,
    kakao: false,
    google: false,
  });

  const anyLoading = Object.values(isLoading).some(Boolean);

  const makeOnClick = (provider: 'kakao' | 'google' | 'github') => {
    return async () => {
      setIsLoading({ ...isLoading, [provider]: true });
      // default landing page URL
      const callbackUrl = (router.query['callbackUrl'] as string) ?? '/challenges';
      const current = decodeURIComponent(callbackUrl);
      queryClient.clear();
      const signInResult = await signIn(provider, {});
      console.log(signInResult);
      gaEvent('login', { eventLabel: provider });
    };
  };

  useEffect(() => {
    return () => {
      setIsLoading({ kakao: false, github: false, google: false });
    };
  }, []);

  const disabled = anyLoading || disableOauth || isDemo();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'row', md: 'column' },
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        rowGap: 2,
        columnGap: 0,
        ...sx,
      }}
    >
      <Button
        disabled={disabled}
        sx={{ display: { xs: 'none', md: 'inline-flex' }, width: '100%', ...githubStyle }}
        onClick={makeOnClick('github')}
        startIcon={isLoading['github'] ? <CircularProgress /> : <GitHub />}
      >
        {t('GitHub으로 로그인하기')}
      </Button>
      <Button
        disabled={disabled}
        sx={{ display: { md: 'none' }, width: '48%', ...githubStyle }}
        onClick={makeOnClick('github')}
        startIcon={isLoading['github'] ? <CircularProgress /> : <GitHub />}
      >
        {t('GitHub')}
      </Button>
      <Button
        disabled={disabled}
        sx={{ display: { xs: 'none', md: 'inline-flex' }, width: '100%', ...kakaoStyle }}
        onClick={makeOnClick('kakao')}
        startIcon={isLoading['kakao'] ? <CircularProgress /> : <RiKakaoTalkFill />}
      >
        {t('카카오로 로그인하기')}
      </Button>
      <Button
        disabled={disabled}
        sx={{ display: { md: 'none' }, width: '48%', ...kakaoStyle }}
        onClick={makeOnClick('kakao')}
        startIcon={isLoading['kakao'] ? <CircularProgress /> : <RiKakaoTalkFill />}
      >
        {t('Kakao')}
      </Button>
    </Box>
  );
};
