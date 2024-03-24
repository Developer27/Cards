import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBuKx3R7SlC2houHdlm5AOERk5HcYb6734",
  authDomain: "cards-11b89.firebaseapp.com",
  projectId: "cards-11b89",
  storageBucket: "cards-11b89.appspot.com",
  messagingSenderId: "386337211250",
  appId: "1:386337211250:web:9a218647122f06342513eb",
  measurementId: "G-G8V2W14C09"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export { db }