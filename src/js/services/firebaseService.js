import firebase from 'firebase'

const config = {
  // firebase config
}

firebase.initializeApp(config)

export default firebase.database()
