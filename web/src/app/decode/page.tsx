import { ArrowRightIcon } from 'lucide-react';
import { Decoder } from '../../components/decoder';
import { Button } from '../../components/ui/button';
import { PageHeading } from '../../components/ui/page-heading';

export default function DecodePage() {
  return (
    <>
      <PageHeading label={'Image Decoder'} href={'/decode'} />

      <h1 className='text-xl font-bold text-center'>Decrypt hide message</h1>
      <Decoder />
      <Button variant={'link'} className='gap-1'>
        <a href='/encode'>Hide your message</a>
        <ArrowRightIcon size={20} />
      </Button>
    </>
  );
}
