import { Facebook as FacebookIcon, Google as GoogleIcon } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import * as Yup from 'yup';
import { Resolver, useForm } from 'react-hook-form';

type FormValues = {
  //
};

const SignIn = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const formik = useFormik({
    initialValues: {
      email: 'demo@devias.io',
      password: 'Password123',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      password: Yup.string().max(255).required('Password is required'),
    }),
    onSubmit: () => {
      router.push('/');
    },
  });

  return (
    <>
      <Head>
        <title>{`Sign In | ${process.env.NEXT_PUBLIC_APP_TITLE}`}</title>
      </Head>

      <Box sx={{ alignItems: 'center', display: 'flex', flexGrow: 1, minHeight: '100%' }}>
        <Container maxWidth='sm'>
          <NextLink href='/' passHref>
            <Button component='a' startIcon={<ArrowBackIcon fontSize='small' />}>
              Dashboard
            </Button>
          </NextLink>

          <Box component='form' onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color='textPrimary' variant='h4'>
                Sign in
              </Typography>
              <Typography color='textSecondary' gutterBottom variant='body2'>
                Sign in on the internal platform
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Button
                  color='info'
                  fullWidth
                  startIcon={<FacebookIcon />}
                  // onClick={formik.handleSubmit}
                  type='submit'
                  size='large'
                  variant='contained'
                >
                  SignIn with Facebook
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth
                  color='error'
                  startIcon={<GoogleIcon />}
                  // onClick={formik.handleSubmit}
                  type='submit'
                  size='large'
                  variant='contained'
                >
                  SignIn with Google
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{
                pb: 1,
                pt: 3,
              }}
            >
              <Typography align='center' color='textSecondary' variant='body1'>
                or sign in with email address
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label='Email Address'
              margin='normal'
              name='email'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type='email'
              value={formik.values.email}
              variant='outlined'
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label='Password'
              margin='normal'
              name='password'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type='password'
              value={formik.values.password}
              variant='outlined'
            />
            <Box sx={{ py: 2 }}>
              <Button
                color='primary'
                disabled={formik.isSubmitting}
                fullWidth
                size='large'
                type='submit'
                variant='contained'
              >
                Sign In Now
              </Button>
            </Box>
            <Typography color='textSecondary' variant='body2'>
              {`Don't have an account?`}
              <Link
                href='/api/auth/signup'
                variant='subtitle2'
                underline='hover'
                sx={{
                  cursor: 'pointer',
                }}
              >{`Sign Up`}</Link>
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default SignIn;
