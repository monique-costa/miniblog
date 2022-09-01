import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDhfmIEq7FXxiyii5CoeP3XFlZnIygVylg",
  authDomain: "miniblog-7410e.firebaseapp.com",
  projectId: "miniblog-7410e",
  storageBucket: "miniblog-7410e.appspot.com",
  messagingSenderId: "805043827747",
  appId: "1:805043827747:web:7402f954b867b7aaf6ed96"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };