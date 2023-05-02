import firebase from 'firebase/compat/app';

import 'firebase/compat/analytics';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDuCYgDyDBM6stLppGYNF5N0zRqeNV1DfY',
  authDomain: 'chat-app-e2ab6.firebaseapp.com',
  projectId: 'chat-app-e2ab6',
  storageBucket: 'chat-app-e2ab6.appspot.com',
  messagingSenderId: '1012943884304',
  appId: '1:1012943884304:web:6e08819e5797dbf3327a95',
  measurementId: 'G-TBJP79E9GJ',
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

// auth.useEmulator('http://localhost:9099');
// if (window.location.hostname === 'localhost') {
//   db.useEmulator('localhost', '8080');
// }

export { auth, db };
export default firebase;
