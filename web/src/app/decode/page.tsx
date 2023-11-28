import { ArrowRightIcon } from 'lucide-react';
import { Decoder } from '../../components/decoder';
import { Button } from '../../components/ui/button';

export default function DecodePage() {
  return (
    <>
      <h1 className='text-xl font-bold text-center'>Decrypt hide message</h1>
      <Decoder />
      <Button variant={'link'} className=''>
        <a href='/encode'>Hide your message</a>
        <ArrowRightIcon />
      </Button>
    </>
  );
}
