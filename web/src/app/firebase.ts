import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAA-qPzq2a-jqptIQrb02wuthLZvgPmy0Q',
  appId: '1:574642274751:web:8a2b60b16038056494e10a',
  authDomain: 'stegato-app.firebaseapp.com',
  projectId: 'stegato-app',
  messagingSenderId: '574642274751',
  storageBucket: 'stegato-app.appspot.com',
  measurementId: 'G-B9ZW9G9LKS',
  databaseURL: 'https://stegato-app-default-rtdb.firebaseio.com',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
