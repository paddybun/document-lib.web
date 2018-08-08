import Constants from '../constants/documentConstants'
import * as DocumentService from '../services/documentService'

export function createDocument (documentName) {
  return {
    type: Constants.CREATE_DOCUMENT,
    payload: {
      documentName
    }
  }
}

export function deleteFile (category, folder, filename) {
  return function (dispatch) {
    DocumentService.deleteFile(category, folder, filename)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        dispatch({type: Constants.DELETE_FILE_FULFILLED, payload: json})
      })
      .catch((err) => {
        dispatch({type: Constants.DELETE_FILE_REJECTED, payload: err})
      })
  }
}

export function getDocumentsFromServer (page, pageCount, category) {
  return function (dispatch) {
    DocumentService.fetchDocuments(page, pageCount, category)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        dispatch({type: Constants.FETCH_DOCUMENTS_FULFILLED, payload: json})
      })
      .catch((err) => {
        dispatch({type: Constants.FETCH_DOCUMENTS_REJECTED, payload: err})
      })
  }
}

export function getNewDocumentsFromServer () {
  return function (dispatch) {
    DocumentService.fetchNewFiles()
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        dispatch({type: Constants.FETCH_NEW_DOCUMENTS_FULFILLED, payload: json})
      })
      .catch((err) => {
        dispatch({type: Constants.FETCH_NEW_DOCUMENTS_REJECTED, payload: err})
      })
  }
}

export function uploadFile (formData) {
  return function (dispatch) {
    DocumentService.uploadFile(formData)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        dispatch({type: Constants.UPLOAD_DOCUMENT_FULFILLED, payload: json})
      })
      .catch((err) => {
        dispatch({type: Constants.UPLOAD_DOCUMENT_REJECTED, payload: err})
      })
  }
}
