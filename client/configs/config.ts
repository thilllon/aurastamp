import { getAnalytics } from 'firebase/analytics';
import { getApps, initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyCniVJcAM-px9361sqPcs9Lxz_tKV9bG9U',
  authDomain: 'stegato-project.firebaseapp.com',
  projectId: 'stegato-project',
  storageBucket: 'stegato-project.appspot.com',
  messagingSenderId: '722834860676',
  appId: '1:722834860676:web:6c4908d486b13e4ed170d1',
  measurementId: 'G-YJN4DJRY8N',
};

// Initialize Firebase
export const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export default firebaseApp;

export const analytics = getAnalytics(firebaseApp);
