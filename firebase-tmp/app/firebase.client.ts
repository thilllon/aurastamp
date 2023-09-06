import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth, inMemoryPersistence, setPersistence } from 'firebase/auth';

// Additional SDK
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAA-qPzq2a-jqptIQrb02wuthLZvgPmy0Q',
  appId: '1:574642274751:web:8a2b60b16038056494e10a',
  authDomain: 'stegato-app.firebaseapp.com',
  projectId: 'stegato-app',
  messagingSenderId: '574642274751',
  storageBucket: 'stegato-app.appspot.com',
  measurementId: 'G-B9ZW9G9LKS',
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseAnalytics = getAnalytics(firebaseApp);

// Let Remix handle the persistence via session cookies.
setPersistence(firebaseAuth, inMemoryPersistence);

export { firebaseAnalytics, firebaseAuth };
