import Constants from "../constants/categoryConstants"

const cloneState = function (state) {
  const newState = Object.assign({}, state)
  newState.categories = state.categories.map((item) => { return Object.assign({}, item) })
  return newState
}

const initialState = {
  categories: [{
    id: "",
    short: undefined,
    name: undefined,
    version: ""
  }]
}
export default function reducer (state = initialState, action) {
  state = cloneState(state)

  switch (action.type) {
    case Constants.CREATE_CATEGORY_FULFILLED:
      state.categories.push(action.payload.data)
      break
    case Constants.CREATE_CATEGORY_REJECTED:
      console.log("An error occurred: ", action.payload.response.data)
      break
    case Constants.DELETE_CATEGORY_FULFILLED:
      state.categories = state.categories.filter((item) => { return item.short !== action.payload })
      break
    case Constants.DELETE_CATEGORY_REJECTED:
      console.log("An error occurred: ", action.payload)
      break
    case Constants.FETCH_CATEGORIES_FULFILLED:
      state.categories = []
      action.payload.forEach((item) => {
        state.categories.push(item)
      })
      break
    case Constants.FETCH_CATEGORIES_REJECTED:
      console.log("An error occurred: ", action.payload)
      break
    default:
      break
  }
  return state
}
