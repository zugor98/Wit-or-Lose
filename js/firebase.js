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
    apiKey: "AIzaSyBstMuEARHvk9_-_OnlA2cKWdF5Q9uuAbg",
    authDomain: "poki-695e7.firebaseapp.com",
    databaseURL: "https://poki-695e7-default-rtdb.firebaseio.com/",
    projectId: "poki-695e7",
    storageBucket: "poki-695e7.firebasestorage.app",
    messagingSenderId: "608641938421",
    appId: "1:608641938421:web:826e471f0118150943e6bc",
    measurementId: "G-99RYW75JZX"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
signInAnonymously(auth)
    .then(() => { /*console.log("Logado anonimamente! Agora as permissões funcionam.");*/})
    .catch((error) => { /*console.error("Erro ao logar:", error);*/ });

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
