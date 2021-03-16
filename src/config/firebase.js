import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDvTQ1p9HLoiHagnUOANaQFASEMjIP7lzw",
    authDomain: "whatssapp-f4ce9.firebaseapp.com",
    projectId: "whatssapp-f4ce9",
    storageBucket: "whatssapp-f4ce9.appspot.com",
    messagingSenderId: "923714201679",
    appId: "1:923714201679:web:f50e22316efe51188f223a"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;