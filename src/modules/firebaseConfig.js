// Firebase configuratin and helpers
import firebase from 'firebase/app'
import 'firebase/database'
require('firebase/firestore')

const config = {
  apiKey: 'AIzaSyDb-kZcPBe83zlRMFnRQLCxRrwK9NLFy_g',
  authDomain: 'crud-hot-dog-18d68.firebaseapp.com',
  databaseURL: 'https://crud-hot-dog-18d68.firebaseio.com',
  projectId: 'crud-hot-dog-18d68',
  storageBucket: 'crud-hot-dog-18d68.appspot.com',
  messagingSenderId: '700252846041',
  appId: '1:700252846041:web:543508dc9d53b065'
}

firebase.initializeApp(config)

// Apply the default browser preference
firebase.auth().useDeviceLanguage()

const db = firebase.database()
const firestore = firebase.firestore()

export {
  db,
  firestore
}
