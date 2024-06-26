/* eslint-disable @next/next/no-img-element */
'use client';

import { DragAndDropUploader } from '@/components/drag-and-drop-uploader';
import { ImageEditor } from '@/components/image-editor';
import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ImageMetadata } from '@/libs/types';
import { downloadByteArrayBuffer, useEncodeImage } from '@/libs/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { DownloadIcon, ScissorsIcon } from 'lucide-react';
import { ChangeEvent, MouseEvent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const policy = {
  messageMinLength: 2,
  messageMaxLength: 1000,
  defaultSecretMessage: '',
};

const formSchema = z.object({
  secretMessage: z
    .string()
    .min(policy.messageMinLength, {
      message: `Secret message must be at least ${policy.messageMinLength} characters.`,
    })
    .max(policy.messageMaxLength, {
      message: `Secret message must be at most ${policy.messageMaxLength} characters.`,
    }),
});

type Base64DataUrl = string;

export const Encoder = () => {
  const originalImageRef = useRef<Base64DataUrl>('');
  const encodedImageHtmlRef = useRef<HTMLImageElement | null>(null);
  const [imageSource, setImageSource] = useState<Base64DataUrl>('');
  const [hiddenImageSource, setHiddenImageSource] = useState<Base64DataUrl>('');
  const [imageMetadata, setImageMetadata] = useState<ImageMetadata | null>(null);
  const encode = useEncodeImage();
  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      secretMessage: policy.defaultSecretMessage,
    },
  });

  useEffect(() => {
    if (encode.isSuccess) {
      // scroll to the top
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // FIXME: 즉시 받지말고, 클릭해서 받도록 수정
      // downloadByteArrayBuffer(encode.data, `aurastamp_${Date.now()}.png`);

      // setState 사용하면 무한랜더링이므로 useRef 사용
      if (encodedImageHtmlRef.current) {
        encodedImageHtmlRef.current.src = (window.URL || window.webkitURL).createObjectURL(
          new Blob([encode.data]),
        );
      }
    }
    if (encode.isError) {
      console.error(encode.error);
    }
  }, [encode]);

  function editor__onConfirm(event: MouseEvent<HTMLButtonElement>, dataUrl: Base64DataUrl) {
    setImageSource(dataUrl);
    setOpenDialog(() => false);
  }

  async function editor__onCrop() {
    // FIXME: TBD
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!imageMetadata) {
      console.warn('image metadata is empty');
      return;
    }
    if (!imageSource) {
      console.warn('image source is empty');
      return;
    }
    encode.mutate({
      message: values.secretMessage,
      imageSource,
      metadata: imageMetadata,
      hiddenImageSource,
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

  async function hiddenImage__onChange(event: ChangeEvent<HTMLInputElement>): Promise<void> {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', () => setHiddenImageSource(reader.result?.toString() || ''));
    reader.readAsDataURL(file);
  }

  function _resetImage() {
    originalImageRef.current = '';
    setImageSource(() => '');
    setImageMetadata(() => null);
    encode.reset();
  }

  function onClickDownload() {
    if (!encode.data) {
      return;
    }
    const filename = `aurastamp_${Date.now()}.png`;
    downloadByteArrayBuffer(encode.data, filename);
  }

  if (encode.isError) {
    console.error(encode.error);
  }

  return (
    <div className='flex w-full max-w-sm flex-col flex-nowrap items-center justify-center'>
      {encode.isSuccess && (
        <>
          {/* preview before download */}
          <div className=' mb-8 flex flex-col flex-nowrap gap-2'>
            <img
              ref={encodedImageHtmlRef}
              draggable={false}
              alt={'encoded image'}
              // src={encodedImageRef.current}
              // ref={imageRef}
            />
            <Button className='w-full gap-2' onClick={onClickDownload}>
              <DownloadIcon size={20} />
              {'Save to device'}
            </Button>
          </div>
        </>
      )}

      {encode.isError && (
        <p className='mt-4 text-center text-red-400'>{'Failed to hide a message'}</p>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex w-full flex-col'>
          <DragAndDropUploader
            disabled={encode.isPending}
            imageSourceInput={imageSource}
            onChange={uploader__onSelectFile}
            onLoad={uploader__onLoad}
            onReset={uploader__onReset}
          />

          <Dialog open={openDialog} onOpenChange={(state) => setOpenDialog(() => state)}>
            {Boolean(imageSource) && (
              <div className='flex flex-row items-center justify-center gap-4'>
                <DialogTrigger asChild>
                  <Button variant='outline' className='mt-4 w-full' disabled={encode.isPending}>
                    <ScissorsIcon size={16} />
                    {'Edit'}
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

          <FormField
            control={form.control}
            name='secretMessage'
            render={({ field }) => (
              <FormItem className='mt-4'>
                <FormLabel>Secret message</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Jot down a message to hide'
                    {...field}
                    disabled={encode.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* an additional image to be hidden in the container image */}
          <div className='mt-4 w-full items-center justify-center'>
            <FormLabel htmlFor='hiddenImage'>{'Hide another picture'}</FormLabel>
            <Input
              id='hiddenImage'
              type='file'
              onChange={hiddenImage__onChange}
              multiple={false}
              disabled={encode.isPending}
            />
          </div>

          <Button type='submit' className='mt-4 w-full gap-1' disabled={encode.isPending}>
            {'Go hide'}
            <Spinner className='text-secondary' size='small' show={encode.isPending} />
          </Button>
        </form>
      </Form>
    </div>
  );
};
