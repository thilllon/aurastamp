import { useChangePassword } from '@/apis/auth';
import { useRefMounted } from '@/hooks/useRefMounted';
import { Close } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormHelperText,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { memo, MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

const DialogWrapper = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    overflow: 'visible',
  },
}));

type ChangePasswordDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const ChangePasswordDialog = memo(
  ({ open, onClose: onCloseCallback }: ChangePasswordDialogProps) => {
    const { t } = useTranslation();
    const changePassword = useChangePassword();
    const isMountedRef = useRefMounted();
    const { enqueueSnackbar } = useSnackbar();

    const onClose = () => {
      onCloseCallback?.();
    };

    const onClickClose: MouseEventHandler<HTMLButtonElement> = () => {
      onClose();
    };

    return (
      <DialogWrapper open={open} maxWidth='sm' fullWidth onClose={onClose}>
        <DialogTitle
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Typography variant='h6'>{t('비밀번호 재설정')}</Typography>
          <IconButton onClick={onClickClose}>
            <Close />
          </IconButton>
        </DialogTitle>

        <Divider />

        <DialogContent sx={{}}>
          <Formik
            initialValues={{
              oldPassword: '',
              newPassword: '',
              newPasswordConfirmation: '',
              submit: null,
            }}
            validationSchema={Yup.object().shape({
              oldPassword: Yup.string().required(t('현재 비밀번호를 입력해주세요.')),
              newPassword: Yup.string()
                .required(t('필수항목'))
                .min(8, t('비밀번호는 8자 이상이어야 합니다'))
                .max(20, t('비밀번호는 20자 이하이어야 합니다'))
                .matches(
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/,
                  t('1개 이상의 영문자, 특수문자, 숫자를 포함해야 합니다')
                )
                .notOneOf([Yup.ref('oldPassword')], t('기존 비밀번호와 일치합니다.')),
              newPasswordConfirmation: Yup.string()
                .required(t('필수항목'))
                .oneOf([Yup.ref('newPassword')], t('비밀번호가 일치하지 않습니다')),
            })}
            onSubmit={async (
              { oldPassword, newPassword, newPasswordConfirmation },
              { setErrors, setStatus, setSubmitting }
            ) => {
              try {
                const data = await changePassword.mutateAsync({
                  oldPassword,
                  newPassword,
                  newPasswordConfirmation,
                });
                if (isMountedRef()) {
                  setStatus({ success: true });
                  setSubmitting(false);
                }
                onClose();
                enqueueSnackbar(t('비밀번호가 변경되었습니다.'), { variant: 'success' });
              } catch (err) {
                console.error(err);
                if (isMountedRef()) {
                  setStatus({ success: false });
                  setErrors({ submit: err.message });
                  setSubmitting(false);
                }
              }
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
              <Box component='form' noValidate onSubmit={handleSubmit} sx={{}}>
                <TextField
                  autoComplete='password'
                  placeholder={t('기존 비밀번호')}
                  error={Boolean(touched.oldPassword && errors.oldPassword)}
                  helperText={touched.oldPassword && errors.oldPassword}
                  fullWidth
                  margin='normal'
                  name='oldPassword'
                  onBlur={handleBlur}
                  onChange={(ev) => {
                    handleChange(ev);
                    changePassword.reset();
                  }}
                  type='password'
                  value={values.oldPassword}
                  variant='outlined'
                />
                <FormHelperText error={changePassword.isError}>
                  {changePassword?.error?.response?.status === 401 &&
                    t('기존 비밀번호가 유효하지 않습니다. 다시 확인해주세요.')}
                </FormHelperText>

                <TextField
                  placeholder={t('비밀번호')}
                  autoComplete='new-password'
                  error={Boolean(touched.newPassword && errors.newPassword)}
                  helperText={touched.newPassword && errors.newPassword}
                  fullWidth
                  margin='normal'
                  name='newPassword'
                  onBlur={handleBlur}
                  onChange={(ev) => {
                    handleChange(ev);
                    changePassword.reset();
                  }}
                  type='password'
                  value={values.newPassword}
                  variant='outlined'
                />
                <FormHelperText error={changePassword.isError}>
                  {changePassword?.error?.response?.status === 400 &&
                    t('새 비밀번호 및 확인이 일치하지 않습니다. 다시 확인해주세요.')}
                </FormHelperText>

                <TextField
                  placeholder={t('비밀번호 확인')}
                  autoComplete='new-password'
                  error={Boolean(touched.newPasswordConfirmation && errors.newPasswordConfirmation)}
                  helperText={touched.newPasswordConfirmation && errors.newPasswordConfirmation}
                  fullWidth
                  margin='normal'
                  name='newPasswordConfirmation'
                  onBlur={handleBlur}
                  onChange={(ev) => {
                    handleChange(ev);
                    changePassword.reset();
                  }}
                  type='password'
                  value={values.newPasswordConfirmation}
                  variant='outlined'
                />
                <FormHelperText error={changePassword.isError}>
                  {changePassword?.error?.response?.status === 400 &&
                    t('새 비밀번호 및 확인이 일치하지 않습니다. 다시 확인해주세요.')}
                </FormHelperText>

                <LoadingButton
                  sx={{ mt: 3 }}
                  disabled={
                    !values.oldPassword ||
                    !values.newPassword ||
                    !values.newPasswordConfirmation ||
                    values.oldPassword === values.newPassword ||
                    values.newPassword !== values.newPasswordConfirmation ||
                    Boolean(
                      touched.oldPassword &&
                        errors.oldPassword &&
                        touched.newPassword &&
                        errors.newPassword &&
                        touched.newPasswordConfirmation &&
                        errors.newPasswordConfirmation
                    )
                  }
                  type='submit'
                  fullWidth
                  loading={changePassword.isLoading}
                >
                  {t('비밀번호 재설정')}
                </LoadingButton>

                <FormHelperText error={changePassword.isError}>
                  {changePassword?.error?.response?.status === 500 && t('오류가 발생하였습니다.')}
                </FormHelperText>
              </Box>
            )}
          </Formik>
        </DialogContent>
      </DialogWrapper>
    );
  }
);
