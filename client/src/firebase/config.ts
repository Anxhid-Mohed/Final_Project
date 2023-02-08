import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBfoKwzh5teChIpdwh1-903eX5XtyAj5L0",
  authDomain: "main-project-b75e7.firebaseapp.com",
  projectId: "main-project-b75e7",
  storageBucket: "main-project-b75e7.appspot.com",
  messagingSenderId: "816361098356",
  appId: "1:816361098356:web:20358c8001f11ce4db9521",
  measurementId: "G-CT4RVNQ2RY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const DB = getFirestore();
export const storage = getStorage();