/* eslint-disable @next/next/no-img-element */
'use client';

import 'react-image-crop/dist/ReactCrop.css';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ReactCrop from 'react-image-crop';
import { Button } from '../ui/button';

export function DialogDemo({ image, onEditEnd }: { image: any; onEditEnd: any }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Edit Image</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit Image</DialogTitle>
          <DialogDescription>
            {`Make changes to your profile here. Click save when you're done.`}
          </DialogDescription>
        </DialogHeader>

        {/* // -------------------------------- */}
        {/* crop */}
        {/* // -------------------------------- */}

        {/* // -------------------------------- */}
        {/* // -------------------------------- */}

        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <Input id='name' defaultValue='Pedro Duarte' className='col-span-3' />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='username' className='text-right'>
              Username
            </Label>
            <Input id='username' defaultValue='@peduarte' className='col-span-3' />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit'>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
