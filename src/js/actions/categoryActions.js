import Constants from '../constants/categoryConstants'
import * as CategoryService from '../services/categoryService'

export function createCategory (short, name) {
  return {
    type: Constants.CREATE_CATEGORY,
    payload: CategoryService.createCategory(short, name)
  }
}

export function deleteCategory (id) {
  return function (dispatch) {
    CategoryService.deleteCategory(id)
      .then((response) => {
        return response
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
        return response.val()
      })
      .then((json) => {
        const array = []
        Object.getOwnPropertyNames(json).forEach((propertyName) => {
          const id = propertyName
          const innerObject = json[id]
          array.push({id: propertyName, short: innerObject.short, name: innerObject.name})
        })
        dispatch({type: Constants.FETCH_CATEGORIES_FULFILLED, payload: array})
      })
      .catch((err) => {
        dispatch({type: Constants.FETCH_CATEGORIES_REJECTED, payload: err})
      })
  }
}
