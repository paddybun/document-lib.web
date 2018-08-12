import firebase from './firebaseService'
import firebaseConstants from '../constants/firebaseConstants'

export function createFolder (name, category, count) {
  const ref = firebase.ref(`${firebaseConstants.DATABASE_FOLDERS}`)
  const childRef = ref.push()
  return childRef.set({
    name,
    category,
    count,
    currentAmount: 0
  })
}

export function fetchFolders () {
  const ref = firebase.ref(firebaseConstants.DATABASE_FOLDERS + '/')
  const result = ref.once('value')
  return result
}
