import type { LinksFunction, V2_MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import styles from './tailwind.css';
import radixThemes from '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

export const meta: V2_MetaFunction = (args) => {
  return [
    { charSet: 'utf-8' },
    { title: 'Aurastamp' },
    { property: 'viewport', content: 'width=device-width,initial-scale=1' },
    { name: 'description', content: 'Aurastamp' },
    { property: 'og:title', content: 'Aurastamp' },
  ];
};

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  { rel: 'stylesheet', href: radixThemes },
  // ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>

      <body>
        <Theme>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </Theme>
      </body>
    </html>
  );
}
