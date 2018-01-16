import fetch from 'unfetch'

const apiBase = "https://api.hackclub.com/"
const methods = ['get', 'put', 'post', 'patch']

const generateMethod = (method) => (
  (path, options) => (
    fetch(apiBase + path, {method: method, ...options})
      .then(res => {
        if (res.ok) {
          const contentType = res.headers.get("content-type")
          if (contentType && contentType.indexOf("application/json") !== -1) {
            return res.json()
          } else {
            return res.text()
          }
        } else {
          throw res
        }
      })
      .catch(e => {
        console.error(e)
        throw e
      })
  )
)

let apiClient = {}

methods.forEach(method => {
  apiClient[method] = generateMethod(method)
})

export default apiClient
