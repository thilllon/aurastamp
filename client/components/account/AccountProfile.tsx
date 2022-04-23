import { css } from '@emotion/react';
import { PhotoCamera } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardProps,
  Divider,
  Input,
  Typography,
} from '@mui/material';
import React from 'react';

const defaultUser: User = {
  avatar: '/static/images/avatars/avatar_1.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7',
  locale: 'ko-KR',
};

type User = {
  avatar: string;
  city: string;
  country: string;
  jobTitle: string;
  name: string;
  timezone: string;
  locale: string;
};

type AccountProfileProps = {
  user?: User;
} & CardProps;

const id = 'account-profile-uploader';

export const AccountProfile = React.memo(
  ({ user = defaultUser, ...otherProps }: AccountProfileProps) => {
    // FIXME: use useState

    return (
      <Card {...otherProps}>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar src={user.avatar} sx={{ width: 64, height: 64, mb: 2 }} />
            <Typography color='textPrimary' gutterBottom variant='h5'>
              {user.name}
            </Typography>
            <Typography color='textSecondary' variant='body2'>
              {`${user.city} ${user.country}`}
            </Typography>
            <Typography color='textSecondary' variant='body2'>
              Time Zone {user.timezone}
            </Typography>
          </Box>
        </CardContent>

        <Divider />

        <CardActions>
          <Box component='label' htmlFor={id} sx={{ display: 'inline-flex', width: '100%' }}>
            <Input
              id={id}
              type='file'
              inputProps={{ accept: 'image/*' }}
              sx={{ display: 'none' }}
            />
            <Button
              component='span'
              color='primary'
              fullWidth
              variant='text'
              startIcon={<PhotoCamera />}
            >
              {'Upload picture'}
            </Button>
          </Box>
        </CardActions>
      </Card>
    );
  }
);
