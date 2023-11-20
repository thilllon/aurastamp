/* eslint-disable @next/next/no-img-element */

'use client';

import { Label } from '@radix-ui/react-label';
import { ChangeEvent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { cn, useEncodeImage } from '../lib/utils';
import { EditorDialog } from './editor-dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';

export const Encoder = () => {
  const originalImageRef = useRef('');

  // const [dialogOpen, setDialogOpen] = useState(false);
  const [imageSource, setImageSource] = useState('');
  const [encodedImage, setEncodedImage] = useState(null);

  const encode = useEncodeImage();

  useEffect(() => {
    if (encode.isSuccess) {
      // TODO:
    }
  }, [encode.isSuccess]);

  function onConfirmEdit(image: File | Blob) {
    // 크롭이 끝난 이미지 정보만 가져오면됨
    // setImage();
    // file, hiddenImage
    // TODO: 자동으로 에디터 닫히게 하기
  }

  async function onClickHideMessage() {
    if (!imageSource) {
      return;
    }
    const [typePart, dataPart] = imageSource.split(','); // image = data:image/png;base64,[base64-encoded-image]
    const mimeType = typePart.replace(/image\/*.;/, ''); // Remove the data: prefix from the MIME type
    // Remove the data:image/<image-type>;base64, prefix from the string
    // Decode the Base64 string into a Uint8Array
    const byteArray = Uint8Array.from(atob(dataPart), (c) => c.charCodeAt(0));
    // Create a Blob object from the Uint8Array
    const blob = new Blob([byteArray], { type: mimeType }); // Replace 'image/png' with the appropriate MIME type

    const encoded = await encode.mutateAsync({
      file: imageSource as unknown as any,
      // hiddenMessage,
      modelName: 'the',
      message: 'asdfsdfsdfsdfsdasdf',
      returnType: '',
      hiddenImage: undefined,
    });
    // setEncodedImage(encoded);
  }

  async function onResetCallback() {
    setImageSource('');
    originalImageRef.current = '';
  }

  async function onLoadCallback(_event: SyntheticEvent<HTMLImageElement>, imageSource: string) {
    setImageSource(imageSource);
    originalImageRef.current = imageSource;
  }

  return (
    <div className='border-4 border-slate-800 flex flex-col min-w-96 p-2'>
      <DragAndDropUploader onLoadCallback={onLoadCallback} onResetCallback={onResetCallback} />

      <EditorDialog
        image={imageSource}
        originalImage={originalImageRef.current}
        onConfirmEdit={onConfirmEdit}
      />

      {/* secret message */}
      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <Label htmlFor='picture'>Secret Message</Label>
        <Input id='picture' type='text' placeholder='Jot down a message to hide' />
      </div>

      {/* an image to be hidden in the main image */}
      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <Label htmlFor='picture' className='text-slate-500'>
          Hide another picture
        </Label>
        <Input id='picture' type='file' />
      </div>

      <Button className='w-full' onClick={onClickHideMessage} disabled={encode.isPending}>
        Go hide!
      </Button>
    </div>
  );
};

// --------------------------------
// --------------------------------
// --------------------------------
// --------------------------------

function DragAndDropUploader({
  onLoadCallback,
  onResetCallback,
}: {
  onLoadCallback: (event: SyntheticEvent<HTMLImageElement>, image: string) => void;
  onResetCallback: () => void;
}) {
  const imageRef = useRef<HTMLImageElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [imageSource, setImageSource] = useState(''); // original image

  function onClickCancel() {
    formRef.current?.reset();
    setImageSource('');
    onResetCallback();
  }

  function onSelectFile(event: ChangeEvent<HTMLInputElement>): void {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setImageSource(reader.result?.toString() || ''));
      reader.readAsDataURL(event.target.files[0]);
    } else {
      setImageSource('');
      onResetCallback();
    }
  }

  function onLoad(event: SyntheticEvent<HTMLImageElement>): void {
    onLoadCallback(event, imageSource);
  }

  return (
    <div>
      {!imageSource && (
        <label
          htmlFor='uploadButton'
          className={cn(
            'flex justify-center items-center border-2 border-slate-900 p-1 hover:bg-slate-100',
            'w-[24rem]',
            'h-[24rem]',
            'min-w-[24rem]',
            'min-h-[24rem]',
          )}
        >
          <form
            name='form1234'
            ref={formRef}
            className={cn(
              'cursor-pointer flex justify-center items-center w-full h-full border-2 border-dashed border-slate-700 m-auto',
            )}
          >
            <input
              id='uploadButton'
              className='hidden'
              type='file'
              accept='image/*'
              onChange={onSelectFile}
            />
            <div className='flex flex-col flex-nowrap justify-center items-center'>
              <span className='text-center select-none text-slate-600 overflow-hidden over'>
                Click to upload image
              </span>
            </div>
          </form>
        </label>
      )}

      {imageSource && (
        <div>
          <div>
            <img
              draggable={false}
              src={imageSource}
              alt={'target image'}
              ref={imageRef}
              onLoad={onLoad}
            />
          </div>
          <div className='flex justify-center items-center mt-4'>
            <Button className='w-full' variant={'outline'} onClick={onClickCancel}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
