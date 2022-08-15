declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string;
    }
  }
}

interface Window {
  localStorage: typeof window.localStorage;
  google: any;
  Kakao: any;
}
