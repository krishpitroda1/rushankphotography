import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAx4HEK8E353Dm9vu2fDBzqyQxivIYE5wk",
  authDomain: "rushankproject.firebaseapp.com",
  projectId: "rushankproject",
  storageBucket: "rushankproject.firebasestorage.app",
  messagingSenderId: "413621295658",
  appId: "1:413621295658:web:dcb1ac23963474d08f8153",
  measurementId: "G-W5EHR2PEWH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;