import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use



const firebaseConfig = {
  apiKey: "AIzaSyD33k3Sov_BDfzwbKzp_kQ-kkaDy5-eM-A",
  authDomain: "ecommerce-fff48.firebaseapp.com",
  projectId: "ecommerce-fff48",
  storageBucket: "ecommerce-fff48.appspot.com",
  messagingSenderId: "68717653896",
  appId: "1:68717653896:web:af7eec25165d2a2716143d",
  measurementId: "G-6EM3V4JZ5L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export {app, db, storage};