const searchObject = () => {
  const { search } = location
  const result = {}
  const kvPairs = search.substr(1).split('&')
  for (let i = 0; i < kvPairs.length; i++) {
    const [k, v] = kvPairs[i].split('=')
    if (k) {
      result[k] = v
    }
  }
  return result
}

export default {
  set: (key, value) => {
    const { search, protocol, host, pathname } = location
    if (history.pushState) {
      const modifiedObject = { ...searchObject(), [key]: value }
      const modifiedArray = Object.keys(modifiedObject).map(
        key => `${key}=${modifiedObject[key]}`
      )
      const modifiedString = modifiedArray.join('&')
      const newUrl = `${protocol}//${host}${pathname}?${modifiedString}`
      return history.pushState({ path: newUrl }, '', newUrl)
    } else {
      throw 'history.pushState not supported the current in browser'
    }
  },
  get: key => searchObject()[key]
}
