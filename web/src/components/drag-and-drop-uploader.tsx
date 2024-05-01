/* eslint-disable @next/next/no-img-element */
'use client';

import { Button } from '@/components/ui/button';
import { ResetIcon } from '@radix-ui/react-icons';
import { ChangeEvent, SyntheticEvent, useEffect, useRef, useState } from 'react';

type Base64DataUrl = string;

/**
 * This component uses shadcn's Button component.
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
        // when the file selection dialog is opened, close the dialog without selecting a file
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
    <div className='flex items-center justify-center'>
      {!imageSource && (
        <label
          htmlFor='uploader'
          className='flex h-[16rem] w-[16rem] items-center justify-center rounded-md border-2 border-slate-900 p-1 hover:bg-slate-100'
        >
          <div
            className={
              'm-auto flex h-full w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-slate-700'
            }
          >
            <input
              id='uploader'
              className='hidden'
              type='file'
              accept='image/jpeg,image/jpg,image/png'
              onChange={onChangeInput}
              ref={imageInputRef}
              multiple={false}
              disabled={disabled}
            />
            <div className='flex flex-col flex-nowrap items-center justify-center '>
              <span className='select-none overflow-hidden text-center text-slate-600'>
                {'Click here to load an image'}
              </span>
            </div>
          </div>
        </label>
      )}

      {imageSource && (
        <div className='w-full'>
          <div className='flex items-center justify-center'>
            <img
              draggable={false}
              src={imageSource}
              alt={'target image'}
              ref={imageRef}
              onLoad={onLoad}
            />
          </div>
          <div className='mt-4 flex items-center justify-center'>
            <Button
              type='button'
              className='w-full gap-2'
              variant={'outline'}
              onClick={onClickCancel}
              disabled={disabled}
            >
              <ResetIcon />
              {'Reset'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
