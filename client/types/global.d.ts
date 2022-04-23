declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URI: string;
      PORT?: string | number;
      // NODE_ENV: 'development' | 'production';
    }
  }
  interface Window {
    // message: string;
  }
}
