import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBo86nLasg35zNPQu0DkhDcyVpeUtvRrCA",
    authDomain: "otp-verify-17505.firebaseapp.com",
    projectId: "otp-verify-17505",
    storageBucket: "otp-verify-17505.firebasestorage.app",
    messagingSenderId: "976221975791",
    appId: "1:976221975791:web:a12f7b9c24ae835fe3d71a",
    measurementId: "G-7VN6XJEE8M"
};

export const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)