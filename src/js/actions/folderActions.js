import Constants from "../constants/folderConstants"
import * as FolderService from "../services/folderService"

export function createFolder (name, category, count) {
  return function (dispatch) {
    FolderService.createFolder(name, category, count)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        dispatch({type: Constants.CREATE_FOLDER_FULFILLED, payload: json})
      })
      .catch((err) => {
        dispatch({type: Constants.CREATE_FOLDER_REJECTED, payload: err})
      })
  }
}

export function getFoldersFromServer () {
  return function (dispatch) {
    FolderService.fetchFolders()
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        dispatch({type: Constants.FETCH_FOLDERS_FULFILLED, payload: json})
      })
      .catch((err) => {
        dispatch({type: Constants.FETCH_FOLDERS_REJECTED, payload: err})
      })
  }
}
