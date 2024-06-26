'use client';

import { Decoder } from '@/components/decoder';
import { Encoder } from '@/components/encoder';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

enum Mode {
  Encoder = 'encoder',
  Decoder = 'decoder',
}

export default function HomePage() {
  return (
    <Tabs defaultValue={Mode.Encoder} className='w-[400px]'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value={Mode.Encoder}>{'Encode'}</TabsTrigger>
        <TabsTrigger value={Mode.Decoder}>{'Decode'}</TabsTrigger>
      </TabsList>

      <TabsContent value={Mode.Encoder}>
        <Card>
          <CardHeader>
            <CardTitle>{'Encoder'}</CardTitle>
            <CardDescription>{'Hide your message.'}</CardDescription>
          </CardHeader>
          <CardContent className='space-y-2'>
            <Encoder />
          </CardContent>
          {/* <CardFooter>
            <Button variant={'link'} className='gap-1'>
              <a href='/decode'>{'Seek the hidden message'}</a>
              <ArrowRightIcon size={20} />
            </Button>
          </CardFooter> */}
        </Card>
      </TabsContent>

      <TabsContent value={Mode.Decoder}>
        <Card>
          <CardHeader>
            <CardTitle>{'Decoder'}</CardTitle>
            <CardDescription>{'Decrypt a hidden message'}</CardDescription>
          </CardHeader>
          <CardContent className='space-y-2'>
            <Decoder />
          </CardContent>
          {/* <CardFooter>
            <Button variant={'link'} className='gap-1'>
              <a href='/encode'>{'Hide your message'}</a>
              <ArrowRightIcon size={20} />
            </Button>
          </CardFooter> */}
        </Card>
      </TabsContent>
    </Tabs>
  );
}
