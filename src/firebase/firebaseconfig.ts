// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhEqXgsJAF5Z9p8gOnOX4F_QBgQxhdufA",
  authDomain: "slack-clone-e7a2b.firebaseapp.com",
  projectId: "slack-clone-e7a2b",
  storageBucket: "slack-clone-e7a2b.appspot.com",
  messagingSenderId: "122504334410",
  appId: "1:122504334410:web:0081b6c359445ba7562ab3",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp };
