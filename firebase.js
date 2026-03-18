// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, push, set, onValue, update, remove } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAkOwU1T92cz1stmo1-VwcXE_nIDp-sk-M",
  authDomain: "rdn-store.firebaseapp.com",
  databaseURL: "https://rdn-store-default-rtdb.firebaseio.com",
  projectId: "rdn-store",
  storageBucket: "rdn-store.appspot.com",
  messagingSenderId: "29377893404",
  appId: "1:29377893404:web:927e49e5f97c0f2368bbd9",
  measurementId: "G-CQWRHTJB29"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { db, ref, push, set, onValue, update, remove };
