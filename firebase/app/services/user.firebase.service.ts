import { firebaseAuth } from '../firebase.client';

export const getUserProfile = async (googleUserId: string) => {
  const user = firebaseAuth.currentUser;
  if (!user) {
    throw new Error('No user is signed in.');
  }

  // The user object has basic properties such as display name, email, etc.
  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;
  const emailVerified = user.emailVerified;

  // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
  // you have one. Use User.getToken() instead.
  const uid = user.uid;
  return {
    uid,
    displayName,
    email,
    photoURL,
    emailVerified,
  };
};
