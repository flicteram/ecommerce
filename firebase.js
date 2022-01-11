import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCRBOtTHHsyK7PniQKz8Dtde8OiDIX3pUs",
  authDomain: "ecommerce2-b02d0.firebaseapp.com",
  projectId: "ecommerce2-b02d0",
  storageBucket: "ecommerce2-b02d0.appspot.com",
  messagingSenderId: "757746091739",
  appId: "1:757746091739:web:d6052731129c30e81a2efe"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore()
const storage = getStorage()

export { db,storage }
