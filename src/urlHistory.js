import config from './config'

class UrlHistory {

  constructor() {
    this._map = new Map()
  }

  _prune() {
    while (this._map.size > config.history.numRememberedUrls) {
      this._map.delete(this._map.keys().next())
    }
  }

  canFetch(url) {
    if (!this._map.has(url)) {
      this._map.set(url, false)
      this._prune()
      return true
    } else {
      return false
    }
  }

  canDisplay(url) {
    const displayedRecently = this._map.get(url)
    if (displayedRecently) {
      // entry value exists AND is true, has displayed recently
      return false
    } else {
      this._map.set(url, true)
      this._prune()
      return true
    }
  }
  
}

export default UrlHistory
