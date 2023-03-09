import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAJX-aaLydGpTacgdy8o81EgfPjziab85w",
    authDomain: "fir-thoitiet.firebaseapp.com",
    projectId: "fir-thoitiet",
    storageBucket: "fir-thoitiet.appspot.com",
    messagingSenderId: "451114477894",
    appId: "1:451114477894:web:fbc112d713f27ea6b5dd47",
    measurementId: "G-0HBKE4XYCQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
export { analytics, auth, db };
