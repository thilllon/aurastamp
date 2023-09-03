/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/docs/en/main/file-conventions/entry.client
 */
import { CacheProvider } from '@emotion/react';
import { RemixBrowser } from '@remix-run/react';
import type { ReactNode } from 'react';
import { startTransition, StrictMode, useState } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { ClientStyleContext } from './styleContext';
import createEmotionCache, { defaultCache } from './createEmotionCache';

interface ClientCacheProviderProps {
  children: ReactNode;
}

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = useState(defaultCache);

  function reset() {
    setCache(createEmotionCache());
  }

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}

/**
 * NOTE: Code below is applied TailwindCSS to Chakra UI code. This utilizes StrictMode, startTransition, hydrateRoot.
 * It is checked that the code below works well.
 */
startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <ClientCacheProvider>
        <RemixBrowser />
      </ClientCacheProvider>
    </StrictMode>,
  );
});

/**
 * NOTE: Code below comes from Chakra UI official repository which does not use TailwindCSS
 */
// hydrate(
//   <ClientCacheProvider>
//     <RemixBrowser />
//   </ClientCacheProvider>,
//   document,
// );

/**
 * NOTE: 아래는 tailwindcss만을 사용할 때의 코드
 */
// startTransition(() => {
//   hydrateRoot(
//     document,
//     <StrictMode>
//       <RemixBrowser />
//     </StrictMode>,
//   );
// });
