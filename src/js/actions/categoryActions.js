import Constants from '../constants/categoryConstants'
import * as CategoryService from '../services/categoryService'

export function createCategory (short, name) {
  return function (dispatch) {
    CategoryService.createCategory(short, name)
      .then((response) => {
        dispatch({type: Constants.CREATE_CATEGORY_FULFILLED, payload: {data: response}})
      })
      .catch((err) => {
        dispatch({type: Constants.CREATE_CATEGORY_FULFILLED, payload: err})
      })
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
        return response.docs
      })
      .then((docs) => {
        const array = []
        docs.forEach((item) => {
          const toPush = Object.assign({id: item.id}, item.data())
          array.push(toPush)
        })
        dispatch({type: Constants.FETCH_CATEGORIES_FULFILLED, payload: array})
      })
      .catch((err) => {
        dispatch({type: Constants.FETCH_CATEGORIES_REJECTED, payload: err})
      })
  }
}
