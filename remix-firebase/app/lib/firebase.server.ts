import { isAxiosError } from 'axios';
import { storage } from 'firebase-admin';
import type { AppOptions } from 'firebase-admin/app';
import { cert as adminCert, getApps as getAdminApps, initializeApp as initializeAdminApp } from 'firebase-admin/app';
import { restApiService } from './services';

if (getAdminApps().length === 0) {
  let config: AppOptions;
  console.log(process.env.SERVICE_ACCOUNT);

  if (process.env.NODE_ENV === 'development' && !process.env.SERVICE_ACCOUNT) {
    console.warn('Missing SERVICE_ACCOUNT environment variable, using local emulator');
    // https://github.com/firebase/firebase-admin-node/issues/776
    process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
    process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
    config = {
      projectId: 'remix-emulator',
    };
  } else if (!process.env.SERVICE_ACCOUNT) {
    throw new Error('Missing SERVICE_ACCOUNT environment variable');
  } else {
    try {
      const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);
      config = {
        credential: adminCert(serviceAccount),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      };
    } catch (err) {
      console.error(err);
      throw new Error('Invalid SERVICE_ACCOUNT environment variable');
    }
  }
  initializeAdminApp(config);
}

const appStorage = storage();
const bucket = appStorage.bucket();

// TODO: 업로드할때 이런식으로 권한설정도 가능
// // Define a new access policy for a specific path
// const filePath = 'path/to/your/object';
// const file = bucket.file(filePath);

// const metadata = {
//   contentType: 'application/pdf', // Set the content type if needed
// };

// file.setMetadata(metadata)
//   .then(() => {
//     return file.acl.add({
//       entity: 'user-email@example.com',
//       role: admin.storage().bucket(bucket.name).acl.READER_ROLE,
//     });
//   })
//   .then(() => {
//     console.log('Access policy updated.');
//   })
//   .catch((error) => {
//     console.error('Error setting access policy:', error);
//   });

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
