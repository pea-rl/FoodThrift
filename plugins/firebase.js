import firebase from 'firebase/app'
import 'firebase/database'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBjhJxNHvKI449FL-hJalVfGNvFDdLWQ9A",
  authDomain: "youcash-9427e.firebaseapp.com",
  databaseURL: "https://youcash-9427e-default-rtdb.firebaseio.com",
  projectId: "youcash-9427e",
  storageBucket: "youcash-9427e.appspot.com",
  messagingSenderId: "535401343041",
  appId: "1:535401343041:web:48cbb643929c150d3dfec0",
  measurementId: "G-ESC95M0448"
  })
} 

export const database = firebase.database()
export default firebase
