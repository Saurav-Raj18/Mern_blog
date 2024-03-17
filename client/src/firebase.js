// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-9ed53.firebaseapp.com",
  projectId: "mern-blog-9ed53",
  storageBucket: "mern-blog-9ed53.appspot.com",
  messagingSenderId: "922177889842",
  appId: "1:922177889842:web:aae3450474c46ce3153e2b"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export default app;