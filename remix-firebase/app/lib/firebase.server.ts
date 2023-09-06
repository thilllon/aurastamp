import {
  cert as adminCert,
  getApps as getAdminApps,
  initializeApp as initializeAdminApp,
} from 'firebase-admin/app';
import { isRestError, restApiService } from './services';

export type RestConfigType = {
  apiKey: string;
  domain: string;
};

// Warning: though getRestConfig is only run server side, its return value may be sent to the client
export const restConfig: RestConfigType = {
  apiKey: process.env.API_KEY ?? '',
  domain: 'https://identitytoolkit.googleapis.com',
};

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

export const signInWithPassword = async (email: string, password: string) => {
  const signInResponse = await restApiService.signInWithPassword(
    { email, password, returnSecureToken: true },
    restConfig
  );

  if (isRestError(signInResponse)) {
    throw new Error(signInResponse.error.message);
  }

  return signInResponse;
};
