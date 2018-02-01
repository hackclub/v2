import fetch from 'unfetch'

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
  return fetch(apiBase + path, { method: method, ...filteredOptions })
    .then(res => {
      if (res.ok) {
        const contentType = res.headers.get('content-type')
        if (contentType && contentType.indexOf('application/json') !== -1) {
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
}

let api = {}

methods.forEach(method => {
  api[method.toLowerCase()] = generateMethod(method)
})

export default api
