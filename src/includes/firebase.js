// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBcKrzlcXfRt_Q6DtpHpzFwVeQ42N51H-k',
  authDomain: 'spotify-4df9a.firebaseapp.com',
  projectId: 'spotify-4df9a',
  storageBucket: 'spotify-4df9a.appspot.com',
  messagingSenderId: '359864328715',
  appId: '1:359864328715:web:6cd6182121677dc55b5d0e',
  measurementId: 'G-GZPTT7485M',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
firebase.analytics(app);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const usersCollection = db.collection('users');
const songsCollection = db.collection('songs');
const commentsCollection = db.collection('comments');

export {
  auth,
  db,
  usersCollection,
  songsCollection,
  commentsCollection,
  storage,
};
