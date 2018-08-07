import Constants from "../constants/documentConstants"

const cloneState = function (state) {
  const newState = Object.assign({}, state)
  newState.documents = state.documents.map((item) => { return Object.assign({}, item) })
  newState.newDocuments = newState.newDocuments.concat([])
  return newState
}

const initialState = {
  documents: [
    {
      id: 0,
      dokumentName: "kein Dokument vorhanden"
    }
  ],
  newDocuments: []
}
export default function reducer (state = initialState, action) {
  state = cloneState(state)

  switch (action.type) {
    case Constants.CREATE_DOCUMENT:
      state.documents.push({documentName: action.payload.documentName})
      break
    case Constants.DELETE_FILE_FULFILLED:
      const index = state.newDocuments.indexOf(action.payload)
      state.newDocuments.splice(index, 1)
      state.newDocuments = state.newDocuments.concat([])
      console.log("Deleted document", action.payload)
      break
    case Constants.DELETE_FILE_REJECTED:
      console.log("An error occurred", action.payload)
      break
    case Constants.FETCH_DOCUMENTS_FULFILLED:
      state.documents = []
      action.payload.forEach((item) => {
        state.documents.push(item)
      })
      break
    case Constants.FETCH_DOCUMENTS_REJECTED:
      console.log("An error occurred", action.payload)
      break
    case Constants.FETCH_NEW_DOCUMENTS_FULFILLED:
      state.newDocuments = []
      action.payload.forEach((item) => {
        state.newDocuments.push(item)
      })
      break
    case Constants.FETCH_NEW_DOCUMENTS_REJECTED:
      console.log("An error occurred", action.payload)
      break
    case Constants.UPLOAD_DOCUMENT_FULFILLED:
      action.payload.successful.forEach((item) => {
        state.newDocuments.push(item)
      })
      break
    case Constants.UPLOAD_DOCUMENT_REJECTED:
      console.log("An error occurred", action.payload)
      break
    default:
      break
  }
  return state
}
