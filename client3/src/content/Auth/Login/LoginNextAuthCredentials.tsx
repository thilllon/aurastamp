import { useSignInLocal } from '@/apis/auth';
import { gaEvent } from '@/components/GoogleAnalytics';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, FormHelperText, TextField } from '@mui/material';
import { SxProps } from '@mui/material/styles';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';

type FormValues = {
  emailOrUsername: string;
  password: string;
};

export const LoginNextAuthCredentials: FC<{ sx?: SxProps }> = ({ sx }) => {
  // --------------------------------
  // next-auth의 credentials 방법을 이용한 방법
  // --------------------------------
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const router = useRouter();
  const signInLocal = useSignInLocal({});
  const { handleSubmit, control, reset } = useForm<FormValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(
      Yup.object().shape({
        emailOrUsername: Yup.string()
          .email(t('올바른 이메일 형식이 아닙니다.'))
          .required(t('필수항목')),
        password: Yup.string().required(t('필수항목')),
      })
    ),
  });
  const [saveEmail, setSaveEmail] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      const emailOrUsername = window.localStorage.getItem('emailOrUsername');
      setSaveEmail(!!emailOrUsername);
      if (emailOrUsername) {
        reset({ emailOrUsername });
      }
    }
  }, [reset, router.isReady]);

  const onSubmit: SubmitHandler<FormValues> = async ({ emailOrUsername, password }) => {
    if (saveEmail) {
      window.localStorage.setItem('emailOrUsername', emailOrUsername);
    } else {
      window.localStorage.removeItem('emailOrUsername');
    }
    const data = await signInLocal.mutateAsync({ emailOrUsername, password });
    console.log(data);
    if (!data?.accessToken) {
      return;
    }
    queryClient.clear();
    await signIn('credentials', { emailOrUsername, password });
    gaEvent('login', { eventLabel: 'credentials' });
  };

  return (
    <>
      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexFlow: 'column', gap: 2 }}
      >
        <Controller
          name='emailOrUsername'
          control={control}
          defaultValue=''
          render={({ formState, field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              required
              autoComplete='email'
              // NOTE: 원래 username, email 모두로 로그인 가능한 github login 방식을 따라했음
              placeholder={t('이메일')}
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name='password'
          control={control}
          defaultValue=''
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              required
              autoComplete='password'
              placeholder={t('비밀번호')}
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error?.message}
              type='password'
            />
          )}
        />

        <Box>
          <LoadingButton
            fullWidth
            type='submit'
            disabled={signInLocal.isLoading}
            loading={signInLocal.isLoading}
          >
            {t('이메일로 로그인')}
          </LoadingButton>

          {signInLocal.isError && (
            <FormHelperText error={signInLocal.isError}>
              {t('이메일 또는 비밀번호가 올바르지 않습니다')}
            </FormHelperText>
          )}
        </Box>
      </Box>

      {/* <FormControlLabel
        control={
          <Checkbox
            checked={saveEmail}
            onChange={(ev) => {
              setSaveEmail(ev.target.checked);
            }}
            name='saveEmail'
          />
        }
        label={'Save email/username'}
      /> */}
    </>
  );
};
