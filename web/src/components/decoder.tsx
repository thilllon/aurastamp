'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { DownloadIcon, ScissorsIcon } from 'lucide-react';
import { ChangeEvent, MouseEvent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Base64DataUrl, ImageMetadata } from '../libs/types';
import { hyperlinkify, useDecodeImage } from '../libs/utils';
import { DragAndDropUploader } from './drag-and-drop-uploader';
import { ImageEditor } from './image-editor/image-editor';
import { Spinner } from './spinner';
import { Button } from './ui/button';

export const Decoder = () => {
  const originalImageRef = useRef<Base64DataUrl>('');
  const [imageSource, setImageSource] = useState<Base64DataUrl>('');
  const [imageMetadata, setImageMetadata] = useState<ImageMetadata | null>(null);
  const decode = useDecodeImage();
  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm({});

  useEffect(() => {
    if (decode.isSuccess) {
      // scroll to the bottom
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  }, [decode.isSuccess]);

  function editor__onConfirm(event: MouseEvent<HTMLButtonElement>, dataUrl: Base64DataUrl) {
    setImageSource(dataUrl);
    setOpenDialog(() => false);
  }

  function editor__onCrop() {
    alert('Cropped!');
  }

  async function onSubmit() {
    if (!imageMetadata || !imageSource) {
      return;
    }
    decode.mutate({
      imageSource,
      metadata: imageMetadata,
    });
  }

  async function uploader__onSelectFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    setImageMetadata(() => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      webkitRelativePath: file.webkitRelativePath,
    }));
  }

  async function uploader__onLoad(_event: SyntheticEvent<HTMLImageElement>, imageSource: string) {
    setImageSource(() => imageSource);
    originalImageRef.current = imageSource;
  }

  async function uploader__onReset() {
    _resetImage();
  }

  function _resetImage() {
    originalImageRef.current = '';
    setImageSource(() => '');
    setImageMetadata(() => null);
    decode.reset();
  }

  if (decode.isError) {
    console.error(decode.error);
  }

  return (
    <div className='flex w-full max-w-sm flex-col flex-nowrap items-center  justify-center'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex w-full flex-col'>
          <DragAndDropUploader
            disabled={decode.isPending}
            imageSourceInput={imageSource}
            onChange={uploader__onSelectFile}
            onLoad={uploader__onLoad}
            onReset={uploader__onReset}
          />
          <Dialog open={openDialog} onOpenChange={(state) => setOpenDialog(() => state)}>
            {Boolean(imageSource) && (
              <div className='flex flex-row items-center justify-center gap-4'>
                <DialogTrigger asChild>
                  <Button
                    disabled={decode.isPending}
                    variant='outline'
                    className='mt-4 w-full gap-2'
                  >
                    <ScissorsIcon size={16} />
                    {'Edit'}
                  </Button>
                </DialogTrigger>
              </div>
            )}

            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>{'Edit Image'}</DialogTitle>
                <DialogDescription>
                  {`Make changes to your picture here. Click confirm when you're done.`}
                </DialogDescription>
              </DialogHeader>

              {Boolean(imageSource) && (
                <ImageEditor
                  onConfirm={editor__onConfirm}
                  onCrop={editor__onCrop}
                  image={imageSource}
                  originalImage={originalImageRef.current}
                />
              )}
            </DialogContent>
          </Dialog>

          {decode.isSuccess && decode.data && (
            <div className='mt-4 flex flex-col items-center justify-center'>
              <div>
                <b>{'Hidden message'}</b>
              </div>
              <div
                className='mt-2 w-full  break-normal break-all rounded-md border-2 bg-gray-100 p-2'
                style={{ lineBreak: 'anywhere' }}
                dangerouslySetInnerHTML={{ __html: hyperlinkify(decode.data.message) }}
              />
              <Button variant={'link'} className='mt-4 gap-1'>
                <DownloadIcon size={16} />
                <a href={decode.data.downloadUrl} download={true} target='_blank'>
                  {'Download the original image'}
                </a>
              </Button>
            </div>
          )}

          {decode.isError && (
            <p className='mt-4 text-center text-red-400'>{'Message is not found'}</p>
          )}

          <Button type='submit' className='mt-4 w-full gap-1' disabled={decode.isPending}>
            {'Unveil the message'}
            <Spinner size='small' className='text-secondary' show={decode.isPending} />
          </Button>
        </form>
      </Form>
    </div>
  );
};
