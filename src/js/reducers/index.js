import { combineReducers } from "redux"

import categories from "./categoryReducer"
import documents from "./documentReducer"
import folders from "./folderReducer"

export default combineReducers({
  documents,
  categories,
  folders
})
