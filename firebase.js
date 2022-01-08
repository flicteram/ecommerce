import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCFlU-K3_6Th90F2Iv10JlEaI6s_RIOb7g",
  authDomain: "ecommerce-89394.firebaseapp.com",
  projectId: "ecommerce-89394",
  storageBucket: "ecommerce-89394.appspot.com",
  messagingSenderId: "58370857644",
  appId: "1:58370857644:web:2a63b589bd8d57e20ddd09",
  measurementId: "G-8C6XWLSJR9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore()
const storage = getStorage()

export { db,storage }
