
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAUzuv2RPB4VpGNa-3DgPzLznjCj7PPThk",
    authDomain: "clone-25377.firebaseapp.com",
    projectId: "clone-25377",
    storageBucket: "clone-25377.firebasestorage.app",
    messagingSenderId: "607024868440",
    appId: "1:607024868440:web:846cea679489006dfc2e2d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// initializing auth
export const auth = getAuth(app);
export const db = getFirestore(app);