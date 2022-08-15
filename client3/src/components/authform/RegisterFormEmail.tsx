import { useSendVerificationEmail } from '@/apis/auth';
import { AuthFormContainer, AuthFormWrapper } from '@/components/authform/AuthFormWrapper';
import { AuthLinks } from '@/components/authform/AuthLinks';
import { CustomDialog } from '@/components/CustomDialog';
import { LoginNextAuth } from '@/content/Auth/Login/LoginNextAuth';
import { isDemo } from '@/utils/common';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

type FormValues = {
  email: string;
};

export default function RegisterFormEmail() {
  const { t } = useTranslation();
  const router = useRouter();
  const errorQuery = router.query.error as string;
  const sendEmail = useSendVerificationEmail();
  const [openDialog, setOpenDialog] = useState(false);
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: yupResolver(
      Yup.object().shape({
        email: Yup.string().email(t('올바른 이메일 형식이 아닙니다.')).required(t('필수항목')),
      })
    ),
  });

  const onSubmit: SubmitHandler<FormValues> = async ({ email }) => {
    const data = await sendEmail.mutateAsync({ email });
    if (data) {
      setOpenDialog(true);
    }
  };

  return (
    <>
      <AuthFormWrapper>
        <AuthFormContainer>
          <Card sx={{ p: { xs: 2, md: 4 } }}>
            <Typography variant='h3' sx={{ mb: { xs: 2, md: 4 } }}>
              {t('개인회원 가입')}
            </Typography>

            <LoginNextAuth />

            <Divider sx={{ my: { xs: 3, md: 4 } }}>{t('또는')}</Divider>

            <Box
              component='form'
              onSubmit={handleSubmit(onSubmit)}
              sx={{ display: 'flex', flexFlow: 'column', gap: 2 }}
            >
              <Controller
                name='email'
                control={control}
                defaultValue=''
                render={({ field: { onChange, value }, fieldState: { error } }) => {
                  const helperText = errorQuery
                    ? errorQuery
                    : error
                    ? error.message
                    : sendEmail.error
                    ? (sendEmail.error.response?.data as any)?.statusCode === 409
                      ? t('이미 존재하는 이메일입니다.')
                      : sendEmail.error.message
                    : sendEmail.data
                    ? t('이메일을 확인해주세요.')
                    : null;

                  return (
                    <TextField
                      id='email'
                      autoComplete='email'
                      disabled={sendEmail.isLoading || isDemo()}
                      required
                      placeholder={t('이메일')}
                      value={value}
                      onChange={onChange}
                      error={!!error || sendEmail.isError}
                      helperText={helperText}
                    />
                  );
                }}
              />

              <Button
                type='submit'
                disabled={sendEmail.isLoading || isDemo()}
                startIcon={sendEmail.isLoading && <CircularProgress />}
              >
                {t('이메일로 회원가입')}
              </Button>

              {isDemo() && (
                <FormHelperText error={true}>
                  {t('데모 페이지에서는 회원가입이 불가능합니다')}
                </FormHelperText>
              )}
            </Box>

            <AuthLinks registerMember={false} />
          </Card>
        </AuthFormContainer>
      </AuthFormWrapper>

      <CustomDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
        // message={t('Check your email for further instructions')}
        message={t('이메일에서 가입 확인 버튼을 눌러주세요')}
        // alertMessage={t('The registration instructions have been sent to your email')}
        alertMessage={t('확인 메일이 전송되었습니다')}
        buttonText={t('로그인하기')}
        href={'/auth/login'}
        color={'success'}
      />
    </>
  );
}
