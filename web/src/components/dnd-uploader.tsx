/* eslint-disable @next/next/no-img-element */

'use client';

import { useState } from 'react';

import { ChangeEvent, SyntheticEvent, useRef } from 'react';
import { Base64, cn } from '../lib/utils';
import { Button } from './ui/button';

/**
 * Drag & Drop Uploader
 */
export function DndUploader({
  onLoad: onLoadCallback,
  onReset: onResetCallback,
  onSelectFile: onSelectFileCallback,
}: {
  onLoad: (event: SyntheticEvent<HTMLImageElement>, image: string) => void;
  onReset: () => void;
  onSelectFile: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  const imageRef = useRef<HTMLImageElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [imageSource, setImageSource] = useState<Base64>('');

  function onClickCancel() {
    if (imageInputRef.current?.value) {
      imageInputRef.current.value = '';
    }
    setImageSource('');
    onResetCallback();
  }

  function onSelectFile(event: ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0];
    if (!file) {
      onResetCallback();
      return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', () => setImageSource(reader.result?.toString() || ''));
    reader.readAsDataURL(file);

    onSelectFileCallback(event);
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
          <div
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
              ref={imageInputRef}
              multiple={false}
            />
            <div className='flex flex-col flex-nowrap justify-center items-center'>
              <span className='text-center select-none text-slate-600 overflow-hidden over'>
                Click to upload image
              </span>
            </div>
          </div>
        </label>
      )}

      {imageSource && (
        <div>
          <div className='flex justify-center items-center'>
            <img
              draggable={false}
              src={imageSource}
              alt={'target image'}
              ref={imageRef}
              onLoad={onLoad}
            />
          </div>
          <div className='flex justify-center items-center mt-4'>
            <Button type='button' className='w-full' variant={'outline'} onClick={onClickCancel}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
