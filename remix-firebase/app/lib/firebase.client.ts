import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth, inMemoryPersistence, setPersistence } from 'firebase/auth';
import { config } from './constants';

// Additional SDK
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = config.firebase;

console.log('firebaseConfig', firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseAnalytics = getAnalytics(firebaseApp);

// Let Remix handle the persistence via session cookies.
setPersistence(firebaseAuth, inMemoryPersistence);

export { firebaseApp, firebaseAnalytics, firebaseAuth };
