import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDhVj5cbNTFm3MpQJOFM3w6kLZozbbPeYY",
  authDomain: "fitness-tracker-8bae3.firebaseapp.com",
  projectId: "fitness-tracker-8bae3",
  storageBucket: "fitness-tracker-8bae3.firebasestorage.app",
  messagingSenderId: "848022478201",
  appId: "1:848022478201:web:bbaac30a25df66ac7863a8",
  measurementId: "G-2NZWBLRMV3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);