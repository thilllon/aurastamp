'use client';

import { useEffect, useState } from 'react';
import LogRocketCropper from './logrocket-cropper/logrocket-cropper';
import { Button } from './ui/button';
import { useEncodeImage } from '../lib/utils';
import { TextField } from '@radix-ui/themes';
import { Input } from './ui/input';
import { Label } from '@radix-ui/react-label';

export const Encoder = () => {
  const [image, setImage] = useState(null);
  const [encodedImage, setEncodedImage] = useState(null);
  const encode = useEncodeImage();

  useEffect(() => {
    if (encode.isSuccess) {
      //
    }
  }, [encode.isSuccess]);

  function onCropEnd(image: File | Blob) {
    // 크롭이 끝난 이미지 정보만 가져오면됨
    // setImage();
    // file, hiddenImage
  }

  async function onClickHideMessage() {
    // const encoded = await encode.mutateAsync({
    //   file:image,
    //   hiddenImage,
    //   hiddenMessage,
    //   modelName:'the',
    //   returnType:undefined,
    // });
    // setEncodedImage(encoded);
  }

  return (
    <div className='border-4 border-slate-800 gap-4 flex flex-col w-96 p-2'>
      {/* <LegacyCropper /> */}

      {/* <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Picture</Label>
        <Input id="picture" type="file" />
      </div> */}

      <LogRocketCropper controlAspect onCropEnd={onCropEnd} />

      {/* TODO: hidden image */}
      {/* <input type="file" placeholder="hidden image" /> */}

      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <Label htmlFor='picture'>Secret Message</Label>
        <Input id='picture' type='text' placeholder='Jot down a message to hide' />
      </div>

      <Button className='w-full' onClick={onClickHideMessage} disabled={encode.isPending}>
        Hide a secret message
      </Button>
    </div>
  );
};
