// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3w2NV-xz9hGVsqfO2GAwufxlkuAnP5FY",
  authDomain: "gradewise-4c0aa.firebaseapp.com",
  projectId: "gradewise-4c0aa",
  storageBucket: "gradewise-4c0aa.appspot.com",
  messagingSenderId: "966747338556",
  appId: "1:966747338556:web:4c2eef565a31054649d039",
  measurementId: "G-6NDCX33G1X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;