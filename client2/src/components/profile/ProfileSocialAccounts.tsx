import {
  useConnectSocialAccount,
  useDeleteSocialAccountByProvider,
  useGetSocialAccounts,
} from '@/apis/auth';
import { loadKakaoSdk } from '@/utils/common';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Skeleton,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { MouseEventHandler, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';

const ConnectButton = styled(Button)(() => ({
  marginLeft: 'auto',
  height: 'fit-content',
}));

export const ProfileSocialAccounts = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const connectSocialAccount = useConnectSocialAccount();
  const deleteSocialAccountByProvider = useDeleteSocialAccountByProvider();
  const getSocialAccounts = useGetSocialAccounts({});
  const googleAccount = getSocialAccounts.data?.find(({ provider }) => provider === 'google');
  const githubAccount = getSocialAccounts.data?.find(({ provider }) => provider === 'github');
  const kakaoAccount = getSocialAccounts.data?.find(({ provider }) => provider === 'kakao');
  const [sdkLoaded, setSdkLoaded] = useState({
    kakao: false,
    google: false,
    github: false,
  });

  useEffect(() => {
    if (router.isReady && typeof window !== 'undefined') {
      loadKakaoSdk().then(() => {
        const kakaoJsKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
        window.Kakao.init(kakaoJsKey);
        setSdkLoaded((prev) => ({ ...prev, kakao: true }));
      });
      // TODO: load google SDK
      // loadGoogleSdk()
    }
  }, [router, getSocialAccounts]);

  const onConnectKakao = () => {
    const onFailure = (error) => {
      console.error(error);
      enqueueSnackbar(t('Kakao 계정 연결에 문제가 생겼습니다.'), { variant: 'error' });
    };

    // eslint-disable-next-line no-unsafe-optional-chaining
    window.Kakao?.Auth?.loginForm?.({
      throughTalk: true,
      persistAccessToken: true,
      success: (response) => {
        window.Kakao?.API.request({
          url: '/v2/user/me',
          success: async (profile) => {
            console.log(profile);
            try {
              const result = await connectSocialAccount.mutateAsync({
                accountEmail: profile?.kakao_account?.email,
                type: 'oauth',
                provider: 'kakao',
                providerAccountId: profile?.id?.toString(),
                refreshToken: response?.refresh_token,
                accessToken: response?.access_token,
                tokenType: response?.token_type,
                scope: response?.scope,
                idToken: response?.id_token,
              });
              enqueueSnackbar(t('Kakao 계정 연결이 완료되었습니다.'), { variant: 'success' });
            } catch (err) {
              console.log(err);
              if (err.response?.status === 409) {
                enqueueSnackbar(t('이미 Kakao 계정이 사용되고 있습니다.'), { variant: 'error' });
              }
            } finally {
              queryClient.invalidateQueries(['GetSocialAccounts', {}]);
            }
          },
          fail: onFailure,
        });
      },
      fail: onFailure,
    });
  };

  const onDisconnectKakao = async () => {
    try {
      const result = await deleteSocialAccountByProvider.mutateAsync({ provider: 'kakao' });
      queryClient.invalidateQueries(['GetSocialAccounts', {}]);
      enqueueSnackbar(t('Kakao 계정 연결이 해제되었습니다.'), { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(t('Kakao 계정 연결을 해제하는데 문제가 생겼습니다.'), { variant: 'error' });
    }
  };

  const onConnectGithub = () => {
    const url = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_PROFILE_CLIENT_ID}&scope=read:user user:email&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_PROFILE_REDIRECT_URI}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const onDisconnectGithub: MouseEventHandler<HTMLButtonElement> = async (ev) => {
    try {
      const result = await deleteSocialAccountByProvider.mutateAsync({ provider: 'github' });
      queryClient.invalidateQueries(['GetSocialAccounts', {}]);
      enqueueSnackbar(t('GitHub 계정 연결이 해제되었습니다.'), { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(t('GitHub 계정 연결을 해제하는데 문제가 생겼습니다.'), { variant: 'error' });
    }
  };

  return (
    <Container sx={{ mt: 8 }}>
      <Box sx={{ my: 4 }}>
        <Typography variant='h4'>{t('소셜계정')}</Typography>
      </Box>

      <Card>
        {getSocialAccounts.isLoading && (
          <CardContent>
            <Skeleton variant='rectangular' height={48} />
          </CardContent>
        )}

        {getSocialAccounts.data && (
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mr: 2 }}>
                <Image src={'/static/github.svg'} alt='github' width={32} height={32} />
              </Box>
              <Box>
                <Typography variant='h6'>{'GitHub'}</Typography>
                <Typography variant='subtitle1'>
                  {githubAccount ? githubAccount.providerAccountId : t('연결된 계정이 없습니다')}
                </Typography>
              </Box>

              {githubAccount ? (
                <ConnectButton name='github' onClick={onDisconnectGithub} color={'error'}>
                  {t('연결해제')}
                </ConnectButton>
              ) : (
                <ConnectButton name='github' onClick={onConnectGithub} color={'primary'}>
                  {t('연결하기')}
                </ConnectButton>
              )}
            </Box>
          </CardContent>
        )}

        <Divider />

        {getSocialAccounts.isLoading && (
          <CardContent>
            <Skeleton variant='rectangular' height={48} />
          </CardContent>
        )}

        {getSocialAccounts.data && (
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mr: 2 }}>
                <Image src={'/static/kakao.svg'} alt='kakao' width={32} height={32} />
              </Box>
              <Box>
                <Typography variant='h6'>{'Kakao'}</Typography>
                <Typography variant='subtitle1'>
                  {kakaoAccount ? kakaoAccount.providerAccountId : t('연결된 계정이 없습니다')}
                </Typography>
              </Box>

              {kakaoAccount ? (
                <ConnectButton name='kakao' onClick={onDisconnectKakao} color={'error'}>
                  {t('연결해제')}
                </ConnectButton>
              ) : (
                <ConnectButton name='kakao' onClick={onConnectKakao} color={'primary'}>
                  {t('연결하기')}
                </ConnectButton>
              )}
            </Box>
          </CardContent>
        )}

        {/* <Divider /> */}

        {/* {getSocialAccounts.isLoading && (
          <CardContent>
            <Skeleton variant='rectangular' height={48} />
          </CardContent>
        )} */}

        {/* <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mr: 2 }}>
              <Image src={'/static/google.svg'} alt='google' width={32} height={32} />
            </Box>
            <Box>
              <Typography variant='h6'>{'Google'}</Typography>
              <Typography variant='subtitle1'>
                {googleAccount ? googleAccount.providerAccountId : t('연결된 계정이 없습니다')}
              </Typography>
            </Box>
            {googleAccount && (
              <ConnectButton name='google' onClick={onDisconnect} color={'error'}>
                {t('연결해제')}
              </ConnectButton>
            )}
            {!googleAccount && (
              <ConnectButton name='google' onClick={onConnect} color={'primary'}>
                {t('연결하기')}
              </ConnectButton>
            )}
          </Box>
        </CardContent> */}
      </Card>

      {/* {<pre>{JSON.stringify(getSocialAccounts.data ?? {}, null, 2)}</pre>} */}
    </Container>
  );
};

export const GoogleButton = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady && typeof window !== 'undefined' && window?.google) {
      window.google.accounts.id.initialize({
        // client_id: '341797226895-acsa3lkggmhkkelmoe87miq8qgbv2fjs.apps.googleusercontent.com',
        // client_id: '341797226895-urdfp74t8hd3aurqkadkf5ejq2c1pv2p.apps.googleusercontent.com',
        client_id: '341797226895-98bbt7srdbi8b3r0mkj45g3kanahr77a.apps.googleusercontent.com',
        callback: (response) => {
          console.log(response);
          console.log('Encoded JWT ID token: ' + response.credential);
        },
      });
      window.google.accounts.id.renderButton(
        document.getElementById('buttonDiv'),
        { theme: 'outline', size: 'large' } // customization attributes
      );
      window.google.accounts.id.prompt(); // also display the One Tap dialog

      // window.onload = () => {
      //   window.google.accounts.id.initialize({
      //     client_id: '341797226895-acsa3lkggmhkkelmoe87miq8qgbv2fjs.apps.googleusercontent.com',
      //     callback: (response) => {
      //       console.log('Encoded JWT ID token: ' + response.credential);
      //     },
      //   });
      //   window.google.accounts.id.renderButton(
      //     document.getElementById('buttonDiv'),
      //     { theme: 'outline', size: 'large' } // customization attributes
      //   );
      //   window.google.accounts.id.prompt(); // also display the One Tap dialog
      // };
    }
  }, [router.isReady]);

  return (
    <>
      {/* <script src='https://accounts.google.com/gsi/client' async defer></script> */}
      <div id='buttonDiv'></div>
    </>
  );
};
