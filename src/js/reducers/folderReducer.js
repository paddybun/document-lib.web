import Constants from "../constants/folderConstants"

const cloneState = function (state) {
  const newState = Object.assign({}, state)
  newState.folders = state.folders.map((item) => { return Object.assign({}, item) })
  return newState
}

const initialState = {
  folders: [{
    id: "",
    name: undefined,
    count: 0,
    currentAmount: 0,
    category: undefined,
    version: undefined
  }]
}
export default function reducer (state = initialState, action) {
  state = cloneState(state)

  switch (action.type) {
    case Constants.CREATE_FOLDER_FULFILLED:
      state.folders.push(action.payload)
      break
    case Constants.CREATE_FOLDER_REJECTED:
      console.log("An error occurred: ", action.payload)
      break
    case Constants.FETCH_FOLDERS_FULFILLED:
      state.folders = []
      action.payload.forEach((item) => {
        state.folders.push(item)
      })
      break
    case Constants.FETCH_FOLDERS_REJECTED:
      console.log("An error occurred: ", action.payload)
      break
    default:
      break
  }
  return state
}
