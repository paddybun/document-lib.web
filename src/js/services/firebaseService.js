import firebase from 'firebase'
require('firebase/firestore')

debugger

// var config = {
//     apiKey: "AIzaSyAhPsA2DVrhmjGlODenbNTwe_1o5qziYvc",
//     authDomain: "document-lib.firebaseapp.com",
//     databaseURL: "https://document-lib.firebaseio.com",
//     projectId: "document-lib",
//     storageBucket: "document-lib.appspot.com",
//     messagingSenderId: "1001851846450"
// };

firebase.initializeApp(config)
const firestore = firebase.firestore()
const settings = { timestampsInSnapshots: true }
firestore.settings(settings)

export default firestore
