import React, { ChangeEventHandler, SyntheticEvent, useEffect, useState } from 'react';
import {
  Stack,
  Snackbar,
  Alert,
  AlertProps,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  CardHeader,
  Divider,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { Resolver, useForm } from 'react-hook-form';
import { useChangePassword } from '@/services/hooks';
import { Close as CloseIcon } from '@mui/icons-material';
import { useCustomSession } from '@/utils/next-auth-react-query';
import { ConsecutiveSnackbars } from '@/components/shared/ConsecutiveSnackbars';

type SettingsPasswordProps = {};

type FormValues = {
  password: string;
  newPassword: string;
  newPasswordConfirm: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.password ? values : {},
    errors: !values.password
      ? {
          password: {
            type: 'required',
            message: 'This is required.',
          },
        }
      : {},
  };
};

export const SettingsPassword = (props: SettingsPasswordProps) => {
  const changePasword = useChangePassword();
  const [session] = useCustomSession({ required: true });

  const { register, handleSubmit, reset } = useForm<FormValues>({
    resolver,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {},
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    delayError: undefined,
  });

  useEffect(() => {
    if (changePasword.isError) {
      console.info(changePasword.error);
    } else if (changePasword.data) {
      reset();
    }
  }, [changePasword, reset]);

  const [openAlert, setOpenAlert] = useState(false);

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const onSubmit = async (data: any) => {
    console.info(data);
    try {
      const response = await changePasword.mutateAsync({
        username: session?.user?.name as string,
        password: data.password,
        newPassword: data.newPassword,
        newPasswordConfirm: data.newPasswordConfirm,
      });
      console.info(response);
      reset();
      setOpenAlert(true);
    } catch (err) {
      console.error(err);
    }
  };

  const defaultProps: TextFieldProps = {
    fullWidth: true,
    margin: 'normal',
    required: true,
    type: 'password',
    variant: 'outlined',
  };

  console.info('render password change');

  return (
    <Box sx={{ pt: 3 }} component='form' {...props} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader subheader='Update password' title='Password' />
        <Divider />
        <CardContent>
          <TextField label='Current Password' {...defaultProps} {...register('password')} />
          <TextField label='New Password' {...defaultProps} {...register('newPassword')} />
          <TextField
            label='New Password Confirmation'
            {...defaultProps}
            {...register('newPasswordConfirm')}
          />
        </CardContent>
        <Divider />
        <CardContent sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type='submit' variant='contained'>
            Update
          </Button>
        </CardContent>
      </Card>

      <Snackbar open={openAlert} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          // variant='filled'
          elevation={6}
          severity='success'
          sx={{ width: '100%' }}
        >
          {'비밀번호가 변경되었습니다.'}
        </Alert>
      </Snackbar>
    </Box>
  );
};
