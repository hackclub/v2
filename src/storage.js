const stubbedStorage = {}
'getItem setItem removeItem'
  .split(' ')
  .forEach(method => (stubbedStorage[method] = () => nil))

const localStorage = (window && window.localStorage) ? window.localStorage : stubbedStorage

const storage = {
  get: key => {
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
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  remove: key => localStorage.removeItem(key)
}

export default storage
