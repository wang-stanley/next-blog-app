import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD0DpoJvEjmOXaaZ-kdaHQYteT-ASgIp6Q",
  authDomain: "next-blog-app-4501d.firebaseapp.com",
  projectId: "next-blog-app-4501d",
  storageBucket: "next-blog-app-4501d.appspot.com",
  messagingSenderId: "622095518266",
  appId: "1:622095518266:web:4f63aa16082a4fa4870303",
  measurementId: "G-GVV35LK69D"
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

export const firestore = getFirestore(app);
export const storage = getStorage(app);
