import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDi-VjDmpX373DnKxmostrvIa5di_776fk",
  authDomain: "notereact-lth.firebaseapp.com",
  databaseURL: "https://notereact-lth-default-rtdb.firebaseio.com",
  projectId: "notereact-lth",
  storageBucket: "notereact-lth.appspot.com",
  messagingSenderId: "534831312214",
  appId: "1:534831312214:web:6cdb6e49ecb4aed8bd3af7",
  measurementId: "G-87J4DRDGB9",
};

firebase.initializeApp(firebaseConfig);

export const FirebaseConnect = firebase.database().ref("node1/Title/");
