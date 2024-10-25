// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCQ9iDy5fD8lccSwuDe18LiG_vKISLRLu8",
    authDomain: "healthcare-otp.firebaseapp.com",
    projectId: "healthcare-otp",
    storageBucket: "healthcare-otp.appspot.com",
    messagingSenderId: "171785451365",
    appId: "1:171785451365:web:3fb6c8ec1cf00a5303538c",
    measurementId: "G-FX4K844NF6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app