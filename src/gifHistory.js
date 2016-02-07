import config from './config'

class GifHistory {

  constructor() {
    this._map = new Map()
  }

  _getKey(urlOrArray) {
    return Array.isArray(urlOrArray) ? urlOrArray.join(',') : urlOrArray
  }

  _maybeRemoveFirstEntry() {
    while (this._map.size > config.history.numRememberedUrls) {
      this._map.delete(this._map.keys().next())
    }
  }

  canFetch(urlOrArray) {
    const key = this._getKey(urlOrArray)
    if (!this._map.has(key)) {
      this._map.set(key, false)
      this._maybeRemoveFirstEntry()
      return true
    } else {
      return false
    }
  }

  canDisplay(urlOrArray) {
    const key = this._getKey(urlOrArray)
    const displayedRecently = this._map.get(key)
    if (displayedRecently) {
      // entry value exists AND is true, has displayed recently
      return false
    } else {
      this._map.set(key, true)
      this._maybeRemoveFirstEntry()
      return true
    }
  }
  
}

export default GifHistory
