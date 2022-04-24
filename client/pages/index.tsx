import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { PhotoCamera } from '@mui/icons-material';
import { Box, Button, Container, IconButton, Input, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import getConfig from 'next/config';
import React, { ReactNode, ChangeEventHandler, useState } from 'react';
import axios from 'axios';

const { publicRuntimeConfig } = getConfig();

type IndexPageProps = {};

export default function IndexPage({}: IndexPageProps) {
  const { data: session } = useSession();
  const [files, setFiles] = useState<File[]>([]);
  const [modelName, setModelName] = useState('BTS');
  const onChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    console.info(ev.target.files);
    debugger;
  };
  const onClick = async () => {
    const baseURL = '';
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('model_name', modelName);
    formData.append('text', '안녕하세요');
    debugger;
    const res = await axios.post('http://20.41.116.194:8000', formData);
    console.info(res.data);
  };

  return (
    <Container maxWidth='sm'>
      <Box>
        <Typography>user: {JSON.stringify(session?.user ?? {})}</Typography>

        <label htmlFor='icon-button-file'>
          <Input
            inputProps={{ accept: 'image/*' }}
            id='icon-button-file'
            type='file'
            onChange={onChange}
          />

          {/* <IconButton color='primary' component='span'>
            <PhotoCamera />
          </IconButton> */}
        </label>
        <Button onClick={onClick}>변환</Button>
      </Box>
    </Container>
  );
}

IndexPage.getLayout = (page: ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
