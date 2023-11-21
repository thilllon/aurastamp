'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ImageEditor, OnConfirmEdit } from './image-editor/image-editor';
import { Button } from './ui/button';

export function EditorDialog({
  image,
  originalImage,
  onConfirmEdit,
}: {
  image: string;
  originalImage: string;
  onConfirmEdit: OnConfirmEdit;
}) {
  return (
    <Dialog>
      {Boolean(image) && (
        <DialogTrigger asChild>
          <Button variant='outline' className='mt-4'>
            Edit!
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit Image</DialogTitle>
          <DialogDescription>
            {`Make changes to your picture here. Click confirm when you're done.`}
          </DialogDescription>
        </DialogHeader>

        {Boolean(image) && (
          <ImageEditor onConfirmEdit={onConfirmEdit} image={image} originalImage={originalImage} />
        )}

        {/* <DialogFooter>
          <Button type='submit'>Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
