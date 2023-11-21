'use client';

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
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Label } from '@radix-ui/react-label';
import { ChangeEvent, SyntheticEvent, useRef } from 'react';
import { Base64, ImageMetadata, downloadByteArray, useEncodeImage } from '../lib/utils';
import { DndUploader } from './dnd-uploader';
import { EditorDialog } from './editor-dialog';
import { Button } from './ui/button';

const formSchema = z.object({
  secretMessage: z
    .string()
    .min(1, { message: 'Secret message must be at least 1 characters.' })
    .max(1000, { message: 'Secret message must be at most 1000 characters.' }),
});

export const Encoder = () => {
  const originalImageRef = useRef<Base64>('');
  const [imageSource, setImageSource] = useState<Base64>('');
  const [hiddenImageSource, setHiddenImageSource] = useState<Base64>('');
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

  function onConfirmEditor(transformedImage: File | Blob) {
    // TODO: 자동으로 에디터 닫히게 하기
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
          onLoad={onLoadUploader}
          onReset={onResetUploader}
          onSelectFile={onSelectFileUploader}
        />

        <EditorDialog
          image={imageSource}
          originalImage={originalImageRef.current}
          onConfirmEdit={onConfirmEditor}
        />

        <FormField
          control={form.control}
          name='secretMessage'
          render={({ field }) => (
            <FormItem className='mt-4'>
              <FormLabel>Secret Message</FormLabel>
              <FormControl>
                <Input placeholder='Jot down a message to hide' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* an additional image to be hidden in the container image */}
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='hiddenImage' className='text-slate-700'>
            Hide another picture
          </Label>
          <Input id='hiddenImage' type='file' onChange={onChangeHiddenImage} multiple={false} />
        </div>

        <Button type='submit' className='w-full' disabled={encode.isPending}>
          Go hide!
        </Button>
      </form>
    </Form>
  );
};
