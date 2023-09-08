import {
  cert as adminCert,
  getApps as getAdminApps,
  initializeApp as initializeAdminApp,
} from 'firebase-admin/app';
import { restApiService } from './services';
import { isAxiosError } from 'axios';

if (getAdminApps().length === 0) {
  let config;
  if (process.env.NODE_ENV === 'development' && !process.env.SERVICE_ACCOUNT) {
    console.warn('Missing SERVICE_ACCOUNT environment variable, using local emulator');
    // https://github.com/firebase/firebase-admin-node/issues/776
    process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
    process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
    config = { projectId: 'remix-emulator' };
  } else if (!process.env.SERVICE_ACCOUNT) {
    throw new Error('Missing SERVICE_ACCOUNT environment variable');
  } else {
    try {
      const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);
      config = {
        credential: adminCert(serviceAccount),
      };
    } catch {
      throw Error('Invalid SERVICE_ACCOUNT environment variable');
    }
  }
  initializeAdminApp(config);
}

// FIXME: auth-service로 이동
export const signInWithPassword = async (email: string, password: string) => {
  const response = await restApiService.signInWithPassword(
    { email, password, returnSecureToken: true },
    process.env.API_KEY ?? ''
  );
  if (isAxiosError(response)) {
    throw new Error(response.message);
  }
  return response.data;
};
