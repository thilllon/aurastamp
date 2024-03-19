import '@/styles/globals.css';

import { Providers } from '@/app/providers';
import { cn } from '@/libs/utils';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'Aurastamp',
  description: `Let's see what you wanna hide`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
        <Providers>
          <main className='mb-12 flex w-full flex-col items-center justify-center py-4'>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
