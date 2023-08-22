import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyABjHC1z1HmGCu4lL69-iLgYmQl8yRq9h8',
  authDomain: 'react-tabs-b6e52.firebaseapp.com',
  projectId: 'react-tabs-b6e52',
  storageBucket: 'react-tabs-b6e52.appspot.com',
  messagingSenderId: '589976158530',
  appId: '1:589976158530:web:f079d6ed58195b460cc8db',
  measurementId: 'G-F26V075XZ6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
export default app;
