import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { PhotoCamera } from '@mui/icons-material';
import { Box, Button, Container, IconButton, Input, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import getConfig from 'next/config';
import React, { ReactNode, ChangeEventHandler, useState } from 'react';
import axios from 'axios';
import { download, downloadBuffer } from '@/utils/common';

const { publicRuntimeConfig } = getConfig();

type IndexPageProps = {};

export default function IndexPage({}: IndexPageProps) {
  const { data: session } = useSession();
  const [files, setFiles] = useState<File[]>([]);
  const [modelName, setModelName] = useState('BTS');

  const onChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    console.info(ev.target.files);
    setFiles(ev.target.files ?? []);
  };

  const onClick = async () => {
    // const baseUrl = 'http://localhost:3333';
    // const url = baseUrl + '/api/encode';
    const baseUrl = 'http://20.41.116.194:8000';
    const url = baseUrl + '/encode_stamp';

    const formData = new FormData();
    if (files.length === 0) {
      return;
    }
    const file = files[0];

    formData.append('file', file);
    formData.append('model_name', modelName);
    formData.append('text', '안녕하세요');
    const res = await axios.post(url, formData, {
      // responseType: 'blob', // Important
      responseType: 'arraybuffer',
    });
    debugger;
    console.info(typeof res.data);
    // const buf = Buffer.from(res.data, 'utf8');

    downloadBuffer(res.data, 'arraybuffer.png', file.type);
    // download(res.data, 'donload.png');
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
