import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const defaultConfig = {
  NEXT_PUBLIC_API_KEY: 'AIzaSyAA-qPzq2a-jqptIQrb02wuthLZvgPmy0Q',
  NEXT_PUBLIC_APP_ID: '1:574642274751:web:8a2b60b16038056494e10a',
  NEXT_PUBLIC_AUTH_DOMAIN: 'stegato-app.firebaseapp.com',
  NEXT_PUBLIC_PROJECT_ID: 'stegato-app',
  NEXT_PUBLIC_MESSAGING_SENDER_ID: '574642274751',
  NEXT_PUBLIC_STORAGE_BUCKET: 'stegato-app.appspot.com',
  NEXT_PUBLIC_MEASUREMENT_ID: 'G-B9ZW9G9LKS',
  NEXT_PUBLIC_DATABASE_URL: 'https://stegato-app-default-rtdb.firebaseio.com',
};

const config = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY ?? defaultConfig.NEXT_PUBLIC_API_KEY,
  appId: process.env.NEXT_PUBLIC_APP_ID ?? defaultConfig.NEXT_PUBLIC_APP_ID,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN ?? defaultConfig.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID ?? defaultConfig.NEXT_PUBLIC_PROJECT_ID,
  messagingSenderId:
    process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID ?? defaultConfig.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET ?? defaultConfig.NEXT_PUBLIC_STORAGE_BUCKET,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID ?? defaultConfig.NEXT_PUBLIC_MEASUREMENT_ID,
};

const app = initializeApp(config);
export const db = getFirestore(app);
export const storage = getStorage();
