import { faker } from '@faker-js/faker';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { FormEventHandler } from 'react';
import { Button } from './components/ui/button';
import { db } from './firebase';
import { Encoder } from './components/encoder';
import { Decoder } from './components/decoder';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Encoder />
      <Decoder />
    </main>
  );
}
