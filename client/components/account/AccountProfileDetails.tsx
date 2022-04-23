import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from '@mui/material';
import React, { ChangeEventHandler, useState } from 'react';

const states = [
  { value: 'alabama', label: 'Alabama' },
  { value: 'new-york', label: 'New York' },
  { value: 'san-francisco', label: 'San Francisco' },
];

type AccountProfileDetailsProps = {} & React.HtmlHTMLAttributes<HTMLFormElement>;

export const AccountProfileDetails = (props: AccountProfileDetailsProps) => {
  const [values, setValues] = useState({
    firstName: 'Katarina',
    lastName: 'Smith',
    email: 'demo@devias.io',
    phone: '',
    state: 'Alabama',
    country: 'USA',
  });

  const handleChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (ev) => {
    setValues({
      ...values,
      [ev.target.name]: ev.target.value,
    });
  };

  return (
    <Box component='form' autoComplete='off' noValidate {...props}>
      <Card>
        <CardHeader title='Profile' subheader='The information can be edited' />
        <Divider />
        <CardContent>
          <Grid container rowSpacing={3} columnSpacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText='Please specify the first name'
                label='First name'
                name='firstName'
                onChange={handleChange}
                required
                value={values.firstName}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Last name'
                name='lastName'
                onChange={handleChange}
                required
                value={values.lastName}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Email Address'
                name='email'
                onChange={handleChange}
                required
                value={values.email}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Phone Number'
                name='phone'
                onChange={handleChange}
                type='number'
                value={values.phone}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Country'
                name='country'
                onChange={handleChange}
                required
                value={values.country}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Select State'
                name='state'
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant='outlined'
              >
                {states.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>

        <Divider />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <Button variant='contained'>Save details</Button>
        </Box>
      </Card>
    </Box>
  );
};
