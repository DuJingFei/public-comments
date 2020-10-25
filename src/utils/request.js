const headers = new Headers({
  "Accept": "application/json",
  "Content-Type": "application/json"
})

function get(url) {
  return fetch(url, {
    method: "GET",
    headers: headers
  }).then(res => {
    handleResponse(url, res)
  }).catch(err => {
    console.error(`Request failed. Url=${url}. Message=${err}`)
    return Promise.reject({ error: { message: "Request fail" } })
  })
}

function post(url, data) {
  return fetch(url, {
    method: "POST",
    headers: headers,
    body: data
  }).then(res => {
    handleResponse(url, res)
  }).catch(err => {
    console.error(`Request failed. Url=${url}. Message=${err}`)
    return Promise.reject({ error: { message: "Request fail" } })
  })
}

function handleResponse(url, res) {
  if (res.status === 200) {
    return res.json()
  }
  else {
    console.error(`Request failed. Url=${url}`)
    return Promise.reject({ error: { message: "Request fail due to server error" } })
  }
}

export { get, post }