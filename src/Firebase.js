// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFiIQA5Er8Q625JlvhaSaX5jihhh2YgvY",
  authDomain: "blogs-16f7c.firebaseapp.com",
  projectId: "blogs-16f7c",
  storageBucket: "blogs-16f7c.appspot.com",
  messagingSenderId: "869416027174",
  appId: "1:869416027174:web:fca1a7ee9ca5b8a48dd2e7",
  measurementId: "G-7KJV4GT7V0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const myauth=getAuth(app)
const db=getFirestore(app)
const mystorage=getStorage(app)
export {myauth,db,mystorage}
