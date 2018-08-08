import axios from 'axios'
import firebase from './firebaseService'
import firebaseConstants from '../constants/firebaseConstants'

export function createCategory (short, name) {
  const ref = firebase.ref(`${firebaseConstants.DATABASE_CATEGORIES}`)
  const newChildRef = ref.push()
  return newChildRef.set({short, name})
}

export function deleteCategory (id) {
  
  const promise = new Promise((resolve, reject) => {
    const ref = firebase.ref(`${firebaseConstants.DATABASE_CATEGORIES}/${id}`)

    try {
      ref.remove()
      resolve(id)
    } catch (error) {
      reject(error)
    }
    
  })

  return promise
}

export function fetchCategories () {
  const ref = firebase.ref(firebaseConstants.DATABASE_CATEGORIES + '/')
  return ref.once('value')
}
