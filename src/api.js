import axios from 'axios'

const apiBase = 'https://api.hackclub.com/'
const methods = ['GET', 'PUT', 'POST', 'PATCH', 'DELETE']

const generateMethod = method => (path, options = {}) => {
  // authToken is shorthand for Authorization: Bearer `authtoken`
  let filteredOptions = {}
  for (let [key, value] of Object.entries(options)) {
    switch (key) {
      case 'authToken':
        filteredOptions.headers = filteredOptions.headers || {}
        filteredOptions.headers['Authorization'] = `Bearer ${value}`
        break
      case 'data':
        filteredOptions.body = JSON.stringify(value)
        filteredOptions.headers = filteredOptions.headers || {}
        filteredOptions.headers['Content-Type'] = 'application/json'
        break
      default:
        filteredOptions[key] = value
        break
    }
  }
  return axios(apiBase + path, { method: method, ...filteredOptions })
    .then(res => {
      const contentType = res.headers['content-type']
      return res.data
    })
    .catch(e => {
      throw e
    })
}

let api = {}

methods.forEach(method => {
  api[method.toLowerCase()] = generateMethod(method)
})

export default api
