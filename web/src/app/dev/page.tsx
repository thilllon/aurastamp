'use client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { faker } from '@faker-js/faker';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  increment,
  onSnapshot,
  query,
  updateDoc,
} from 'firebase/firestore';
import { FormEventHandler, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '../../components/ui/button';
import { db } from '../../libs/firebase';

const formSchema = z.object({
  itemName: z.string().min(2, {
    message: 'item name must be at least 2 characters.',
  }),
});

type Item = {
  id: string;
  name: string;
  price: number;
};

function ItemSubmitForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='itemName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}

// --------------------------------
// --------------------------------

export default function TestPage() {
  const [items, setItems] = useState<Item[]>([]);

  const [newItem, setNewItem] = useState({ name: '', price: 0 });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setNewItem({
      name: faker.lorem.word(),
      price: faker.number.int(),
    });

    const unsubscribe = onSnapshot(query(collection(db, 'items')), (querySnapshot) => {
      let itemList: any[] = [];
      querySnapshot.forEach((doc) => {
        itemList.push({
          id: doc.id,
          ...doc.data({ serverTimestamps: 'previous' }),
        });
      });
      setItems(itemList);
      setTotal(itemList.reduce((sum, { price }) => sum + price, 0));
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addItem: FormEventHandler = async (event) => {
    event.preventDefault();
    if (!(newItem.name && newItem.price)) {
      return;
    }

    await addDoc(collection(db, 'items'), {
      name: newItem.name.trim(),
      price: Number(newItem.price),
    });

    setNewItem({
      name: faker.lorem.word(),
      price: faker.number.int(),
    });
  };

  const deleteItem = (id: string) => {
    deleteDoc(doc(db, 'items', id));
  };

  const onClickLike = async (id: string) => {
    await updateDoc(doc(db, 'items', id), {
      like: increment(1),
    });
  };
  const onClickDislike = async (id: string) => {
    await updateDoc(doc(db, 'items', id), {
      like: increment(-1),
    });
  };

  const addEncodingCounter = async (id: string) => {
    await updateDoc(doc(db, 'items', id), {
      encodingCounter: increment(1),
    });
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      {/* <WaitDemo /> */}

      <ItemSubmitForm />

      <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex'>
        <h1 className='font-medium text-4xl'>Expense tracker</h1>

        <div className='p-4 rounded-lg'>
          {items.length > 0 && (
            <div className='my-4 w-full flex justify-between p-4'>
              <span>total</span>
              <span>${total.toLocaleString()}</span>
            </div>
          )}

          <form className='grid grid-cols-6 items-center' onSubmit={addItem}>
            <input
              onChange={(event) => setNewItem({ ...newItem, name: event.target.value })}
              value={newItem.name}
              className='col-span-3 p-3 border mx-3'
              type='text'
              placeholder='enter item'
            />
            <input
              onChange={(event) => setNewItem({ ...newItem, price: Number(event.target.value) })}
              value={newItem.price}
              className='col-span-2 p-3 border mx-3'
              type='number'
              placeholder='enter $'
            />
            <Button type='submit'>+</Button>
          </form>
          <ul>
            {items.map((item, id) => {
              return (
                <li key={id} className='my-4 w-full flex justify-between'>
                  <div className='p-4 w-full flex justify-between'>
                    <span className='capitalize'>{item.name}</span>
                    <span>{item.price}</span>
                  </div>
                  <Button
                    onClick={() => deleteItem(item.id)}
                    // className='ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16'
                  >
                    X
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* <p className='fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30'>
          Get started by editing&nbsp;
          <code className='font-mono font-bold'>src/app/page.tsx</code>
        </p>
        <div className='fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none'>
          <a
            className='pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0'
            href='https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
            target='_blank'
            rel='noopener noreferrer'>
            By <Image src='/vercel.svg' alt='Vercel Logo' className='dark:invert' width={100} height={24} priority />
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <Image
          className='relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert'
          src='/next.svg'
          alt='Next.js Logo'
          width={180}
          height={37}
          priority
        />
      </div>
      <div className='mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left'>
        <a
          href='https://beta.nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
          className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
          target='_blank'
          rel='noopener noreferrer'>
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{' '}
            <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
          className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30'
          target='_blank'
          rel='noopener noreferrer'>
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{' '}
            <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
          className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
          target='_blank'
          rel='noopener noreferrer'>
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{' '}
            <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href='https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
          className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
          target='_blank'
          rel='noopener noreferrer'>
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{' '}
            <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a> */}
      </div>
    </main>
  );
}
