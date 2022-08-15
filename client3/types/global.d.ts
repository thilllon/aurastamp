declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_SECRET: string;
      GITHUB_CLIENT_ID: string;
      GITHUB_CLIENT_SECRET: string;
      GITHUB_PROFILE_CLIENT_ID: string;
      GITHUB_PROFILE_SECRET: string;
      GITHUB_PROFILE_REDIRECT_URI: string;
      KAKAO_CLIENT_ID: string;
      KAKAO_JS_KEY: string;
      KAKAO_CLIENT_SECRET: string;
      SENTRY_AUTH_TOKEN: string;
      NEXT_PUBLIC_APP_TITLE: string;
      NEXT_PUBLIC_VERSION_STRING: string;
      NEXT_PUBLIC_ORGANIZATION_NAME: string;
      NEXT_PUBLIC_ORGANIZATION_URL: string;
      NEXT_PUBLIC_SENTRY_DSN: string;
      SENTRY_DSN: string;
      NEXT_PUBLIC_GA_MEASUREMENT_ID: string;
      NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: string;
      // NEXT_PUBLIC_WS_URL: string;
      NEXT_PUBLIC_API_URL: string;
    }
  }
}

interface Window {
  localStorage: typeof window.localStorage;
  google: any;
  Kakao: any;
}
