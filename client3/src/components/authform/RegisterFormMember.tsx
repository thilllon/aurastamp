import { useSignUpLocal } from '@/apis/auth';
import { Link } from '@/components/Link';
import { yupResolver } from '@hookform/resolvers/yup';
import { Close } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormHelperText,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import * as Yup from 'yup';

type FormValues = {
  // username: string;
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

const defaultDialog = {
  open: false,
  contents: '',
  title: '',
};

// FIXME: validator 모으기
export const rules = {
  firstName: {
    min: 1,
    max: 20,
  },
  lastName: {
    min: 1,
    max: 20,
  },
  password: {
    min: 8,
    max: 20,
  },
};

export const RegisterFormMember = ({ email: emailProp }: { email?: string }) => {
  const { t } = useTranslation();

  const formSchema = Yup.object().shape({
    // username: Yup.string()
    //   .required(t('필수항목'))
    //   .min(4, 'Username must be at 4 char long')
    //   .max(20, 'Username must be within 20 char')
    //   .matches(
    //     /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,19}$/,
    //     'start with alphanumeric, non-consecutive special charaters(dot, hyphen, dash) are allowed, minimum 4, maximum 20 length'
    //   ),
    firstName: Yup.string()
      .min(rules.firstName.min)
      .max(rules.firstName.max)
      .required(t('필수항목')),
    lastName: Yup.string().min(rules.lastName.min).max(rules.lastName.max).required(t('필수항목')),
    email: Yup.string().email(t('올바른 이메일 형식이 아닙니다')).required(t('필수항목')),
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
  });

  const router = useRouter();
  const signUp = useSignUpLocal();
  const { handleSubmit, control, register, setValue, getValues } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldUnregister: false, // value remains when input unmounts if FALSE
    defaultValues: {
      email: emailProp || '',
      agreedAll: false,
      agreedAdulthood: false,
      agreedTerms: false,
      agreedPrivacy: false,
      agreedMarketing: false,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    const data = await signUp.mutateAsync({
      ...formData,
      agreedTerms: true,
      username: '',
    });

    if (data) {
      router.push('/auth/login');
    }
  };

  const [dialog, setDialog] = useState(defaultDialog);

  const onClose = () => {
    setDialog(defaultDialog);
  };

  return (
    <>
      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexFlow: 'column', gap: 2 }}
      >
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Controller
            name='lastName'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
              <TextField
                autoComplete='family-name'
                fullWidth
                required
                placeholder={t('성')}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />

          <Controller
            name='firstName'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
              <TextField
                autoComplete='given-name'
                fullWidth
                required
                placeholder={t('이름')}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error?.message}
                type='text'
                inputProps={{
                  maxLength: 11,
                }}
                InputProps={{}}
              />
            )}
          />
        </Box>

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
                // label='Email'
                value={value}
                disabled={!!emailProp} // 이메일이 주어진 경우 이메일을 고정함
                onChange={emailProp ? undefined : onChange}
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
          render={({ field: { onChange, value, onBlur }, fieldState: { error }, formState }) => (
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

        <Controller
          name='passwordConfirmation'
          control={control}
          defaultValue={''}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              fullWidth
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
                  <Box
                    component='label'
                    sx={{ cursor: 'pointer', fontSize: 12 }}
                    htmlFor='agreedAll'
                  >
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
                <Box
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
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
                <Box
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
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
                <Box
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
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
            disabled={signUp.isLoading}
            loading={signUp.isLoading}
          >
            {t('이메일로 회원가입')}
          </LoadingButton>
          <FormHelperText error={signUp.isError}>{signUp.error?.message}</FormHelperText>
        </Box>
      </Box>

      <PopupDialog open={dialog.open} onClose={onClose} title={''} contents={dialog.contents} />
    </>
  );
};

export const PopupDialog = ({
  title,
  open,
  onClose,
  contents,
}: {
  title: string;
  open: boolean;
  onClose?: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
  contents: string;
}) => {
  return (
    <Dialog fullWidth maxWidth='md' open={open} onClose={onClose}>
      <DialogTitle
        sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography variant='subtitle1' gutterBottom>
          {title}
        </Typography>
        <IconButton onClick={(ev) => onClose(ev, 'backdropClick')}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkGfm]}
          // linkTarget='_blank'
        >
          {contents}
        </ReactMarkdown>
      </DialogContent>
    </Dialog>
  );
};
