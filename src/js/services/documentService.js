export function deleteFile (category, folder, filename) {
  return fetch(`http://localhost:8081/api/files?category=${category}&folder=${folder}&filename=${filename}`, {method: "DELETE"})
}

export function fetchDocuments (page, pageSize, category) {
  return fetch(`http://localhost:8081/api/documents?page=${page}&pageSize=${pageSize}&category=${category}`, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  })
}

export function fetchNewFiles () {
  return fetch("http://localhost:8081/api/files")
}

export function uploadFile (formData) {
  return fetch("http://localhost:8081/api/files", { method: "POST", body: formData })
}
