// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtTZexuW2WOEGJs-ZT7b4wMOPy63xDJiw",
  authDomain: "audio-387a5.firebaseapp.com",
  projectId: "audio-387a5",
  storageBucket: "audio-387a5.appspot.com",
  messagingSenderId: "596216955171",
  appId: "1:596216955171:web:ce99533d4b16e6fe4d8c96",
  measurementId: "G-E8G9MLDNZJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage(app);
export default storage;
