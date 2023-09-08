export const CONST = {
  SESSION_KEY: 'session',
} as const;

export const config = {
  expiresIn: 1000 * 60 * 60 * 24 * 7,
  firebase: {
    apiKey: 'AIzaSyAA-qPzq2a-jqptIQrb02wuthLZvgPmy0Q',
    appId: '1:574642274751:web:8a2b60b16038056494e10a',
    authDomain: 'stegato-app.firebaseapp.com',
    projectId: 'stegato-app',
    messagingSenderId: '574642274751',
    storageBucket: 'stegato-app.appspot.com',
    measurementId: 'G-B9ZW9G9LKS',
  },
  isProduction: process.env.NODE_ENV === 'production',
} as const;
