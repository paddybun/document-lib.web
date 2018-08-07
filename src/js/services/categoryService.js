import axios from "axios"

export function createCategory (categoryShort, categoryName) {
  return axios.request({
    url: "http://localhost:8081/api/category",
    method: "post",
    data: {
      categoryShort,
      categoryName
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
}

export function deleteCategory (categoryShort) {
  return fetch(`http://localhost:8081/api/category?category=${categoryShort}`, { method: "DELETE" })
}

export function fetchCategories () {
  return fetch("http://localhost:8081/api/category", { method: "GET" })
}
