const searchToObject = search => {
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
    const { search, protocol, host, pathname } = window.location
    if (window.history.pushState) {
      const modifiedObject = { ...searchToObject(search), [key]: value }
      const modifiedArray = Object.keys(modifiedObject).map(
        key => `${key}=${modifiedObject[key]}`
      )
      const modifiedString = modifiedArray.join('&')
      const newUrl = `${protocol}//${host}${pathname}?${modifiedString}`
      return window.history.pushState({ path: newUrl }, '', newUrl)
    } else {
      throw 'history.pushState not supported the current in browser'
    }
  },
  get: key => searchToObject(window.location.search)[key]
}
