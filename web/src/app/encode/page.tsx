import { ArrowRightIcon } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Encoder } from '../../components/encoder';

export default function EncodePage() {
  return (
    <>
      <h1 className='text-xl font-bold text-center'>Hide your message</h1>
      <Encoder />
      <Button variant={'link'} className=''>
        <a href='/decode'>Decrypt hide message</a>
        <ArrowRightIcon />
      </Button>
    </>
  );
}
