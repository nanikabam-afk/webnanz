import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyDYU8XsNDYBUGibAmIJD8ySTv9knpLvYds",
    authDomain: "webnanz.firebaseapp.com",
    projectId: "webnanz",
    storageBucket: "webnanz.firebasestorage.app",
    messagingSenderId: "853472667216",
    appId: "1:853472667216:web:bc113b6bc6b8f72be15355",
    measurementId: "G-N8VWJHLFMK"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);


export {
    app,
    db,
    auth,
    collection,
    addDoc,
    serverTimestamp
};