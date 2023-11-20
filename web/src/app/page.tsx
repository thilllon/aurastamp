import { Decoder } from '../components/decoder';
import { Encoder } from '../components/encoder';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Encoder />
      <Decoder />
    </main>
  );
}
