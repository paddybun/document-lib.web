import firestore from './firebaseService'
import firebaseConstants from '../constants/firebaseConstants'

export function createCategory (short, name) {
  const promise = new Promise((resolve, reject) =>{
    const toSave = {short, name}
    const newCategoryRef = firestore.collection(firebaseConstants.DATABASE_CATEGORY).doc()
    newCategoryRef.set(toSave).then(() =>{
      resolve(toSave)
    }).catch((error) => {
      reject(error)
    });
  })
  return promise
}

export function deleteCategory (id) {

  const promise = new Promise((resolve, reject) => {
    return firestore.collection(firebaseConstants.DATABASE_CATEGORY).doc(id)
    .delete()
    .then(() => {
      resolve(id)
    })
    .catch((error)=>{
      reject(error)
    })
  })
  return promise
}

export function fetchCategories () {
  return firestore.collection(firebaseConstants.DATABASE_CATEGORY).get()
}
