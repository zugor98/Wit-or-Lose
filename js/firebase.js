import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { 
    getAuth, 
    signInAnonymously, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

import 
{ 
    getDatabase, 
    ref, 
    set, 
    get,
    onValue, 
    update, 
    push,
    remove,
    onDisconnect,
    off,
    runTransaction
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC2iTQ8KUyDbxM4L8KKoE5D60elaO1-FN4",
  authDomain: "witorlose.firebaseapp.com",
  databaseURL: "https://witorlose-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "witorlose",
  storageBucket: "witorlose.firebasestorage.app",
  messagingSenderId: "99669576119",
  appId: "1:99669576119:web:62539b720dc3bc6805c032",
  measurementId: "G-1QR9L6WR2Z"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

window.fbDB = db;
window.fbRef = ref;
window.fbSet = set;
window.fbGet = get;
window.fbOnValue = onValue;
window.fbUpdate = update;
window.fbPush = push;
window.fbRemove = remove;
window.fbDisconnect = onDisconnect;
window.fbOff = off;
window.fbTransaction = runTransaction;
//console.log("🔥 Firebase: Conectado e pronto para o app.js!");
