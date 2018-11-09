const disabled = typeof localStorage === 'undefined'

export default {
  get: key => {
    if (disabled) return null
    try {
      // (max@maxwofford.com) Values that were set before values were stringified might fail to parse, so we return the raw storage item if we can't parse it
      return JSON.parse(localStorage.getItem(key))
    } catch (e) {
      if (e.name === 'SyntaxError') {
        return localStorage.getItem(key)
      } else {
        console.error(e)
      }
    }
  },
  set: (key, value) => {
    if (disabled) return null
    return localStorage.setItem(key, JSON.stringify(value))
  },
  remove: key => {
    if (disabled) return null
    return localStorage.removeItem(key)
  }
}
