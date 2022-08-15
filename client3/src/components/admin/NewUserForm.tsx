import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  agreedTerms: boolean;
  agreedPrivacy: boolean;
  agreedAdulthood: boolean;
  agreedMarketing: boolean;
  agreedAll: boolean;
};

export const NewUserForm = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { handleSubmit, control, register, setValue, getValues } = useForm<FormValues>({
    resolver: yupResolver(
      Yup.object().shape({
        firstName: Yup.string().required(t('필수항목')),
        lastName: Yup.string().required(t('필수항목')),
        email: Yup.string().email(t('올바른 이메일 형식이 아닙니다.')).required(t('필수항목')),
        password: Yup.string()
          .required(t('필수항목'))
          .min(8, t('비밀번호는 8자 이상이어야 합니다'))
          .max(20, t('비밀번호는 20자 이하이어야 합니다'))
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/,
            t('1개 이상의 영문자, 특수문자, 숫자를 포함해야 합니다')
          ),
        passwordConfirmation: Yup.string()
          .required(t('필수항목'))
          .oneOf([Yup.ref('password')], t('비밀번호가 일치하지 않습니다')),
        agreedAdulthood: Yup.boolean().required(t('필수항목')),
        agreedTerms: Yup.boolean().required(t('필수항목')),
        agreedPrivacy: Yup.boolean().required(t('필수항목')),
        agreedMarketing: Yup.boolean().notRequired(),
        agreedAll: Yup.boolean().notRequired(),
      })
    ),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    shouldUnregister: false,
    defaultValues: {
      // email: emailProp || '',
      // agreedAll: false,
      // agreedAdulthood: false,
      // agreedTerms: false,
      // agreedPrivacy: false,
      // agreedMarketing: false,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    alert('준비중입니다.');
    // const data = await signUp.mutateAsync({
    //   ...formData,
    //   agreedTerms: true,
    //   username: '',
    // });
    // if (data) {
    //   router.push('/auth/login');
    // }
  };

  return (
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
          return (
            <TextField
              fullWidth
              required
              autoComplete='email'
              label='Email'
              value={value}
              // disabled={!!emailProp} // 이메일이 주어진 경우 이메일을 고정함
              // onChange={emailProp ? undefined : onChange}
              error={!!error}
              helperText={error?.message}
              type='email'
            />
          );
        }}
      />

      <Controller
        name='password'
        control={control}
        defaultValue=''
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            fullWidth
            required
            autoComplete='new-password'
            placeholder={t('비밀번호 (1개 이상의 영문자, 특수문자, 숫자를 포함)')}
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error?.message}
            type='password'
          />
        )}
      />

      <Button type='submit'>{t('생성')}</Button>
    </Box>
  );
};
