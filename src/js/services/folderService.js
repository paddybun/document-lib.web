export function createFolder (name, category, count) {
  return fetch("http://localhost:8081/api/folders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({name, category, count})
  })
}

export function fetchFolders () {
  return fetch("http://localhost:8081/api/folders", { method: "GET" })
}
