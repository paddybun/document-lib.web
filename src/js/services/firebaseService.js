import firebase from 'firebase'
require('firebase/firestore')

var config = {

};

firebase.initializeApp(config)
const firestore = firebase.firestore()
const settings = { timestampsInSnapshots: true }
firestore.settings(settings)

export default firestore
