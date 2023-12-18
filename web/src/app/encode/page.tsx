import { ArrowRightIcon } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Encoder } from '../../components/encoder';
import { PageHeading } from '../../components/ui/page-heading';

export default function EncodePage() {
  return (
    <>
      <PageHeading label={'Image Encoder'} href={'/encode'} />
      <h1 className='text-xl font-bold text-center'>Hide your message</h1>
      <Encoder />
      <Button variant={'link'} className='gap-1'>
        <a href='/decode'>Seek the hidden message</a>
        <ArrowRightIcon size={20} />
      </Button>
    </>
  );
}
