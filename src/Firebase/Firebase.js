import firebase from "firebase";

const app = firebase.initializeApp({
  apiKey: "AIzaSyC1v7fTshJqhCLoGS7WDB3fJ56j2GI6d08",
  authDomain: "e-commerce-ff649.firebaseapp.com",
  projectId: "e-commerce-ff649",
  storageBucket: "e-commerce-ff649.appspot.com",
  messagingSenderId: "576597478212",
  appId: "1:576597478212:web:57b1c8fa676e6c94a5a511",
});

const auth = firebase.auth();
const db = app.firestore();

const storage = firebase.storage();
export { db, auth, storage };
