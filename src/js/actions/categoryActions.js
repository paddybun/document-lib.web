import Constants from "../constants/categoryConstants"
import * as CategoryService from "../services/categoryService"

export function createCategory (categoryShort, categoryName) {
  return {
    type: Constants.CREATE_CATEGORY,
    payload: CategoryService.createCategory(categoryShort, categoryName)
  }
}

export function deleteCategory (categoryShort) {
  return function (dispatch) {
    CategoryService.deleteCategory(categoryShort)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        dispatch({type: Constants.DELETE_CATEGORY_FULFILLED, payload: json})
      })
      .catch((err) => {
        dispatch({type: Constants.DELETE_CATEGORY_REJECTED, payload: err})
      })
  }
}

export function getCategoriesFromServer () {
  return function (dispatch) {
    CategoryService.fetchCategories()
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        dispatch({type: Constants.FETCH_CATEGORIES_FULFILLED, payload: json})
      })
      .catch((err) => {
        dispatch({type: Constants.FETCH_CATEGORIES_REJECTED, payload: err})
      })
  }
}
