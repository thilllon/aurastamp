import { BellIcon } from '@/components/icons/BellIcon';
import { ChartBarIcon } from '@/components/icons/ChartBarIcon';
import { ClockIcon } from '@/components/icons/ClockIcon';
import { CogIcon } from '@/components/icons/CogIcon';
import { DownloadIcon } from '@/components/icons/DownloadIcon';
import { FacebookIcon } from '@/components/icons/FacebookIcon';
import { GoogleIcon } from '@/components/icons/GoogleIcon';
import { LockIcon } from '@/components/icons/LockIcon';
import { MenuIcon } from '@/components/icons/MenuIcon';
import { SearchIcon } from '@/components/icons/SearchIcon';
import { SelectorIcon } from '@/components/icons/SelectorIcon';
import { ShoppingBagIcon } from '@/components/icons/ShoppingBagIcon';
import { UploadIcon } from '@/components/icons/UploadIcon';
import { UserAddIcon } from '@/components/icons/UserAddIcon';
import { UserCircleIcon } from '@/components/icons/UserCircleIcon';
import { UserIcon } from '@/components/icons/UserIcon';
import { UsersIcon } from '@/components/icons/UsersIcon';
import { XCircleIcon } from '@/components/icons/XCircleIcon';
import { Button, Container, Divider, NoSsr, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import copy from 'copy-to-clipboard';
import Image from 'next/image';
import { css } from '@emotion/react';

interface TestPageProps {}

// digest 방식
// https://github.com/axios/axios/issues/686#issuecomment-611210438

export default function TestPage({}: TestPageProps) {
  const router = useRouter();
  const [randomString, setRandomString] = useState('button');

  return (
    <Container>
      <Box>
        <Typography>NEXT_PUBLIC_APP_TITLE: {process.env.NEXT_PUBLIC_APP_TITLE}</Typography>
        <Typography>NEXT_PUBLIC_NODE_ENV: {process.env.NEXT_PUBLIC_NODE_ENV}</Typography>
        <Typography>NODE_ENV: {process.env.NODE_ENV}</Typography>
      </Box>
      <CustomIconsTest />
      <NoSsr>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography>{'copy test'}</Typography>
          <Button
            variant='contained'
            onClick={(ev) => {
              // copy(ev.currentTarget.innerText);
              const random = Math.random().toString(32).substring(2, 10);
              copy(random);
              setRandomString(random);
            }}
          >
            {randomString}
          </Button>
          <Image
            src='/android-chrome-512x512.png'
            width={128}
            height={128}
            alt='icon'
            onClick={() => {
              const random = Math.random().toString(32).substring(2, 10);
              copy(randomString);
            }}
            // sx={{ cursor: 'pointer' }}
            css={css`
              cursor: pointer;
              &:hover {
                opacity: 0.5;
              }
              &:active {
                opacity: 0.8;
              }
            `}
          />
        </Box>
      </NoSsr>
    </Container>
  );
}

export const CustomIconsTest = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <BellIcon />
      <ChartBarIcon />
      <ClockIcon />
      <CogIcon />
      <DownloadIcon />
      <FacebookIcon />
      <GoogleIcon />
      <LockIcon />
      <MenuIcon />
      <SearchIcon />
      <SelectorIcon />
      <ShoppingBagIcon />
      <UploadIcon />
      <UserAddIcon />
      <UserCircleIcon />
      <UserIcon />
      <UsersIcon />
      <XCircleIcon />
    </Box>
  );
};
