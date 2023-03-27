/* eslint-disable @typescript-eslint/prefer-namespace-keyword */

declare module NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URI: string;
    NEXT_PUBLIC_ABOUTUS_URL: string;
    PORT?: string | number;
    // NODE_ENV: 'development' | 'production';
  }
}
interface Window {
  // message: string;
}
