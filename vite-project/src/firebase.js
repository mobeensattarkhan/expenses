import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdGA8wxR8PR1NTr_Xi0K4kyp4YsL8_eYY",
  authDomain: "expensio-6a803.firebaseapp.com",
  projectId: "expensio-6a803",
  storageBucket: "expensio-6a803.firebasestorage.app",
  messagingSenderId: "285124488067",
  appId: "1:285124488067:web:737746c7bfceddf36f24b6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
