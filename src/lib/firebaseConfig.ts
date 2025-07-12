// src/lib/firebaseConfig.ts

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCFJm1W4p8-9C_b04cziqkkb7-ZpzfFD2c",
  authDomain: "healthyou-ea54b.firebaseapp.com",
  projectId: "healthyou-ea54b",
  storageBucket: "healthyou-ea54b.firebasestorage.app",
  messagingSenderId: "994756447962",
  appId: "1:994756447962:web:080ad0c9db338c8fbf5fe3"
};

// Inisialisasi Firebase App
const app = initializeApp(firebaseConfig);

// Auth dan Google Provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
