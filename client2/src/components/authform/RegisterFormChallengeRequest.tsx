import { useRequestTrial } from '@/apis/trials';
import Link from '@/components/Link';
import { yupResolver } from '@hookform/resolvers/yup';
import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import * as Yup from 'yup';

type FormValues = {
  organizationName: string;
  contactName: string;
  email: string;
  agreedTerms: boolean;
  agreedPrivacy: boolean;
  agreedMarketing: boolean;
  agreedAll: boolean;
};

const defaultDialog = {
  open: false,
  contents: '',
  title: '',
};

const domainBlacklist = [
  '@naver.com',
  '@daum.net',
  '@hotmail.com',
  '@nate.com',
  '@yahoo.co.kr',
  '@yahoo.com',
  '@paran.com',
  '@empas.com',
  '@dreamwiz.com',
  '@freechal.com',
  '@lycos.com',
  '@korea.com',
  '@gmail.com',
  '@hanmir.com',
  '@kakao.com',
];

export const RegisterFormChallengeRequest = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const requestTrial = useRequestTrial();

  const isAllowedDomain = (email: string) => {
    return email && typeof email === 'string'
      ? !domainBlacklist.some((dom) => email.endsWith(dom))
      : false;
  };

  const formSchema = Yup.object().shape({
    organizationName: Yup.string().required('필수항목'),
    contactName: Yup.string().required('필수항목'),
    email: Yup.string()
      .email(t('올바른 이메일 형식이 아닙니다.'))
      .test('emailDomain', t('허용되지 않는 도메인입니다'), isAllowedDomain)
      .required(t('필수항목')),
    agreedTerms: Yup.boolean().required(t('필수항목')),
    agreedPrivacy: Yup.boolean().required(t('필수항목')),
    agreedMarketing: Yup.boolean().notRequired(),
    agreedAll: Yup.boolean().notRequired(),
  });

  const { handleSubmit, control, setValue, getValues, reset } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    reValidateMode: 'onBlur',
    shouldUnregister: false, // value remains when input unmounts if FALSE
    defaultValues: {
      email: '',
      agreedAll: false,
      agreedTerms: false,
      agreedPrivacy: false,
      agreedMarketing: false,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    try {
      const data = await requestTrial.mutateAsync({
        company: formData.organizationName,
        manager: formData.contactName,
        email: formData.email,
        aggreedMarketing: formData.agreedMarketing,
      });
      reset({
        organizationName: '',
        contactName: '',
        email: '',
        agreedAll: false,
      });
      enqueueSnackbar(t('데모 신청이 완료되었습니다.'), { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(t('데모 신청중 문제가 생겼습니다. 다시 시도해주세요.'), { variant: 'error' });
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
        <Controller
          name='organizationName'
          control={control}
          defaultValue=''
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <TextField
                fullWidth
                required
                autoComplete='organization'
                placeholder={t('회사명')}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error?.message}
              />
            );
          }}
        />

        <Controller
          name='contactName'
          control={control}
          defaultValue=''
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              fullWidth
              required
              autoComplete='name'
              placeholder={t('담당자 성함')}
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name='email'
          control={control}
          defaultValue={''}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              fullWidth
              required
              autoComplete='email'
              placeholder={t('업무용 이메일')}
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name='agreedAll'
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
                    id='agreedAll'
                    required={false}
                    checked={value}
                    onChange={(ev) => {
                      const checked = ev.target.checked;
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
            name='agreedTerms'
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
                      id='agreedTerms'
                      required={true}
                      checked={value}
                      onChange={(ev) => {
                        const checked = ev.target.checked;
                        const { agreedAll, agreedPrivacy, agreedMarketing } = getValues();
                        if (!checked && agreedAll) {
                          setValue('agreedAll', false, { shouldValidate: true });
                        }
                        if (checked && agreedPrivacy && agreedMarketing) {
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
                        const { agreedAll, agreedTerms, agreedMarketing } = getValues();
                        if (!checked && agreedAll) {
                          setValue('agreedAll', false, { shouldValidate: true });
                        }
                        if (agreedTerms && checked && agreedMarketing) {
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
                        const { agreedAll, agreedTerms, agreedPrivacy } = getValues();
                        if (!checked && agreedAll) {
                          setValue('agreedAll', false, { shouldValidate: true });
                        }
                        if (agreedTerms && agreedPrivacy && checked) {
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
                  >
                    {t('보기')}
                  </Button>
                </Box>
              );
            }}
          />
        </Box>

        <Box>
          <Button fullWidth type='submit'>
            {t('요청하기')}
          </Button>
          {/* <FormHelperText error={signUp.isError}>{signUp.error?.message}</FormHelperText> */}
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
