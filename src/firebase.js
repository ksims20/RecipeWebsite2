import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, child } from "firebase/database";
import { FirebaseApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAtbyENrTnzUS3BC2yqads9GRWT3fIyLiA",
  authDomain: "capstone2-f5acb.firebaseapp.com",
  databaseURL: "https://capstone2-f5acb-default-rtdb.firebaseio.com",
  projectId: "capstone2-f5acb",
  storageBucket: "capstone2-f5acb.appspot.com",
  messagingSenderId: "578810233758",
  appId: "1:578810233758:web:a3a5e23d4345da5e0b8c8f",
  measurementId: "G-Z8V6JJ3ZWQ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const dataRef = ref(database, "users");


console.log("Firebase app:", app);
console.log("Database object:", database);




export { auth, database, ref, set, child };