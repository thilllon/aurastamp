/* eslint-disable @next/next/no-img-element */
'use client';

import { ResetIcon } from '@radix-ui/react-icons';
import { ChangeEvent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { Base64DataUrl } from '../lib/types';

/**
 * Drag & Drop Uploader
 */
export function DragAndDropUploader({
  disabled,
  imageSourceInput,
  onLoad: onLoadCallback,
  onReset: onResetCallback,
  onChange: onChangeCallback,
}: {
  disabled?: boolean;
  imageSourceInput?: string;
  onLoad: (event: SyntheticEvent<HTMLImageElement>, image: string) => void;
  onReset: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  const imageRef = useRef<HTMLImageElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [imageSource, setImageSource] = useState<Base64DataUrl>(imageSourceInput ?? '');

  useEffect(() => {
    if (imageSourceInput) {
      setImageSource(imageSourceInput);
    }
  }, [imageSourceInput]);

  function onClickCancel() {
    if (imageInputRef.current?.value) {
      imageInputRef.current.value = '';
    }
    setImageSource('');
    onResetCallback();
  }

  function onChangeInput(event: ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0];
    if (!file) {
      onResetCallback();
      return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const newImageSource = reader.result?.toString() ?? '';
      if (!newImageSource) {
        // 이미 파일이 올라가있는 상태에서 파일선택창을 열었다가 파일 선택없이 창을 닫은 경우
        return;
      }
      setImageSource(newImageSource);
    });
    reader.readAsDataURL(file);

    onChangeCallback(event);
  }

  function onLoad(event: SyntheticEvent<HTMLImageElement>): void {
    onLoadCallback(event, imageSource);
  }

  return (
    <div className='flex justify-center items-center'>
      {!imageSource && (
        <label
          htmlFor='uploader'
          className={cn(
            'flex justify-center items-center border-2 border-slate-900 p-1 hover:bg-slate-100',
            'w-[16rem] h-[16rem]',
          )}
        >
          <div
            className={cn(
              'cursor-pointer flex justify-center items-center w-full h-full border-2 border-dashed border-slate-700 m-auto',
            )}
          >
            <input
              id='uploader'
              className='hidden'
              type='file'
              accept='image/*'
              onChange={onChangeInput}
              ref={imageInputRef}
              multiple={false}
              disabled={disabled}
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
        <div className='w-full'>
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
            <Button
              type='button'
              className='w-full gap-2'
              variant={'outline'}
              onClick={onClickCancel}
              disabled={disabled}
            >
              Reset
              <ResetIcon />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}