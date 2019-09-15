// const firebase = require('firebase')
import firebase from 'firebase'
import firestore from 'firebase/firestore'

// web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDD5VC6d7ey4vdsv4Vb7v_n_KZ3dp55rOU",
  authDomain: "fix-dishes.firebaseapp.com",
  databaseURL: "https://fix-dishes.firebaseio.com",
  projectId: "fix-dishes",
  storageBucket: "fix-dishes.appspot.com",
  messagingSenderId: "283445787368",
  appId: "1:283445787368:web:ba16f1eaf8984c4032a75d"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
// firebaseApp.firestore().settings({ timestampsInSnapshots: true })
// fire store is database so we need that too & export 
// other can interact with database
export default firebaseApp.firestore()


