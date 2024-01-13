import '@/styles/globals.css';

import { Inter } from 'next/font/google';
import { cn } from '../libs/utils';
import { Providers } from './providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'Aurastamp',
  description: `Let's see what you hide!`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
        <Providers>
          <main className='flex min-h-screen flex-col items-center justify-center w-full mb-12'>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
