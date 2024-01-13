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
import { MouseEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ImageEditor } from './image-editor/image-editor';
import { Button } from './ui/button';

import { DownloadIcon, ScissorsIcon } from 'lucide-react';
import { ChangeEvent, SyntheticEvent, useRef } from 'react';
import { Base64DataUrl, ImageMetadata } from '../lib/types';
import { hyperlinkify, useDecodeImage } from '../lib/utils';
import { DragAndDropUploader } from './drag-and-drop-uploader';

export const Decoder = () => {
  const originalImageRef = useRef<Base64DataUrl>('');
  const [imageSource, setImageSource] = useState<Base64DataUrl>('');
  const [imageMetadata, setImageMetadata] = useState<ImageMetadata | null>(null);
  const [decoded, setDecoded] = useState<{
    message: string;
    downloadUrl: string;
  } | null>(null);
  const decode = useDecodeImage();
  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm({});

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
    <div className='flex flex-col flex-nowrap justify-center items-center w-full m-4 max-w-sm'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col p-2 w-full'>
          <DragAndDropUploader
            disabled={decode.isPending}
            imageSourceInput={imageSource}
            onChange={uploader__onSelectFile}
            onLoad={uploader__onLoad}
            onReset={uploader__onReset}
          />
          <Dialog open={openDialog} onOpenChange={(state) => setOpenDialog(() => state)}>
            {Boolean(imageSource) && (
              <div className='flex flex-row justify-center items-center gap-4'>
                <DialogTrigger asChild>
                  <Button variant='outline' className='w-full mt-4 gap-2'>
                    Edit
                    <ScissorsIcon size={16} />
                  </Button>
                </DialogTrigger>
              </div>
            )}

            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Edit Image</DialogTitle>
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
            <div className='mt-4 flex justify-center items-center flex-col'>
              <div>{'hidden message'}</div>
              <div
                dangerouslySetInnerHTML={{
                  __html: hyperlinkify(decode.data.message),
                }}
              />
              <Button variant={'link'} className='gap-1'>
                <DownloadIcon size={20} />
                <a href={decode.data.downloadUrl} download={true} target='_blank'>
                  {'Download original image'}
                </a>
              </Button>
            </div>
          )}

          {decode.isError && (
            <p className='text-red-400 text-center mt-4'>{'Message is not found'}</p>
          )}

          <Button type='submit' className='w-full mt-4' disabled={decode.isPending}>
            Unveil the message!
          </Button>
        </form>
      </Form>
    </div>
  );
};
