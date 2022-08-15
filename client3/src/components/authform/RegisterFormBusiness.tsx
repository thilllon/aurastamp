import { Link } from '@/components/Link';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Checkbox, TextField } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useSignUpBusiness } from '../../apis/auth';

type RegisterFormBusinessProps = {};

type FormValues = {
  organization: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  passwordConfirmation: string;
  agreedTerms: boolean;
  agreedPrivacy: boolean;
  agreedAdulthood: boolean;
  agreedMarketing: boolean;
  agreedAll: boolean;
};

export const RegisterFormBusiness = ({}: RegisterFormBusinessProps) => {
  const { t } = useTranslation();
  const signUpBusiness = useSignUpBusiness();

  const { handleSubmit, control, register, setValue, getValues } = useForm<FormValues>({
    reValidateMode: 'onBlur',
    resolver: yupResolver(
      Yup.object().shape({
        organization: Yup.string()
          .required(t('필수항목'))
          .min(2, 'Organization must be at 2 char long')
          .max(100, 'Organization must be within 100 char'),
        firstName: Yup.string().required(t('필수항목')),
        lastName: Yup.string().required(t('필수항목')),
        email: Yup.string().email(t('올바른 이메일 형식이 아닙니다.')).required(t('필수항목')),
        mobile: Yup.string()
          .required(t('필수항목'))
          .matches(/^[0-9]+$/, 'Mobile contains digits only'),
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
  });

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    const data = await signUpBusiness.mutateAsync({ ...formData, type: 'BUSINESS' });
    console.log(
      '🚀 ~ file: RegisterFormBusiness.tsx ~ line 61 ~ constonSubmit:SubmitHandler<FormValues>= ~ data',
      data
    );
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexFlow: 'column', gap: 2 }}
    >
      <Controller
        name='organization'
        control={control}
        defaultValue=''
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            required
            autoComplete='organization'
            placeholder={t('회사명')}
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error?.message}
          />
        )}
      />

      <Box sx={{ display: 'flex', gap: 3 }}>
        <Controller
          name='firstName'
          control={control}
          defaultValue=''
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              required
              autoComplete='given-name'
              placeholder={t('이름')}
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name='lastName'
          control={control}
          defaultValue=''
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              required
              autoComplete='family-name'
              placeholder={t('성')}
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
      </Box>

      <Controller
        name='email'
        control={control}
        defaultValue=''
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            required
            autoComplete='email'
            placeholder={t('이메일')}
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error?.message}
            type='email'
          />
        )}
      />

      <Controller
        name='mobile'
        control={control}
        defaultValue=''
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            required
            autoComplete='tel'
            placeholder={t('전화번호')}
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error?.message}
            type='phone'
          />
        )}
      />

      <Controller
        name='password'
        control={control}
        defaultValue=''
        render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
          <TextField
            required
            autoComplete='new-password'
            placeholder={t('비밀번호 (최소 8자 이상)')}
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error?.message}
            type='password'
          />
        )}
      />

      <Controller
        name='passwordConfirmation'
        control={control}
        defaultValue=''
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            required
            autoComplete='new-password'
            placeholder={t('비밀번호 확인')}
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error?.message}
            type='password'
          />
        )}
      />

      <Controller
        name='agreedAll'
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          return (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ userSelect: 'none' }}>
                <Checkbox
                  size='small'
                  sx={{ p: 0, mr: 1 }}
                  id='agreedAll'
                  required={false}
                  checked={value}
                  onChange={(ev) => {
                    const checked = ev.target.checked;
                    setValue('agreedAdulthood', checked, { shouldValidate: true });
                    setValue('agreedTerms', checked, { shouldValidate: true });
                    setValue('agreedPrivacy', checked, { shouldValidate: true });
                    setValue('agreedMarketing', checked, { shouldValidate: true });
                    onChange(ev);
                  }}
                />
                <Box component='label' sx={{ cursor: 'pointer', fontSize: 12 }} htmlFor='agreedAll'>
                  {t('필수 약관 및 마케팅 활용(선택)에 모두 동의합니다.')}
                </Box>
              </Box>
            </Box>
          );
        }}
      />

      <Box sx={{ pl: 1, pt: 0, mt: -2, display: 'flex', flexFlow: 'column' }}>
        <Controller
          name='agreedAdulthood'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ userSelect: 'none' }}>
                  <Checkbox
                    size='small'
                    sx={{ p: 0, mr: 1 }}
                    id='agreedAdulthood'
                    required={true}
                    checked={value}
                    onChange={(ev) => {
                      const checked = ev.target.checked;
                      const {
                        agreedAll,
                        agreedAdulthood,
                        agreedTerms,
                        agreedPrivacy,
                        agreedMarketing,
                      } = getValues();
                      if (!checked && agreedAll) {
                        setValue('agreedAll', false, { shouldValidate: true });
                      }
                      if (checked && agreedTerms && agreedPrivacy && agreedMarketing) {
                        setValue('agreedAll', true, { shouldValidate: true });
                      }
                      onChange(ev);
                    }}
                  />
                  <Box
                    component='label'
                    sx={{ cursor: 'pointer', fontSize: 12 }}
                    htmlFor='agreedAdulthood'
                  >
                    {t('[필수] 귀하는 만 15세 이상입니까?')}
                  </Box>
                </Box>
                <Button
                  sx={{ px: 1, py: 0, m: 0, minWidth: 0, fontWeight: 'normal' }}
                  variant='text'
                  tabIndex={-1}
                  LinkComponent={Link}
                  target='_blank'
                  href={'/legal#adulthood'}
                  // onClick={makeOnClickLink('adulthood')}
                >
                  {t('보기')}
                </Button>
              </Box>
            );
          }}
        />

        <Controller
          name='agreedTerms'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ userSelect: 'none' }}>
                  <Checkbox
                    size='small'
                    sx={{ p: 0, mr: 1 }}
                    id='agreedTerms'
                    required={true}
                    checked={value}
                    onChange={(ev) => {
                      const checked = ev.target.checked;
                      const {
                        agreedAll,
                        agreedAdulthood,
                        agreedTerms,
                        agreedPrivacy,
                        agreedMarketing,
                      } = getValues();
                      if (!checked && agreedAll) {
                        setValue('agreedAll', false, { shouldValidate: true });
                      }
                      if (agreedAdulthood && checked && agreedPrivacy && agreedMarketing) {
                        setValue('agreedAll', true, { shouldValidate: true });
                      }
                      onChange(ev);
                    }}
                  />
                  <Box
                    component='label'
                    sx={{ cursor: 'pointer', fontSize: 12 }}
                    htmlFor='agreedTerms'
                  >
                    {t('[필수] 통합 이용약관')}
                  </Box>
                </Box>
                <Button
                  sx={{ px: 1, py: 0, m: 0, minWidth: 0, fontWeight: 'normal' }}
                  variant='text'
                  tabIndex={-1}
                  LinkComponent={Link}
                  target='_blank'
                  href={'/legal#terms'}
                  // onClick={makeOnClickLink('terms')}
                >
                  {t('보기')}
                </Button>
              </Box>
            );
          }}
        />

        <Controller
          name='agreedPrivacy'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ userSelect: 'none' }}>
                  <Checkbox
                    size='small'
                    sx={{ p: 0, mr: 1 }}
                    id='agreedPrivacy'
                    required={true}
                    checked={value}
                    onChange={(ev) => {
                      const checked = ev.target.checked;
                      const {
                        agreedAll,
                        agreedAdulthood,
                        agreedTerms,
                        agreedPrivacy,
                        agreedMarketing,
                      } = getValues();
                      if (!checked && agreedAll) {
                        setValue('agreedAll', false, { shouldValidate: true });
                      }
                      if (agreedAdulthood && agreedTerms && checked && agreedMarketing) {
                        setValue('agreedAll', true, { shouldValidate: true });
                      }
                      onChange(ev);
                    }}
                  />
                  <Box
                    component='label'
                    sx={{ cursor: 'pointer', fontSize: 12 }}
                    htmlFor='agreedPrivacy'
                  >
                    {t('[필수] 개인정보 처리방침')}
                  </Box>
                </Box>
                <Button
                  sx={{ px: 1, py: 0, m: 0, minWidth: 0, fontWeight: 'normal' }}
                  variant='text'
                  tabIndex={-1}
                  LinkComponent={Link}
                  target='_blank'
                  href={'/legal#privacy'}
                  // onClick={makeOnClickLink('privacy')}
                >
                  {t('보기')}
                </Button>
              </Box>
            );
          }}
        />

        <Controller
          name='agreedMarketing'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ userSelect: 'none' }}>
                  <Checkbox
                    size='small'
                    sx={{ p: 0, mr: 1 }}
                    id='agreedMarketing'
                    required={false}
                    checked={value}
                    onChange={(ev) => {
                      const checked = ev.target.checked;
                      const {
                        agreedAll,
                        agreedAdulthood,
                        agreedTerms,
                        agreedPrivacy,
                        agreedMarketing,
                      } = getValues();
                      if (!checked && agreedAll) {
                        setValue('agreedAll', false, { shouldValidate: true });
                      }
                      if (agreedAdulthood && agreedTerms && agreedPrivacy && checked) {
                        setValue('agreedAll', true, { shouldValidate: true });
                      }
                      onChange(ev);
                    }}
                  />
                  <Box
                    component='label'
                    sx={{ cursor: 'pointer', fontSize: 12 }}
                    htmlFor='agreedMarketing'
                  >
                    {t('[선택] 마케팅 활용 동의')}
                  </Box>
                </Box>
                <Button
                  sx={{ px: 1, py: 0, m: 0, minWidth: 0, fontWeight: 'normal' }}
                  variant='text'
                  tabIndex={-1}
                  LinkComponent={Link}
                  target='_blank'
                  href={'/legal#marketing'}
                  // onClick={makeOnClickLink('marketing')}
                >
                  {t('보기')}
                </Button>
              </Box>
            );
          }}
        />
      </Box>

      <Box>
        <LoadingButton
          fullWidth
          type='submit'
          // disabled={signUp.isLoading}
          // loading={signUp.isLoading}
        >
          {t('회원가입')}
        </LoadingButton>
      </Box>
    </Box>
  );
};
