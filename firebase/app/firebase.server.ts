import type { App as AdminApp } from 'firebase-admin/app';
import {
  cert,
  getApp as getAdminApp,
  getApps,
  initializeApp as initializeAdminApp,
} from 'firebase-admin/app';
import type { Auth as AdminAuth } from 'firebase-admin/auth';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';

// firebase vs firebase-admin
// https://stackoverflow.com/questions/42958776/whats-the-difference-between-the-firebase-and-the-firebase-admin-npm-module/42959080#42959080

let firebaseAdminApp: AdminApp;
let firebaseAdminAuth: AdminAuth;

// The admin SDK doesn’t allow initialization of the same app more than once – since Remix provides some hot-reloading on file changes this will trigger initialization more than once, so we first check if a Firebase App instance has been initialized and return it if it already has been.
// https://console.firebase.google.com/u/0/project/stegato-app/settings/serviceaccounts/adminsdk
// const serviceAccount = require('../admin-service-account.firebase.json');
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT.replaceAll('\\"', '"'));
if (getApps().length === 0) {
  firebaseAdminApp = initializeAdminApp({
    credential: cert(serviceAccount),
    // credential: applicationDefault(), // Google Application Default Credentials are available on any Google infrastructure, such as Google App Engine and Google Compute Engine.
  });
} else {
  firebaseAdminApp = getAdminApp();
}
firebaseAdminAuth = getAdminAuth(firebaseAdminApp);

export { firebaseAdminAuth };
