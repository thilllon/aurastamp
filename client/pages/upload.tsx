import { GetServerSideProps } from 'next';
import React, { ChangeEventHandler } from 'react';
import axios from 'axios';

type UploadPageProps = {};

export default function UploadPage({}: UploadPageProps) {
  const onChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    if (ev.target.files) {

      const uploadUrl = `https://api.cloudinary.com/v1_1/thilllon/image/upload`;
      axios.post(uploadUrl, formData, {
        headers: {
          // 'Content-Type': 'multipart/form-data',
          // ...formData.getHeaders(),
        },
      });
    }
  };

  return (
    <div>
      <input type='file' onChange={onChange} />
    </div>
  );
}
