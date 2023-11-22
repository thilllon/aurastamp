'use client';

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
import { zodResolver } from '@hookform/resolvers/zod';
import { MouseEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ImageEditor } from './image-editor/image-editor';
import { Button } from './ui/button';

import { ChangeEvent, SyntheticEvent, useRef } from 'react';
import { Base64DataUrl, ImageMetadata, downloadByteArray, useEncodeImage } from '../lib/utils';
import { DndUploader } from './dnd-uploader';
import { debug } from 'console';

const formSchema = z.object({
  secretMessage: z
    .string()
    .min(1, { message: 'Secret message must be at least 1 characters.' })
    .max(1000, { message: 'Secret message must be at most 1000 characters.' }),
});

export const Encoder = () => {
  const originalImageRef = useRef<Base64DataUrl>('');
  const [imageSource, setImageSource] = useState<Base64DataUrl>('');
  const [hiddenImageSource, setHiddenImageSource] = useState<Base64DataUrl>('');
  const [imageMetadata, setImageMetadata] = useState<ImageMetadata | null>(null);
  const [encodedImage, setEncodedImage] = useState(null);
  const encode = useEncodeImage();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      secretMessage: '',
    },
  });

  useEffect(() => {
    if (encode.isSuccess) {
      downloadByteArray(encode.data, `aurastamp_${Date.now()}.png`);
    }
  }, [encode.isSuccess, encode.data]);

  function onEditorClickConfirm(event: MouseEvent<HTMLButtonElement>, dataUrl: Base64DataUrl) {
    // console.log(dataUrl);
    setImageSource(dataUrl);
    // 여기서 리랜더되면서 다이얼로그 끌수없나?
    // event.stopPropagation();
  }

  function onEditorClickCrop() {}

  function onClickCancel() {
    _resetImage();
    // upload 내부의 동작까지 트리거할수는 없음
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!imageMetadata || !imageSource) {
      return;
    }
    encode.mutate({
      message: values.secretMessage,
      imageSource,
      metadata: imageMetadata,
      hiddenImageSource,
    });
  }

  async function onResetUploader() {
    _resetImage();
  }

  async function onSelectFileUploader(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    setImageMetadata({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      webkitRelativePath: file.webkitRelativePath,
    });
  }

  async function onLoadUploader(_event: SyntheticEvent<HTMLImageElement>, imageSource: string) {
    setImageSource(imageSource);
    originalImageRef.current = imageSource;
  }

  async function onChangeHiddenImage(event: ChangeEvent<HTMLInputElement>): Promise<void> {
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
    setImageSource('');
    setImageMetadata(null);
    encode.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col p-2'>
        <DndUploader
          imageSourceInput={imageSource}
          onLoad={onLoadUploader}
          onReset={onResetUploader}
          onSelectFile={onSelectFileUploader}
        />

        <Dialog>
          {Boolean(imageSource) && (
            <div className='flex flex-row justify-center items-center gap-4'>
              <DialogTrigger asChild>
                <Button variant='outline' className='w-full mt-4'>
                  Edit!
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
                onConfirm={onEditorClickConfirm}
                onCrop={onEditorClickCrop}
                image={imageSource}
                originalImage={originalImageRef.current}
              />
            )}

            {/* <DialogFooter>
          <Button type='submit'>Save changes</Button>
        </DialogFooter> */}
          </DialogContent>
        </Dialog>

        <FormField
          control={form.control}
          name='secretMessage'
          render={({ field }) => (
            <FormItem className='mt-4'>
              <FormLabel>Secret message</FormLabel>
              <FormControl>
                <Input placeholder='Jot down a message to hide' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* an additional image to be hidden in the container image */}
        <div className='w-full justify-center items-center mt-4'>
          <FormLabel htmlFor='hiddenImage'>Hide another picture</FormLabel>
          <Input id='hiddenImage' type='file' onChange={onChangeHiddenImage} multiple={false} />
        </div>

        <Button type='submit' className='w-full mt-4' disabled={encode.isPending}>
          Go hide!
        </Button>
      </form>
    </Form>
  );
};
